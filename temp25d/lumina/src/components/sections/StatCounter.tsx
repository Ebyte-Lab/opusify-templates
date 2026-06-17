import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';

interface StatCounterProps {
  target: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
}

export const StatCounter: React.FC<StatCounterProps> = ({ target, label, suffix = '', icon }) => {
  const { count, elementRef } = useCountUp(target);

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="flex flex-col items-center p-6 text-center"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <span className="font-heading text-4xl md:text-5xl font-semibold text-text mb-2">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm font-semibold text-text/60">{label}</span>
    </div>
  );
};
