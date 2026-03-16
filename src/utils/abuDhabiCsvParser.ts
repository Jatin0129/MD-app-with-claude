/**
 * Abu Dhabi Transaction CSV Parser — Quanta / Search Results format
 *
 * CSV columns (from Quanta XLSX export saved as CSV):
 *   Type, Sequence, Registration, Contract, Municipality, District,
 *   Community, Project, Developer, Property Type, Layout, Floor,
 *   Sold Area (sqm), Price (AED), Plot Area (sqm), Rate (AED / sqm)
 */

import type {
  MarketKPIs,
  DeveloperRow,
  AreaRow,
  ProjectRow,
  UnitMixRow,
  MarketSignal,
  PropType,
  TxnType,
} from '../data/reTransactionsData';

// ─── Raw row after parsing ──────────────────────────────────────────────────

export interface AbuDhabiTxnRow {
  type: string;        // off-plan | ready | court-mandated
  sequence: string;    // primary | secondary
  date: string;        // Registration date (YYYY-MM-DD…)
  contractDate: string;
  municipality: string;
  district: string;
  community: string;
  projectName: string;
  developer: string;
  propertyType: string;
  layout: string;
  floor: number;
  areaSqm: number;
  price: number;
  plotArea: number;
  ratePerSqm: number;
  // keep legacy aliases for compatibility
  saleAppType: string;
  saleSequence: string;
}

// ─── Parsed dashboard result ────────────────────────────────────────────────

export interface AbuDhabiParsedData {
  rows: AbuDhabiTxnRow[];
  kpis: MarketKPIs[];
  developers: DeveloperRow[];
  areas: AreaRow[];
  projects: ProjectRow[];
  unitMix: UnitMixRow[];
  signals: MarketSignal[];
  dateRange: string;
  totalValue: number;
  totalTxns: number;
}

// ─── Colors ─────────────────────────────────────────────────────────────────

const COLORS = ['#378ADD', '#059669', '#d97706', '#7c3aed', '#0d9488', '#ea580c', '#db2777', '#65a30d', '#64748b', '#dc2626', '#a1a1aa'];

// ─── CSV Line Parser (handles quoted fields) ────────────────────────────────

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === ',' && !inQuotes) { result.push(current.trim()); current = ''; }
    else { current += ch; }
  }
  result.push(current.trim());
  return result;
}

// ─── Format helpers ─────────────────────────────────────────────────────────

function formatAED(v: number): string {
  if (v >= 1e9) return `AED ${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `AED ${(v / 1e6).toFixed(0)}M`;
  if (v >= 1e3) return `AED ${(v / 1e3).toFixed(0)}K`;
  return `AED ${v.toLocaleString()}`;
}

// ─── Map CSV property type to dashboard PropType ────────────────────────────

function mapPropType(raw: string): PropType {
  const l = raw.toLowerCase();
  if (l.includes('villa') || l.includes('plot for villa') || l === 'farm' || l === 'palace') return 'Villa';
  if (l.includes('townhouse')) return 'Townhouse';
  if (l.includes('office') || l.includes('commercial') || l.includes('retail') || l.includes('workshop') || l.includes('factory') || l.includes('clinic') || l.includes('mall')) return 'Commercial';
  return 'Apartment'; // apartment, duplex, penthouse, residential complex, studio, etc.
}

// ─── Map CSV sale fields to dashboard TxnType ───────────────────────────────

function mapTxnType(type: string, sequence: string): TxnType {
  // Off-Plan and Primary are treated as the same category ("Off-Plan")
  if (type === 'off-plan') return 'Off-Plan';
  if (sequence === 'primary') return 'Off-Plan';
  return 'Secondary';
}

/** Returns the start-of-period date for the given timeline filter */
function getPeriodStartDate(period: string): Date | null {
  if (period === 'All') return null;
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  switch (period) {
    case 'YTD': return new Date(y, 0, 1);
    case 'QTD': return new Date(y, Math.floor(m / 3) * 3, 1);
    case 'MTD': return new Date(y, m, 1);
    case 'This Week': {
      const d = new Date(now);
      d.setDate(d.getDate() - d.getDay());
      d.setHours(0, 0, 0, 0);
      return d;
    }
    default: return null;
  }
}

function parseRowDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  // Handle both "2026-03-14 21:40:02" and "2026-03-14" formats
  const d = dateStr.split(' ')[0].split('T')[0];
  const parts = d.split('-').map(Number);
  if (parts.length < 3 || !parts[0] || !parts[1] || !parts[2]) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

// ─── Map layout to unit mix label ───────────────────────────────────────────

function mapLayout(raw: string): string {
  const l = (raw || '').toLowerCase().trim();
  if (l === 'studio') return 'Studio';
  if (l === '1 bed') return '1 B/R';
  if (l === '2 beds') return '2 B/R';
  if (l === '3 beds') return '3 B/R';
  if (l === '4 beds') return '4 B/R';
  if (l === '5 beds' || l === '5+ beds' || l === '6+ beds' || l === '6 beds' || l === '7 beds') return '5 B/R+';
  if (l === 'unclassified' || l === '') return 'Other';
  return 'Other';
}

function fmtDate(d: string): string {
  if (!d) return '';
  const dateOnly = d.split(' ')[0].split('T')[0];
  const [y, m, day] = dateOnly.split('-');
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${parseInt(day)} ${months[parseInt(m)]} ${y}`;
}

// ─── Detect file format ─────────────────────────────────────────────────────

function isQuantaFormat(header: string[]): boolean {
  // Quanta headers: Type, Sequence, Registration, ...
  const h0 = header[0]?.toLowerCase().trim();
  return h0 === 'type' && header.length >= 14;
}

function isOldDARIFormat(header: string[]): boolean {
  const h0 = header[0]?.toLowerCase().trim();
  return h0 === 'asset class' || h0 === 'assetclass';
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN PARSER
// ═══════════════════════════════════════════════════════════════════════════════

export function parseAbuDhabiCSV(csvText: string): AbuDhabiParsedData {
  const lines = csvText.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length < 2) throw new Error('CSV has no data rows');

  const header = parseCSVLine(lines[0]);

  // Detect format and parse accordingly
  if (isOldDARIFormat(header)) {
    return parseOldDARIFormat(lines);
  }

  // Default: Quanta format
  return parseQuantaFormat(lines);
}

// ─── Quanta Format Parser ────────────────────────────────────────────────────

function parseQuantaFormat(lines: string[]): AbuDhabiParsedData {
  const rows: AbuDhabiTxnRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 14) continue;

    const type = cols[0].toLowerCase().trim();
    // Skip junk rows (filter metadata rows) and court-mandated
    if (type.startsWith('applied') || type === '' || type === 'court-mandated') continue;

    const price = parseFloat(cols[13]) || 0;
    if (price <= 0) continue;

    const regDate = cols[2] || '';
    // Normalize date to YYYY-MM-DD
    const dateOnly = regDate.split(' ')[0].split('T')[0];

    rows.push({
      type,
      sequence: cols[1]?.toLowerCase().trim() || '',
      date: dateOnly,
      contractDate: (cols[3] || '').split(' ')[0].split('T')[0],
      municipality: cols[4] || '',
      district: cols[5] || '',
      community: cols[6] || '',
      projectName: cols[7] || '',
      developer: cols[8] || '',
      propertyType: cols[9] || '',
      layout: cols[10] || '',
      floor: parseFloat(cols[11]) || 0,
      areaSqm: parseFloat(cols[12]) || 0,
      price,
      plotArea: parseFloat(cols[14]) || 0,
      ratePerSqm: parseFloat(cols[15]) || 0,
      // legacy aliases
      saleAppType: type,
      saleSequence: cols[1]?.toLowerCase().trim() || '',
    });
  }

  return computeMetrics(rows);
}

// ─── Old DARI Format Parser (backward compat) ───────────────────────────────

function parseOldDARIFormat(lines: string[]): AbuDhabiParsedData {
  const rows: AbuDhabiTxnRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 14) continue;
    const price = parseFloat(cols[9]) || 0;
    if (price <= 0) continue;

    rows.push({
      type: cols[12]?.toLowerCase().trim() || '',
      sequence: cols[13]?.toLowerCase().trim() || '',
      date: cols[2] || '',
      contractDate: '',
      municipality: '',
      district: cols[6] || '',
      community: cols[7] || '',
      projectName: cols[8] || '',
      developer: '', // old format has no developer column
      propertyType: cols[1] || '',
      layout: cols[5] || '',
      floor: 0,
      areaSqm: parseFloat(cols[3]) || 0,
      price,
      plotArea: parseFloat(cols[4]) || 0,
      ratePerSqm: parseFloat(cols[11]) || 0,
      saleAppType: cols[12]?.toLowerCase().trim() || '',
      saleSequence: cols[13]?.toLowerCase().trim() || '',
    });
  }

  return computeMetrics(rows);
}

// ═══════════════════════════════════════════════════════════════════════════════
//  COMPUTE METRICS FROM ROWS
// ═══════════════════════════════════════════════════════════════════════════════

function computeMetrics(rows: AbuDhabiTxnRow[]): AbuDhabiParsedData {
  if (rows.length === 0) {
    return {
      rows, kpis: [], developers: [], areas: [], projects: [],
      unitMix: [], signals: [], dateRange: 'No data', totalValue: 0, totalTxns: 0,
    };
  }

  // Date range
  const dates = rows.map((r) => r.date).filter(Boolean).sort();
  const dateRange = `${fmtDate(dates[0])} – ${fmtDate(dates[dates.length - 1])}`;

  const totalValue = rows.reduce((s, r) => s + r.price, 0);
  const totalTxns = rows.length;
  const avgPrice = totalValue / totalTxns;
  const uniqueProjects = new Set(rows.map((r) => r.projectName).filter(Boolean)).size;

  // Top project by value
  const projMap = new Map<string, number>();
  for (const r of rows) if (r.projectName) projMap.set(r.projectName, (projMap.get(r.projectName) || 0) + r.price);
  const topProj = Array.from(projMap.entries()).sort((a, b) => b[1] - a[1])[0];

  const kpis: MarketKPIs[] = [
    { label: 'Total Value', value: formatAED(totalValue), sub: 'Gross transaction volume' },
    { label: 'Transactions', value: totalTxns.toLocaleString(), sub: 'Registered sales' },
    { label: 'Avg. Ticket', value: formatAED(avgPrice), sub: 'Per transaction' },
    { label: 'Active Projects', value: `${uniqueProjects}`, sub: 'Unique projects' },
    { label: 'Top Project', value: topProj ? (topProj[0].length > 18 ? topProj[0].slice(0, 16) + '…' : topProj[0]) : 'N/A', sub: topProj ? formatAED(topProj[1]) : '' },
  ];

  // Areas (from District)
  const areaAgg = new Map<string, { value: number; txns: number }>();
  for (const r of rows) {
    const key = r.district || 'Unknown';
    const e = areaAgg.get(key) || { value: 0, txns: 0 };
    e.value += r.price; e.txns++; areaAgg.set(key, e);
  }
  const areas: AreaRow[] = Array.from(areaAgg.entries())
    .sort((a, b) => b[1].value - a[1].value).slice(0, 10)
    .map(([area, s], i) => ({
      rank: i + 1, area,
      value: formatAED(s.value), valueNum: Math.round(s.value / 1e6),
      txns: s.txns, avg: formatAED(s.txns > 0 ? s.value / s.txns : 0),
    }));

  // Projects (top by value) — now includes developer name
  const projAgg = new Map<string, { value: number; txns: number; district: string; developer: string; propType: PropType; txnType: TxnType }>();
  for (const r of rows) {
    const key = r.projectName || 'Unknown';
    const e = projAgg.get(key) || { value: 0, txns: 0, district: r.district, developer: r.developer, propType: mapPropType(r.propertyType), txnType: mapTxnType(r.type, r.sequence) };
    e.value += r.price; e.txns++; projAgg.set(key, e);
  }
  const projects: ProjectRow[] = Array.from(projAgg.entries())
    .sort((a, b) => b[1].value - a[1].value).slice(0, 8)
    .map(([name, s]) => ({
      name, developer: s.developer, location: s.district,
      value: formatAED(s.value), valueNum: Math.round(s.value / 1e6),
      txns: s.txns, propType: s.propType, txnType: s.txnType,
    }));

  // Developers — use actual Developer column when available, fall back to community
  const devAgg = new Map<string, { value: number; txns: number }>();
  for (const r of rows) {
    const key = (r.developer || r.community || 'Other').trim();
    if (!key) continue;
    const e = devAgg.get(key) || { value: 0, txns: 0 };
    e.value += r.price; e.txns++; devAgg.set(key, e);
  }
  const developers: DeveloperRow[] = Array.from(devAgg.entries())
    .sort((a, b) => b[1].value - a[1].value).slice(0, 10)
    .map(([name, s], i) => ({
      name: name.length > 22 ? name.slice(0, 20) + '…' : name,
      value: formatAED(s.value), valueNum: Math.round(s.value / 1e6),
      pct: Math.round((s.value / totalValue) * 1000) / 10,
      txns: s.txns, color: COLORS[i % COLORS.length],
    }));

  // Unit Mix
  const mixAgg = new Map<string, number>();
  for (const r of rows) { const l = mapLayout(r.layout); mixAgg.set(l, (mixAgg.get(l) || 0) + 1); }
  const mixColors = ['#378ADD', '#059669', '#7c3aed', '#d97706', '#dc2626', '#0d9488', '#a1a1aa'];
  const unitMix: UnitMixRow[] = Array.from(mixAgg.entries()).sort((a, b) => b[1] - a[1]).slice(0, 7)
    .map(([type, count], i) => ({ type, count, pct: Math.round((count / totalTxns) * 100), color: mixColors[i % mixColors.length] }));

  // Signals
  const offPlanPct = Math.round((rows.filter((r) => r.type === 'off-plan').length / totalTxns) * 100);
  const topAreaName = areas[0]?.area || 'N/A';
  const topAreaPct = areas[0] ? Math.round((areaAgg.get(topAreaName)!.value / totalValue) * 100) : 0;
  const rateRows = rows.filter((r) => r.ratePerSqm > 0);
  const avgSqmRate = rateRows.length > 0 ? rateRows.reduce((s, r) => s + r.ratePerSqm, 0) / rateRows.length : 0;

  const signals: MarketSignal[] = [
    { title: 'Market Composition', color: '#378ADD', body: `${offPlanPct}% of transactions are off-plan, indicating strong pre-launch demand across Abu Dhabi.` },
    { title: 'Top Location', color: '#059669', body: `${topAreaName} leads with ${topAreaPct}% of total value (${areas[0]?.value || 'N/A'}) across ${areas[0]?.txns || 0} transactions.` },
    { title: 'Pricing', color: '#d97706', body: `Average rate is AED ${Math.round(avgSqmRate).toLocaleString()}/sqm (AED ${Math.round(avgSqmRate / 10.764).toLocaleString()}/sqft). Average ticket is ${formatAED(avgPrice)}.` },
  ];

  return { rows, kpis, developers, areas, projects, unitMix, signals, dateRange, totalValue, totalTxns };
}

// ═══════════════════════════════════════════════════════════════════════════════
//  FILTER
// ═══════════════════════════════════════════════════════════════════════════════

export function filterAbuDhabiData(
  parsed: AbuDhabiParsedData,
  propType: string,
  txnType: string,
  period: string = 'All',
): AbuDhabiParsedData {
  let filtered = parsed.rows;

  // Period filter
  const periodStart = getPeriodStartDate(period);
  if (periodStart) {
    filtered = filtered.filter((r) => {
      const d = parseRowDate(r.date);
      return d ? d >= periodStart : false;
    });
  }

  if (propType !== 'All') {
    filtered = filtered.filter((r) => mapPropType(r.propertyType) === propType);
  }
  if (txnType !== 'All') {
    if (txnType === 'Off-Plan') {
      filtered = filtered.filter((r) => r.type === 'off-plan' || r.sequence === 'primary');
    } else {
      filtered = filtered.filter((r) => r.type !== 'off-plan' && r.sequence !== 'primary');
    }
  }

  if (filtered.length === 0) {
    return {
      ...parsed, rows: filtered,
      kpis: parsed.kpis.map((k) => ({ ...k, value: '0', sub: 'No matching data' })),
      developers: [], areas: [], projects: [], unitMix: [], signals: [],
      totalValue: 0, totalTxns: 0,
    };
  }

  return computeMetrics(filtered);
}
