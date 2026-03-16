import {
  dubaiRealEstate as mockDubai,
  abudhabiRealEstate as mockAbuDhabi,
  usaRealEstate as mockUSA,
  aiInsights,
} from '../data/mock';
import type { RealEstateData, USARealEstateData } from '../data/mock';

export async function getDubaiRealEstate(): Promise<RealEstateData> {
  return mockDubai;
}

export async function getAbuDhabiRealEstate(): Promise<RealEstateData> {
  return mockAbuDhabi;
}

export async function getUSARealEstate(): Promise<USARealEstateData> {
  return mockUSA;
}

export async function getRealEstateInsight(region: string): Promise<string> {
  if (region === 'Abu Dhabi') return aiInsights.abuDhabiRE;
  if (region === 'USA') return aiInsights.usaRE;
  return aiInsights.dubaiRE;
}
