import { CurrencyCode } from '../types/transaction';

export type ExchangeRateMatrix = Record<CurrencyCode, Record<CurrencyCode, number>>;

export const exchangeRates: ExchangeRateMatrix = {
  USD: { EUR: 0.9220, GBP: 0.7850, JPY: 156.40, USD: 1 },
  EUR: { USD: 1.0846, GBP: 0.8514, JPY: 169.63, EUR: 1 },
  GBP: { USD: 1.2739, EUR: 1.1745, JPY: 199.24, GBP: 1 },
  JPY: { USD: 0.0064, EUR: 0.0059, GBP: 0.0050, JPY: 1 }
};
