import { create } from 'zustand';
import { TickerSymbol } from '../types/ticker';
import { LedgerTransaction, CurrencyCode } from '../types/transaction';
import { initialTickers } from '../data/tickerSymbols';

export interface TickerState extends TickerSymbol {
  flashDirection: 'up' | 'down' | null;
}

interface AppState {
  // Mobile Sidebar
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;

  // Tickers
  tickers: TickerState[];
  setTickers: (tickers: TickerState[]) => void;
  updateTicker: (id: string, value: number, deltaPct: number, flashDirection: 'up' | 'down' | null) => void;

  // Currency Converter
  converterAmount: number;
  converterBase: CurrencyCode;
  converterTarget: CurrencyCode;
  setConverterAmount: (amount: number) => void;
  setConverterBase: (base: CurrencyCode) => void;
  setConverterTarget: (target: CurrencyCode) => void;
  swapConverter: () => void;

  // Ledger Filter
  ledgerSearch: string;
  ledgerTypeFilter: 'ALL' | 'CREDIT' | 'DEBIT';
  setLedgerSearch: (search: string) => void;
  setLedgerTypeFilter: (filter: 'ALL' | 'CREDIT' | 'DEBIT') => void;

  // Trace Modal
  isTraceModalOpen: boolean;
  traceTransaction: LedgerTransaction | null;
  openTraceModal: (txn: LedgerTransaction) => void;
  closeTraceModal: () => void;
}

export const useStore = create<AppState>((set) => ({
  isSidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  tickers: initialTickers.map(t => ({
    id: t.id,
    label: t.label,
    value: t.value,
    deltaPct: t.deltaPct,
    flashDirection: null
  })),
  setTickers: (tickers) => set({ tickers }),
  updateTicker: (id, value, deltaPct, flashDirection) => set((state) => ({
    tickers: state.tickers.map((t) =>
      t.id === id ? { ...t, value, deltaPct, flashDirection } : t
    ),
  })),

  converterAmount: 1000,
  converterBase: 'USD',
  converterTarget: 'EUR',
  setConverterAmount: (converterAmount) => set({ converterAmount }),
  setConverterBase: (converterBase) => set({ converterBase }),
  setConverterTarget: (converterTarget) => set({ converterTarget }),
  swapConverter: () => set((state) => ({
    converterBase: state.converterTarget,
    converterTarget: state.converterBase,
  })),

  ledgerSearch: '',
  ledgerTypeFilter: 'ALL',
  setLedgerSearch: (ledgerSearch) => set({ ledgerSearch }),
  setLedgerTypeFilter: (ledgerTypeFilter) => set({ ledgerTypeFilter }),

  isTraceModalOpen: false,
  traceTransaction: null,
  openTraceModal: (traceTransaction) => set({ isTraceModalOpen: true, traceTransaction }),
  closeTraceModal: () => set({ isTraceModalOpen: false, traceTransaction: null }),
}));
