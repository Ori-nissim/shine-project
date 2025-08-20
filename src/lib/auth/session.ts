import { compare, hash } from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NewUser } from '@/lib/db/schema';
import { SECURITY_CONFIG } from '@/lib/config/security';

const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return compare(plainTextPassword, hashedPassword);
}

type SessionData = {
  user: { id: number };
  expires: string;
  issuedAt: number;
  sessionId: string;
};

type PreviewManagerSessionData = {
  user: { id: string };
  expires: string;
  issuedAt: number;
  sessionId: string;
};

/**
 * Generates a unique session ID
 */
function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .setJti(payload.sessionId) // JWT ID for session tracking
    .sign(key);
}

export async function signPreviewManagerToken(payload: PreviewManagerSessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .setJti(payload.sessionId) // JWT ID for session tracking
    .sign(key);
}

export async function verifyToken(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload as SessionData;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
}

export async function verifyPreviewManagerToken(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload as PreviewManagerSessionData;
  } catch (error) {
    console.error('Preview manager token verification failed:', error);
    throw new Error('Invalid preview manager token');
  }
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;
  
  try {
    return await verifyToken(session);
  } catch (error) {
    // Clear invalid session
    (await cookies()).delete('session');
    return null;
  }
}

export async function setSession(user: NewUser) {
  const expiresInOneDay = new Date(Date.now() + SECURITY_CONFIG.SESSION.MAX_AGE);
  const sessionId = generateSessionId();
  
  const session: SessionData = {
    user: { id: user.id! },
    expires: expiresInOneDay.toISOString(),
    issuedAt: Date.now(),
    sessionId
  };
  
  const encryptedSession = await signToken(session);
  (await cookies()).set('session', encryptedSession, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: SECURITY_CONFIG.SESSION.SECURE_COOKIES,
    sameSite: SECURITY_CONFIG.SESSION.SAME_SITE,
    path: '/',
  });
}

/**
 * Rotates the session token for security
 */
export async function rotateSession() {
  const session = await getSession();
  if (!session) {
    throw new Error('No active session');
  }
  
  // Create new session with same user but new session ID
  const newSessionId = generateSessionId();
  const expiresInOneDay = new Date(Date.now() + SECURITY_CONFIG.SESSION.MAX_AGE);
  
  const newSession: SessionData = {
    user: session.user,
    expires: expiresInOneDay.toISOString(),
    issuedAt: Date.now(),
    sessionId: newSessionId
  };
  
  const encryptedSession = await signToken(newSession);
  (await cookies()).set('session', encryptedSession, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: SECURITY_CONFIG.SESSION.SECURE_COOKIES,
    sameSite: SECURITY_CONFIG.SESSION.SAME_SITE,
    path: '/',
  });
  
  return newSession;
}

/**
 * Validates session and returns user if valid
 */
export async function validateSession() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  
  // Check if session is expired
  const now = Date.now();
  const expiresAt = new Date(session.expires).getTime();
  
  if (now > expiresAt) {
    // Clear expired session
    (await cookies()).delete('session');
    return null;
  }
  
  return session.user;
}
