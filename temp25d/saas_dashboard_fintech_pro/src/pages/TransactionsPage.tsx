import React from 'react';
import { LedgerTable } from '../components/ledger/LedgerTable';
import { FileSpreadsheet } from 'lucide-react';
import { ledgerTransactions } from '../data/ledgerTransactions';

export const TransactionsPage: React.FC = () => {
  const handleExport = () => {
    alert(`Exporting ${ledgerTransactions.length} settled audit transactions to FINTECH_PRO_ledger.csv`);
  };

  return (
    <div className="p-6 space-y-6 flex-grow animate-[fadeIn_0.4s_ease]">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Financial Transaction Ledger</h2>
          <p className="text-xs text-text/45 mt-0.5">Audit traces, block confirmations, and clearing settlement records</p>
        </div>

        <div className="flex items-center gap-2 select-none">
          <button
            onClick={handleExport}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs rounded-xl border border-gray-700 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-primary" />
            Export CSV Ledger
          </button>
        </div>
      </div>

      {/* Full Ledger Table with Pagination and Filters enabled */}
      <LedgerTable showPagination={true} showSearchAndFilters={true} />

    </div>
  );
};
