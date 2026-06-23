import React, { useState } from 'react';
import type { RevenueDataPoint } from '../../data/analytics';

interface BarChartProps {
  data: RevenueDataPoint[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 320;
  const padding = { top: 30, right: 20, bottom: 40, left: 50 };

  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  // Max value calculation for Y axis scale (rounded up)
  const maxVal = Math.max(...data.map(d => d.revenue));
  const yAxisMax = Math.ceil(maxVal / 10000) * 10000;

  // Y Axis ticks (0, 20k, 40k, 60k, 80k...)
  const yTicks = [0, yAxisMax * 0.25, yAxisMax * 0.5, yAxisMax * 0.75, yAxisMax];

  // Bar spacing
  const barGap = 20;
  const totalBars = data.length;
  const barWidth = (chartWidth - (barGap * (totalBars + 1))) / totalBars;

  const getBarHeight = (value: number) => {
    return (value / yAxisMax) * chartHeight;
  };

  const getBarY = (value: number) => {
    return padding.top + chartHeight - getBarHeight(value);
  };

  const getBarX = (index: number) => {
    return padding.left + barGap + index * (barWidth + barGap);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full relative font-body">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible select-none"
      >
        {/* Y-Axis Grid Lines & Labels */}
        {yTicks.map((tick, i) => {
          const yPos = padding.top + chartHeight - (tick / yAxisMax) * chartHeight;
          return (
            <g key={i} className="text-slate-400 font-mono text-[10px]">
              <line
                x1={padding.left}
                y1={yPos}
                x2={svgWidth - padding.right}
                y2={yPos}
                className="stroke-slate-100"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 12}
                y={yPos + 3.5}
                textAnchor="end"
                className="fill-slate-400 font-bold"
              >
                {tick >= 1000 ? `${tick / 1000}k` : tick}
              </text>
            </g>
          );
        })}

        {/* Bars and X Labels */}
        {data.map((item, idx) => {
          const x = getBarX(idx);
          const y = getBarY(item.revenue);
          const h = getBarHeight(item.revenue);
          const isHovered = hoveredIdx === idx;

          return (
            <g key={idx}>
              {/* SVG Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx={6}
                className="fill-primary cursor-pointer transition-all duration-200"
                style={{
                  fill: isHovered ? 'var(--primary)' : 'rgba(236, 72, 153, 0.85)',
                  filter: isHovered ? 'drop-shadow(0 4px 6px rgba(236, 72, 153, 0.3))' : 'none'
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />

              {/* X Axis Month Label */}
              <text
                x={x + barWidth / 2}
                y={padding.top + chartHeight + 20}
                className="fill-slate-400 font-heading font-semibold text-[11px]"
                textAnchor="middle"
              >
                {item.month}
              </text>

              {/* Hover Tooltip inside SVG */}
              {isHovered && (
                <g className="pointer-events-none animate-fadeIn">
                  {/* Tooltip background */}
                  <rect
                    x={x + barWidth / 2 - 50}
                    y={y - 35}
                    width={100}
                    height={26}
                    rx={6}
                    className="fill-slate-900 shadow-md"
                  />
                  {/* Tooltip text */}
                  <text
                    x={x + barWidth / 2}
                    y={y - 18}
                    className="fill-white font-mono font-bold text-[10px]"
                    textAnchor="middle"
                  >
                    {formatCurrency(item.revenue)}
                  </text>
                  {/* Small triangular pointer */}
                  <polygon
                    points={`${x + barWidth / 2 - 4},${y - 9} ${x + barWidth / 2 + 4},${y - 9} ${x + barWidth / 2},${y - 5}`}
                    className="fill-slate-900"
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* X and Y Main Axes lines */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          className="stroke-slate-200"
          strokeWidth={1}
        />
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={svgWidth - padding.right}
          y2={padding.top + chartHeight}
          className="stroke-slate-200"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
};
