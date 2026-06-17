import React from 'react';
import type { PurchaseType } from '../../types/product';

interface PurchaseToggleProps {
  purchaseType: PurchaseType;
  onChange: (type: PurchaseType) => void;
}

export const PurchaseToggle: React.FC<PurchaseToggleProps> = ({ purchaseType, onChange }) => {
  const isSub = purchaseType === 'sub';

  return (
    <div className="relative flex bg-secondary/20 p-1 rounded-full w-full max-w-[280px] mx-auto mb-6">
      <div
        className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out"
        style={{
          transform: isSub ? 'translateX(calc(100% + 8px))' : 'translateX(0)',
        }}
      />
      <button
        type="button"
        onClick={() => onChange('one-time')}
        className={`relative flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 ${
          !isSub ? 'text-primary' : 'text-text/50'
        }`}
      >
        One-Time
      </button>
      <button
        type="button"
        onClick={() => onChange('sub')}
        className={`relative flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 ${
          isSub ? 'text-primary' : 'text-text/50'
        }`}
      >
        Subscribe
      </button>
    </div>
  );
};
