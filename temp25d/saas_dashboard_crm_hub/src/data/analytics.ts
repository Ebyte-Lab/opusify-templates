export interface RevenueDataPoint {
  month: string;
  revenue: number;
}

export interface FunnelStage {
  stageName: string;
  count: number;
  conversionRate: number;
}

export const monthlyRevenue: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 41000 },
  { month: 'Mar', revenue: 39000 },
  { month: 'Apr', revenue: 54000 },
  { month: 'May', revenue: 58000 },
  { month: 'Jun', revenue: 60500 }
];

export const pipelineFunnel: FunnelStage[] = [
  { stageName: 'Contacted', count: 18, conversionRate: 100 },
  { stageName: 'Proposal Sent', count: 12, conversionRate: 66.7 },
  { stageName: 'Negotiation', count: 8, conversionRate: 44.4 },
  { stageName: 'Closed Won', count: 5, conversionRate: 27.8 }
];
