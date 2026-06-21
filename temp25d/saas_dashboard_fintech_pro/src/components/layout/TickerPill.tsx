import React from 'react';
import { TickerState } from '../../hooks/useStore';
import clsx from 'clsx';

interface TickerPillProps {
  ticker: TickerState;
}

export const TickerPill: React.FC<TickerPillProps> = ({ ticker }) => {
  const isPositive = ticker.deltaPct >= 0;
  const decimals = ticker.id === 'ticker-eur' ? 4 : 2;

  const formattedValue = ticker.value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const formattedDelta = `${isPositive ? '+' : ''}${ticker.deltaPct.toFixed(2)}%`;

  return (
    <div 
      className={clsx(
        "flex items-center gap-2 bg-gray-900/30 px-3 py-1 rounded transition-all select-none",
        ticker.flashDirection === 'up' && "flash-up",
        ticker.flashDirection === 'down' && "flash-down"
      )}
    >
      <span className="text-text/50">{ticker.label}</span>
      <span className="text-white font-bold tracking-tight font-mono">{formattedValue}</span>
      <span className={clsx(
        "flex items-center font-bold text-[11px] font-mono",
        isPositive ? "text-primary" : "text-red-500"
      )}>
        {formattedDelta}
      </span>
    </div>
  );
};
