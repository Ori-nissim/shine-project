import { NextRequest, NextResponse } from 'next/server';
import { signPreviewManagerToken } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Get the admin password from environment variables
    const adminPassword = process.env.PREVIEW_MANAGER_PASSWORD;
    
    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Admin password not configured' },
        { status: 500 }
      );
    }
    
    // Simple password comparison
    if (password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }
    
    // Create a simple session token for the preview manager
    const sessionData = {
      user: { id: 'admin' },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      issuedAt: Date.now(),
      sessionId: 'preview-manager-admin'
    };
    
    const token = await signPreviewManagerToken(sessionData);
    
    // Set the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('preview-manager-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 