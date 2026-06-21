import { useMemo } from 'react';

export type ChartPeriod = '24H' | '1W' | '1M' | '1Y';

export interface ChartPoint {
  label: string;
  value: number;
  date: string;
}

const chartDataSets: Record<ChartPeriod, ChartPoint[]> = {
  '24H': [
    { label: '00:00', value: 1220000, date: 'Jun 15, 00:00 UTC' },
    { label: '04:00', value: 1234000, date: 'Jun 15, 04:00 UTC' },
    { label: '08:00', value: 1229000, date: 'Jun 15, 08:00 UTC' },
    { label: '12:00', value: 1242000, date: 'Jun 15, 12:00 UTC' },
    { label: '16:00', value: 1238000, date: 'Jun 15, 16:00 UTC' },
    { label: '20:00', value: 1245000, date: 'Jun 15, 20:00 UTC' },
    { label: '23:59', value: 1248390.15, date: 'Jun 15, 23:59 UTC' },
  ],
  '1W': [
    { label: 'Mon', value: 1190000, date: 'Jun 09' },
    { label: 'Tue', value: 1210000, date: 'Jun 10' },
    { label: 'Wed', value: 1205000, date: 'Jun 11' },
    { label: 'Thu', value: 1228000, date: 'Jun 12' },
    { label: 'Fri', value: 1235000, date: 'Jun 13' },
    { label: 'Sat', value: 1240000, date: 'Jun 14' },
    { label: 'Sun', value: 1248390.15, date: 'Jun 15' },
  ],
  '1M': [
    { label: 'Wk 1', value: 1150000, date: 'Week 1 Performance' },
    { label: 'Wk 2', value: 1180000, date: 'Week 2 Performance' },
    { label: 'Wk 3', value: 1210000, date: 'Week 3 Performance' },
    { label: 'Wk 4', value: 1248390.15, date: 'Week 4 Performance' },
  ],
  '1Y': [
    { label: 'Q1', value: 980000, date: 'Q1 Financial Close' },
    { label: 'Q2', value: 1050000, date: 'Q2 Financial Close' },
    { label: 'Q3', value: 1150000, date: 'Q3 Financial Close' },
    { label: 'Q4', value: 1248390.15, date: 'Q4 Financial Close' },
  ],
};

export function usePerformanceChart(period: ChartPeriod) {
  return useMemo(() => chartDataSets[period], [period]);
}
