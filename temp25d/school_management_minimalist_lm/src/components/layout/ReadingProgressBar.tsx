import React from 'react';
import { useReadingProgress } from '../../hooks/useReadingProgress';

export const ReadingProgressBar: React.FC = () => {
  const progress = useReadingProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-secondary z-[60]">
      <div
        id="progress-bar"
        className="h-full bg-primary shadow-[0_0_10px_rgba(20,184,166,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
