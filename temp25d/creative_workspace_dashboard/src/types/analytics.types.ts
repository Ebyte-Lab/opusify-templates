export interface DailyMetric {
  date: string;
  value: number;
}

export interface AnalyticsSummary {
  activeProjects: number;
  assetsCreated: number;
  storageUsedBytes: number;
  teamLogins: number;
  tasksCompleted: number;
  periodChange: Record<string, number>; // percent change vs prev period
}
