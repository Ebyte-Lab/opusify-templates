import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, leftElement, rightElement, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3.5 text-gray-400 pointer-events-none shrink-0">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={twMerge(
              clsx(
                'w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-200 placeholder-gray-500 transition-all focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none',
                {
                  'pl-10': leftElement,
                  'pr-10': rightElement,
                  'border-accent-rose focus:border-accent-rose focus:ring-accent-rose': error,
                }
              ),
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3.5 text-gray-400 shrink-0">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-[10px] font-semibold text-accent-rose mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
