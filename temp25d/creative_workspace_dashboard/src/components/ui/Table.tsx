import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children, className, ...props }) => {
  return (
    <div className="w-full overflow-x-auto border border-surface-border rounded-xl bg-surface-card select-text">
      <table className={twMerge('w-full border-collapse text-left text-xs', className)} {...props}>
        {children}
      </table>
    </div>
  );
};

export const THead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...props }) => {
  return (
    <thead className={twMerge('bg-surface-elevated/40 text-gray-400 font-bold uppercase tracking-wider border-b border-surface-border text-[10px]', className)} {...props}>
      {children}
    </thead>
  );
};

export const TBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...props }) => {
  return (
    <tbody className={twMerge('divide-y divide-surface-border/50', className)} {...props}>
      {children}
    </tbody>
  );
};

export const TR: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ children, className, ...props }) => {
  return (
    <tr className={twMerge('hover:bg-surface-elevated/20 transition-colors', className)} {...props}>
      {children}
    </tr>
  );
};

export const TH: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => {
  return (
    <th className={twMerge('px-6 py-4 font-semibold text-gray-400', className)} {...props}>
      {children}
    </th>
  );
};

export const TD: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => {
  return (
    <td className={twMerge('px-6 py-4.5 text-gray-300 align-middle', className)} {...props}>
      {children}
    </td>
  );
};
