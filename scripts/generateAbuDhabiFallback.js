const fs = require('fs');
const csv = fs.readFileSync('C:/Users/jatin/Downloads/recent_sales.csv', 'utf8');

function parseCSVLine(line) {
  const result = [];
  let current = '', inQ = false;
  for (const ch of line) {
    if (ch === '"') { inQ = !inQ; }
    else if (ch === ',' && !inQ) { result.push(current.trim()); current = ''; }
    else { current += ch; }
  }
  result.push(current.trim());
  return result;
}

const lines = csv.split('\n').filter(l => l.trim().length > 0);
const rows = [];
for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length < 14) continue;
  const price = parseFloat(cols[9]) || 0;
  if (price <= 0) continue;
  rows.push({
    assetClass: cols[0], propertyType: cols[1], date: cols[2],
    areaSqm: parseFloat(cols[3]) || 0, layout: cols[5],
    district: cols[6], community: cols[7], projectName: cols[8],
    price, soldShare: parseFloat(cols[10]) || 1,
    ratePerSqm: parseFloat(cols[11]) || 0,
    saleAppType: cols[12], saleSequence: cols[13],
  });
}

console.log('Total rows parsed:', rows.length);

function formatAED(v) {
  if (v >= 1e9) return 'AED ' + (v / 1e9).toFixed(1) + 'B';
  if (v >= 1e6) return 'AED ' + (v / 1e6).toFixed(0) + 'M';
  if (v >= 1e3) return 'AED ' + (v / 1e3).toFixed(0) + 'K';
  return 'AED ' + v.toLocaleString();
}

function mapPropType(raw) {
  const l = raw.toLowerCase();
  if (l.includes('villa') || l === 'farm' || l === 'palace') return 'Villa';
  if (l.includes('townhouse')) return 'Townhouse';
  if (l.includes('office') || l.includes('commercial') || l.includes('retail') || l.includes('workshop') || l.includes('factory') || l.includes('clinic') || l.includes('mall')) return 'Commercial';
  return 'Apartment';
}

function mapTxnType(saleAppType, saleSequence) {
  if (saleAppType === 'off-plan') return 'Off-Plan';
  if (saleSequence === 'primary') return 'Primary';
  return 'Secondary';
}

function mapLayout(raw) {
  const l = raw.toLowerCase();
  if (l === 'studio') return 'Studio';
  if (l === '1 bed') return '1 B/R';
  if (l === '2 beds') return '2 B/R';
  if (l === '3 beds') return '3 B/R';
  if (l === '4 beds') return '4 B/R';
  if (l === '5 beds' || l === '5+ beds' || l === '6+ beds') return '5 B/R+';
  return 'Other';
}

const COLORS = ['#378ADD','#059669','#d97706','#7c3aed','#0d9488','#ea580c','#db2777','#65a30d','#64748b','#dc2626','#a1a1aa'];

function fmtDate(d) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return parseInt(day) + ' ' + months[parseInt(m)] + ' ' + y;
}

function computeMetrics(filteredRows) {
  if (filteredRows.length === 0) return null;
  const dates = filteredRows.map(r => r.date).filter(Boolean).sort();
  const dateRange = fmtDate(dates[0]) + ' \u2013 ' + fmtDate(dates[dates.length - 1]);
  const totalValue = filteredRows.reduce((s, r) => s + r.price, 0);
  const totalTxns = filteredRows.length;
  const avgPrice = totalValue / totalTxns;
  const uniqueProjects = new Set(filteredRows.map(r => r.projectName)).size;

  const projMap = new Map();
  for (const r of filteredRows) projMap.set(r.projectName, (projMap.get(r.projectName) || 0) + r.price);
  const topProj = Array.from(projMap.entries()).sort((a,b) => b[1]-a[1])[0];

  const kpis = [
    { label: 'Total Value', value: formatAED(totalValue), sub: 'Gross transaction volume' },
    { label: 'Transactions', value: totalTxns.toLocaleString(), sub: 'Registered sales' },
    { label: 'Avg. Ticket', value: formatAED(avgPrice), sub: 'Per transaction' },
    { label: 'Active Projects', value: String(uniqueProjects), sub: 'Unique projects' },
    { label: 'Top Project', value: topProj ? topProj[0].slice(0,20) : 'N/A', sub: topProj ? formatAED(topProj[1]) : '' },
  ];

  const areaAgg = new Map();
  for (const r of filteredRows) {
    const key = r.district || 'Unknown';
    const e = areaAgg.get(key) || { value: 0, txns: 0 };
    e.value += r.price; e.txns++; areaAgg.set(key, e);
  }
  const areas = Array.from(areaAgg.entries()).sort((a,b) => b[1].value - a[1].value).slice(0,10)
    .map(([area, s], i) => ({
      rank: i+1, area, value: formatAED(s.value),
      valueNum: Math.round(s.value/1e6), txns: s.txns,
      avg: formatAED(s.txns > 0 ? s.value/s.txns : 0),
    }));

  const devAgg = new Map();
  for (const r of filteredRows) {
    const key = r.community || 'Other';
    const e = devAgg.get(key) || { value: 0, txns: 0 };
    e.value += r.price; e.txns++; devAgg.set(key, e);
  }
  const developers = Array.from(devAgg.entries()).sort((a,b) => b[1].value - a[1].value).slice(0,10)
    .map(([name, s], i) => ({
      name: name.length > 20 ? name.slice(0,18)+'\u2026' : name,
      value: formatAED(s.value), valueNum: Math.round(s.value/1e6),
      pct: Math.round((s.value/totalValue)*1000)/10, txns: s.txns,
      color: COLORS[i % COLORS.length],
    }));

  const projAgg = new Map();
  for (const r of filteredRows) {
    const key = r.projectName || 'Unknown';
    const e = projAgg.get(key) || { value: 0, txns: 0, district: r.district, propType: mapPropType(r.propertyType), txnType: mapTxnType(r.saleAppType, r.saleSequence) };
    e.value += r.price; e.txns++; projAgg.set(key, e);
  }
  const projects = Array.from(projAgg.entries()).sort((a,b) => b[1].value - a[1].value).slice(0,8)
    .map(([name, s]) => ({
      name, developer: '', location: s.district,
      value: formatAED(s.value), valueNum: Math.round(s.value/1e6),
      txns: s.txns, propType: s.propType, txnType: s.txnType,
    }));

  const mixAgg = new Map();
  for (const r of filteredRows) { const l = mapLayout(r.layout); mixAgg.set(l, (mixAgg.get(l)||0)+1); }
  const mixColors = ['#378ADD','#059669','#7c3aed','#d97706','#dc2626','#0d9488','#a1a1aa'];
  const unitMix = Array.from(mixAgg.entries()).sort((a,b) => b[1]-a[1]).slice(0,7)
    .map(([type, count], i) => ({ type, count, pct: Math.round((count/totalTxns)*100), color: mixColors[i%mixColors.length] }));

  const offPlanPct = Math.round((filteredRows.filter(r=>r.saleAppType==='off-plan').length/totalTxns)*100);
  const topAreaName = areas[0]?.area || 'N/A';
  const topAreaPct = totalValue > 0 && areas[0] ? Math.round((areaAgg.get(topAreaName)?.value||0)/totalValue*100) : 0;
  const avgSqmArr = filteredRows.filter(r=>r.ratePerSqm>0);
  const avgSqmRate = avgSqmArr.length > 0 ? avgSqmArr.reduce((s,r) => s + r.ratePerSqm, 0)/avgSqmArr.length : 0;

  const signals = [
    { title:'Market Composition', color:'#378ADD', body: offPlanPct+'% of transactions are off-plan, indicating strong pre-launch and under-construction demand across Abu Dhabi.' },
    { title:'Top Location', color:'#059669', body: topAreaName+' leads with '+topAreaPct+'% of total value across '+(areas[0]?.txns||0)+' transactions.' },
    { title:'Pricing', color:'#d97706', body: 'Average rate is AED '+Math.round(avgSqmRate).toLocaleString()+'/sqm (AED '+Math.round(avgSqmRate/10.764).toLocaleString()+'/sqft). Average ticket size is '+formatAED(avgPrice)+'.' },
  ];

  return { kpis, developers, areas, projects, unitMix, signals, dateRange, totalValue, totalTxns };
}

const propTypes = ['All','Apartment','Villa','Townhouse','Commercial'];
const txnTypes = ['All','Off-Plan','Primary','Secondary'];

const allCombos = {};
for (const pt of propTypes) {
  for (const tt of txnTypes) {
    let filtered = rows;
    if (pt !== 'All') filtered = filtered.filter(r => mapPropType(r.propertyType) === pt);
    if (tt !== 'All') {
      if (tt === 'Off-Plan') filtered = filtered.filter(r => r.saleAppType === 'off-plan');
      else if (tt === 'Primary') filtered = filtered.filter(r => r.saleSequence === 'primary' && r.saleAppType !== 'off-plan');
      else filtered = filtered.filter(r => r.saleSequence === 'secondary');
    }
    const key = pt + '|' + tt;
    const metrics = computeMetrics(filtered);
    allCombos[key] = metrics;
    console.log(key + ': ' + filtered.length + ' rows' + (metrics ? ', ' + formatAED(metrics.totalValue) : ''));
  }
}

let ts = '// Auto-generated from recent_sales.csv\n';
ts += '// Generated on ' + new Date().toISOString() + '\n';
ts += '// ' + rows.length + ' transactions from Abu Dhabi DARI data\n\n';
ts += "import type { MarketKPIs, DeveloperRow, AreaRow, ProjectRow, UnitMixRow, MarketSignal } from './reTransactionsData';\n\n";
ts += 'export interface AbuDhabiPrecomputedSet {\n';
ts += '  kpis: MarketKPIs[];\n  developers: DeveloperRow[];\n  areas: AreaRow[];\n';
ts += '  projects: ProjectRow[];\n  unitMix: UnitMixRow[];\n  signals: MarketSignal[];\n';
ts += '  dateRange: string;\n  totalValue: number;\n  totalTxns: number;\n}\n\n';
ts += 'export const AD_PRECOMPUTED: Record<string, AbuDhabiPrecomputedSet | null> = ' + JSON.stringify(allCombos, null, 2) + ';\n\n';
ts += 'export function getAbuDhabiPrecomputed(propType: string, txnType: string): AbuDhabiPrecomputedSet | null {\n';
ts += '  return AD_PRECOMPUTED[`${propType}|${txnType}`] ?? null;\n';
ts += '}\n';

fs.writeFileSync('C:/Users/jatin/Desktop/MD app claude/sobha-md-app/src/data/abuDhabiPrecomputed.ts', ts);
console.log('\nWritten abuDhabiPrecomputed.ts, size:', ts.length, 'bytes');
