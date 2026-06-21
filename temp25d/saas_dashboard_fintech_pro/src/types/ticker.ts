export interface TickerSymbol {
  id: string;
  label: string;        // "SPX", "BTC/USD"
  value: number;
  deltaPct: number;      // signed; drives green/red color + flash animation
}
