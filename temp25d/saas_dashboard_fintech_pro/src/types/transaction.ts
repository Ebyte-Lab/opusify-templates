export interface LedgerTransaction {
  id: string;             // "TXN-90218"
  date: string;             // ISO-ish display string
  category: string;
  amount: number;            // signed; positive = credit
  type: 'CREDIT' | 'DEBIT';
  hash: string;
  status: 'SETTLED' | 'COMPLETED' | 'PENDING';
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';
export type ExchangeRateTable = Record<CurrencyCode, Record<CurrencyCode, number>>;
