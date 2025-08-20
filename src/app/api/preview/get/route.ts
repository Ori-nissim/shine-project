import { NextRequest, NextResponse } from 'next/server';
import { getPreviewData } from '@/lib/preview-storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    if (!key) {
      return NextResponse.json(
        { error: 'Key parameter is required' },
        { status: 400 }
      );
    }
    
    const preview = await getPreviewData(key);
    
    if (!preview) {
      return NextResponse.json(
        { error: 'Preview not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      preview
    });
    
  } catch (error) {
    console.error('Error getting preview:', error);
    return NextResponse.json(
      { error: 'Failed to get preview' },
      { status: 500 }
    );
  }
} 