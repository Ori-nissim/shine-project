import { NextResponse } from 'next/server';
import { getAllPreviews } from '@/lib/preview-storage';

export async function GET() {
  try {
    const previews = await getAllPreviews();
    
    return NextResponse.json({
      success: true,
      previews
    });
    
  } catch (error) {
    console.error('Error listing previews:', error);
    return NextResponse.json(
      { error: 'Failed to list previews' },
      { status: 500 }
    );
  }
} 