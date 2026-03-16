import * as XLSX from 'xlsx';

import type { SalesEntity, SalesMISRow } from './salesMisTypes';

type SheetRows = unknown[][];

interface ColumnIndexes {
  project: number;
  topline: number;
  soldValue: number;
  mtd: number;
  dtd: number;
  ytd: number;
}

const SHEET_NAMES: Record<SalesEntity, string> = {
  'Sobha LLC': 'Summary Sobha LLC',
  'Downtown UAQ': 'Summary Downtown UAQ',
  'Siniya Island': 'Summary Siniya Island',
};

const PROJECT_HEADER_LABELS = ['projects', 'project name'];
const SOLD_VALUE_HEADER_LABELS = ['value of sold units (inception till date)'];
const SKIP_ROW_PATTERNS = [
  /^grand total\b/,
  /^total\b/,
  /^note:?$/,
  /^# of working days$/,
  /^per working day sales$/,
  /^ytd'?20\d{2}$/,
  /^% change/,
  /^market growth/,
  /^the above sales mis summary/,
  /^a sale is termed as qualified/,
  /^target sales yet to be received/,
  /^all sales figures have been adjusted/,
  /^the mis has now been revised/,
  /^revised topline is yet to be recieved$/,
  /^negative value in dtd indicates/,
];

export function parseSalesMISWorkbook(workbook: XLSX.WorkBook): SalesMISRow[] {
  const missingSheets = Object.values(SHEET_NAMES).filter((sheetName) => !findSheetName(workbook, sheetName));
  if (missingSheets.length > 0) {
    throw new Error(`Missing required sheet${missingSheets.length > 1 ? 's' : ''}: ${missingSheets.join(', ')}`);
  }

  return [
    ...parseSobhaSheet(workbook),
    ...parseFlatSheet(workbook, 'Downtown UAQ'),
    ...parseFlatSheet(workbook, 'Siniya Island'),
  ];
}

function parseSobhaSheet(workbook: XLSX.WorkBook): SalesMISRow[] {
  const entity: SalesEntity = 'Sobha LLC';
  const worksheet = getRequiredSheet(workbook, entity);
  const rows = sheetToRows(worksheet);
  const headerRowIndex = findHeaderRow(rows, entity);
  const columns = getColumnIndexes(rows[headerRowIndex], entity);
  const grandTotalRowIndex = findGrandTotalRow(rows, headerRowIndex, columns.project, entity);
  const summaryRowIndexes = getSobhaSummaryRows(worksheet, headerRowIndex, grandTotalRowIndex, columns);
  const summaryRows = new Set(summaryRowIndexes);
  const childCommunities = assignSobhaCommunities(rows, summaryRowIndexes, grandTotalRowIndex, columns);
  const parsedRows: SalesMISRow[] = [];

  for (let rowIndex = headerRowIndex + 1; rowIndex < grandTotalRowIndex; rowIndex += 1) {
    if (summaryRows.has(rowIndex) || !isUsableDataRow(rows[rowIndex], columns.project)) {
      continue;
    }

    const row = rows[rowIndex];
    const project = getText(row[columns.project]);
    if (!hasSalesMetrics(row, columns)) {
      continue;
    }

    parsedRows.push({
      entity,
      community: childCommunities.get(rowIndex) ?? project,
      project,
      dtd: getNumber(row[columns.dtd]),
      mtd: getNumber(row[columns.mtd]),
      ytd: getNumber(row[columns.ytd]),
    });
  }

  if (parsedRows.length === 0) {
    throw new Error('No Sales MIS project rows were found in "Summary Sobha LLC".');
  }

  return parsedRows;
}

function parseFlatSheet(workbook: XLSX.WorkBook, entity: Extract<SalesEntity, 'Downtown UAQ' | 'Siniya Island'>): SalesMISRow[] {
  const worksheet = getRequiredSheet(workbook, entity);
  const rows = sheetToRows(worksheet);
  const headerRowIndex = findHeaderRow(rows, entity);
  const columns = getColumnIndexes(rows[headerRowIndex], entity);
  const grandTotalRowIndex = findGrandTotalRow(rows, headerRowIndex, columns.project, entity);
  const entitySummaryNames = new Set([
    normalizeText(entity),
    normalizeText(`Sobha ${entity}`),
  ]);
  const parsedRows: SalesMISRow[] = [];

  for (let rowIndex = headerRowIndex + 1; rowIndex < grandTotalRowIndex; rowIndex += 1) {
    const row = rows[rowIndex];
    if (!isUsableDataRow(row, columns.project)) {
      continue;
    }

    const project = getText(row[columns.project]);
    if (entitySummaryNames.has(normalizeText(project)) || !hasSalesMetrics(row, columns)) {
      continue;
    }

    parsedRows.push({
      entity,
      community: entity,
      project,
      dtd: getNumber(row[columns.dtd]),
      mtd: getNumber(row[columns.mtd]),
      ytd: getNumber(row[columns.ytd]),
    });
  }

  if (parsedRows.length === 0) {
    throw new Error(`No Sales MIS project rows were found in "${SHEET_NAMES[entity]}".`);
  }

  return parsedRows;
}

function assignSobhaCommunities(
  rows: SheetRows,
  summaryRowIndexes: number[],
  grandTotalRowIndex: number,
  columns: ColumnIndexes,
): Map<number, string> {
  const assignments = new Map<number, string>();

  for (let index = 0; index < summaryRowIndexes.length; index += 1) {
    const summaryRowIndex = summaryRowIndexes[index];
    const nextSummaryRowIndex = summaryRowIndexes[index + 1] ?? grandTotalRowIndex;
    const community = getText(rows[summaryRowIndex][columns.project]);
    const targetTopline = getNumber(rows[summaryRowIndex][columns.topline]);
    const targetSoldValue = getNumber(rows[summaryRowIndex][columns.soldValue]);
    let runningTopline = 0;
    let runningSoldValue = 0;

    for (let rowIndex = summaryRowIndex + 1; rowIndex < nextSummaryRowIndex; rowIndex += 1) {
      if (!isUsableDataRow(rows[rowIndex], columns.project)) {
        continue;
      }

      assignments.set(rowIndex, community);
      runningTopline += getNumber(rows[rowIndex][columns.topline]);
      runningSoldValue += getNumber(rows[rowIndex][columns.soldValue]);

      const toplineMatched = matchesSummaryBoundary(runningTopline, targetTopline);
      const soldValueMatched = targetTopline <= 0 && matchesSummaryBoundary(runningSoldValue, targetSoldValue);

      if (toplineMatched || soldValueMatched) {
        break;
      }
    }
  }

  return assignments;
}

function getSobhaSummaryRows(
  worksheet: XLSX.WorkSheet,
  headerRowIndex: number,
  grandTotalRowIndex: number,
  columns: ColumnIndexes,
): number[] {
  const summaryRows = new Set<number>();

  for (const columnIndex of [columns.topline, columns.mtd, columns.dtd, columns.ytd]) {
    const cellAddress = XLSX.utils.encode_cell({ r: grandTotalRowIndex, c: columnIndex });
    const formula = worksheet[cellAddress]?.f;
    if (!formula) {
      continue;
    }

    for (const match of formula.matchAll(/-\s*\$?[A-Z]+\$?(\d+)/gi)) {
      const rowIndex = Number(match[1]) - 1;
      if (rowIndex > headerRowIndex && rowIndex < grandTotalRowIndex) {
        summaryRows.add(rowIndex);
      }
    }
  }

  return [...summaryRows].sort((left, right) => left - right);
}

function matchesSummaryBoundary(total: number, target: number): boolean {
  if (target <= 0) {
    return false;
  }

  const difference = Math.abs(target - total);
  const tolerance = Math.max(1_000_000, target * 0.005);
  return difference <= tolerance;
}

function findHeaderRow(rows: SheetRows, entity: SalesEntity): number {
  for (let rowIndex = 0; rowIndex < Math.min(rows.length, 25); rowIndex += 1) {
    const normalizedCells = rows[rowIndex].map(normalizeText);
    const hasProjectHeader = normalizedCells.some((cell) => PROJECT_HEADER_LABELS.includes(cell));
    if (hasProjectHeader && normalizedCells.includes('mtd') && normalizedCells.includes('dtd') && normalizedCells.includes('ytd')) {
      return rowIndex;
    }
  }

  throw new Error(`Could not find the Sales MIS header row in "${SHEET_NAMES[entity]}".`);
}

function getColumnIndexes(headerRow: unknown[], entity: SalesEntity): ColumnIndexes {
  const normalizedHeaders = headerRow.map(normalizeText);

  return {
    project: findHeaderIndex(normalizedHeaders, PROJECT_HEADER_LABELS, 'project column', entity),
    topline: findHeaderIndex(normalizedHeaders, ['topline'], 'topline column', entity),
    soldValue: findHeaderIndex(normalizedHeaders, SOLD_VALUE_HEADER_LABELS, 'sold value column', entity),
    mtd: findHeaderIndex(normalizedHeaders, ['mtd'], 'MTD column', entity),
    dtd: findHeaderIndex(normalizedHeaders, ['dtd'], 'DTD column', entity),
    ytd: findHeaderIndex(normalizedHeaders, ['ytd'], 'YTD column', entity),
  };
}

function findHeaderIndex(headers: string[], aliases: string[], label: string, entity: SalesEntity): number {
  const columnIndex = headers.findIndex((header) => aliases.includes(header));
  if (columnIndex >= 0) {
    return columnIndex;
  }

  throw new Error(`Could not find the ${label} in "${SHEET_NAMES[entity]}".`);
}

function findGrandTotalRow(rows: SheetRows, headerRowIndex: number, projectColumnIndex: number, entity: SalesEntity): number {
  for (let rowIndex = headerRowIndex + 1; rowIndex < rows.length; rowIndex += 1) {
    const label = normalizeText(rows[rowIndex]?.[projectColumnIndex]);
    if (label.startsWith('grand total')) {
      return rowIndex;
    }
  }

  throw new Error(`Could not find the Grand Total row in "${SHEET_NAMES[entity]}".`);
}

function hasSalesMetrics(row: unknown[], columns: ColumnIndexes): boolean {
  return [columns.topline, columns.soldValue, columns.mtd, columns.dtd, columns.ytd].some((columnIndex) => hasNumericValue(row[columnIndex]));
}

function isUsableDataRow(row: unknown[] | undefined, projectColumnIndex: number): row is unknown[] {
  if (!row) {
    return false;
  }

  const label = getText(row[projectColumnIndex]);
  if (!label) {
    return false;
  }

  const normalizedLabel = normalizeText(label);
  return !SKIP_ROW_PATTERNS.some((pattern) => pattern.test(normalizedLabel));
}

function getRequiredSheet(workbook: XLSX.WorkBook, entity: SalesEntity): XLSX.WorkSheet {
  const sheetName = findSheetName(workbook, SHEET_NAMES[entity]);
  if (!sheetName) {
    throw new Error(`Missing required sheet: ${SHEET_NAMES[entity]}`);
  }

  return workbook.Sheets[sheetName];
}

function findSheetName(workbook: XLSX.WorkBook, expectedName: string): string | undefined {
  const normalizedExpectedName = normalizeText(expectedName);
  return workbook.SheetNames.find((sheetName) => normalizeText(sheetName) === normalizedExpectedName);
}

function sheetToRows(worksheet: XLSX.WorkSheet): SheetRows {
  return XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: true,
    defval: null,
  }) as SheetRows;
}

function getText(value: unknown): string {
  return String(value ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeText(value: unknown): string {
  return getText(value).toLowerCase();
}

function getNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const normalizedValue = value.replace(/,/g, '').trim();
    if (!normalizedValue) {
      return 0;
    }

    const parsedValue = Number(normalizedValue);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
  }

  return 0;
}

function hasNumericValue(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }

  if (typeof value === 'string') {
    const normalizedValue = value.replace(/,/g, '').trim();
    return normalizedValue !== '' && Number.isFinite(Number(normalizedValue));
  }

  return false;
}
