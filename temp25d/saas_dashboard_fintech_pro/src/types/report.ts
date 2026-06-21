export interface ReportItem {
  id: string;
  title: string;
  type: 'P&L Statement' | 'Tax Summary' | 'Custody Statement';
  periodLabel: string;
  generatedOn: string | null; // null if scheduled but not yet generated
  status: 'ready' | 'processing' | 'scheduled';
}
