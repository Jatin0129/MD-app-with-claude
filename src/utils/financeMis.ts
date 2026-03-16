export function formatAEDCompact(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '-';
  }

  const absoluteValue = Math.abs(value);
  let formatted = '';

  if (absoluteValue >= 1e9) {
    formatted = `${(absoluteValue / 1e9).toFixed(1)}B`;
  } else if (absoluteValue >= 1e6) {
    formatted = `${(absoluteValue / 1e6).toFixed(1)}M`;
  } else if (absoluteValue >= 1e3) {
    formatted = `${(absoluteValue / 1e3).toFixed(0)}K`;
  } else {
    formatted = absoluteValue.toLocaleString('en-US');
  }

  return value < 0 ? `-AED ${formatted}` : `AED ${formatted}`;
}

export function formatPlainNumber(value: number): string {
  return value.toLocaleString('en-US');
}

export function formatSignedVariance(value: number): string {
  if (value === 0) {
    return 'AED 0';
  }

  return value > 0 ? `+${formatAEDCompact(value)}` : formatAEDCompact(value);
}

export function toPercent(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

export function clampPercent(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, value));
}
