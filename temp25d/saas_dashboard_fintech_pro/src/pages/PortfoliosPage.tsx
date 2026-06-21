import React from 'react';
import { positions } from '../data/positions';
import { formatCurrency, formatPercent } from '../lib/format';
import { MiniStatCard } from '../components/dashboard/MiniStatCard';
import { AllocationChart } from '../components/portfolios/AllocationChart';
import { PositionsTable } from '../components/portfolios/PositionsTable';
import { TrendingUp } from 'lucide-react';

export const PortfoliosPage: React.FC = () => {
  // Dynamically calculate holdings metrics
  const { totalMV, totalPnl, returnPct } = React.useMemo(() => {
    const mv = positions.reduce((sum, pos) => sum + pos.marketValue, 0);
    const pnl = positions.reduce((sum, pos) => sum + pos.unrealizedPnl, 0);
    const cost = mv - pnl;
    const pct = cost > 0 ? (pnl / cost) * 100 : 0;
    return {
      totalMV: mv,
      totalPnl: pnl,
      returnPct: pct,
    };
  }, []);

  return (
    <div className="p-6 space-y-6 flex-grow animate-[fadeIn_0.4s_ease]">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Asset Holdings</h2>
          <p className="text-xs text-text/45 mt-0.5">Asset allocations, market valuation updates, and unrealized yields</p>
        </div>
      </div>

      {/* Portfolio Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MiniStatCard 
          title="Total Portfolio Valuation"
          value={formatCurrency(totalMV)}
          valueClass="text-white"
          description={
            <p className="text-[10px] text-text/40 font-mono">Consolidated institutional value</p>
          }
        />
        <MiniStatCard 
          title="Net Unrealized P&L"
          value={`+${formatCurrency(totalPnl)}`}
          valueClass="text-primary"
          description={
            <p className="text-[10px] text-primary/80 font-mono flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Return rate of {formatPercent(returnPct)}
            </p>
          }
        />
        <MiniStatCard 
          title="Margin Asset Leverage"
          value="$226,000.00"
          valueClass="text-white"
          description={
            <p className="text-[10px] text-text/40 font-mono">Leveraged positions borrowing</p>
          }
        />
      </div>

      {/* Allocation Chart */}
      <AllocationChart />

      {/* Positions Ledger List */}
      <PositionsTable />

    </div>
  );
};
