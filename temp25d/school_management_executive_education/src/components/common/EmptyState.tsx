import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
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
    <div className="py-12 px-4 text-center text-text/50 max-w-md mx-auto flex flex-col items-center">
      <div className="mb-4 text-text/40">{icon}</div>
      <h3 className="font-heading text-lg font-bold text-text mb-2">{title}</h3>
      <p className="text-sm mb-6 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
