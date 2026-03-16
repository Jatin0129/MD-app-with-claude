// Derived from:
// C:\Users\jatin\Downloads\Transactions_2026-03-15_export.xlsx
// Scope: Dubai sales transactions recorded from 2026-01-02 to 2026-02-24.

export const DUBAI_DATASET_DATE_RANGE = '02 Jan - 24 Feb 2026';
export const DUBAI_DATASET_LAST_UPDATED = '2026-02-24T00:00:00.000Z';

export const DUBAI_REAL_ESTATE_OVERVIEW = {
  transactions: '96',
  salesValue: 'AED 320.2M',
  avgPricePerSqft: 'AED 1,939',
  newLaunches: '58',
  topAreas: [
    { name: 'Al Yelayiss 1', transactions: '11' },
    { name: 'Jumeirah Village Circle', transactions: '8' },
    { name: 'Palm Deira', transactions: '4' },
    { name: 'International Media Production Zone', transactions: '4' },
    { name: 'Dubai Maritime City', transactions: '3' },
  ],
};

export const DUBAI_DATASET_AI_INSIGHT =
  'Dubai transaction export covers 02 Jan to 24 Feb 2026 with 96 recorded sales totaling AED 320.2M. Off-plan deals account for 67% of sales count, Al Yelayiss 1 leads transaction volume, and large-ticket villa communities are driving the highest value concentration.';

export const DUBAI_LIVE_DATA = {
  source: 'dataset' as const,
  recentTransactions: [
    {
      id: '1',
      date: '24 Feb 2026',
      area: 'Dubai Maritime City',
      propertyType: 'Apartment',
      value: 'AED 4.5M',
      size: '1,390 sqft',
      pricePerSqft: 'AED 3,208',
    },
    {
      id: '2',
      date: '24 Feb 2026',
      area: 'Palm Deira',
      propertyType: 'Apartment',
      value: 'AED 4.3M',
      size: '2,733 sqft',
      pricePerSqft: 'AED 1,573',
    },
    {
      id: '3',
      date: '24 Feb 2026',
      area: 'Jumeirah Garden City',
      propertyType: 'Apartment',
      value: 'AED 2.1M',
      size: '955 sqft',
      pricePerSqft: 'AED 2,149',
    },
    {
      id: '4',
      date: '24 Feb 2026',
      area: 'Dubai South Residential District',
      propertyType: 'Apartment',
      value: 'AED 1.3M',
      size: '782 sqft',
      pricePerSqft: 'AED 1,648',
    },
    {
      id: '5',
      date: '24 Feb 2026',
      area: 'Jumeirah Village Circle',
      propertyType: 'Apartment',
      value: 'AED 999K',
      size: '1,004 sqft',
      pricePerSqft: 'AED 995',
    },
  ],
  areaSummary: [
    {
      area: 'Hadaeq Sheikh Mohammed Bin Rashid',
      transactions: 2,
      totalValue: 'AED 40.9M',
      avgPricePerSqft: 'AED 2,533',
    },
    {
      area: 'Al Yelayiss 1',
      transactions: 11,
      totalValue: 'AED 35.8M',
      avgPricePerSqft: 'AED 1,782',
    },
    {
      area: 'Palm Jebel Ali',
      transactions: 2,
      totalValue: 'AED 32.4M',
      avgPricePerSqft: 'AED 3,342',
    },
    {
      area: "Me'Aisem Second",
      transactions: 2,
      totalValue: 'AED 30.1M',
      avgPricePerSqft: 'AED 1,786',
    },
    {
      area: 'Marsa Dubai',
      transactions: 1,
      totalValue: 'AED 17.1M',
      avgPricePerSqft: 'AED 5,087',
    },
  ],
  totalTransactions: 96,
  totalValue: 'AED 320.2M',
  lastUpdated: DUBAI_DATASET_LAST_UPDATED,
};

export const DUBAI_KPIS = [
  { label: 'Total Value', value: 'AED 320.2M', sub: '2026 YTD sales value' },
  { label: 'Transactions', value: '96', sub: 'Recorded Dubai sales deals' },
  { label: 'Avg. Ticket', value: 'AED 3.3M', sub: 'Per sale transaction' },
  { label: 'Off-Plan Share', value: '67%', sub: 'Share of YTD sales count' },
  { label: 'Top Brand', value: 'DAMAC', sub: 'AED 53.7M | 16.8% share' },
];

export const DUBAI_DEVELOPERS = [
  { name: 'DAMAC', value: 'AED 53.7M', valueNum: 53.654, pct: 16.8, txns: 15, color: '#dc2626' },
  { name: 'H&H', value: 'AED 40.9M', valueNum: 40.9, pct: 12.8, txns: 2, color: '#378ADD' },
  { name: 'Emaar', value: 'AED 38.7M', valueNum: 38.664, pct: 12.1, txns: 3, color: '#d97706' },
  { name: 'Nakheel', value: 'AED 32.4M', valueNum: 32.404, pct: 10.1, txns: 2, color: '#059669' },
  { name: 'Al Habtoor', value: 'AED 17.1M', valueNum: 17.081, pct: 5.3, txns: 1, color: '#7c3aed' },
  { name: 'Arada', value: 'AED 12.9M', valueNum: 12.85, pct: 4.0, txns: 1, color: '#0d9488' },
  { name: 'Sobha', value: 'AED 11.3M', valueNum: 11.323, pct: 3.5, txns: 3, color: '#ea580c' },
  { name: 'Beyond', value: 'AED 7.0M', valueNum: 7.048, pct: 2.2, txns: 2, color: '#db2777' },
  { name: 'Other / Unspecified', value: 'AED 85.5M', valueNum: 85.507, pct: 26.7, txns: 55, color: '#a1a1aa' },
];

export const DUBAI_AREAS = [
  { rank: 1, area: 'Hadaeq Sheikh Mohammed Bin Rashid', value: 'AED 40.9M', valueNum: 40.9, txns: 2, avg: 'AED 20.5M' },
  { rank: 2, area: 'Al Yelayiss 1', value: 'AED 35.8M', valueNum: 35.815, txns: 11, avg: 'AED 3.3M' },
  { rank: 3, area: 'Palm Jebel Ali', value: 'AED 32.4M', valueNum: 32.404, txns: 2, avg: 'AED 16.2M' },
  { rank: 4, area: "Me'Aisem Second", value: 'AED 30.1M', valueNum: 30.064, txns: 2, avg: 'AED 15.0M' },
  { rank: 5, area: 'Marsa Dubai', value: 'AED 17.1M', valueNum: 17.081, txns: 1, avg: 'AED 17.1M' },
  { rank: 6, area: 'Jumeirah Golf Estates', value: 'AED 12.9M', valueNum: 12.85, txns: 1, avg: 'AED 12.9M' },
  { rank: 7, area: 'DAMAC HILLS', value: 'AED 11.5M', valueNum: 11.462, txns: 1, avg: 'AED 11.5M' },
  { rank: 8, area: 'Palm Deira', value: 'AED 10.9M', valueNum: 10.862, txns: 4, avg: 'AED 2.7M' },
  { rank: 9, area: 'Dubai Maritime City', value: 'AED 9.1M', valueNum: 9.093, txns: 3, avg: 'AED 3.0M' },
  { rank: 10, area: 'Hor Al Anz', value: 'AED 9.0M', valueNum: 9.0, txns: 1, avg: 'AED 9.0M' },
];

export const DUBAI_PROJECTS = [
  { name: 'Eden Hills', developer: 'H&H', location: 'Hadaeq Sheikh Mohammed Bin Rashid', value: 'AED 40.9M', valueNum: 40.9, txns: 2, propType: 'Villa' as const, txnType: 'Secondary' as const },
  { name: 'Mareva The Oasis', developer: 'Emaar', location: "Me'Aisem Second", value: 'AED 30.1M', valueNum: 30.064, txns: 2, propType: 'Villa' as const, txnType: 'Secondary' as const },
  { name: 'Palm Jebel Ali - The Beach and Coral Collection - Frond C', developer: 'Nakheel', location: 'Palm Jebel Ali', value: 'AED 28.0M', valueNum: 27.957, txns: 1, propType: 'Villa' as const, txnType: 'Secondary' as const },
  { name: 'The Residences, Al Habtoor Grand', developer: 'Al Habtoor', location: 'Marsa Dubai', value: 'AED 17.1M', valueNum: 17.081, txns: 1, propType: 'Apartment' as const, txnType: 'Off-Plan' as const },
  { name: 'DAMAC ISLANDS 2 - CUBA', developer: 'DAMAC', location: 'Al Yelayiss 1', value: 'AED 14.4M', valueNum: 14.444, txns: 4, propType: 'Villa' as const, txnType: 'Off-Plan' as const },
  { name: 'Jouri Hills', developer: 'Arada', location: 'Jumeirah Golf Estates', value: 'AED 12.9M', valueNum: 12.85, txns: 1, propType: 'Villa' as const, txnType: 'Secondary' as const },
  { name: 'DAMAC DISTRICT', developer: 'DAMAC', location: 'DAMAC HILLS', value: 'AED 11.5M', valueNum: 11.462, txns: 1, propType: 'Apartment' as const, txnType: 'Off-Plan' as const },
  { name: 'Arabian Ranches - 1', developer: 'Emaar', location: 'Arabian Ranches - 1', value: 'AED 8.6M', valueNum: 8.6, txns: 1, propType: 'Villa' as const, txnType: 'Secondary' as const },
  { name: 'Sobha Reserve', developer: 'Sobha', location: 'Wadi Al Safa 2', value: 'AED 8.0M', valueNum: 8.05, txns: 1, propType: 'Villa' as const, txnType: 'Secondary' as const },
  { name: 'DAMAC ISLANDS 2 - TAHITI 2', developer: 'DAMAC', location: 'Al Yelayiss 1', value: 'AED 6.9M', valueNum: 6.855, txns: 2, propType: 'Villa' as const, txnType: 'Off-Plan' as const },
];

export const DUBAI_UNIT_MIX = [
  { type: '1 B/R', count: 39, pct: 41, color: '#378ADD' },
  { type: 'Studio', count: 18, pct: 19, color: '#d97706' },
  { type: 'Other', count: 15, pct: 16, color: '#64748b' },
  { type: '2 B/R', count: 9, pct: 9, color: '#059669' },
  { type: '4 B/R', count: 8, pct: 8, color: '#dc2626' },
  { type: '3 B/R', count: 4, pct: 4, color: '#7c3aed' },
  { type: '5 B/R+', count: 3, pct: 3, color: '#0d9488' },
];

export const DUBAI_VALUE_SPLIT = [
  { label: 'Apartments', value: 'AED 136.1M', units: '73 deals', pct: '43%', color: '#378ADD' },
  { label: 'Villas', value: 'AED 127.0M', units: '18 deals', pct: '40%', color: '#059669' },
  { label: 'Commercial', value: 'AED 57.1M', units: '5 deals', pct: '18%', color: '#d97706' },
];

export const DUBAI_SIGNALS = [
  {
    title: 'Off-Plan Momentum',
    color: '#378ADD',
    body: 'Off-plan transactions account for 64 of 96 recorded sales, with DAMAC Islands 2 and DAMAC District driving a meaningful share of launch-led turnover in the extract.',
  },
  {
    title: 'Villa Value Concentration',
    color: '#059669',
    body: 'Hadaeq Sheikh Mohammed Bin Rashid, Palm Jebel Ali, and Me\'Aisem Second contribute AED 103.4M combined, showing that a small number of large-ticket villa communities are carrying value.',
  },
  {
    title: 'Apartment Liquidity',
    color: '#d97706',
    body: 'Apartments still dominate depth with 73 of 96 deals. One-bedroom and studio units alone account for 57 transactions, while Jumeirah Village Circle leads repeat activity by count.',
  },
  {
    title: 'Attribution Constraint',
    color: '#64748b',
    body: '26.7% of YTD value remains in an unattributed bucket because the export does not contain a dedicated developer field and brand ownership has to be inferred from project and building names.',
  },
  {
    title: 'Sobha Watch',
    color: '#ea580c',
    body: 'Sobha Reserve appears in the top project set with AED 8.0M from a single villa transaction, keeping Sobha visible in the premium villa segment of the current extract.',
  },
];
