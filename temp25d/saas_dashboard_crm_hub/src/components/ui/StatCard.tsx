import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendPositive: boolean;
  children?: React.ReactNode;  // optional ring slot (e.g. CircularProgress)
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  trendPositive,
  children
}) => {
  return (
    <div className="bg-secondary border border-slate-200/60 rounded-3xl p-6 shadow-sm flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">{label}</span>
        <h3 className="text-2xl font-extrabold text-text font-heading">{value}</h3>
        <p className={`text-xs font-semibold flex items-center gap-1 ${
          trendPositive ? 'text-green-500' : 'text-pink-500'
        }`}>
          {trendPositive ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
          {trend}
        </p>
      </div>
      {children && (
        <div className="shrink-0">
          {children}
        </div>
      )}
    </div>
  );
};
