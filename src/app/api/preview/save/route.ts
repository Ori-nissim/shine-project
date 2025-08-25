import { NextRequest, NextResponse } from 'next/server';
import { savePreviewData } from '@/lib/preview-storage';

export async function POST(request: NextRequest) {
  try {
    const { key, template, data, whatsappNumber } = await request.json();
    
    if (!key || !data || !template) {
      return NextResponse.json(
        { error: 'Key, template, and data are required' },
        { status: 400 }
      );
    }
    
    const previewData = {
      key,
      template: template as string,
      data: data,
      whatsappNumber: whatsappNumber || "972546104210",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await savePreviewData(previewData);
    
    return NextResponse.json({
      success: true,
      previewUrl: `/preview/${key}`
    });
    
  } catch (error) {
    console.error('Error saving preview:', error);
    return NextResponse.json(
      { error: 'Failed to save preview' },
      { status: 500 }
    );
  }
} 