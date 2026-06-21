import React from 'react';
import { useTickerFeed } from '../../hooks/useTickerFeed';
import { TickerPill } from './TickerPill';

export const TickerRibbon: React.FC = () => {
  const tickers = useTickerFeed();

  return (
    <section className="sticky top-0 z-20 w-full bg-secondary border-b border-gray-800 flex items-center overflow-x-auto whitespace-nowrap py-3 px-6 gap-8 text-xs font-mono select-none no-scrollbar">
      <div className="flex items-center gap-2 pr-6 border-r border-gray-700/50 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-[10px] tracking-widest text-text/45 uppercase font-sans font-bold">
          Live Feed
        </span>
      </div>

      <div className="flex items-center gap-4">
        {tickers.map((ticker) => (
          <TickerPill key={ticker.id} ticker={ticker} />
        ))}
      </div>
    </section>
  );
};
