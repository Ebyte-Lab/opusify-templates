import React from 'react';

export interface BadgeProps {
  label: string;
  variant: 'green' | 'amber' | 'blue' | 'purple' | 'pink' | 'slate';
  size?: 'sm' | 'xs';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant,
  size = 'sm'
}) => {
  const variantStyles = {
    green: 'bg-green-50 text-green-600 border border-green-200/40',
    amber: 'bg-amber-50 text-amber-600 border border-amber-200/40',
    blue: 'bg-blue-50 text-blue-600 border border-blue-200/40',
    purple: 'bg-purple-50 text-purple-600 border border-purple-200/40',
    pink: 'bg-pink-50 text-pink-600 border border-pink-200/40',
    slate: 'bg-slate-100 text-slate-600 border border-slate-200/40'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md',
    xs: 'px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded'
  };

  return (
    <span className={`inline-flex items-center font-heading ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {label}
    </span>
  );
};
