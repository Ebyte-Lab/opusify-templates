import React, { useEffect, useRef } from 'react';
import { useTraceModal } from '../../hooks/useTraceModal';
import { formatCurrency } from '../../lib/format';
import { X, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

export const TraceModal: React.FC = () => {
  const { isOpen, transaction, close } = useTraceModal();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Focus trap: focus the modal container when opened
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !transaction) return null;

  const isPositive = transaction.amount > 0;
  const formattedAmount = `${isPositive ? '+' : ''}${formatCurrency(transaction.amount)}`;
  const amountClass = isPositive ? 'text-primary' : 'text-red-500';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-secondary border border-gray-700 max-w-md w-full rounded-2xl overflow-hidden shadow-2xl relative outline-none animate-[fadeIn_0.2s_ease-out]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <span id="modal-title" className="text-xs uppercase font-bold text-primary tracking-widest font-mono">
            &gt;_ Audit Trace
          </span>
          <button 
            onClick={close} 
            className="text-text/45 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-[18px] h-[18px]" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="text-center py-4 bg-gray-900/30 rounded-xl border border-gray-800">
            <p className="text-[10px] text-text/45 uppercase tracking-wide">Transferred Capital Value</p>
            <p className={clsx("text-3xl font-extrabold font-mono mt-2", amountClass)}>
              {formattedAmount}
            </p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-text/45">TRANSACTION ID:</span>
              <span className="text-white">{transaction.id}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-text/45">LEDGER CLASSIFY:</span>
              <span className="text-white">{transaction.type}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-text/45">TIMESTAMP:</span>
              <span className="text-white">{transaction.date}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-text/45">BLOCKCHAIN REFERENCE:</span>
              <span className="text-primary truncate max-w-44 hover:text-emerald-400 transition-colors" title={transaction.hash}>
                {transaction.hash}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text/45">AUDIT SIGNATURE:</span>
              <span className="text-green-500 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED SIGNED
              </span>
            </div>
          </div>

          <button 
            onClick={close} 
            className="w-full bg-primary text-black font-semibold py-2.5 rounded-xl hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
          >
            Close Ledger Review
          </button>
        </div>
      </div>
    </div>
  );
};
