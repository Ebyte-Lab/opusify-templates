import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full bg-bg rounded-full h-1.5 overflow-hidden border border-secondary ${className}`}>
      <div
        className="bg-primary h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};
