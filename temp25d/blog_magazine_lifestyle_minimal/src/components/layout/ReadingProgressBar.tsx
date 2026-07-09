import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ReadingProgressBar: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-secondary/50 z-[60]">
      <div
        id="read-progress"
        className="h-full bg-primary"
        style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
      />
    </div>
  );
};
