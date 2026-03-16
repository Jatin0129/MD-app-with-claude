/**
 * Dubai DLD Transaction CSV Parser
 * Parses the DLD transactions CSV format and computes dashboard metrics.
 *
 * CSV columns:
 *   TRANSACTION_NUMBER, INSTANCE_DATE, GROUP_EN, PROCEDURE_EN, IS_OFFPLAN_EN,
 *   IS_FREE_HOLD_EN, USAGE_EN, AREA_EN, PROP_TYPE_EN, PROP_SB_TYPE_EN,
 *   TRANS_VALUE, PROCEDURE_AREA, ACTUAL_AREA, ROOMS_EN, PARKING,
 *   NEAREST_METRO_EN, NEAREST_MALL_EN, NEAREST_LANDMARK_EN,
 *   TOTAL_BUYER, TOTAL_SELLER, MASTER_PROJECT_EN, PROJECT_EN
 */

import type {
  MarketKPIs,
  DeveloperRow,
  AreaRow,
  ProjectRow,
  UnitMixRow,
  ValueSplit,
  MarketSignal,
  PropType,
  TxnType,
} from '../data/reTransactionsData';

// ─── Raw row ────────────────────────────────────────────────────────────────

export interface DubaiTxnRow {
  txnNumber: string;
  date: string;
  group: string;       // Sales | Mortgage
  procedure: string;
  isOffplan: string;   // Off-Plan | Ready (or empty)
  usage: string;       // Residential | Commercial
  area: string;        // AREA_EN — location district
  propType: string;    // Unit | Building | Land
  propSubType: string; // Flat | Villa | Office | Shop | Hotel Apartment
  value: number;
  actualArea: number;  // sqm
  rooms: string;       // 1 B/R | 2 B/R | Studio | NA
  masterProject: string;
  project: string;
}

// ─── Parsed result ──────────────────────────────────────────────────────────

export interface DubaiParsedData {
  rows: DubaiTxnRow[];
  kpis: MarketKPIs[];
  developers: DeveloperRow[];
  areas: AreaRow[];
  projects: ProjectRow[];
  unitMix: UnitMixRow[];
  valueSplit: ValueSplit[];
  signals: MarketSignal[];
  dateRange: string;
  totalValue: number;
  totalTxns: number;
}

// ─── Colors ─────────────────────────────────────────────────────────────────

const COLORS = ['#dc2626', '#d97706', '#378ADD', '#059669', '#7c3aed', '#0d9488', '#ea580c', '#db2777', '#65a30d', '#64748b', '#a1a1aa'];

// ─── CSV parser ─────────────────────────────────────────────────────────────

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

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatAED(v: number): string {
  if (v >= 1e9) return `AED ${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `AED ${(v / 1e6).toFixed(0)}M`;
  if (v >= 1e3) return `AED ${(v / 1e3).toFixed(0)}K`;
  return `AED ${v.toLocaleString()}`;
}

function mapPropType(subType: string): PropType {
  const l = subType.toLowerCase();
  if (l === 'villa') return 'Villa';
  if (l === 'office' || l === 'shop' || l === 'warehouse') return 'Commercial';
  if (l === 'hotel rooms' || l === 'hotel apartment') return 'Commercial';
  return 'Apartment';
}

function mapTxnType(isOffplan: string, procedure: string): TxnType {
  // Off-Plan and Primary are treated as the same category ("Off-Plan")
  if (isOffplan === 'Off-Plan') return 'Off-Plan';
  const l = procedure.toLowerCase();
  if (l.includes('pre registration') || l.includes('first sale')) return 'Off-Plan';
  return 'Secondary';
}

function mapLayout(rooms: string): string {
  if (!rooms || rooms === 'NA') return 'Other';
  if (rooms === 'Studio') return 'Studio';
  if (rooms === 'Office') return 'Other';
  return rooms; // already "1 B/R", "2 B/R", etc.
}

function fmtDate(d: string): string {
  if (!d) return '';
  const dateOnly = d.split(' ')[0]; // "2026-01-29"
  const [y, m, day] = dateOnly.split('-');
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${parseInt(day)} ${months[parseInt(m)]} ${y}`;
}

function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Returns the start-of-period date for the given timeline filter */
function getPeriodStartDate(period: string): Date | null {
  if (period === 'All') return null;
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth(); // 0-based
  switch (period) {
    case 'YTD': return new Date(y, 0, 1);
    case 'QTD': return new Date(y, Math.floor(m / 3) * 3, 1);
    case 'MTD': return new Date(y, m, 1);
    case 'This Week': {
      const d = new Date(now);
      d.setDate(d.getDate() - d.getDay()); // Sunday start
      d.setHours(0, 0, 0, 0);
      return d;
    }
    default: return null;
  }
}

function parseRowDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const d = dateStr.split(' ')[0]; // "2026-01-29 00:00:00" → "2026-01-29"
  const [y, m, day] = d.split('-').map(Number);
  if (!y || !m || !day) return null;
  return new Date(y, m - 1, day);
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN PARSER
// ═══════════════════════════════════════════════════════════════════════════════

export function parseDubaiCSV(csvText: string): DubaiParsedData {
  const lines = csvText.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length < 2) throw new Error('CSV has no data rows');

  const rows: DubaiTxnRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 22) continue;

    const group = cols[2];
    // Only include Sales transactions, skip Mortgages
    if (group !== 'Sales') continue;

    const value = parseFloat(cols[10]) || 0;
    if (value <= 0) continue;

    rows.push({
      txnNumber: cols[0],
      date: cols[1],
      group,
      procedure: cols[3],
      isOffplan: cols[4],
      usage: cols[6],
      area: cols[7],
      propType: cols[8],
      propSubType: cols[9],
      value,
      actualArea: parseFloat(cols[12]) || 0,
      rooms: cols[13],
      masterProject: cols[20],
      project: cols[21],
    });
  }

  return computeDubaiMetrics(rows);
}

// ═══════════════════════════════════════════════════════════════════════════════
//  COMPUTE METRICS FROM ROWS
// ═══════════════════════════════════════════════════════════════════════════════

function computeDubaiMetrics(rows: DubaiTxnRow[]): DubaiParsedData {
  if (rows.length === 0) {
    return {
      rows, kpis: [], developers: [], areas: [], projects: [],
      unitMix: [], valueSplit: [], signals: [], dateRange: 'No data', totalValue: 0, totalTxns: 0,
    };
  }

  // Date range
  const dates = rows.map((r) => r.date.split(' ')[0]).filter(Boolean).sort();
  const dateRange = `${fmtDate(dates[0])} – ${fmtDate(dates[dates.length - 1])}`;

  const totalValue = rows.reduce((s, r) => s + r.value, 0);
  const totalTxns = rows.length;
  const avgPrice = totalValue / totalTxns;
  const uniqueProjects = new Set(rows.map((r) => r.project).filter(Boolean)).size;

  // Top project by value
  const projMap = new Map<string, number>();
  for (const r of rows) if (r.project) projMap.set(r.project, (projMap.get(r.project) || 0) + r.value);
  const topProj = Array.from(projMap.entries()).sort((a, b) => b[1] - a[1])[0];

  const kpis: MarketKPIs[] = [
    { label: 'Total Value', value: formatAED(totalValue), sub: 'Gross transaction volume' },
    { label: 'Transactions', value: totalTxns.toLocaleString(), sub: 'Registered sales' },
    { label: 'Avg. Ticket', value: formatAED(avgPrice), sub: 'Per transaction' },
    { label: 'Active Projects', value: `${uniqueProjects}`, sub: 'Unique projects' },
    { label: 'Top Project', value: topProj ? (topProj[0].length > 18 ? topProj[0].slice(0, 16) + '…' : topProj[0]) : 'N/A', sub: topProj ? formatAED(topProj[1]) : '' },
  ];

  // Areas (from AREA_EN)
  const areaAgg = new Map<string, { value: number; txns: number }>();
  for (const r of rows) {
    const key = r.area || 'Unknown';
    const e = areaAgg.get(key) || { value: 0, txns: 0 };
    e.value += r.value; e.txns++; areaAgg.set(key, e);
  }
  const areas: AreaRow[] = Array.from(areaAgg.entries())
    .sort((a, b) => b[1].value - a[1].value).slice(0, 10)
    .map(([area, s], i) => ({
      rank: i + 1,
      area: titleCase(area),
      value: formatAED(s.value),
      valueNum: Math.round(s.value / 1e6),
      txns: s.txns,
      avg: formatAED(s.txns > 0 ? s.value / s.txns : 0),
    }));

  // Projects (top by value)
  const projAgg = new Map<string, { value: number; txns: number; area: string; propType: PropType; txnType: TxnType }>();
  for (const r of rows) {
    const key = r.project || 'Unknown';
    const e = projAgg.get(key) || { value: 0, txns: 0, area: r.area, propType: mapPropType(r.propSubType), txnType: mapTxnType(r.isOffplan, r.procedure) };
    e.value += r.value; e.txns++; projAgg.set(key, e);
  }
  const projects: ProjectRow[] = Array.from(projAgg.entries())
    .sort((a, b) => b[1].value - a[1].value).slice(0, 8)
    .map(([name, s]) => ({
      name, developer: '', location: titleCase(s.area),
      value: formatAED(s.value), valueNum: Math.round(s.value / 1e6),
      txns: s.txns, propType: s.propType, txnType: s.txnType,
    }));

  // Master projects — use MASTER_PROJECT_EN as grouping (closest to developer/brand)
  const devAgg = new Map<string, { value: number; txns: number }>();
  for (const r of rows) {
    const raw = r.masterProject || r.project || 'Other';
    const key = titleCase(raw.trim());
    const e = devAgg.get(key) || { value: 0, txns: 0 };
    e.value += r.value; e.txns++; devAgg.set(key, e);
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
  for (const r of rows) { const l = mapLayout(r.rooms); mixAgg.set(l, (mixAgg.get(l) || 0) + 1); }
  const mixColors = ['#378ADD', '#059669', '#d97706', '#7c3aed', '#dc2626', '#0d9488', '#a1a1aa'];
  const unitMix: UnitMixRow[] = Array.from(mixAgg.entries()).sort((a, b) => b[1] - a[1]).slice(0, 7)
    .map(([type, count], i) => ({ type, count, pct: Math.round((count / totalTxns) * 100), color: mixColors[i % mixColors.length] }));

  // Value split (Flats vs Villas)
  let flatVal = 0, flatCount = 0, villaVal = 0, villaCount = 0;
  for (const r of rows) {
    if (r.propSubType === 'Villa') { villaVal += r.value; villaCount++; }
    else if (r.propSubType === 'Flat') { flatVal += r.value; flatCount++; }
  }
  const valueSplit: ValueSplit[] = [];
  if (flatCount > 0) valueSplit.push({ label: 'Flats', value: formatAED(flatVal), units: `${flatCount.toLocaleString()} units`, pct: `${Math.round((flatVal / totalValue) * 100)}%`, color: '#378ADD' });
  if (villaCount > 0) valueSplit.push({ label: 'Villas', value: formatAED(villaVal), units: `${villaCount.toLocaleString()} units`, pct: `${Math.round((villaVal / totalValue) * 100)}%`, color: '#059669' });

  // Signals
  const offPlanPct = Math.round((rows.filter((r) => r.isOffplan === 'Off-Plan').length / totalTxns) * 100);
  const topAreaName = areas[0]?.area || 'N/A';
  const topAreaPct = totalValue > 0 ? Math.round((areaAgg.get(rows.find((r) => titleCase(r.area) === topAreaName)?.area || '')?.value || 0) / totalValue * 100) : 0;
  const avgSqm = rows.filter((r) => r.actualArea > 0);
  const avgRate = avgSqm.length > 0 ? avgSqm.reduce((s, r) => s + r.value / r.actualArea, 0) / avgSqm.length : 0;

  const signals: MarketSignal[] = [
    { title: 'Market Composition', color: '#378ADD', body: `${offPlanPct}% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai.` },
    { title: 'Top Location', color: '#059669', body: `${topAreaName} leads with ${topAreaPct}% of total value across ${areas[0]?.txns || 0} transactions.` },
    { title: 'Pricing', color: '#d97706', body: `Average rate is AED ${Math.round(avgRate).toLocaleString()}/sqm (AED ${Math.round(avgRate / 10.764).toLocaleString()}/sqft). Average ticket is ${formatAED(avgPrice)}.` },
  ];

  return { rows, kpis, developers, areas, projects, unitMix, valueSplit, signals, dateRange, totalValue, totalTxns };
}

// ═══════════════════════════════════════════════════════════════════════════════
//  FILTER
// ═══════════════════════════════════════════════════════════════════════════════

export function filterDubaiData(
  parsed: DubaiParsedData,
  propType: string,
  txnType: string,
  period: string = 'All',
): DubaiParsedData {
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
    filtered = filtered.filter((r) => mapPropType(r.propSubType) === propType);
  }
  if (txnType !== 'All') {
    if (txnType === 'Off-Plan') {
      // Off-Plan includes both IS_OFFPLAN_EN='Off-Plan' and primary/first-sale transactions
      filtered = filtered.filter((r) => {
        if (r.isOffplan === 'Off-Plan') return true;
        const l = r.procedure.toLowerCase();
        return l.includes('pre registration') || l.includes('first sale');
      });
    } else {
      // Secondary = ready resale only
      filtered = filtered.filter((r) => r.isOffplan !== 'Off-Plan' && !r.procedure.toLowerCase().includes('pre registration') && !r.procedure.toLowerCase().includes('first sale'));
    }
  }

  if (filtered.length === 0) {
    return { ...parsed, rows: filtered, kpis: parsed.kpis.map((k) => ({ ...k, value: '0', sub: 'No matching data' })), developers: [], areas: [], projects: [], unitMix: [], valueSplit: [], signals: [], totalValue: 0, totalTxns: 0 };
  }

  return computeDubaiMetrics(filtered);
}
