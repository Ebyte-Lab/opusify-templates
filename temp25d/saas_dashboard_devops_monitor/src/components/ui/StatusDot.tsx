import React from 'react';
import { ServerStatus } from '../../types';

interface StatusDotProps {
  status: ServerStatus;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
  let colorClass = '';
  let shadowStyle: React.CSSProperties = {};

  if (status === 'online') {
    colorClass = 'bg-[#22C55E] animate-pulse';
    shadowStyle = { boxShadow: '0 0 8px #22C55E' };
  } else if (status === 'degraded') {
    colorClass = 'bg-[#F59E0B]'; // amber-500
  } else {
    colorClass = 'bg-[#EF4444]'; // red-500
  }

  return (
    <span
      className={`w-2.5 h-2.5 rounded-full inline-block shrink-0 ${colorClass}`}
      style={shadowStyle}
      title={status}
    />
  );
};
