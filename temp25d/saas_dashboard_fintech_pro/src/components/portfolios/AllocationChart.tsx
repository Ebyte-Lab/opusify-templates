import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { positions } from '../../data/positions';
import { formatCurrency } from '../../lib/format';

export const AllocationChart: React.FC = () => {
  // Group positions by asset class
  const allocationData = React.useMemo(() => {
    const groups: Record<string, number> = {};
    positions.forEach((pos) => {
      groups[pos.assetClass] = (groups[pos.assetClass] || 0) + pos.marketValue;
    });

    return Object.entries(groups).map(([name, value]) => ({
      name,
      value,
    }));
  }, []);

  const COLORS = {
    Cash: '#10B981',      // Emerald
    Equity: '#3B82F6',    // Blue
    Bond: '#F59E0B',      // Amber
    Crypto: '#8B5CF6',    // Purple
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-950/95 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-white shadow-2xl">
          <p className="font-bold uppercase tracking-wider">{data.name}</p>
          <p className="text-primary mt-1">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-grow">
        <h3 className="text-base font-semibold text-white mb-1">Asset Allocation</h3>
        <p className="text-xs text-text/45 mb-6">Holdings distribution by asset category</p>
        
        {/* Legend */}
        <div className="space-y-3">
          {allocationData.map((item) => {
            const color = COLORS[item.name as keyof typeof COLORS] || '#9CA3AF';
            const total = allocationData.reduce((sum, i) => sum + i.value, 0);
            const pct = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={item.name} className="flex items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
                  <span className="text-white font-semibold">{item.name}</span>
                </div>
                <div className="text-text/60">
                  <span>{formatCurrency(item.value)}</span>
                  <span className="text-[10px] ml-2 text-text/40 font-semibold">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Donut Chart */}
      <div className="w-48 h-48 shrink-0 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {allocationData.map((entry) => (
                <Cell 
                  key={`cell-${entry.name}`} 
                  fill={COLORS[entry.name as keyof typeof COLORS] || '#9CA3AF'} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-[10px] uppercase font-bold text-text/45">Total Assets</span>
          <span className="text-sm font-bold text-white font-mono mt-0.5">
            {formatCurrency(allocationData.reduce((sum, item) => sum + item.value, 0))}
          </span>
        </div>
      </div>
    </div>
  );
};
