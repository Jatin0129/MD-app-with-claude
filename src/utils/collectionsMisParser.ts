import * as XLSX from 'xlsx';

import type {
  CollectionsEntity,
  CollectionsMISRow,
  CollectionsMISTotalRow,
  CollectionsMISWorkbookData,
  CollectionsSummary,
} from './collectionsMisTypes';

type SheetRows = unknown[][];

interface ColumnIndexes {
  particular: number;
  mtd: number;
  dtd: number;
  ytd: number;
}

const ENTITY_SHEET_NAMES: Record<CollectionsEntity, string[]> = {
  'Sobha LLC': ['summary sobha llc', 'summary sobha'],
  'Downtown UAQ': ['summary downtown uaq', 'summary downtown'],
  'Siniya Island': ['summary siniya island', 'summary siniya'],
};

const PARTICULAR_LABELS: { label: string; aliases: string[] }[] = [
  { label: 'Corporate Account', aliases: ['corporate account'] },
  { label: 'ESCROW Account', aliases: ['escrow account'] },
  { label: 'Unidentified/No booking ID available', aliases: ['unidentified/no booking id available'] },
  { label: 'Collection for Downtown Units', aliases: ['collection for downtown units'] },
  { label: 'Total Bank', aliases: ['total bank', 'bank total'] },
  { label: 'Collections Total', aliases: ['collections total', 'total collections', 'grand total'] },
  { label: 'Cash Collection (OTC)', aliases: ['cash collection (otc)'] },
];

const STOP_LABELS = ['# of working days', 'per working day collections', 'target collections*', 'expected collections for the month'];

export function parseCollectionsMISWorkbook(workbook: XLSX.WorkBook): CollectionsMISWorkbookData {
  const summary = parseCollectionSummary(workbook);
  const sobhaSheet = getRequiredSheet(workbook, 'Sobha LLC');
  const downtownSheet = getRequiredSheet(workbook, 'Downtown UAQ');
  const siniyaSheet = getRequiredSheet(workbook, 'Siniya Island');

  const sobhaData = parseEntitySheet(sobhaSheet, 'Sobha LLC');
  const downtownData = parseEntitySheet(downtownSheet, 'Downtown UAQ');
  const siniyaData = parseEntitySheet(siniyaSheet, 'Siniya Island');

  return {
    rows: [...sobhaData.rows, ...downtownData.rows, ...siniyaData.rows],
    totals: {
      'Sobha LLC': sobhaData.total,
      'Downtown UAQ': downtownData.total,
      'Siniya Island': siniyaData.total,
    },
    summary,
  };
}

function parseCollectionSummary(workbook: XLSX.WorkBook): CollectionsSummary {
  const worksheet = getRequiredSheet(workbook, 'Sobha LLC');
  const rows = sheetToRows(worksheet);
  const titleRowIndex = rows.findIndex((row) => row.some((cell) => normalizeText(cell) === 'collection summary'));
  if (titleRowIndex < 0) {
    throw new Error('Could not find the Collection Summary section in the collections workbook.');
  }

  const headerRow = rows[titleRowIndex + 1];
  const sobhaIndex = findColumnIndex(headerRow, ['sobha llc']);
  const siniyaIndex = findColumnIndex(headerRow, ['siniya', 'siniya island']);
  const downtownIndex = findColumnIndex(headerRow, ['downtown uaq']);

  const mtdRow = findRowByLabel(rows, 'mtd collection');
  const ytdRow = findRowByLabel(rows, 'ytd collection');
  const totalCollectionYtdRow = findRowByLabel(rows, 'total collection ytd');
  const pctRow = findRowByLabel(rows, '% collection');

  return {
    entities: {
      'Sobha LLC': {
        mtd: normalizeSummaryAmount(getNumber(rows[mtdRow][sobhaIndex])),
        ytd: normalizeSummaryAmount(getNumber(rows[ytdRow][sobhaIndex])),
        pctCollection: getNumber(rows[pctRow][sobhaIndex]),
      },
      'Siniya Island': {
        mtd: normalizeSummaryAmount(getNumber(rows[mtdRow][siniyaIndex])),
        ytd: normalizeSummaryAmount(getNumber(rows[ytdRow][siniyaIndex])),
        pctCollection: getNumber(rows[pctRow][siniyaIndex]),
      },
      'Downtown UAQ': {
        mtd: normalizeSummaryAmount(getNumber(rows[mtdRow][downtownIndex])),
        ytd: normalizeSummaryAmount(getNumber(rows[ytdRow][downtownIndex])),
        pctCollection: getNumber(rows[pctRow][downtownIndex]),
      },
    },
    totalCollectionYtd: normalizeSummaryAmount(
      rows[totalCollectionYtdRow]
      .map(getNumber)
      .find((value) => value > 0) ?? 0,
    ),
  };
}

function parseEntitySheet(
  worksheet: XLSX.WorkSheet,
  entity: CollectionsEntity,
): { rows: CollectionsMISRow[]; total: CollectionsMISTotalRow } {
  const rows = sheetToRows(worksheet);
  const headerRowIndex = findHeaderRow(rows, entity);
  const columns = getColumnIndexes(rows[headerRowIndex], entity);
  const stopRowIndex = findStopRow(rows, headerRowIndex, columns.particular);
  const dataRows = rows.slice(headerRowIndex + 1, stopRowIndex);

  const matchedRows = new Map<string, CollectionsMISRow>();
  let totalRow: CollectionsMISTotalRow | null = null;

  for (const row of dataRows) {
    const rawLabel = getText(row[columns.particular]);
    if (!rawLabel) {
      continue;
    }

    const normalizedLabel = normalizeText(rawLabel);
    const match = PARTICULAR_LABELS.find((item) => item.aliases.includes(normalizedLabel));
    if (!match) {
      continue;
    }

    const parsedRow = {
      entity,
      particular: match.label,
      dtd: normalizeEntityAmount(getNumber(row[columns.dtd])),
      mtd: normalizeEntityAmount(getNumber(row[columns.mtd])),
      ytd: normalizeEntityAmount(getNumber(row[columns.ytd])),
    };

    if (match.label === 'Collections Total') {
      totalRow = {
        ...parsedRow,
        label: 'Collections Total',
      };
      continue;
    }

    matchedRows.set(match.label, parsedRow);
  }

  const orderedRows = PARTICULAR_LABELS
    .filter((item) => item.label !== 'Collections Total')
    .map((item) => matchedRows.get(item.label))
    .filter((row): row is CollectionsMISRow => Boolean(row));

  if (!totalRow) {
    throw new Error(`Could not find the total row in the ${entity} collections sheet.`);
  }

  return {
    rows: orderedRows,
    total: totalRow,
  };
}

function findHeaderRow(rows: SheetRows, entity: CollectionsEntity): number {
  for (let rowIndex = 0; rowIndex < Math.min(rows.length, 30); rowIndex += 1) {
    const normalizedRow = rows[rowIndex].map(normalizeText);
    if (normalizedRow.includes('particulars') && normalizedRow.includes('mtd') && normalizedRow.includes('dtd') && normalizedRow.includes('ytd')) {
      return rowIndex;
    }
  }

  throw new Error(`Could not find the collections table header for ${entity}.`);
}

function getColumnIndexes(headerRow: unknown[], entity: CollectionsEntity): ColumnIndexes {
  return {
    particular: findColumnIndex(headerRow, ['particulars']),
    mtd: findColumnIndex(headerRow, ['mtd']),
    dtd: findColumnIndex(headerRow, ['dtd']),
    ytd: findColumnIndex(headerRow, ['ytd']),
  };
}

function findStopRow(rows: SheetRows, headerRowIndex: number, particularColumnIndex: number): number {
  for (let rowIndex = headerRowIndex + 1; rowIndex < rows.length; rowIndex += 1) {
    const label = normalizeText(rows[rowIndex]?.[particularColumnIndex]);
    if (STOP_LABELS.includes(label)) {
      return rowIndex;
    }
  }

  return rows.length;
}

function findRowByLabel(rows: SheetRows, label: string): number {
  const rowIndex = rows.findIndex((row) => row.some((cell) => normalizeText(cell) === label));
  if (rowIndex >= 0) {
    return rowIndex;
  }

  throw new Error(`Could not find "${label}" in the collection summary.`);
}

function findColumnIndex(row: unknown[], aliases: string[]): number {
  const columnIndex = row.findIndex((cell) => aliases.includes(normalizeText(cell)));
  if (columnIndex >= 0) {
    return columnIndex;
  }

  throw new Error(`Could not find required column: ${aliases[0]}`);
}

function getRequiredSheet(workbook: XLSX.WorkBook, entity: CollectionsEntity): XLSX.WorkSheet {
  const sheetName = workbook.SheetNames.find((name) => ENTITY_SHEET_NAMES[entity].includes(normalizeText(name)));
  if (!sheetName) {
    throw new Error(`Missing required collections sheet for ${entity}.`);
  }

  return workbook.Sheets[sheetName];
}

function sheetToRows(worksheet: XLSX.WorkSheet): SheetRows {
  return XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: true,
    defval: null,
  }) as SheetRows;
}

function normalizeText(value: unknown): string {
  return getText(value).toLowerCase();
}

function getText(value: unknown): string {
  return String(value ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const normalizedValue = value.replace(/,/g, '').trim();
    if (!normalizedValue || normalizedValue === '-') {
      return 0;
    }

    const parsedValue = Number(normalizedValue);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
  }

  return 0;
}

function normalizeEntityAmount(value: number): number {
  return value / 1_000_000;
}

function normalizeSummaryAmount(value: number): number {
  if (Math.abs(value) >= 1_000) {
    return value / 1_000_000;
  }

  return value;
}
