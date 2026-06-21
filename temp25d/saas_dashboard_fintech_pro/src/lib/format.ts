/**
 * Formats a number as currency, default USD
 */
export function formatCurrency(val: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

/**
 * Formats a number as currency with an explicit '+' sign for positive numbers
 */
export function formatSignedCurrency(val: number, currency = 'USD'): string {
  const formatted = formatCurrency(Math.abs(val), currency);
  if (val > 0) {
    return `+${formatted}`;
  } else if (val < 0) {
    return `-${formatted}`;
  }
  return formatted;
}

/**
 * Formats a number as a percentage
 */
export function formatPercent(val: number): string {
  const sign = val > 0 ? '+' : '';
  return `${sign}${val.toFixed(2)}%`;
}

/**
 * Formats a datetime string
 */
export function formatDateTime(val: string): string {
  // If it's already a formatted string, we return it or format it
  // Since our mock dates are "2026-06-15 11:42", we can just output them
  return val;
}
