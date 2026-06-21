import React from 'react';
import { BalanceSummaryCard } from '../components/dashboard/BalanceSummaryCard';
import { MiniStatCard } from '../components/dashboard/MiniStatCard';
import { PerformanceChartCard } from '../components/dashboard/PerformanceChartCard';
import { CurrencyConverterCard } from '../components/dashboard/CurrencyConverterCard';
import { LedgerTable } from '../components/ledger/LedgerTable';

export const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6 flex-grow animate-[fadeIn_0.4s_ease]">
      
      {/* Overview Row */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Consolidated Portfolio Balance */}
        <BalanceSummaryCard />

        {/* Mini Stats Grid */}
        <div className="w-full lg:w-96 grid grid-cols-2 gap-4">
          <MiniStatCard 
            title="Daily ROI"
            value="+$8,490.12"
            valueClass="text-primary"
            description={
              <p className="text-[10px] text-text/40">Realized gains since midnight</p>
            }
          />
          <MiniStatCard 
            title="Margin Level"
            value="384.22%"
            valueClass="text-white"
            description={
              <p className="text-[10px] text-primary/85 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse"></span>
                Healthy Status
              </p>
            }
          />
        </div>
      </div>

      {/* Main Grid: Optimization Curve + Currency Converter */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <PerformanceChartCard />
        <CurrencyConverterCard />
      </div>

      {/* Ledger History Compact Table */}
      <LedgerTable limit={6} showPagination={false} />

    </div>
  );
};
