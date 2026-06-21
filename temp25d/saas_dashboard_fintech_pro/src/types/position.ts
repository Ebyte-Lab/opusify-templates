export interface Position {
  symbol: string;
  name: string;
  quantity: number;
  avgCost: number;
  marketValue: number;
  unrealizedPnl: number;
  assetClass: 'Equity' | 'Bond' | 'Crypto' | 'Cash';
}
