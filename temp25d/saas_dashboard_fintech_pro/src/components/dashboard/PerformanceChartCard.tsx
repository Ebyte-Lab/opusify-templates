import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { usePerformanceChart, ChartPeriod } from '../../hooks/usePerformanceChart';
import { formatCurrency } from '../../lib/format';
import clsx from 'clsx';

export const PerformanceChartCard: React.FC = () => {
  const [period, setPeriod] = useState<ChartPeriod>('24H');
  const chartData = usePerformanceChart(period);

  const periods: ChartPeriod[] = ['24H', '1W', '1M', '1Y'];

  // Custom tooltips to match the premium dark visual styling
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-950/95 border border-primary/45 rounded-lg px-3 py-2 text-xs font-mono text-white shadow-2xl">
          <p className="text-[10px] text-text/45 mb-1">{data.date}</p>
          <p className="font-bold text-primary">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="xl:col-span-2 bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-white">Portfolio Optimization Curve</h3>
          <p className="text-xs text-text/45">Dynamic visual analysis relative to indexing</p>
        </div>
        
        {/* Period Selector Tabs */}
        <div className="flex bg-gray-950/40 border border-gray-800 rounded-lg p-1 text-xs select-none">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={clsx(
                "px-3 py-1 rounded-md transition-all font-semibold",
                period === p 
                  ? "bg-primary text-black" 
                  : "text-text/50 hover:text-text"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Plot Container */}
      <div className="relative w-full h-72 border-b border-gray-800/80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              vertical={false} 
              stroke="#1f2937" 
              strokeDasharray="4 4" 
            />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'rgba(243, 244, 246, 0.4)', fontSize: 10, fontFamily: 'Consolas, Monaco, monospace' }}
            />
            <YAxis 
              hide={true} 
              domain={['dataMin - 1000', 'dataMax + 1000']}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: 'rgba(16, 185, 129, 0.3)', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="var(--primary)" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#chartGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Subtext info indicators */}
      <div className="flex justify-between mt-3 text-[10px] font-mono text-text/40">
        <span>EST. VALUE SERIES OVER TIME</span>
        <span>INDEXING: ENABLED</span>
      </div>
    </div>
  );
};
