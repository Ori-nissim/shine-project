import { randomBytes, createHmac } from 'crypto';
import { cookies } from 'next/headers';
import { SECURITY_CONFIG } from '@/lib/config/security';

/**
 * Generates a CSRF token for form protection
 * @returns A secure CSRF token
 */
export function generateCSRFToken(): string {
  const token = randomBytes(32).toString('hex');
  const timestamp = Date.now().toString();
  const signature = createHmac('sha256', SECURITY_CONFIG.CSRF.SECRET)
    .update(token + timestamp)
    .digest('hex');
  
  return `${token}.${timestamp}.${signature}`;
}

/**
 * Validates a CSRF token
 * @param token The CSRF token to validate
 * @returns True if token is valid, false otherwise
 */
export function validateCSRFToken(token: string): boolean {
  try {
    const [tokenPart, timestamp, signature] = token.split('.');
    
    if (!tokenPart || !timestamp || !signature) {
      return false;
    }

    // Check if token is expired
    const tokenAge = Date.now() - parseInt(timestamp);
    if (tokenAge > SECURITY_CONFIG.CSRF.TOKEN_EXPIRY) {
      return false;
    }

    // Verify signature
    const expectedSignature = createHmac('sha256', SECURITY_CONFIG.CSRF.SECRET)
      .update(tokenPart + timestamp)
      .digest('hex');
    
    return signature === expectedSignature;
  } catch {
    return false;
  }
}

/**
 * Gets or creates a CSRF token for the current session
 * @returns The CSRF token
 */
export async function getCSRFToken(): Promise<string> {
  const cookieStore = await cookies();
  let csrfToken = cookieStore.get('csrf-token')?.value;
  
  if (!csrfToken || !validateCSRFToken(csrfToken)) {
    csrfToken = generateCSRFToken();
    cookieStore.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: SECURITY_CONFIG.SESSION.SECURE_COOKIES,
      sameSite: SECURITY_CONFIG.SESSION.SAME_SITE,
      maxAge: SECURITY_CONFIG.CSRF.TOKEN_EXPIRY / 1000 // Convert to seconds
    });
  }
  
  return csrfToken;
}

/**
 * Validates CSRF token from form data
 * @param formData The form data containing the CSRF token
 * @returns True if token is valid, false otherwise
 */
export async function validateFormCSRF(formData: FormData): Promise<boolean> {
  const csrfToken = formData.get('csrf-token') as string;
  const cookieStore = await cookies();
  const storedToken = cookieStore.get('csrf-token')?.value;
  
  if (!csrfToken || !storedToken) {
    return false;
  }
  
  return csrfToken === storedToken && validateCSRFToken(csrfToken);
} 