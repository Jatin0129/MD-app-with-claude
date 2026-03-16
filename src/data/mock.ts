// ─── Types ──────────────────────────────────────────────────────────────────

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  changePercent: string;
}

export interface SukukBond {
  name: string;
  price: string;
  ytm: string;
}

export interface Commodity {
  price: string;
  change: string;
}

export interface RealEstateData {
  transactions: string;
  salesValue: string;
  avgPricePerSqft: string;
  newLaunches: string;
  topAreas: { name: string; transactions: string }[];
}

export interface USARealEstateData {
  mortgageRate: string;
  housingSupply: string;
  caseShiller: string;
  metroWatch: string;
}

export interface SobhaSalesData {
  bookings: string;
  unitsSold: string;
  topProject: string;
  leadConversion: string;
}

export interface SobhaCollectionsData {
  collections: string;
  vsTarget: string;
  overdue: string;
  ageingRisk: string;
}

export interface SobhaDevelopmentData {
  milestonesDue: string;
  onTimePercent: string;
  delayed: string;
  criticalPath: string;
}

export interface SobhaConstructionData {
  overallProgress: string;
  costVariance: string;
  contractorsActive: string;
  siteProductivity: string;
}

export interface PortfolioData {
  totalValue: string;
  allocation: { sukuk: string; gold: string; equities: string; other: string };
  ytdReturn: string;
  benchmark: string;
}

export interface Alert {
  type: 'amber' | 'red' | 'green';
  text: string;
}

export interface ReportItem {
  name: string;
  type: string;
  date: string;
}

export interface DocumentItem {
  category: string;
  name: string;
  date: string;
}

export interface SocialPlatform {
  platform: string;
  description: string;
  sentiment: string;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

export const marketIndices: MarketIndex[] = [
  { name: 'DFM General', value: '4,287.53', change: '+42.18', changePercent: '+0.99%' },
  { name: 'DFM Real Estate', value: '5,124.67', change: '+67.32', changePercent: '+1.33%' },
  { name: 'ADX General', value: '9,412.80', change: '-28.45', changePercent: '-0.30%' },
  { name: 'S&P 500', value: '5,667.20', change: '+18.92', changePercent: '+0.33%' },
  { name: 'Nasdaq', value: '17,842.50', change: '+124.30', changePercent: '+0.70%' },
];

export const sukukBonds: SukukBond[] = [
  { name: 'Sobha Sukuk 2028', price: '98.75', ytm: '5.82%' },
  { name: 'Emaar Sukuk 2029', price: '101.20', ytm: '5.14%' },
  { name: 'Aldar Sukuk 2027', price: '99.45', ytm: '5.38%' },
  { name: 'US 10Y Treasury', price: '96.80', ytm: '4.25%' },
];

export const commodities: { gold: Commodity; brent: Commodity } = {
  gold: { price: '$2,342.50', change: '+1.2%' },
  brent: { price: '$82.40', change: '-0.8%' },
};

export const dubaiRealEstate: RealEstateData = DUBAI_REAL_ESTATE_OVERVIEW;

export const abudhabiRealEstate: RealEstateData = {
  transactions: '5,820',
  salesValue: 'AED 18.2B',
  avgPricePerSqft: 'AED 1,120',
  newLaunches: '12',
  topAreas: [
    { name: 'Yas Island', transactions: '824' },
    { name: 'Saadiyat Island', transactions: '712' },
    { name: 'Al Reem Island', transactions: '643' },
    { name: 'Al Raha Beach', transactions: '421' },
  ],
};

export const usaRealEstate: USARealEstateData = {
  mortgageRate: '6.87%',
  housingSupply: '3.4 months',
  caseShiller: '+5.2% YoY',
  metroWatch: 'Miami and Austin leading price growth. NYC inventory tightening. Texas markets showing resilience despite rate pressure.',
};

export const sobhaSales: SobhaSalesData = {
  bookings: 'AED 1.24B',
  unitsSold: '342',
  topProject: 'Sobha Hartland II',
  leadConversion: '12.8%',
};

export const sobhaCollections: SobhaCollectionsData = {
  collections: 'AED 890M',
  vsTarget: '94%',
  overdue: 'AED 42M',
  ageingRisk: 'Moderate',
};

export const sobhaDevelopment: SobhaDevelopmentData = {
  milestonesDue: '18',
  onTimePercent: '87%',
  delayed: '3',
  criticalPath: 'Creek Vistas Phase 2',
};

export const sobhaConstruction: SobhaConstructionData = {
  overallProgress: '72%',
  costVariance: '-2.1%',
  contractorsActive: '48',
  siteProductivity: '93%',
};

export const portfolio: PortfolioData = {
  totalValue: '$28.4M',
  allocation: { sukuk: '38%', gold: '21%', equities: '29%', other: '12%' },
  ytdReturn: '+8.4%',
  benchmark: '+6.2%',
};

export const alerts: Alert[] = [
  { type: 'red', text: 'Collections shortfall: AED 42M overdue receivables require follow-up with 3 major buyers' },
  { type: 'amber', text: 'Creek Vistas Phase 2 delayed by 12 days — contractor mobilisation pending' },
  { type: 'green', text: 'Sobha Hartland II exceeded monthly booking target by 18%' },
  { type: 'amber', text: 'DFM Real Estate Index approaching resistance level — monitor for correction' },
];

export const executiveBrief: string[] = [
  'Bookings momentum strong: AED 1.24B MTD with Hartland II leading at 18% above target',
  'Collections at 94% of target — 3 overdue accounts flagged for escalation this week',
  'Creek Vistas Phase 2 critical path delayed 12 days; mitigation plan under review',
];

export const reportLibrary: ReportItem[] = [
  { name: 'Monthly Sales Dashboard', type: 'Excel', date: 'Mar 2026' },
  { name: 'Q1 Board Presentation', type: 'PowerPoint', date: 'Mar 2026' },
  { name: 'Collections Ageing Report', type: 'PDF', date: 'Mar 2026' },
  { name: 'Construction Progress Update', type: 'PDF', date: 'Feb 2026' },
  { name: 'Market Intelligence Brief', type: 'PDF', date: 'Feb 2026' },
];

export const documents: DocumentItem[] = [
  { category: 'Board presentations', name: 'Q1 2026 Board Deck', date: 'Mar 2026' },
  { category: 'Board presentations', name: 'AGM Materials', date: 'Feb 2026' },
  { category: 'MIS reports', name: 'Monthly MIS — February', date: 'Feb 2026' },
  { category: 'MIS reports', name: 'Monthly MIS — January', date: 'Jan 2026' },
  { category: 'Strategy notes', name: 'UAE Market Entry Strategy', date: 'Mar 2026' },
  { category: 'Strategy notes', name: 'Competitive Landscape Review', date: 'Jan 2026' },
  { category: 'Project reports', name: 'Hartland II Progress', date: 'Mar 2026' },
  { category: 'Project reports', name: 'Creek Vistas Update', date: 'Feb 2026' },
];

export const socialPlatforms: SocialPlatform[] = [
  { platform: 'LinkedIn', description: 'Corporate updates, leadership thought pieces', sentiment: 'Positive' },
  { platform: 'X / Twitter', description: 'Market commentary, industry engagement', sentiment: 'Neutral' },
  { platform: 'YouTube', description: 'Project walkthroughs, brand content', sentiment: 'Positive' },
  { platform: 'Instagram', description: 'Lifestyle and property showcases', sentiment: 'Positive' },
];

// ─── AI Insights (per screen) ───────────────────────────────────────────────

export const aiInsights = {
  home: 'Sobha Hartland II is outperforming targets by 18%. Collections require immediate attention — 3 accounts overdue beyond 90 days. Construction on Creek Vistas Phase 2 needs escalation to avoid further slippage.',
  markets: 'DFM Real Estate Index has gained 1.33% today, driven by increased transaction volumes. Gold remains a strong hedge at $2,342. US Treasury yields are stabilising, which could support emerging market flows into UAE real estate.',
  dubaiRE: DUBAI_DATASET_AI_INSIGHT,
  abuDhabiRE: 'Abu Dhabi transactions growing steadily with Yas Island leading. Saadiyat Island premium segment showing 15% price appreciation. Government initiatives driving non-oil sector growth supporting real estate demand.',
  usaRE: "US mortgage rates at 6.87% continue to constrain volume but prices remain supported by low inventory. Miami luxury segment relevant for Sobha's international buyer base. Case-Shiller index up 5.2% YoY.",
  sobhaSales: 'Strong booking momentum at AED 1.24B MTD. Hartland II conversion rate at 12.8% — above company average. Consider reallocating marketing spend from underperforming projects to Hartland II and Siniya Island.',
  sobhaCollections: 'Collections at 94% of target. Three accounts represent 65% of overdue amount — recommend direct engagement at MD level. Ageing risk rated moderate but trending toward elevated.',
  sobhaDevelopment: 'Creek Vistas Phase 2 is on critical path with 12-day delay. 87% milestone on-time rate is below 90% target. Recommend weekly progress review for delayed projects.',
  sobhaConstruction: 'Overall construction progress at 72% is on track. Cost variance at -2.1% suggests potential savings. Site productivity at 93% — strong performance. 48 active contractors across all sites.',
  intel: 'Emaar announced 3 new residential launches in Dubai Hills Estate. Aldar expanding Yas Island portfolio with a AED 2.5B mixed-use development. Regional geopolitical stability supporting investor confidence in UAE markets.',
  personal: 'Your portfolio is outperforming benchmark by 220 bps YTD. Sukuk allocation providing stable income. Consider rebalancing gold position given current price levels. Equities contributing most to outperformance.',
  social: 'LinkedIn engagement up 24% on recent Hartland II launch posts. YouTube walkthrough videos generating strong lead pipeline. Instagram reaching new audience segments in the 28-40 age bracket.',
};
import {
  DUBAI_DATASET_AI_INSIGHT,
  DUBAI_REAL_ESTATE_OVERVIEW,
} from './dubaiTransactionsDataset';
