import { Position } from '../types/position';

export const positions: Position[] = [
  {
    symbol: "CASH_USD",
    name: "Cash Reserve (USD)",
    quantity: 412050.00,
    avgCost: 1.00,
    marketValue: 412050.00,
    unrealizedPnl: 0.00,
    assetClass: "Cash"
  },
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    quantity: 600,
    avgCost: 480.20,
    marketValue: 308224.80,
    unrealizedPnl: 20104.80,
    assetClass: "Equity"
  },
  {
    symbol: "AAPL",
    name: "Apple Inc. Common Stock",
    quantity: 800,
    avgCost: 175.50,
    marketValue: 148320.00,
    unrealizedPnl: 7920.00,
    assetClass: "Equity"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    quantity: 360,
    avgCost: 380.00,
    marketValue: 153795.35,
    unrealizedPnl: 16995.35,
    assetClass: "Equity"
  },
  {
    symbol: "UST10Y",
    name: "US Treasury 10 Year Note",
    quantity: 200,
    avgCost: 1100.00,
    marketValue: 226000.00,
    unrealizedPnl: 6000.00,
    assetClass: "Bond"
  },
  {
    symbol: "BTC",
    name: "Bitcoin Core Asset",
    quantity: 4.5,
    avgCost: 45000.00,
    marketValue: 303432.75,
    unrealizedPnl: 101032.75,
    assetClass: "Crypto"
  }
];
