export interface CollectionProject {
  name: string;
  d0_30: number | null;
  d31_60: number | null;
  d61_90: number | null;
  d91_120: number | null;
  d121_180: number | null;
  d181_360: number | null;
  d361plus: number | null;
  total: number;
}

export interface AgeingBucket {
  label: string;
  amount: number;
  color: string;
}

export interface EscrowRow {
  name: string;
  amount: string;
  amountNum: number;
}

export interface DailyCollectionsData {
  totalOverdue: string;
  totalOverdueProjects: string;
  bucket0_30: string;
  bucket0_30Note: string;
  bucket121_360: string;
  bucket121_360Note: string;
  bucket361plus: string;
  bucket361plusNote: string;
  ageing: AgeingBucket[];
  ageingTotal: number;
  projects: CollectionProject[];
  totals: CollectionProject;
  escrow: {
    date: string;
    totalLabel: string;
    rows: EscrowRow[];
    footer: string;
  };
}

function cp(
  name: string,
  d0: number | null, d31: number | null, d61: number | null,
  d91: number | null, d121: number | null, d181: number | null,
  d361: number | null, total: number,
): CollectionProject {
  return { name, d0_30: d0, d31_60: d31, d61_90: d61, d91_120: d91, d121_180: d121, d181_360: d181, d361plus: d361, total };
}

export const dailyCollectionsData: DailyCollectionsData = {
  totalOverdue: 'AED 1.424B',
  totalOverdueProjects: '16 projects',
  bucket0_30: 'AED 342.8M',
  bucket0_30Note: 'just due',
  bucket121_360: 'AED 423.4M',
  bucket121_360Note: 'high risk bucket',
  bucket361plus: 'AED 216.0M',
  bucket361plusNote: 'critical \u2014 escalate',
  ageing: [
    { label: '0\u201330d', amount: 342.8, color: '#059669' },
    { label: '31\u201360d', amount: 310.3, color: '#18181b' },
    { label: '61\u201390d', amount: 97.6, color: '#d97706' },
    { label: '91\u2013120d', amount: 34.2, color: '#d97706' },
    { label: '121\u2013180d', amount: 166.6, color: '#dc2626' },
    { label: '181\u2013360d', amount: 256.9, color: '#dc2626' },
    { label: '>361d', amount: 216.0, color: '#7f1d1d' },
  ],
  ageingTotal: 1424.4,
  projects: [
    cp('Sobha Hartland II', 131.3, 85.2, 36.5, 7.0, 47.6, 65.5, 47.1, 420.2),
    cp('Sobha Hartland', 7.5, 159.9, 10.5, 6.7, 2.1, 24.5, 76.6, 287.8),
    cp('Sobha One', 33.8, 20.6, 8.0, 3.0, 14.7, 41.1, 28.9, 150.1),
    cp('Sobha SeaHaven', 35.9, 8.5, 15.6, 5.3, 22.7, 24.6, 20.8, 133.5),
    cp('Sobha Reserve', 22.0, 7.0, 3.6, 2.5, 13.7, 32.1, 23.7, 104.5),
    cp('The S', null, null, null, null, 36.2, 32.6, null, 68.9),
    cp('Sobha Orbis', 9.7, 6.1, 11.3, 3.7, 10.2, 11.0, 4.9, 56.8),
    cp('Sobha Central', 33.6, 5.4, 2.0, 0.7, 2.1, 2.4, null, 46.2),
    cp('Sobha Elwood', 16.9, 2.2, 1.7, 1.2, 6.7, 10.2, 4.3, 43.2),
    cp('Sobha Sanctuary', 27.9, 4.2, null, null, null, null, null, 32.1),
    cp('Verde By Sobha', 9.7, 1.5, 3.5, 2.7, 2.4, 6.0, 5.4, 31.2),
    cp('Sobha Solis', 10.1, 5.9, 4.5, 1.4, 5.1, 3.3, 0.4, 30.7),
    cp('Sobha Skyparks', 3.6, 2.7, 0.2, null, 0.6, null, null, 7.2),
    cp('H2 Villas', null, null, null, null, 2.4, 3.6, null, 6.0),
    cp('Hartland Extension', null, null, null, null, null, null, 4.0, 4.0),
    cp('Sobha Central Mall', 0.9, 1.2, null, null, null, null, null, 2.1),
  ],
  totals: cp('TOTAL', 342.8, 310.3, 97.6, 34.2, 166.6, 256.9, 216.0, 1424.4),
  escrow: {
    date: '28 Feb 2026',
    totalLabel: 'AED 5.068B total',
    rows: [
      { name: 'Sobha SeaHaven A + B', amount: 'AED 925.1M', amountNum: 925.1 },
      { name: 'Sobha Orbis (DIB)', amount: 'AED 679.1M', amountNum: 679.1 },
      { name: 'Skyvue (DIB)', amount: 'AED 412.4M', amountNum: 412.4 },
      { name: 'Sobha Solis (ADCB)', amount: 'AED 388.7M', amountNum: 388.7 },
      { name: '360 Riverside (ENBD)', amount: 'AED 207.9M', amountNum: 207.9 },
      { name: '310 Riverside (ENBD)', amount: 'AED 192.8M', amountNum: 192.8 },
      { name: 'Elwood Estates (FAB)', amount: 'AED 186.8M', amountNum: 186.8 },
      { name: 'Creek Vista Heights (DIB)', amount: 'AED 155.5M', amountNum: 155.5 },
      { name: 'Verde by Sobha (ENBD)', amount: 'AED 148.9M', amountNum: 148.9 },
      { name: 'Sobha One (DIB + Mashreq)', amount: 'AED 98.7M', amountNum: 98.7 },
      { name: 'All others', amount: 'AED 440.9M', amountNum: 440.9 },
    ],
    footer: 'RERA Deposit: AED 618.3M \u00b7 Retention: AED 16.6M \u00b7 Main A/c: AED 4.433B',
  },
};
