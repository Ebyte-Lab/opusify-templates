import React from 'react';

interface MiniStatCardProps {
  title: string;
  value: string;
  valueClass?: string;
  description: React.ReactNode;
}

export const MiniStatCard: React.FC<MiniStatCardProps> = ({ 
  title, 
  value, 
  valueClass = "text-white", 
  description 
}) => {
  return (
    <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between min-h-[120px]">
      <span className="text-[10px] uppercase tracking-wider font-bold text-text/45">
        {title}
      </span>
      <div className="mt-2">
        <p className={`text-2xl font-bold font-mono ${valueClass}`}>
          {value}
        </p>
        <div className="mt-1">
          {description}
        </div>
      </div>
    </div>
  );
};
