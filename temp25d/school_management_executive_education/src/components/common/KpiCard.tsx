import React from 'react';

interface KpiCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 bg-secondary/50 rounded-sm flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-heading font-bold text-text">{value}</div>
        <div className="text-xs font-semibold text-text/60 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
};
