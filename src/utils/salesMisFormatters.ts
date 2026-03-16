const AED_TO_MILLIONS = 1_000_000;

export const SALES_MIS_UNIT_LABEL = 'Values in AED mn';

export function toSalesMisMillions(value: number): number {
  const rounded = Math.round((value / AED_TO_MILLIONS) * 10) / 10;
  return Object.is(rounded, -0) ? 0 : rounded;
}

export function formatSalesMisAmount(value: number): string {
  return toSalesMisMillions(value).toFixed(1);
}

export function formatSalesMisTimestamp(value: string): string {
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
