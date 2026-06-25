import React from 'react';

interface GaugeCircleProps {
  value: number;           // 0–100
  label: string;           // e.g. "CPU"
  size?: number;           // default 80
  strokeWidth?: number;    // default 6
}

export const GaugeCircle: React.FC<GaugeCircleProps> = ({
  value,
  label,
  size = 80,
  strokeWidth = 3
}) => {
  const clampedVal = Math.max(0, Math.min(100, value));

  // Determine stroke color based on threshold
  let strokeColor = 'var(--primary)'; // < 70% Yellow
  if (clampedVal >= 90) {
    strokeColor = 'var(--neon-red)'; // >= 90% Red
  } else if (clampedVal >= 70) {
    strokeColor = 'var(--neon-blue)'; // 70-89% Blue/Cyan
  }

  return (
    <div 
      className="relative flex items-center justify-center select-none"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg 
        className="w-full h-full transform -rotate-90" 
        viewBox="0 0 36 36"
      >
        {/* Track Circle */}
        <path 
          className="text-zinc-800 stroke-current" 
          strokeWidth={strokeWidth - 0.5} 
          fill="none" 
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
        />
        {/* Dynamic Gauge Arc */}
        <path 
          className="gauge-circle" 
          stroke={strokeColor}
          strokeDasharray={`${clampedVal}, 100`} 
          strokeWidth={strokeWidth} 
          fill="none" 
          strokeLinecap="round" 
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
        />
      </svg>
      {/* Label overlays */}
      <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
        <span className="text-[10px] text-zinc-500 uppercase leading-none">{label}</span>
      </div>
    </div>
  );
};
