export interface ApiKey {
  id: string;
  label: string;
  keyPreview: string;
  createdOn: string;
  status: 'ACTIVE' | 'REVOKED';
}

export const mockApiKeys: ApiKey[] = [
  {
    id: "API-001",
    label: "Desktop Terminal Feed Key",
    keyPreview: "pk_live_897f22a...b29f",
    createdOn: "2026-01-10 11:15",
    status: "ACTIVE"
  },
  {
    id: "API-002",
    label: "Fx Arbitrage Execution Key",
    keyPreview: "pk_live_442e9a1...110a",
    createdOn: "2026-03-04 09:20",
    status: "ACTIVE"
  },
  {
    id: "API-003",
    label: "Sandbox Dev Key",
    keyPreview: "pk_test_3a8b2f9...aa71",
    createdOn: "2026-05-18 17:45",
    status: "REVOKED"
  }
];
