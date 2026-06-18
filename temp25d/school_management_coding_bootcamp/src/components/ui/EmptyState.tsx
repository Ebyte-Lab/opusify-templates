import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="border border-secondary border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center bg-secondary/5">
      {icon && <div className="text-text/30 mb-4">{icon}</div>}
      <h3 className="text-white font-bold mb-1 font-heading text-lg">{title}</h3>
      <p className="text-xs text-text/50 max-w-sm mb-6 leading-relaxed">{description}</p>
      {action}
    </div>
  );
};
