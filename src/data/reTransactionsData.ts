export type PropType = 'Apartment' | 'Villa' | 'Townhouse' | 'Commercial';
export type TxnType = 'Off-Plan' | 'Secondary';

export interface DeveloperRow {
  name: string;
  value: string;
  valueNum: number;
  pct: number;
  txns: number;
  color: string;
  propTypes?: PropType[];
  txnTypes?: TxnType[];
}

export interface AreaRow {
  rank: number;
  area: string;
  value: string;
  valueNum: number;
  txns: number;
  avg: string;
  propTypes?: PropType[];
  txnTypes?: TxnType[];
}

export interface ProjectRow {
  name: string;
  developer: string;
  location: string;
  value: string;
  valueNum: number;
  txns: number;
  propType?: PropType;
  txnType?: TxnType;
}

export interface UnitMixRow {
  type: string;
  count: number;
  pct: number;
  color: string;
}

export interface MarketSignal {
  title: string;
  color: string;
  body: string;
}

export interface MarketKPIs {
  label: string;
  value: string;
  sub: string;
}

export interface ValueSplit {
  label: string;
  value: string;
  units: string;
  pct: string;
  color: string;
}

export interface MetroRow {
  city: string;
  medianPrice: string;
  yoyChange: string;
  changeColor: string;
  inventory: string;
  temp: string;
}

const BAR_COLORS = {
  red: '#dc2626',
  blue: '#378ADD',
  amber: '#d97706',
  green: '#059669',
  purple: '#7c3aed',
  teal: '#0d9488',
  orange: '#ea580c',
  pink: '#db2777',
  lime: '#65a30d',
  slate: '#64748b',
  muted: '#a1a1aa',
};

export {
  DUBAI_KPIS,
  DUBAI_DEVELOPERS,
  DUBAI_AREAS,
  DUBAI_PROJECTS,
  DUBAI_UNIT_MIX,
  DUBAI_VALUE_SPLIT,
  DUBAI_SIGNALS,
} from './dubaiTransactionsDataset';

export const ABU_DHABI_KPIS: MarketKPIs[] = [
  { label: 'Total Value', value: 'AED 18.2B', sub: 'YTD transaction volume' },
  { label: 'Transactions', value: '5,820', sub: 'Registered sales YTD' },
  { label: 'Avg. Price', value: 'AED 3.1M', sub: 'Per transaction' },
  { label: 'Active Projects', value: '85+', sub: 'Across key islands & mainland' },
  { label: 'Top Developer', value: 'Aldar', sub: 'AED 6.8B | 37% share' },
];

export const ABU_DHABI_DEVELOPERS: DeveloperRow[] = [
  { name: 'Aldar Properties', value: 'AED 6.8B', valueNum: 6800, pct: 37.4, txns: 2180, color: BAR_COLORS.blue },
  { name: 'Bloom Holding', value: 'AED 2.1B', valueNum: 2100, pct: 11.5, txns: 680, color: BAR_COLORS.green },
  { name: 'Imkan', value: 'AED 1.4B', valueNum: 1400, pct: 7.7, txns: 420, color: BAR_COLORS.amber },
  { name: 'Reportage Properties', value: 'AED 1.1B', valueNum: 1100, pct: 6.0, txns: 510, color: BAR_COLORS.purple },
  { name: 'Eagle Hills', value: 'AED 980M', valueNum: 980, pct: 5.4, txns: 310, color: BAR_COLORS.teal },
  { name: 'Modon', value: 'AED 720M', valueNum: 720, pct: 4.0, txns: 240, color: BAR_COLORS.orange },
  { name: 'TDIC', value: 'AED 640M', valueNum: 640, pct: 3.5, txns: 180, color: BAR_COLORS.slate },
  { name: 'Other', value: 'AED 4.5B', valueNum: 4500, pct: 24.5, txns: 1300, color: BAR_COLORS.muted },
];

export const ABU_DHABI_AREAS: AreaRow[] = [
  { rank: 1, area: 'Yas Island', value: 'AED 4.2B', valueNum: 4200, txns: 824, avg: 'AED 5.1M' },
  { rank: 2, area: 'Saadiyat Island', value: 'AED 3.8B', valueNum: 3800, txns: 712, avg: 'AED 5.3M' },
  { rank: 3, area: 'Al Reem Island', value: 'AED 2.6B', valueNum: 2600, txns: 643, avg: 'AED 4.0M' },
  { rank: 4, area: 'Al Raha Beach', value: 'AED 1.8B', valueNum: 1800, txns: 421, avg: 'AED 4.3M' },
  { rank: 5, area: 'Masdar City', value: 'AED 1.2B', valueNum: 1200, txns: 380, avg: 'AED 3.2M' },
  { rank: 6, area: 'Al Maryah Island', value: 'AED 1.1B', valueNum: 1100, txns: 290, avg: 'AED 3.8M' },
  { rank: 7, area: 'Khalifa City', value: 'AED 860M', valueNum: 860, txns: 420, avg: 'AED 2.0M' },
  { rank: 8, area: 'Al Shamkha', value: 'AED 640M', valueNum: 640, txns: 380, avg: 'AED 1.7M' },
];

export const ABU_DHABI_PROJECTS: ProjectRow[] = [
  { name: 'Saadiyat Reserve', developer: 'Aldar', location: 'Saadiyat Island', value: 'AED 1.8B', valueNum: 1800, txns: 320, propType: 'Villa', txnType: 'Off-Plan' },
  { name: 'Yas Park Views', developer: 'Aldar', location: 'Yas Island', value: 'AED 1.2B', valueNum: 1200, txns: 410, propType: 'Apartment', txnType: 'Off-Plan' },
  { name: 'Bloom Living', developer: 'Bloom Holding', location: 'Zayed City', value: 'AED 980M', valueNum: 980, txns: 290, propType: 'Townhouse', txnType: 'Off-Plan' },
  { name: 'Makers District', developer: 'Imkan', location: 'Al Reem Island', value: 'AED 720M', valueNum: 720, txns: 180, propType: 'Apartment', txnType: 'Off-Plan' },
  { name: 'Ramhan Island', developer: 'Eagle Hills', location: 'Ramhan', value: 'AED 640M', valueNum: 640, txns: 160, propType: 'Villa', txnType: 'Off-Plan' },
  { name: 'Jubail Island', developer: 'Jubail Island Inv.', location: 'Jubail', value: 'AED 520M', valueNum: 520, txns: 140, propType: 'Villa', txnType: 'Off-Plan' },
];

export const ABU_DHABI_UNIT_MIX: UnitMixRow[] = [
  { type: '2 B/R', count: 1520, pct: 26, color: BAR_COLORS.green },
  { type: '1 B/R', count: 1340, pct: 23, color: BAR_COLORS.blue },
  { type: '3 B/R', count: 1050, pct: 18, color: BAR_COLORS.purple },
  { type: 'Studio', count: 870, pct: 15, color: BAR_COLORS.amber },
  { type: '4 B/R', count: 640, pct: 11, color: BAR_COLORS.red },
  { type: '5 B/R+', count: 400, pct: 7, color: BAR_COLORS.teal },
];

export const ABU_DHABI_SIGNALS: MarketSignal[] = [
  {
    title: 'Aldar Dominance',
    color: BAR_COLORS.blue,
    body: 'Aldar continues to command 37% market share, driven by Saadiyat Reserve and Yas Island mega-developments with strong off-plan absorption.',
  },
  {
    title: 'Island Premium Rising',
    color: BAR_COLORS.green,
    body: 'Saadiyat and Yas Island transactions averaging AED 5M+, a 12% YoY increase reflecting growing international buyer interest post-Golden Visa expansion.',
  },
  {
    title: 'Affordable Corridor Growth',
    color: BAR_COLORS.amber,
    body: 'Khalifa City and Al Shamkha drive volume with sub-AED 2M average tickets, indicating strong mid-market demand from end-users and first-time buyers.',
  },
];

export const USA_KPIS: MarketKPIs[] = [
  { label: 'Mortgage Rate', value: '6.87%', sub: '30-year fixed average' },
  { label: 'Housing Supply', value: '3.4 mo', sub: 'Months of inventory' },
  { label: 'Case-Shiller', value: '+5.2%', sub: 'National YoY change' },
  { label: 'Housing Starts', value: '1.42M', sub: 'Annualized (SAAR)' },
  { label: 'Median Price', value: '$412K', sub: 'Existing home sales' },
];

export const USA_METROS: MetroRow[] = [
  { city: 'Miami', medianPrice: '$612K', yoyChange: '+8.4%', changeColor: BAR_COLORS.green, inventory: '2.1 mo', temp: 'Hot' },
  { city: 'Austin', medianPrice: '$485K', yoyChange: '+6.2%', changeColor: BAR_COLORS.green, inventory: '3.8 mo', temp: 'Warm' },
  { city: 'New York', medianPrice: '$780K', yoyChange: '+3.1%', changeColor: BAR_COLORS.green, inventory: '2.4 mo', temp: 'Hot' },
  { city: 'Los Angeles', medianPrice: '$895K', yoyChange: '+4.8%', changeColor: BAR_COLORS.green, inventory: '2.0 mo', temp: 'Hot' },
  { city: 'Dallas', medianPrice: '$385K', yoyChange: '+5.6%', changeColor: BAR_COLORS.green, inventory: '3.2 mo', temp: 'Warm' },
  { city: 'Phoenix', medianPrice: '$432K', yoyChange: '+7.1%', changeColor: BAR_COLORS.green, inventory: '2.8 mo', temp: 'Warm' },
  { city: 'Seattle', medianPrice: '$725K', yoyChange: '+2.3%', changeColor: BAR_COLORS.green, inventory: '1.9 mo', temp: 'Hot' },
  { city: 'Denver', medianPrice: '$548K', yoyChange: '-1.2%', changeColor: BAR_COLORS.red, inventory: '4.1 mo', temp: 'Cool' },
];

export const USA_SIGNALS: MarketSignal[] = [
  {
    title: 'Rate Environment',
    color: BAR_COLORS.red,
    body: 'The 30-year fixed rate at 6.87% continues to suppress transaction volumes. Refinance activity remains muted, keeping existing homeowners locked in at lower rates.',
  },
  {
    title: 'Supply Dynamics',
    color: BAR_COLORS.blue,
    body: 'National inventory at 3.4 months remains well below the 6-month balanced market threshold. New construction starts are trending upward but insufficient to close the gap.',
  },
  {
    title: 'Sunbelt Momentum',
    color: BAR_COLORS.green,
    body: 'Miami (+8.4%) and Phoenix (+7.1%) lead price appreciation driven by domestic migration, international capital inflows, and favorable tax environments.',
  },
  {
    title: 'Cooling Signals',
    color: BAR_COLORS.amber,
    body: 'Denver shows the first negative YoY print (-1.2%) among major metros. Austin inventory at 3.8 months is approaching balanced territory after rapid 2023-24 supply expansion.',
  },
  {
    title: 'Affordability Crisis',
    color: BAR_COLORS.red,
    body: 'National median at $412K with 6.87% rates means a typical monthly payment of $2,160, requiring household income of roughly $103K. Only 38% of renter households qualify.',
  },
];

export { DUBAI_DATASET_DATE_RANGE as DEFAULT_DATE_RANGE } from './dubaiTransactionsDataset';
