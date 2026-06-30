import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ProgressProps {
  value: number; // Percent value, e.g. 0 to 100
  max?: number;
  className?: string;
  color?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = '',
  color = 'bg-brand-500'
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={twMerge('w-full bg-surface-elevated h-2 rounded-full overflow-hidden border border-surface-border/10', className)}>
      <div
        className={twMerge('h-full rounded-full transition-all duration-500 ease-out', color)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
