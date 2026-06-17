import React from 'react';

interface CartBadgeProps {
  count: number;
  className?: string;
}

export const CartBadge: React.FC<CartBadgeProps> = ({ count, className = '' }) => {
  if (count <= 0) return null;
  return (
    <span
      className={`bg-primary text-bg font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded shadow-[0_0_10px_rgba(0,229,255,0.5)] ${className}`}
    >
      {count}
    </span>
  );
};
