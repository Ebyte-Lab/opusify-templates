import React from 'react';

interface MetricBarProps {
  value: number;
  showLabel?: boolean;
}

export const MetricBar: React.FC<MetricBarProps> = ({ value, showLabel = false }) => {
  // Clamped value
  const clampedVal = Math.max(0, Math.min(100, value));

  // Threshold colors matching the spec
  let fillColor = 'bg-[var(--primary)]'; // < 75% Yellow
  if (clampedVal >= 90) {
    fillColor = 'bg-[var(--neon-red)]'; // >= 90% Red
  } else if (clampedVal >= 75) {
    fillColor = 'bg-[#F59E0B]'; // 75-89% Amber
  }

  return (
    <div className="w-full flex flex-col gap-1">
      {showLabel && (
        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
          <span>Usage</span>
          <span className="font-bold text-white">{clampedVal}%</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-zinc-800 rounded overflow-hidden">
        <div
          className={`h-full ${fillColor} rounded transition-all duration-500 ease-out`}
          style={{ width: `${clampedVal}%` }}
        />
      </div>
    </div>
  );
};
