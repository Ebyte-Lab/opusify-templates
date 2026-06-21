import React from 'react';
import { positions } from '../../data/positions';
import { formatCurrency, formatPercent } from '../../lib/format';
import clsx from 'clsx';

export const PositionsTable: React.FC = () => {
  return (
    <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-white">Active Positions Ledger</h3>
        <p className="text-xs text-text/45">Detailed individual positions and unrealized profit/loss metrics</p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase font-bold tracking-wider text-text/45 border-b border-gray-800/60 pb-3">
              <th scope="col" className="py-3 px-4">Symbol / Name</th>
              <th scope="col" className="py-3 px-4">Asset Class</th>
              <th scope="col" className="py-3 px-4 text-right">Quantity</th>
              <th scope="col" className="py-3 px-4 text-right">Avg Cost</th>
              <th scope="col" className="py-3 px-4 text-right">Market Value</th>
              <th scope="col" className="py-3 px-4 text-right">Unrealized P&L</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-gray-800/40 font-mono">
            {positions.map((pos) => {
              const isPositive = pos.unrealizedPnl > 0;
              const isNegative = pos.unrealizedPnl < 0;
              
              // Calculate return %
              const costBasis = pos.quantity * pos.avgCost;
              const returnPct = costBasis > 0 ? (pos.unrealizedPnl / costBasis) * 100 : 0;

              return (
                <tr key={pos.symbol} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">
                    <div>{pos.symbol}</div>
                    <div className="text-[10px] text-text/45 mt-0.5 font-sans">{pos.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider",
                      pos.assetClass === 'Equity' && 'bg-blue-500/10 text-blue-400',
                      pos.assetClass === 'Bond' && 'bg-amber-500/10 text-amber-400',
                      pos.assetClass === 'Crypto' && 'bg-purple-500/10 text-purple-400',
                      pos.assetClass === 'Cash' && 'bg-primary/10 text-primary'
                    )}>
                      {pos.assetClass}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-text/80">
                    {pos.quantity.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                  </td>
                  <td className="py-4 px-4 text-right text-text/80">
                    {formatCurrency(pos.avgCost)}
                  </td>
                  <td className="py-4 px-4 text-right text-white font-bold">
                    {formatCurrency(pos.marketValue)}
                  </td>
                  <td className={clsx(
                    "py-4 px-4 text-right font-bold",
                    isPositive && "text-primary",
                    isNegative && "text-red-500",
                    pos.unrealizedPnl === 0 && "text-text/40"
                  )}>
                    {pos.unrealizedPnl !== 0 ? (
                      <>
                        <div>{isPositive ? '+' : ''}{formatCurrency(pos.unrealizedPnl)}</div>
                        <div className="text-[10px] font-sans font-medium mt-0.5">
                          {formatPercent(returnPct)}
                        </div>
                      </>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
