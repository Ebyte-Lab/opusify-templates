import { useMemo } from 'react';
import { useStore } from './useStore';
import { ledgerTransactions } from '../data/ledgerTransactions';

export function useLedger() {
  const ledgerSearch = useStore((state) => state.ledgerSearch);
  const ledgerTypeFilter = useStore((state) => state.ledgerTypeFilter);
  const setLedgerSearch = useStore((state) => state.setLedgerSearch);
  const setLedgerTypeFilter = useStore((state) => state.setLedgerTypeFilter);

  const filteredTransactions = useMemo(() => {
    const query = ledgerSearch.toLowerCase();
    return ledgerTransactions.filter((txn) => {
      // Filter by type
      if (ledgerTypeFilter !== 'ALL' && txn.type !== ledgerTypeFilter) {
        return false;
      }
      // Filter by search query
      const matchesSearch =
        txn.id.toLowerCase().includes(query) ||
        txn.category.toLowerCase().includes(query) ||
        txn.hash.toLowerCase().includes(query);
      
      return matchesSearch;
    });
  }, [ledgerSearch, ledgerTypeFilter]);

  return {
    ledgerSearch,
    ledgerTypeFilter,
    setLedgerSearch,
    setLedgerTypeFilter,
    filteredTransactions,
  };
}
