import { LedgerTransaction } from '../types/transaction';

export const ledgerTransactions: LedgerTransaction[] = [
  { id: "TXN-90218", date: "2026-06-15 11:42", category: "Securities Settlement", amount: 150000.00, type: "CREDIT", hash: "0x8fa13a90f11d2c2b9f", status: "SETTLED" },
  { id: "TXN-88123", date: "2026-06-15 09:15", category: "Fx Arbitrage Liquidation", amount: -42500.00, type: "DEBIT", hash: "0x4fe19a90f11d2c110a", status: "SETTLED" },
  { id: "TXN-87442", date: "2026-06-14 17:33", category: "Yield Protocol Accrual", amount: 3410.50, type: "CREDIT", hash: "0xc8821a90f11d2c99ef", status: "COMPLETED" },
  { id: "TXN-86920", date: "2026-06-14 14:02", category: "Custody Clearing Charge", amount: -1200.00, type: "DEBIT", hash: "0x3d411a90f11d2cddb3", status: "SETTLED" },
  { id: "TXN-85110", date: "2026-06-13 10:11", category: "Sovereign Bond Allocation", amount: 500000.00, type: "CREDIT", hash: "0xf910aa90f11d2caa71", status: "SETTLED" },
  { id: "TXN-84391", date: "2026-06-13 08:30", category: "Collateral Rebalancing", amount: -115000.00, type: "DEBIT", hash: "0xe2113a90f11d2c66b2", status: "SETTLED" }
];
