import React, { useState, useEffect } from 'react';
import { useLedger } from '../../hooks/useLedger';
import { useTraceModal } from '../../hooks/useTraceModal';
import { LedgerRow } from './LedgerRow';
import { LedgerSearchInput } from './LedgerSearchInput';
import { LedgerFilterTabs } from './LedgerFilterTabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LedgerTableProps {
  limit?: number;
  showPagination?: boolean;
  showSearchAndFilters?: boolean;
}

export const LedgerTable: React.FC<LedgerTableProps> = ({
  limit,
  showPagination = false,
  showSearchAndFilters = true,
}) => {
  const {
    ledgerSearch,
    ledgerTypeFilter,
    setLedgerSearch,
    setLedgerTypeFilter,
    filteredTransactions,
  } = useLedger();

  const { open: openTraceModal } = useTraceModal();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [ledgerSearch, ledgerTypeFilter]);

  // Compute sliced items
  const displayedTransactions = React.useMemo(() => {
    if (limit) {
      return filteredTransactions.slice(0, limit);
    }
    if (showPagination) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
    }
    return filteredTransactions;
  }, [filteredTransactions, limit, showPagination, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;

  return (
    <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md">
      
      {/* Title & Filter Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-800">
        <div>
          <h3 className="text-base font-semibold text-white">System Ledger History</h3>
          <p className="text-xs text-text/45">Faceted transactional audits</p>
        </div>

        {showSearchAndFilters && (
          <div className="flex flex-wrap items-center gap-3">
            <LedgerSearchInput 
              value={ledgerSearch} 
              onChange={setLedgerSearch} 
            />
            <LedgerFilterTabs 
              activeFilter={ledgerTypeFilter} 
              onChange={setLedgerTypeFilter} 
            />
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase font-bold tracking-wider text-text/45 border-b border-gray-800/60 pb-3">
              <th scope="col" className="py-3 px-4">Transaction / ID</th>
              <th scope="col" className="py-3 px-4">Date Time</th>
              <th scope="col" className="py-3 px-4">Ledger Category</th>
              <th scope="col" className="py-3 px-4 text-right">Value Amount</th>
              <th scope="col" className="py-3 px-4 text-center">System Status</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-gray-800/40 font-mono">
            {displayedTransactions.length > 0 ? (
              displayedTransactions.map((txn) => (
                <LedgerRow 
                  key={txn.id} 
                  transaction={txn} 
                  onClick={() => openTraceModal(txn)} 
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-text/40 font-sans">
                  No matching ledger transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {showPagination && !limit && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800/40 select-none">
          <span className="text-xs text-text/45 font-mono">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-800 bg-gray-900/40 text-text/60 hover:text-white disabled:opacity-30 disabled:hover:text-text/60 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-800 bg-gray-900/40 text-text/60 hover:text-white disabled:opacity-30 disabled:hover:text-text/60 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
