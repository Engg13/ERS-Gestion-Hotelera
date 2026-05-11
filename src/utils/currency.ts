export type Currency = 'CLP' | 'USD';

// Exchange rate: 1 USD = 950 CLP (approximate)
const USD_TO_CLP_RATE = 950;

/**
 * Convert price between currencies
 */
export function convertPrice(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  if (fromCurrency === 'USD' && toCurrency === 'CLP') {
    return amount * USD_TO_CLP_RATE;
  }

  if (fromCurrency === 'CLP' && toCurrency === 'USD') {
    return amount / USD_TO_CLP_RATE;
  }

  return amount;
}

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: number, currency: Currency): string {
  if (currency === 'CLP') {
    return `$${Math.round(amount).toLocaleString('es-CL')} CLP`;
  }

  if (currency === 'USD') {
    return `$${amount.toFixed(2)} USD`;
  }

  return `$${amount}`;
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: Currency): string {
  return currency === 'CLP' ? 'CLP' : 'USD';
}

/**
 * Get exchange rate display
 */
export function getExchangeRateDisplay(): string {
  return `1 USD = ${USD_TO_CLP_RATE.toLocaleString('es-CL')} CLP`;
}
