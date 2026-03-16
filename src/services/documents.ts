import { documents } from '../data/mock';
import type { DocumentItem } from '../data/mock';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// TODO: Replace with real document storage API (SharePoint, Google Drive, S3)
export async function getDocuments(): Promise<DocumentItem[]> {
  await delay(300);
  return documents;
}

// TODO: Replace with real document search API
export async function searchDocuments(query: string): Promise<DocumentItem[]> {
  await delay(300);
  if (!query.trim()) return documents;
  const q = query.toLowerCase();
  return documents.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q)
  );
}

// TODO: Replace with real AI summarization endpoint
export async function summarizeDocument(_name: string): Promise<string> {
  await delay(300);
  return 'AI document summary will be available once the summarization service is connected.';
}
