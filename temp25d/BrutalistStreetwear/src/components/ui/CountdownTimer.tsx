import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const { hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div 
      className="flex space-x-4 md:space-x-8 bg-bg heavy-border p-4 md:p-6 brutal-hover"
      role="timer"
      aria-label={`Countdown remaining: ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
    >
      <div className="flex flex-col items-center">
        <span className="font-heading text-4xl md:text-6xl text-primary">{hours}</span>
        <span className="text-[10px] md:text-xs font-bold uppercase mt-1">Hours</span>
      </div>
      <span className="font-heading text-4xl md:text-6xl text-secondary animate-pulse" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <span className="font-heading text-4xl md:text-6xl text-primary">{minutes}</span>
        <span className="text-[10px] md:text-xs font-bold uppercase mt-1">Mins</span>
      </div>
      <span className="font-heading text-4xl md:text-6xl text-secondary animate-pulse" aria-hidden="true">:</span>
      <div className="flex flex-col items-center">
        <span className="font-heading text-4xl md:text-6xl text-primary">{seconds}</span>
        <span className="text-[10px] md:text-xs font-bold uppercase mt-1">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
