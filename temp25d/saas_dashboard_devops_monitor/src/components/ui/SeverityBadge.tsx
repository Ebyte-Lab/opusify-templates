import React from 'react';
import { AlertSeverity } from '../../types';

interface SeverityBadgeProps {
  severity: AlertSeverity;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  let badgeStyle = "px-2 py-0.5 rounded text-[9px] uppercase font-bold border ";

  if (severity === 'CRITICAL') {
    badgeStyle += "border-red-800/40 bg-red-950/20 text-red-400";
  } else if (severity === 'HIGH') {
    badgeStyle += "border-orange-800/40 bg-orange-950/20 text-orange-400";
  } else if (severity === 'MEDIUM') {
    badgeStyle += "border-yellow-800/40 bg-yellow-950/20 text-yellow-400";
  } else { // LOW
    badgeStyle += "border-zinc-700 bg-zinc-900 text-zinc-400";
  }

  return (
    <span className={badgeStyle}>
      {severity}
    </span>
  );
};
