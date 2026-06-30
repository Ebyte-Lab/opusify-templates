import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={twMerge(
            clsx(
              'w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-200 placeholder-gray-500 transition-all focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none resize-none',
              {
                'border-accent-rose focus:border-accent-rose focus:ring-accent-rose': error,
              }
            ),
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-semibold text-accent-rose mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
