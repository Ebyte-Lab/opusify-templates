import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ReadingProgressBar: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div 
      id="progress-bar" 
      className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-75" 
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress bar"
    />
  );
};
