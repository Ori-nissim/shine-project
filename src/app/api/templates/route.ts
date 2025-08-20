import { NextResponse } from 'next/server';
import { getAvailableTemplates } from '../../../lib/template-loader-server';

export async function GET() {
  try {
    const templates = await getAvailableTemplates();
    
    return NextResponse.json({
      success: true,
      templates
    });
  } catch (error) {
    console.error('Error loading templates:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to load templates' 
      },
      { status: 500 }
    );
  }
} 