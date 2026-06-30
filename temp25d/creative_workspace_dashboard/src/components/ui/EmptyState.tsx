import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-surface-border rounded-2xl bg-surface-card/45 min-h-[300px]">
      {Icon && (
        <div className="p-4 rounded-full bg-surface-elevated text-gray-500 mb-4 border border-surface-border">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-sm font-bold text-gray-200 font-heading">{title}</h3>
      <p className="text-xs text-gray-500 max-w-sm mt-1 mb-6 leading-relaxed">
        {description}
      </p>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
