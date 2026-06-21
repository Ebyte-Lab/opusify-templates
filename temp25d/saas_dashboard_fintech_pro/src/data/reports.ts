import { ReportItem } from '../types/report';

export const mockReports: ReportItem[] = [
  {
    id: "REP-2026-Q1",
    title: "Q1 2026 Consolidated P&L Statement",
    type: "P&L Statement",
    periodLabel: "Jan 1, 2026 - Mar 31, 2026",
    generatedOn: "2026-04-15 08:30 UTC",
    status: "ready"
  },
  {
    id: "REP-2025-TAX",
    title: "Annual Tax Summary & Declaration (2025)",
    type: "Tax Summary",
    periodLabel: "Jan 1, 2025 - Dec 31, 2025",
    generatedOn: "2026-02-10 14:15 UTC",
    status: "ready"
  },
  {
    id: "REP-2026-CUST",
    title: "Quarterly Asset Custody Verification Report",
    type: "Custody Statement",
    periodLabel: "Apr 1, 2026 - Jun 30, 2026",
    generatedOn: null,
    status: "processing"
  },
  {
    id: "REP-2026-M5",
    title: "Monthly Performance Statement (May 2026)",
    type: "P&L Statement",
    periodLabel: "May 1, 2026 - May 31, 2026",
    generatedOn: "2026-06-01 00:05 UTC",
    status: "ready"
  },
  {
    id: "REP-2026-SCHED",
    title: "Scheduled Custody Settlement Clearance Report",
    type: "Custody Statement",
    periodLabel: "Jul 1, 2026 - Sep 30, 2026",
    generatedOn: null,
    status: "scheduled"
  }
];
