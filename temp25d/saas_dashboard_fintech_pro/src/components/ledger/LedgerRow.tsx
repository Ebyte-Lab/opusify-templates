import React from 'react';
import { LedgerTransaction } from '../../types/transaction';
import { formatCurrency } from '../../lib/format';
import clsx from 'clsx';

interface LedgerRowProps {
  transaction: LedgerTransaction;
  onClick: () => void;
}

// Pure helper function for amount style colors and prefixes
const getAmountMeta = (amount: number) => {
  const isPositive = amount > 0;
  return {
    amountClass: isPositive ? "text-primary" : "text-red-500",
    prefix: isPositive ? "+" : "",
  };
};

export const LedgerRow: React.FC<LedgerRowProps> = ({ transaction, onClick }) => {
  const { amountClass, prefix } = getAmountMeta(transaction.amount);

  return (
    <tr 
      onClick={onClick}
      className="hover:bg-secondary/20 cursor-pointer transition-colors border-b border-gray-800/40"
    >
      {/* Category / ID */}
      <td className="py-4 px-4 font-semibold text-white">
        <div>{transaction.category}</div>
        <div className="text-[10px] text-text/45 mt-0.5 font-mono">{transaction.id}</div>
      </td>

      {/* Timestamp */}
      <td className="py-4 px-4 text-text/60 font-mono">{transaction.date}</td>

      {/* Category Classification Badge */}
      <td className="py-4 px-4">
        <span className={clsx(
          "px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider font-mono",
          transaction.type === 'CREDIT' 
            ? 'bg-primary/10 text-primary' 
            : 'bg-red-500/10 text-red-400'
        )}>
          {transaction.type}
        </span>
      </td>

      {/* Valuation Amount */}
      <td className={clsx("py-4 px-4 text-right font-bold font-mono", amountClass)}>
        {prefix}{formatCurrency(Math.abs(transaction.amount))}
      </td>

      {/* System Status */}
      <td className="py-4 px-4 text-center">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-800 text-white border border-gray-700 font-mono">
          <span className={clsx(
            "w-1.5 h-1.5 rounded-full",
            transaction.status === 'SETTLED' ? 'bg-primary' : 'bg-blue-400'
          )}></span>
          {transaction.status}
        </span>
      </td>
    </tr>
  );
};
