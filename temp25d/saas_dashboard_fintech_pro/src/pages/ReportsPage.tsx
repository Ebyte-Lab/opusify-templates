import React, { useState } from 'react';
import { mockReports } from '../data/reports';
import { ReportItem } from '../types/report';
import { ReportListItem } from '../components/reports/ReportListItem';
import { ReportGeneratorPanel } from '../components/reports/ReportGeneratorPanel';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { formatCurrency } from '../lib/format';
import { BarChart3 } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(mockReports);

  const handleDownload = (id: string) => {
    alert(`Downloading statement document package ${id}.pdf`);
  };

  const handleGenerateReport = (
    type: 'P&L Statement' | 'Tax Summary' | 'Custody Statement', 
    start: string, 
    end: string
  ) => {
    const newId = `REP-${Date.now().toString().slice(-6)}`;
    const newReport: ReportItem = {
      id: newId,
      title: `${type} Audit Declaration (${start} to ${end})`,
      type,
      periodLabel: `${start} - ${end}`,
      generatedOn: null,
      status: 'processing',
    };

    setReports((prev) => [newReport, ...prev]);

    // Simulate async generation timeout of 2.5 seconds
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === newId
            ? {
                ...r,
                status: 'ready',
                generatedOn: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
              }
            : r
        )
      );
    }, 2500);
  };

  // Mock historical performance data for the reports page chart
  const historicalData = [
    { month: 'Jan', value: 920000 },
    { month: 'Feb', value: 980000 },
    { month: 'Mar', value: 1050000 },
    { month: 'Apr', value: 1120000 },
    { month: 'May', value: 1190000 },
    { month: 'Jun', value: 1248390.15 },
  ];

  return (
    <div className="p-6 space-y-6 flex-grow animate-[fadeIn_0.4s_ease]">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Institutional Reports & Audits</h2>
          <p className="text-xs text-text/45 mt-0.5 font-sans">
            Download quarterly balance audits, certified tax summaries, and clearings
          </p>
        </div>
      </div>

      {/* Grid: Generator Config Form + Historical Small Performance Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Form: Spans 2 columns on large screen */}
        <div className="xl:col-span-2 space-y-6">
          <ReportGeneratorPanel onGenerate={handleGenerateReport} />
        </div>

        {/* Right Chart: Performance Trend */}
        <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              NAV Valuation Trend
            </h3>
            <p className="text-xs text-text/45 mt-0.5">Asset optimization progress over 6 months</p>
          </div>

          <div className="h-40 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="reportsChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'rgba(243, 244, 246, 0.4)', fontSize: 10, fontFamily: 'Consolas, Monaco, monospace' }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-950/95 border border-gray-800 rounded px-2 py-1 text-[10px] font-mono text-white">
                          <p className="text-primary font-bold">{formatCurrency(payload[0].value as number)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--primary)" 
                  strokeWidth={2} 
                  fill="url(#reportsChartGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[9px] font-mono text-text/40 text-right mt-2 uppercase">
            AUDITED BY FINTECH PRO LEDGER
          </div>
        </div>

      </div>

      {/* Reports Statement List */}
      <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
        <div>
          <h3 className="text-base font-semibold text-white">Statement Archival Catalog</h3>
          <p className="text-xs text-text/45">Review generated files and pending schedule audits</p>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <ReportListItem 
              key={report.id} 
              report={report} 
              onDownload={handleDownload} 
            />
          ))}
        </div>
      </div>

    </div>
  );
};
