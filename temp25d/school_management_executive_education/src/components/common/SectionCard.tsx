import React from 'react';
import { clsx } from 'clsx';

interface SectionCardProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  action,
  children,
  className,
  footer,
}) => {
  return (
    <section className={clsx("bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col", className)}>
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
        <h2 className="font-heading font-bold text-lg text-text">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      <div className="flex-grow">
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
          {footer}
        </div>
      )}
    </section>
  );
};
