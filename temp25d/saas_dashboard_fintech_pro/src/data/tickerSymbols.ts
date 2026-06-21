import { TickerSymbol } from '../types/ticker';

export interface TickerDataWithDrift extends TickerSymbol {
  drift: number;
  isCrypto: boolean;
}

export const initialTickers: TickerDataWithDrift[] = [
  { id: 'ticker-sp', label: 'SPX', value: 5137.08, deltaPct: 0.48, drift: 0.0001, isCrypto: false },
  { id: 'ticker-btc', label: 'BTC/USD', value: 67429.50, deltaPct: 1.12, drift: 0.0004, isCrypto: true },
  { id: 'ticker-eth', label: 'ETH/USD', value: 3492.20, deltaPct: -0.35, drift: 0.0005, isCrypto: true },
  { id: 'ticker-eur', label: 'EUR/USD', value: 1.0854, deltaPct: 0.04, drift: 0.00005, isCrypto: false },
];
