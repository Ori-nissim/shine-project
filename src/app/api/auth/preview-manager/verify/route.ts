import { NextRequest, NextResponse } from 'next/server';
import { verifyPreviewManagerToken } from '../../../../../lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('preview-manager-session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false });
    }
    
    try {
      const payload = await verifyPreviewManagerToken(sessionToken);
      const now = Date.now();
      const expiresAt = new Date(payload.expires).getTime();
      
      if (now > expiresAt) {
        return NextResponse.json({ authenticated: false });
      }
      
      return NextResponse.json({ authenticated: true });
    } catch (error) {
      return NextResponse.json({ authenticated: false });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ authenticated: false });
  }
} 