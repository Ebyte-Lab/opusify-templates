import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { twMerge } from 'tailwind-merge';

interface StatCardProps {
  label: string;
  value: string | number;
  trend: number; // positive = up, negative = down
  icon: LucideIcon;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  icon: Icon,
  accentColor = 'text-brand-400'
}) => {
  const isPositive = trend >= 0;

  return (
    <Card className="p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
        <div className={twMerge('p-2 rounded-xl bg-surface-elevated border border-surface-border/50 shrink-0', accentColor)}>
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-bold font-heading text-white tracking-tight">{value}</span>
        <span
          className={twMerge(
            'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold border',
            isPositive
              ? 'bg-accent-teal/10 text-accent-teal border-accent-teal/20'
              : 'bg-accent-rose/10 text-accent-rose border-accent-rose/20'
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3 h-3 shrink-0" />
          ) : (
            <ArrowDownRight className="w-3 h-3 shrink-0" />
          )}
          {isPositive ? '+' : ''}
          {trend}%
        </span>
      </div>
    </Card>
  );
};
