import fs from 'fs/promises';
import path from 'path';

const PREVIEWS_DIR = path.join(process.cwd(), 'data', 'previews');

interface PreviewData {
  key: string;
  template: string; // Allow any template type
  data: any; // Allow any data structure
  whatsappNumber?: string;
  createdAt: string;
  updatedAt: string;
}

// Ensure previews directory exists
async function ensurePreviewsDir() {
  try {
    await fs.access(PREVIEWS_DIR);
  } catch {
    await fs.mkdir(PREVIEWS_DIR, { recursive: true });
  }
}

export async function savePreviewData(previewData: PreviewData): Promise<void> {
  await ensurePreviewsDir();
  const filePath = path.join(PREVIEWS_DIR, `${previewData.key}.json`);
  await fs.writeFile(filePath, JSON.stringify(previewData, null, 2));
}

export async function getPreviewData(key: string): Promise<PreviewData | null> {
  try {
    const filePath = path.join(PREVIEWS_DIR, `${key}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function getAllPreviews(): Promise<PreviewData[]> {
  await ensurePreviewsDir();
  try {
    const files = await fs.readdir(PREVIEWS_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const previews = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(PREVIEWS_DIR, file);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
      })
    );
    
    return previews.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch {
    return [];
  }
}

export async function deletePreviewData(key: string): Promise<void> {
  try {
    const filePath = path.join(PREVIEWS_DIR, `${key}.json`);
    await fs.unlink(filePath);
  } catch {
    // File doesn't exist, that's fine
  }
} 