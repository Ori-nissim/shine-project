/**
 * Security configuration for the application
 */

export const SECURITY_CONFIG = {
  // Password requirements
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: false,
  },
  
  // Session configuration
  SESSION: {
    MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
    ROTATION_INTERVAL: 12 * 60 * 60 * 1000, // 12 hours
    SECURE_COOKIES: process.env.NODE_ENV === 'production',
    SAME_SITE: 'lax' as const,
  },
  
  // Rate limiting
  RATE_LIMIT: {
    AUTH: {
      WINDOW_MS: 15 * 60 * 1000, // 15 minutes
      MAX_REQUESTS: 5,
    },
    API: {
      WINDOW_MS: 60 * 1000, // 1 minute
      MAX_REQUESTS: 100,
    },
  },
  
  // CSRF protection
  CSRF: {
    TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
    SECRET: process.env.AUTH_SECRET || 'fallback-secret',
  },
  
  // Content Security Policy
  CSP: {
    DEFAULT_SRC: ["'self'"],
    SCRIPT_SRC: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
    STYLE_SRC: ["'self'", "'unsafe-inline'"],
    IMG_SRC: ["'self'", "data:", "https:", "blob:", "*"],
    MEDIA_SRC: ["'self'", "https:", "blob:", "data:", "*"],
    FONT_SRC: ["'self'"],
    CONNECT_SRC: ["'self'"],
    FRAME_SRC: ["'self'", "https://www.youtube.com", "https://youtube.com", "https://www.youtube-nocookie.com"],
    FRAME_ANCESTORS: ["'none'"],
  },
  
  // Security headers
  HEADERS: {
    X_FRAME_OPTIONS: 'DENY',
    X_CONTENT_TYPE_OPTIONS: 'nosniff',
    REFERRER_POLICY: 'strict-origin-when-cross-origin',
    X_XSS_PROTECTION: '1; mode=block',
    X_DNS_PREFETCH_CONTROL: 'off',
  },
  
  // Input validation
  VALIDATION: {
    EMAIL_MAX_LENGTH: 255,
    NAME_MAX_LENGTH: 100,
    PASSWORD_MAX_LENGTH: 100,
    TEAM_NAME_MAX_LENGTH: 100,
  },
  
  // Logging
  LOGGING: {
    LOG_IP_ADDRESSES: true,
    LOG_USER_AGENTS: true,
    LOG_FAILED_LOGINS: true,
    LOG_SENSITIVE_ACTIONS: true,
  },
} as const;

/**
 * Validates password strength
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < SECURITY_CONFIG.PASSWORD.MIN_LENGTH) {
    errors.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD.MIN_LENGTH} characters long`);
  }
  
  if (password.length > SECURITY_CONFIG.PASSWORD.MAX_LENGTH) {
    errors.push(`Password must be no more than ${SECURITY_CONFIG.PASSWORD.MAX_LENGTH} characters long`);
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_NUMBERS && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (SECURITY_CONFIG.PASSWORD.REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Generates Content Security Policy header
 */
export function generateCSP(): string {
  const csp = SECURITY_CONFIG.CSP;
  
  return [
    `default-src ${csp.DEFAULT_SRC.join(' ')}`,
    `script-src ${csp.SCRIPT_SRC.join(' ')}`,
    `style-src ${csp.STYLE_SRC.join(' ')}`,
    `img-src ${csp.IMG_SRC.join(' ')}`,
    `media-src ${csp.MEDIA_SRC.join(' ')}`,
    `font-src ${csp.FONT_SRC.join(' ')}`,
    `connect-src ${csp.CONNECT_SRC.join(' ')}`,
    `frame-src ${csp.FRAME_SRC.join(' ')}`,
    `frame-ancestors ${csp.FRAME_ANCESTORS.join(' ')}`
  ].join('; ');
} 