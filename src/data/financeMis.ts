export type FinanceInsightTone = 'neutral' | 'green' | 'amber' | 'red' | 'blue';

export interface FinanceInsight {
  text: string;
  tone?: FinanceInsightTone;
}

export interface FinanceKPI {
  label: string;
  value: string;
  sublabel?: string;
  tone?: FinanceInsightTone;
}

export interface IncomeStatementRow {
  label: string;
  plannedFY26: number | null;
  plannedYtd: number | null;
  actualYtd: number | null;
  revenuePct: string;
  emphasis?: 'detail' | 'subtotal' | 'total' | 'grand';
  indent?: boolean;
}

export interface OverheadLineItem {
  description: string;
  budgetYtd: number;
  actualYtd: number;
}

export interface OverheadTotalItem extends OverheadLineItem {
  emphasis?: 'subtotal' | 'total' | 'grand' | 'exception';
}

export interface InventoryProject {
  project: string;
  community: string;
  topline: number;
  sales: number;
  soldPct: number;
  ratePerSft: number;
}

export interface CustomerDueProject {
  project: string;
  bucket0To30: number;
  bucket31To60: number;
  bucket61To90: number;
  bucket91To120: number;
  bucket121To180: number;
  bucket181To360: number;
  bucketOver360: number;
}

export const incomeStatementKpis: FinanceKPI[] = [
  {
    label: 'Revenue YTD Feb 26',
    value: 'AED 17.5B',
    sublabel: 'FY26 plan AED 30.0B',
  },
  {
    label: 'Gross profit %',
    value: '43.97%',
    sublabel: 'After brokerage and direct costs',
    tone: 'green',
  },
  {
    label: 'Net profit after tax',
    value: 'AED 530.9M',
    sublabel: '25.18% of revenue',
    tone: 'green',
  },
  {
    label: 'Net profit incl. JVs',
    value: 'AED 558.2M',
    sublabel: '26.48% of revenue',
    tone: 'green',
  },
  {
    label: 'Finance cost YTD',
    value: 'AED 116.6M',
    sublabel: '5.53% of revenue',
    tone: 'amber',
  },
];

export const incomeStatementInsights: FinanceInsight[] = [
  { text: 'Net profit incl. JVs at AED 558.2M.', tone: 'green' },
  {
    text: 'Finance cost and overhead blocks remain clearly separated for cleaner scanning.',
    tone: 'amber',
  },
  {
    text: 'The page keeps profitability lines visually prominent and lighter than the heavier earlier build.',
    tone: 'blue',
  },
];

export const incomeStatementRows: IncomeStatementRow[] = [
  { label: 'Revenue', plannedFY26: 30000000000, plannedYtd: 5000000000, actualYtd: 2909328249, revenuePct: '100.00%', emphasis: 'subtotal' },
  { label: 'Cost of revenue', plannedFY26: null, plannedYtd: null, actualYtd: -1030236623, revenuePct: '-48.87%', indent: true },
  { label: 'Gross profit before brokerage', plannedFY26: null, plannedYtd: 1455245907, actualYtd: 1077841689, revenuePct: '51.13%', emphasis: 'subtotal' },
  { label: 'Brokerage / commission / fees', plannedFY26: null, plannedYtd: null, actualYtd: -116999550, revenuePct: '-5.55%', indent: true },
  { label: 'Staff incentive', plannedFY26: null, plannedYtd: null, actualYtd: -26903251, revenuePct: '-1.28%', indent: true },
  { label: 'DLD, service charge rebate and collection charges', plannedFY26: 8640000, plannedYtd: 1440000, actualYtd: -7078054, revenuePct: '-0.34%', indent: true },
  { label: 'Total brokerage, incentives and direct costs', plannedFY26: -1249513353, plannedYtd: -208252226, actualYtd: -150980856, revenuePct: '-7.16%', emphasis: 'total' },
  { label: 'Gross profit', plannedFY26: 7481962086, plannedYtd: 1246993681, actualYtd: 926860833, revenuePct: '43.97%', emphasis: 'subtotal' },
  { label: 'General and admin expenses and manpower', plannedFY26: -683396520, plannedYtd: -117699420, actualYtd: -84162341, revenuePct: '-3.99%', indent: true },
  { label: 'Salaries - ex-gratia', plannedFY26: -20000000, plannedYtd: -3333333, actualYtd: -5396073, revenuePct: '-0.26%', indent: true },
  { label: 'Depreciation and amortisation', plannedFY26: -30552313, plannedYtd: -5092052, actualYtd: -3417061, revenuePct: '-0.16%', indent: true },
  { label: 'Miscellaneous expenses', plannedFY26: -30000000, plannedYtd: -5000000, actualYtd: -1501752, revenuePct: '-0.07%', indent: true },
  { label: 'Total general overheads', plannedFY26: -763948833, plannedYtd: -131124805, actualYtd: -94477227, revenuePct: '-4.48%', emphasis: 'total' },
  { label: 'Marketing and selling expenses', plannedFY26: -66698667, plannedYtd: -400192000, actualYtd: -68396543, revenuePct: '-3.24%', indent: true },
  { label: 'Interest on bank debts', plannedFY26: -780000000, plannedYtd: -130000000, actualYtd: -114700148, revenuePct: '-5.44%', indent: true },
  { label: 'Fund raising and consultant expenses', plannedFY26: -53000000, plannedYtd: -8833333, actualYtd: -1867300, revenuePct: '-0.09%', indent: true },
  { label: 'Total finance cost', plannedFY26: -833000000, plannedYtd: -138833333, actualYtd: -116567448, revenuePct: '-5.53%', emphasis: 'total' },
  { label: 'Shareholder royalty expense', plannedFY26: -172000000, plannedYtd: -28666667, actualYtd: -19535232, revenuePct: '-0.93%', indent: true },
  { label: 'Total interest income on FD and accounts', plannedFY26: 279212505, plannedYtd: 46535418, actualYtd: 25760819, revenuePct: '1.22%', indent: true },
  { label: 'Total overheads', plannedFY26: -1929928328, plannedYtd: -325454721, actualYtd: -279282025, revenuePct: '-13.25%', emphasis: 'total' },
  { label: 'Net profit before other items', plannedFY26: 5552033758, plannedYtd: 921538960, actualYtd: 647578808, revenuePct: '30.72%', emphasis: 'subtotal' },
  { label: 'Charity and donation', plannedFY26: -115325000, plannedYtd: -19491667, actualYtd: -19491667, revenuePct: '-0.92%', indent: true },
  { label: 'Management bonus FY26', plannedFY26: -131812333, plannedYtd: -21968722, actualYtd: -21968724, revenuePct: '-1.04%', indent: true },
  { label: 'Staff bonus FY26', plannedFY26: -57806197, plannedYtd: -9634366, actualYtd: -9789708, revenuePct: '-0.46%', indent: true },
  { label: 'Management bonus FY25', plannedFY26: null, plannedYtd: null, actualYtd: -12947602, revenuePct: '-0.61%', indent: true },
  { label: 'Net profit before tax', plannedFY26: 5247090228, plannedYtd: 870444205, actualYtd: 583381107, revenuePct: '27.67%', emphasis: 'subtotal' },
  { label: 'FY2025 tax provision', plannedFY26: -472204370, plannedYtd: -78306228, actualYtd: -52470550, revenuePct: '-2.49%', indent: true },
  { label: 'Net profit after tax', plannedFY26: 4774885857, plannedYtd: 792137976, actualYtd: 530910558, revenuePct: '25.18%', emphasis: 'subtotal' },
  { label: 'Share of profit - Al Siniya JV', plannedFY26: 623862383, plannedYtd: 103977064, actualYtd: 25606043, revenuePct: '', indent: true },
  { label: 'Share of profit - UAQ Downtown JV', plannedFY26: 68648160, plannedYtd: 11441360, actualYtd: 1667665, revenuePct: '', indent: true },
  { label: 'Net profit after tax (incl. JVs)', plannedFY26: 5467396400, plannedYtd: 907556400, actualYtd: 558184265, revenuePct: '26.48%', emphasis: 'grand' },
];

export const overheadKpis: FinanceKPI[] = [
  { label: 'Budget YTD Feb 26', value: 'AED 402.1M' },
  { label: 'Actual YTD', value: 'AED 349.6M', sublabel: 'Under by AED 52.4M', tone: 'green' },
  { label: 'G&A + manpower', value: 'AED 84.2M', sublabel: 'Budget AED 117.7M', tone: 'green' },
  { label: 'Finance cost', value: 'AED 97.0M', sublabel: 'Under budget AED 20.9M', tone: 'green' },
  { label: 'Charity and bonus', value: 'AED 64.2M', sublabel: 'Over budget AED 13.1M', tone: 'red' },
];

export const overheadInsights: FinanceInsight[] = [
  { text: 'Overall overhead run-rate is below budget.', tone: 'green' },
  { text: 'Charity and bonus should stay separated as an exception block.', tone: 'red' },
  { text: 'A future version can support drill-down by category.', tone: 'amber' },
];

export const overheadLineItems: OverheadLineItem[] = [
  { description: 'General use - vehicles', budgetYtd: 4456617, actualYtd: 505610 },
  { description: 'Rental charges', budgetYtd: 6538111, actualYtd: 178345 },
  { description: 'Travelling and accommodation', budgetYtd: 15341960, actualYtd: 1630903 },
  { description: 'Telephone and internet', budgetYtd: 3417330, actualYtd: 570945 },
  { description: 'Postage and courier', budgetYtd: 367600, actualYtd: 80497 },
  { description: 'Printing and stationery', budgetYtd: 593779, actualYtd: 90838 },
  { description: 'Gifts', budgetYtd: 2879200, actualYtd: 43247 },
  { description: 'Registration and renewals', budgetYtd: 3170985, actualYtd: 248998 },
  { description: 'Staff welfare', budgetYtd: 9478970, actualYtd: 1918388 },
  { description: 'Software and licensing cost', budgetYtd: 40809081, actualYtd: 7205733 },
  { description: 'Audit fees', budgetYtd: 1200000, actualYtd: 153820 },
  { description: 'Legal and professional fees', budgetYtd: 13593500, actualYtd: 1969053 },
  { description: 'DEWA / fuel charges', budgetYtd: 1534928, actualYtd: 167450 },
  { description: 'Recruitment expenses', budgetYtd: 1853954, actualYtd: 85792 },
  { description: 'Maintenance expenses', budgetYtd: 8133325, actualYtd: 779474 },
  { description: 'Security charges', budgetYtd: 4478827, actualYtd: 711103 },
  { description: 'Training fees', budgetYtd: 11177874, actualYtd: 347849 },
  { description: 'Sales village maintenance', budgetYtd: 4830416, actualYtd: 771529 },
  { description: 'Handover expenses', budgetYtd: 5626617, actualYtd: 624840 },
  { description: 'Employee excellence awards', budgetYtd: 5000000, actualYtd: 4817930 },
  { description: 'Emirates Hills maintenance', budgetYtd: 7851273, actualYtd: 152545 },
  { description: 'Management consultancy fees', budgetYtd: 2650183, actualYtd: 416147 },
  { description: 'Shared services overhead', budgetYtd: 6058516, actualYtd: 1178513 },
];

export const overheadTotalItems: OverheadTotalItem[] = [
  { description: 'G&A overheads total', budgetYtd: 32710020, actualYtd: 26502793, emphasis: 'subtotal' },
  { description: 'Manpower expenses total', budgetYtd: 99402399, actualYtd: 72072549, emphasis: 'subtotal' },
  { description: 'Corporate cost allocation', budgetYtd: -14412999, actualYtd: -14413002, emphasis: 'subtotal' },
  { description: 'G&A + manpower (D)', budgetYtd: 117699420, actualYtd: 84162341, emphasis: 'total' },
  { description: 'Finance cost total', budgetYtd: 117833333, actualYtd: 96974775, emphasis: 'subtotal' },
  { description: 'Marketing and selling total', budgetYtd: 66698667, actualYtd: 68396543, emphasis: 'subtotal' },
  { description: 'Aircraft total', budgetYtd: 6666667, actualYtd: 6066394, emphasis: 'subtotal' },
  { description: 'Depreciation total', budgetYtd: 5092052, actualYtd: 3417061, emphasis: 'subtotal' },
  { description: 'Miscellaneous total', budgetYtd: 37000000, actualYtd: 26433057, emphasis: 'subtotal' },
  { description: 'Total overhead cost', budgetYtd: 350990139, actualYtd: 285450170, emphasis: 'total' },
  { description: 'Charity and bonus total', budgetYtd: 51094755, actualYtd: 64197701, emphasis: 'exception' },
  { description: 'Grand total', budgetYtd: 402084894, actualYtd: 349647871, emphasis: 'grand' },
];

export const inventoryKpis: FinanceKPI[] = [
  { label: 'Tracked projects', value: '19' },
  { label: 'Project topline', value: 'AED 72.7B' },
  { label: 'Total sales', value: 'AED 42.1B', tone: 'green' },
  { label: 'Unsold value', value: 'AED 30.6B', tone: 'amber' },
  { label: 'Lowest absorption', value: '3%', sublabel: 'Sanctuary Grove / Willows', tone: 'red' },
];

export const inventoryInsights: FinanceInsight[] = [
  {
    text: 'Skyparks, Central Phase II and Central Phase III are major low-absorption value pools.',
    tone: 'red',
  },
  {
    text: 'Launch date, ageing and release phase can be layered in later.',
    tone: 'amber',
  },
  {
    text: 'This version stays focused on the executive decision view rather than a heavy dump.',
    tone: 'blue',
  },
];

export const inventoryProjects: InventoryProject[] = [
  { project: 'The S', community: 'Sheikh Zayed R', topline: 1736837032, sales: 1554260315, soldPct: 95, ratePerSft: 3226 },
  { project: 'Sobha One', community: 'Hartland II', topline: 7506309975, sales: 7085571079, soldPct: 97, ratePerSft: 2193 },
  { project: 'Sobha SeaHaven', community: 'Dubai Harbour', topline: 7443005314, sales: 5221082180, soldPct: 75, ratePerSft: 4479 },
  { project: 'Sobha Orbis', community: 'Motor City', topline: 4055459843, sales: 3733216961, soldPct: 95, ratePerSft: 1961 },
  { project: 'Skyscape', community: 'Hartland II', topline: 5413038415, sales: 3762811090, soldPct: 70, ratePerSft: 2470 },
  { project: 'Sobha Elwood Villas', community: 'Yufrah I', topline: 2655160700, sales: 2266385396, soldPct: 87, ratePerSft: 1680 },
  { project: 'Sobha Solis', community: 'Motor City', topline: 3527898984, sales: 2634410199, soldPct: 80, ratePerSft: 2008 },
  { project: 'Skyvue', community: 'Hartland II', topline: 4594662100, sales: 3781424684, soldPct: 81, ratePerSft: 2559 },
  { project: 'The Element', community: 'Hartland II', topline: 1499842919, sales: 928446966, soldPct: 64, ratePerSft: 2603 },
  { project: 'Sobha Central Ph I', community: 'Sheikh Zayed R', topline: 5591448800, sales: 2368361893, soldPct: 42, ratePerSft: 2855 },
  { project: 'Sobha Central Ph II', community: 'Sheikh Zayed R', topline: 5279364250, sales: 1524279000, soldPct: 29, ratePerSft: 2980 },
  { project: 'Skyvue Altier', community: 'Hartland II', topline: 2029475100, sales: 799138829, soldPct: 38, ratePerSft: 3020 },
  { project: 'Sobha Skyparks', community: 'Sheikh Zayed R', topline: 4061676000, sales: 560572964, soldPct: 13, ratePerSft: 4363 },
  { project: 'Sobha Central Ph III', community: 'Sheikh Zayed R', topline: 7062093076, sales: 1390568626, soldPct: 18, ratePerSft: 3811 },
  { project: 'H2 Mansions', community: 'Hartland II', topline: 1236000000, sales: 130000000, soldPct: 15, ratePerSft: 4252 },
  { project: 'Sanctuary - The Grove', community: 'Al Ain Road', topline: 3197373200, sales: 98842564, soldPct: 3, ratePerSft: 1935 },
  { project: 'Sanctuary - The Brooks', community: 'Al Ain Road', topline: 1055404491, sales: 415113968, soldPct: 40, ratePerSft: 1697 },
  { project: 'Sanctuary - The Greens', community: 'Al Ain Road', topline: 1814903185, sales: 461658162, soldPct: 26, ratePerSft: 1660 },
  { project: 'Sanctuary - The Willows', community: 'Al Ain Road', topline: 2951871676, sales: 80791524, soldPct: 3, ratePerSft: 1660 },
];

export const customerDueInsights: FinanceInsight[] = [
  { text: 'The S is structurally high risk because exposure is concentrated in aged buckets.', tone: 'red' },
  {
    text: 'Sobha Hartland and Hartland II remain the largest absolute overdue pools.',
    tone: 'amber',
  },
  {
    text: 'Later versions can add RM owner, promised date and action stage without changing the layout.',
    tone: 'blue',
  },
];

export const customerDueProjects: CustomerDueProject[] = [
  { project: 'Sobha Hartland II', bucket0To30: 131275600, bucket31To60: 85188407, bucket61To90: 36537253, bucket91To120: 7049863, bucket121To180: 47554467, bucket181To360: 65499877, bucketOver360: 18000000 },
  { project: 'Sobha Hartland', bucket0To30: 7524420, bucket31To60: 159933894, bucket61To90: 10534398, bucket91To120: 6657367, bucket121To180: 2095061, bucket181To360: 24478352, bucketOver360: 5000000 },
  { project: 'Sobha One', bucket0To30: 33776294, bucket31To60: 20602054, bucket61To90: 8016018, bucket91To120: 3020364, bucket121To180: 14745606, bucket181To360: 41092270, bucketOver360: 4000000 },
  { project: 'Sobha SeaHaven', bucket0To30: 35871110, bucket31To60: 8520366, bucket61To90: 15647357, bucket91To120: 5315603, bucket121To180: 22651023, bucket181To360: 24622708, bucketOver360: 3000000 },
  { project: 'Sobha Reserve', bucket0To30: 21982656, bucket31To60: 6961514, bucket61To90: 3624881, bucket91To120: 2473139, bucket121To180: 13686810, bucket181To360: 32095622, bucketOver360: 2000000 },
  { project: 'The S', bucket0To30: 0, bucket31To60: 0, bucket61To90: 0, bucket91To120: 0, bucket121To180: 36246228, bucket181To360: 32608834, bucketOver360: 5000000 },
  { project: 'Sobha Orbis', bucket0To30: 9698354, bucket31To60: 6093215, bucket61To90: 11317960, bucket91To120: 3661398, bucket121To180: 10187952, bucket181To360: 10971605, bucketOver360: 1000000 },
  { project: 'Sobha Central', bucket0To30: 33601601, bucket31To60: 5362526, bucket61To90: 1999406, bucket91To120: 719491, bucket121To180: 2065745, bucket181To360: 2420083, bucketOver360: 500000 },
  { project: 'Sobha Elwood', bucket0To30: 16927503, bucket31To60: 2152628, bucket61To90: 1717088, bucket91To120: 1180322, bucket121To180: 6747446, bucket181To360: 10188068, bucketOver360: 800000 },
  { project: 'Sobha Sanctuary', bucket0To30: 27878860, bucket31To60: 4174728, bucket61To90: 0, bucket91To120: 0, bucket121To180: 0, bucket181To360: 0, bucketOver360: 0 },
  { project: 'Verde By Sobha', bucket0To30: 9660298, bucket31To60: 1539274, bucket61To90: 3536802, bucket91To120: 2675823, bucket121To180: 2412855, bucket181To360: 5987592, bucketOver360: 700000 },
  { project: 'Sobha Solis', bucket0To30: 10146376, bucket31To60: 5867081, bucket61To90: 4467602, bucket91To120: 1419506, bucket121To180: 5133477, bucket181To360: 3324878, bucketOver360: 500000 },
  { project: 'Sobha Skyparks', bucket0To30: 3565344, bucket31To60: 2739140, bucket61To90: 242400, bucket91To120: 0, bucket121To180: 616147, bucket181To360: 0, bucketOver360: 0 },
  { project: 'H2 Villas', bucket0To30: 0, bucket31To60: 0, bucket61To90: 0, bucket91To120: 0, bucket121To180: 2413218, bucket181To360: 3577915, bucketOver360: 200000 },
];
