const AED_TO_MILLIONS = 1_000_000;

export const COLLECTIONS_MIS_UNIT_LABEL = 'Values in AED mn';

export function normalizeCollectionsAmount(value: number): number {
  if (Math.abs(value) >= 100_000) {
    return value / AED_TO_MILLIONS;
  }

  return value;
}

export function formatCollectionsAmount(value: number): string {
  const rounded = Math.round(normalizeCollectionsAmount(value) * 100) / 100;
  const safe = Object.is(rounded, -0) ? 0 : rounded;
  return safe.toFixed(2);
}

export function formatCollectionsPercent(value: number): string {
  const normalized = Math.abs(value) <= 1 ? value * 100 : value;
  return `${normalized.toFixed(2)}%`;
}

export function formatCollectionsTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unavailable';
  }

  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}
