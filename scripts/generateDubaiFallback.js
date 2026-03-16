const fs = require('fs');
const csv = fs.readFileSync('C:/Users/jatin/Downloads/transactions-2026-03-16.csv', 'utf8');

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
  if (cols.length < 22) continue;
  if (cols[2] !== 'Sales') continue;
  const value = parseFloat(cols[10]) || 0;
  if (value <= 0) continue;
  rows.push({
    txnNumber: cols[0], date: cols[1], group: cols[2], procedure: cols[3],
    isOffplan: cols[4], usage: cols[6], area: cols[7], propType: cols[8],
    propSubType: cols[9], value, actualArea: parseFloat(cols[12]) || 0,
    rooms: cols[13], masterProject: cols[20], project: cols[21],
  });
}

console.log('Total sales rows parsed:', rows.length);

function formatAED(v) {
  if (v >= 1e9) return 'AED ' + (v / 1e9).toFixed(2) + 'B';
  if (v >= 1e6) return 'AED ' + (v / 1e6).toFixed(0) + 'M';
  if (v >= 1e3) return 'AED ' + (v / 1e3).toFixed(0) + 'K';
  return 'AED ' + v.toLocaleString();
}

function mapPropType(subType) {
  const l = subType.toLowerCase();
  if (l === 'villa') return 'Villa';
  if (['office','shop','warehouse','hotel rooms','hotel apartment'].includes(l)) return 'Commercial';
  return 'Apartment';
}

function mapTxnType(isOffplan, procedure) {
  if (isOffplan === 'Off-Plan') return 'Off-Plan';
  const l = procedure.toLowerCase();
  if (l.includes('pre registration') || l.includes('first sale')) return 'Primary';
  return 'Secondary';
}

function mapLayout(rooms) {
  if (!rooms || rooms === 'NA') return 'Other';
  if (rooms === 'Studio') return 'Studio';
  if (rooms === 'Office') return 'Other';
  return rooms;
}

function titleCase(s) {
  return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function fmtDate(d) {
  if (!d) return '';
  const dateOnly = d.split(' ')[0];
  const [y, m, day] = dateOnly.split('-');
  const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return parseInt(day) + ' ' + months[parseInt(m)] + ' ' + y;
}

const COLORS = ['#dc2626','#d97706','#378ADD','#059669','#7c3aed','#0d9488','#ea580c','#db2777','#65a30d','#64748b','#a1a1aa'];

function computeMetrics(filteredRows, totalValueAll) {
  if (filteredRows.length === 0) return null;
  const dates = filteredRows.map(r => r.date.split(' ')[0]).filter(Boolean).sort();
  const dateRange = fmtDate(dates[0]) + ' \u2013 ' + fmtDate(dates[dates.length - 1]);
  const totalValue = filteredRows.reduce((s, r) => s + r.value, 0);
  const totalTxns = filteredRows.length;
  const avgPrice = totalValue / totalTxns;
  const uniqueProjects = new Set(filteredRows.map(r => r.project).filter(Boolean)).size;

  const projMap = new Map();
  for (const r of filteredRows) if (r.project) projMap.set(r.project, (projMap.get(r.project) || 0) + r.value);
  const topProj = Array.from(projMap.entries()).sort((a,b) => b[1]-a[1])[0];

  const kpis = [
    { label: 'Total Value', value: formatAED(totalValue), sub: 'Gross transaction volume' },
    { label: 'Transactions', value: totalTxns.toLocaleString(), sub: 'Registered sales' },
    { label: 'Avg. Ticket', value: formatAED(avgPrice), sub: 'Per transaction' },
    { label: 'Active Projects', value: String(uniqueProjects), sub: 'Unique projects' },
    { label: 'Top Project', value: topProj ? (topProj[0].length > 18 ? topProj[0].slice(0,16)+'\u2026' : topProj[0]) : 'N/A', sub: topProj ? formatAED(topProj[1]) : '' },
  ];

  const areaAgg = new Map();
  for (const r of filteredRows) {
    const key = r.area || 'Unknown';
    const e = areaAgg.get(key) || { value: 0, txns: 0 };
    e.value += r.value; e.txns++; areaAgg.set(key, e);
  }
  const areas = Array.from(areaAgg.entries()).sort((a,b) => b[1].value - a[1].value).slice(0,10)
    .map(([area, s], i) => ({
      rank: i+1, area: titleCase(area), value: formatAED(s.value),
      valueNum: Math.round(s.value/1e6), txns: s.txns,
      avg: formatAED(s.txns > 0 ? s.value/s.txns : 0),
    }));

  const devAgg = new Map();
  for (const r of filteredRows) {
    const key = r.masterProject || r.project || 'Other';
    const e = devAgg.get(key) || { value: 0, txns: 0 };
    e.value += r.value; e.txns++; devAgg.set(key, e);
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
    const key = r.project || 'Unknown';
    const e = projAgg.get(key) || { value: 0, txns: 0, area: r.area, propType: mapPropType(r.propSubType), txnType: mapTxnType(r.isOffplan, r.procedure) };
    e.value += r.value; e.txns++; projAgg.set(key, e);
  }
  const projects = Array.from(projAgg.entries()).sort((a,b) => b[1].value - a[1].value).slice(0,8)
    .map(([name, s]) => ({
      name, developer: '', location: titleCase(s.area),
      value: formatAED(s.value), valueNum: Math.round(s.value/1e6),
      txns: s.txns, propType: s.propType, txnType: s.txnType,
    }));

  const mixAgg = new Map();
  for (const r of filteredRows) { const l = mapLayout(r.rooms); mixAgg.set(l, (mixAgg.get(l)||0)+1); }
  const mixColors = ['#378ADD','#059669','#d97706','#7c3aed','#dc2626','#0d9488','#a1a1aa'];
  const unitMix = Array.from(mixAgg.entries()).sort((a,b) => b[1]-a[1]).slice(0,7)
    .map(([type, count], i) => ({ type, count, pct: Math.round((count/totalTxns)*100), color: mixColors[i%mixColors.length] }));

  let flatVal=0,flatCount=0,villaVal=0,villaCount=0;
  for (const r of filteredRows) {
    if (r.propSubType==='Villa') { villaVal+=r.value; villaCount++; }
    else if (r.propSubType==='Flat') { flatVal+=r.value; flatCount++; }
  }
  const valueSplit = [];
  if (flatCount>0) valueSplit.push({ label:'Flats', value:formatAED(flatVal), units:flatCount.toLocaleString()+' units', pct:Math.round((flatVal/totalValue)*100)+'%', color:'#378ADD' });
  if (villaCount>0) valueSplit.push({ label:'Villas', value:formatAED(villaVal), units:villaCount.toLocaleString()+' units', pct:Math.round((villaVal/totalValue)*100)+'%', color:'#059669' });

  const offPlanPct = Math.round((filteredRows.filter(r=>r.isOffplan==='Off-Plan').length/totalTxns)*100);
  const topAreaName = areas[0]?.area || 'N/A';
  const topAreaPct = totalValue > 0 ? Math.round((areaAgg.get(filteredRows.find(r=>titleCase(r.area)===topAreaName)?.area||'')?.value||0)/totalValue*100) : 0;
  const avgSqm = filteredRows.filter(r=>r.actualArea>0);
  const avgRate = avgSqm.length > 0 ? avgSqm.reduce((s,r) => s + r.value/r.actualArea, 0)/avgSqm.length : 0;

  const signals = [
    { title:'Market Composition', color:'#378ADD', body: offPlanPct+'% of sales transactions are off-plan, reflecting strong pre-launch demand across Dubai.' },
    { title:'Top Location', color:'#059669', body: topAreaName+' leads with '+topAreaPct+'% of total value across '+(areas[0]?.txns||0)+' transactions.' },
    { title:'Pricing', color:'#d97706', body: 'Average rate is AED '+Math.round(avgRate).toLocaleString()+'/sqm (AED '+Math.round(avgRate/10.764).toLocaleString()+'/sqft). Average ticket is '+formatAED(avgPrice)+'.' },
  ];

  return { kpis, developers, areas, projects, unitMix, valueSplit, signals, dateRange, totalValue, totalTxns };
}

// Generate all 16 filter combinations
const propTypes = ['All','Apartment','Villa','Commercial'];
const txnTypes = ['All','Off-Plan','Primary','Secondary'];

const allCombos = {};
for (const pt of propTypes) {
  for (const tt of txnTypes) {
    let filtered = rows;
    if (pt !== 'All') filtered = filtered.filter(r => mapPropType(r.propSubType) === pt);
    if (tt !== 'All') {
      if (tt === 'Off-Plan') filtered = filtered.filter(r => r.isOffplan === 'Off-Plan');
      else if (tt === 'Primary') filtered = filtered.filter(r => r.isOffplan !== 'Off-Plan' && r.procedure.toLowerCase().includes('pre registration'));
      else filtered = filtered.filter(r => r.isOffplan !== 'Off-Plan' && !r.procedure.toLowerCase().includes('pre registration'));
    }
    const key = pt + '|' + tt;
    const metrics = computeMetrics(filtered);
    if (metrics) {
      allCombos[key] = metrics;
      console.log(key + ': ' + filtered.length + ' rows, ' + formatAED(metrics.totalValue));
    } else {
      allCombos[key] = null;
      console.log(key + ': 0 rows');
    }
  }
}

// Write as TypeScript
let ts = '// Auto-generated from transactions-2026-03-16.csv\n';
ts += '// Generated on ' + new Date().toISOString() + '\n';
ts += '// ' + rows.length + ' sales transactions from DLD data\n\n';
ts += 'import type { MarketKPIs, DeveloperRow, AreaRow, ProjectRow, UnitMixRow, ValueSplit, MarketSignal } from \'./reTransactionsData\';\n\n';
ts += 'export interface DubaiPrecomputedSet {\n';
ts += '  kpis: MarketKPIs[];\n';
ts += '  developers: DeveloperRow[];\n';
ts += '  areas: AreaRow[];\n';
ts += '  projects: ProjectRow[];\n';
ts += '  unitMix: UnitMixRow[];\n';
ts += '  valueSplit: ValueSplit[];\n';
ts += '  signals: MarketSignal[];\n';
ts += '  dateRange: string;\n';
ts += '  totalValue: number;\n';
ts += '  totalTxns: number;\n';
ts += '}\n\n';
ts += '/**\n * Pre-computed dashboard data for all filter combinations.\n * Key format: "propType|txnType" e.g. "All|All", "Villa|Off-Plan"\n */\n';
ts += 'export const DUBAI_PRECOMPUTED: Record<string, DubaiPrecomputedSet | null> = ' + JSON.stringify(allCombos, null, 2) + ';\n\n';
ts += '/** Get pre-computed data for a filter combination */\n';
ts += 'export function getDubaiPrecomputed(propType: string, txnType: string): DubaiPrecomputedSet | null {\n';
ts += '  return DUBAI_PRECOMPUTED[`${propType}|${txnType}`] ?? null;\n';
ts += '}\n';

fs.writeFileSync('C:/Users/jatin/Desktop/MD app claude/sobha-md-app/src/data/dubaiPrecomputed.ts', ts);
console.log('\nWritten dubaiPrecomputed.ts, size:', ts.length, 'bytes');
