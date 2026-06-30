import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'circle' | 'rect' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'animate-pulse bg-surface-elevated border border-surface-border/20',
        variant === 'circle' ? 'rounded-full' : variant === 'text' ? 'h-3.5 w-3/4 rounded' : 'rounded-xl',
        className
      )}
      {...props}
    />
  );
};
