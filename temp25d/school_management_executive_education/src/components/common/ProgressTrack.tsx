import React from 'react';
import { clsx } from 'clsx';

interface ProgressTrackProps {
  title: string;
  subtitle: string;
  percentComplete: number;
  className?: string;
}

export const ProgressTrack: React.FC<ProgressTrackProps> = ({
  title,
  subtitle,
  percentComplete,
  className,
}) => {
  // Ensure percent is between 0 and 100
  const clampedPercent = Math.min(100, Math.max(0, percentComplete));

  return (
    <div className={clsx("space-y-2", className)}>
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-bold text-text mb-0.5">{title}</h3>
          <p className="text-xs text-text/60">{subtitle}</p>
        </div>
        <span className="text-sm font-bold text-primary">{clampedPercent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={clampedPercent} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${clampedPercent}%` }} 
        />
      </div>
    </div>
  );
};
