import {
  DUBAI_DATASET_LAST_UPDATED,
  DUBAI_LIVE_DATA,
} from '../data/dubaiTransactionsDataset';

export type RealEstateDataSource = 'dataset' | 'estimated';

export interface DLDTransaction {
  id: string;
  date: string;
  area: string;
  propertyType: string;
  value: string;
  size: string;
  pricePerSqft: string;
}

export interface AreaSummary {
  area: string;
  transactions: number;
  totalValue: string;
  avgPricePerSqft: string;
}

export interface DubaiLiveData {
  source: RealEstateDataSource;
  recentTransactions: DLDTransaction[];
  areaSummary: AreaSummary[];
  totalTransactions: number;
  totalValue: string;
  lastUpdated: string;
}

export interface AbuDhabiLiveData {
  source: RealEstateDataSource;
  totalTransactions: number;
  totalValue: string;
  avgPrice: string;
  topAreas: { area: string; count: number }[];
  lastUpdated: string;
}

export interface BayutTrend {
  area: string;
  avgPrice: string;
  trend: 'up' | 'down' | 'flat';
  changePercent: string;
}

const ABU_DHABI_FALLBACK: AbuDhabiLiveData = {
  source: 'estimated',
  totalTransactions: 5820,
  totalValue: 'AED 18.2B',
  avgPrice: 'AED 1,120/sqft',
  topAreas: [
    { area: 'Yas Island', count: 824 },
    { area: 'Saadiyat Island', count: 712 },
    { area: 'Al Reem Island', count: 643 },
    { area: 'Al Raha Beach', count: 421 },
  ],
  lastUpdated: DUBAI_DATASET_LAST_UPDATED,
};

const DATASET_TRENDS: BayutTrend[] = [];

export async function fetchDubaiLiveData(): Promise<DubaiLiveData> {
  return DUBAI_LIVE_DATA;
}

export async function fetchAbuDhabiLiveData(): Promise<AbuDhabiLiveData> {
  return ABU_DHABI_FALLBACK;
}

export async function fetchBayutTrends(): Promise<BayutTrend[]> {
  return DATASET_TRENDS;
}

export interface LiveREData {
  dubai: DubaiLiveData;
  abuDhabi: AbuDhabiLiveData;
  bayutTrends: BayutTrend[];
}

export async function fetchAllLiveRealEstate(): Promise<LiveREData> {
  const [dubai, abuDhabi, bayutTrends] = await Promise.all([
    fetchDubaiLiveData(),
    fetchAbuDhabiLiveData(),
    fetchBayutTrends(),
  ]);

  return { dubai, abuDhabi, bayutTrends };
}
