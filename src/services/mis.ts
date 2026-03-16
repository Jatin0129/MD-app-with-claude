import { reportLibrary } from '../data/mock';
import type { ReportItem } from '../data/mock';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// TODO: Replace with real document management / MIS API
export async function getReportLibrary(): Promise<ReportItem[]> {
  await delay(300);
  return reportLibrary;
}

// TODO: Replace with real document AI analysis endpoint
export async function analyzeDocument(_uri: string): Promise<string> {
  await delay(300);
  return 'AI analysis will be available once document processing is connected.';
}

// TODO: Replace with real ingestion pipeline status API
export async function getIngestionStatus(): Promise<{ excel: string; pdf: string }> {
  await delay(300);
  return {
    excel: 'Pipeline ready — 0 documents queued',
    pdf: 'Pipeline ready — 0 documents queued',
  };
}
