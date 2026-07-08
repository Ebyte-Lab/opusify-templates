import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'bg-surface-card rounded-xl border border-surface-border/60 shadow-sm overflow-hidden transition-all duration-250',
            {
              'hover:shadow-md hover:border-brand-500/25': hoverEffect,
            },
            className
          )
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={twMerge('px-6 py-4 border-b border-surface-border/50 bg-white/50', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={twMerge('text-base font-semibold leading-none tracking-tight text-brand-900', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={twMerge('text-xs text-brand-600/70 mt-1', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={twMerge('p-6', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={twMerge('px-6 py-4 border-t border-surface-border/40 bg-surface-elevated/20 flex items-center justify-end gap-2', className)} {...props}>
    {children}
  </div>
);
