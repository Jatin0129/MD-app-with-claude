import {
  sobhaSales,
  sobhaCollections,
  sobhaDevelopment,
  sobhaConstruction,
  aiInsights,
} from '../data/mock';
import type {
  SobhaSalesData,
  SobhaCollectionsData,
  SobhaDevelopmentData,
  SobhaConstructionData,
} from '../data/mock';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// TODO: Replace with real Sobha CRM / ERP API
export async function getSalesData(): Promise<SobhaSalesData> {
  await delay(300);
  return sobhaSales;
}

// TODO: Replace with real Sobha collections API
export async function getCollectionsData(): Promise<SobhaCollectionsData> {
  await delay(300);
  return sobhaCollections;
}

// TODO: Replace with real Sobha project management API
export async function getDevelopmentData(): Promise<SobhaDevelopmentData> {
  await delay(300);
  return sobhaDevelopment;
}

// TODO: Replace with real Sobha construction management API
export async function getConstructionData(): Promise<SobhaConstructionData> {
  await delay(300);
  return sobhaConstruction;
}

// TODO: Replace with real AI analysis endpoint
export async function getSobhaInsight(tab: string): Promise<string> {
  await delay(300);
  const map: Record<string, string> = {
    Sales: aiInsights.sobhaSales,
    Collections: aiInsights.sobhaCollections,
    Development: aiInsights.sobhaDevelopment,
    Construction: aiInsights.sobhaConstruction,
  };
  return map[tab] || aiInsights.sobhaSales;
}
