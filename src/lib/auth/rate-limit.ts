import { NextRequest } from 'next/server';
import { SECURITY_CONFIG } from '@/lib/config/security';

// In-memory store for rate limiting (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (request: NextRequest) => string; // Custom key generator
}

/**
 * Default key generator for rate limiting
 * Uses IP address and user agent for identification
 */
function defaultKeyGenerator(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${userAgent}`;
}

/**
 * Rate limiter middleware
 * @param config Rate limiting configuration
 * @returns Middleware function
 */
export function createRateLimiter(config: RateLimitConfig) {
  return function rateLimiter(request: NextRequest): { allowed: boolean; remaining: number; resetTime: number } {
    const key = config.keyGenerator ? config.keyGenerator(request) : defaultKeyGenerator(request);
    const now = Date.now();
    
    // Get existing rate limit data
    const existing = rateLimitStore.get(key);
    
    if (!existing || now > existing.resetTime) {
      // First request or window expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });
      
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetTime: now + config.windowMs
      };
    }
    
    // Check if limit exceeded
    if (existing.count >= config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: existing.resetTime
      };
    }
    
    // Increment counter
    existing.count++;
    rateLimitStore.set(key, existing);
    
    return {
      allowed: true,
      remaining: config.maxRequests - existing.count,
      resetTime: existing.resetTime
    };
  };
}

/**
 * Authentication rate limiter (5 requests per 15 minutes)
 */
export const authRateLimiter = createRateLimiter({
  windowMs: SECURITY_CONFIG.RATE_LIMIT.AUTH.WINDOW_MS,
  maxRequests: SECURITY_CONFIG.RATE_LIMIT.AUTH.MAX_REQUESTS,
  keyGenerator: (request: NextRequest) => {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const path = request.nextUrl.pathname;
    return `${ip}:${path}`; // Rate limit per IP per endpoint
  }
});

/**
 * General API rate limiter (100 requests per minute)
 */
export const apiRateLimiter = createRateLimiter({
  windowMs: SECURITY_CONFIG.RATE_LIMIT.API.WINDOW_MS,
  maxRequests: SECURITY_CONFIG.RATE_LIMIT.API.MAX_REQUESTS,
});

/**
 * Clean up expired rate limit entries (run periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean up every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000); 