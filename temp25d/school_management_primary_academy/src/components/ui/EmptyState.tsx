import React from 'react';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 ${className}`}>
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm mb-4 border border-gray-100">
        {icon || <Sparkles size={28} className="text-primary" />}
      </div>
      <h3 className="font-heading font-bold text-xl text-text mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6 text-sm font-medium">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-primary text-text font-heading font-bold px-6 py-2.5 rounded-xl shadow-chunky btn-chunky hover:bg-yellow-400 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
export default EmptyState;
