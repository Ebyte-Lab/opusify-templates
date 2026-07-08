import React from 'react';
import { mockTickerItems } from '../../data/ticker';

export const TickerBar: React.FC = () => {
  // Loop the items twice to ensure a seamless continuous marquee
  const doubleItems = [...mockTickerItems, ...mockTickerItems];

  return (
    <section className="bg-text text-bg py-2.5 overflow-hidden border-b border-borderCol select-none z-50">
      <div className="flex whitespace-nowrap">
        <div className="flex animate-ticker uppercase tracking-wider text-xs font-bold font-mono">
          {doubleItems.map((item, index) => (
            <span key={`${item.id}-${index}`} className="mx-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping shrink-0"></span>
              <span>{item.text}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TickerBar;
