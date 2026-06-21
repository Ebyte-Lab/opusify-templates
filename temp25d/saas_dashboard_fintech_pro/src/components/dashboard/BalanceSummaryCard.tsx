import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../lib/format';

export const BalanceSummaryCard: React.FC = () => {
  const totalBalance = 1248390.15;
  const cashReserve = 412050.00;
  const securities = 610340.15;
  const activeMargin = 226000.00;

  return (
    <div className="flex-grow bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-semibold tracking-wider text-text/55">
            Consolidated Portfolio Balance
          </span>
          <span className="text-xs bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full font-mono">
            EST. LIQUID
          </span>
        </div>
        
        <div className="mt-4 flex items-baseline gap-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
            {formatCurrency(totalBalance)}
          </h2>
          <span className="text-sm font-semibold text-primary flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            4.2%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-800/80">
        <div>
          <span className="text-[10px] uppercase font-bold text-text/45">Cash Reserve</span>
          <p className="text-sm font-semibold text-white font-mono mt-1">
            {formatCurrency(cashReserve)}
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-text/45">Securities</span>
          <p className="text-sm font-semibold text-white font-mono mt-1">
            {formatCurrency(securities)}
          </p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-text/45">Active Margin</span>
          <p className="text-sm font-semibold text-primary font-mono mt-1">
            {formatCurrency(activeMargin)}
          </p>
        </div>
      </div>
    </div>
  );
};
