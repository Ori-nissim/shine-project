export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  hasTypes: boolean;
  hasReadme: boolean;
}

/**
 * Get template info for client-side use
 */
export function getTemplateInfo(templateId: string): TemplateInfo | null {
  const templateMap: Record<string, TemplateInfo> = {
    'inspiration-site': {
      id: 'inspiration-site',
      name: 'Inspiration Site',
      description: 'Modern business website template with professional design and comprehensive sections',
      category: 'business',
      hasTypes: true,
      hasReadme: false
    },
    'dj-template': {
      id: 'dj-template',
      name: 'DJ Template',
      description: 'Bold, colorful, and animated website template specifically designed for DJs and electronic music artists',
      category: 'creative',
      hasTypes: true,
      hasReadme: true
    }
  };

  return templateMap[templateId] || null;
}

/**
 * Get all available templates for client-side use
 */
export function getAllTemplateInfo(): TemplateInfo[] {
  return [
    {
      id: 'inspiration-site',
      name: 'Inspiration Site',
      description: 'Modern business website template with professional design and comprehensive sections',
      category: 'business',
      hasTypes: true,
      hasReadme: false
    },
    {
      id: 'dj-template',
      name: 'DJ Template',
      description: 'Bold, colorful, and animated website template specifically designed for DJs and electronic music artists',
      category: 'creative',
      hasTypes: true,
      hasReadme: true
    }
  ];
} 