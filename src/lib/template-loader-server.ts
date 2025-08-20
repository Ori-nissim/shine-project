import fs from 'fs/promises';
import path from 'path';
import { TemplateInfo } from './template-loader';

/**
 * Dynamically loads available templates from the templates folder
 * Server-side only - uses fs/promises
 */
export async function getAvailableTemplates(): Promise<TemplateInfo[]> {
  const templatesDir = path.join(process.cwd(), 'templates');
  
  try {
    const templateFolders = await fs.readdir(templatesDir);
    const templates: TemplateInfo[] = [];

    for (const folder of templateFolders) {
      const templatePath = path.join(templatesDir, folder);
      const stats = await fs.stat(templatePath);
      
      if (stats.isDirectory()) {
        // Check for README.md
        let hasReadme = false;
        let description = '';
        try {
          const readmePath = path.join(templatePath, 'README.md');
          const readmeContent = await fs.readFile(readmePath, 'utf-8');
          hasReadme = true;
          // Extract description from first paragraph
          const lines = readmeContent.split('\n');
          for (const line of lines) {
            if (line.trim() && !line.startsWith('#')) {
              description = line.trim();
              break;
            }
          }
        } catch {
          // No README file
        }

        // Check for types.ts
        let hasTypes = false;
        try {
          const typesPath = path.join(templatePath, 'types.ts');
          await fs.access(typesPath);
          hasTypes = true;
        } catch {
          // No types file
        }

        // Generate template name from folder name
        const name = folder
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Determine category based on folder name
        let category = 'business';
        if (folder.includes('dj') || folder.includes('music')) {
          category = 'creative';
        } else if (folder.includes('portfolio') || folder.includes('personal')) {
          category = 'personal';
        }

        templates.push({
          id: folder,
          name,
          description: description || `${name} template for professional websites`,
          category,
          hasTypes,
          hasReadme
        });
      }
    }

    return templates;
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
} 