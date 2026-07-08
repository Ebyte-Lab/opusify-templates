import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../../lib/api/reports.api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity, 
  Printer, 
  ArrowUpRight 
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  // Queries
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['summaryStats'],
    queryFn: reportsApi.getSummaryStats,
  });

  const { data: revenueData = [], isLoading: revenueLoading } = useQuery({
    queryKey: ['monthlyRevenue'],
    queryFn: reportsApi.getMonthlyRevenue,
  });

  const { data: specialtyData = [], isLoading: specialtyLoading } = useQuery({
    queryKey: ['specialtyVolume'],
    queryFn: reportsApi.getSpecialtyVolume,
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const getCollectionRate = () => {
    if (!stats || stats.revenueCollected === 0) return '0%';
    const totalBilled = stats.revenueCollected + stats.outstandingBalance;
    const rate = (stats.revenueCollected / totalBilled) * 100;
    return `${rate.toFixed(1)}%`;
  };

  const isLoading = statsLoading || revenueLoading || specialtyLoading;

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-brand-600">Compiling financial and clinical reports...</div>;
  }

  // Pie chart data for billing collection rate
  const pieData = stats ? [
    { name: 'Collected', value: stats.revenueCollected, color: '#06b6d4' },
    { name: 'Outstanding', value: stats.outstandingBalance, color: '#f59e0b' }
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports Console</h1>
          <p className="text-sm text-brand-600/70">Analyze collection statistics, billing ratios, and clinical volumes.</p>
        </div>
        <Button size="sm" variant="secondary" onClick={() => window.print()}>
          <Printer size={14} className="mr-2" /> Export PDF Summary
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-brand-600/70 font-semibold uppercase tracking-wider">Revenue Collected</span>
              <p className="text-2xl font-bold text-brand-900">{formatCurrency(stats?.revenueCollected || 0)}</p>
            </div>
            <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
              <DollarSign size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-brand-600/70 font-semibold uppercase tracking-wider">Outstanding Balance</span>
              <p className="text-2xl font-bold text-brand-900">{formatCurrency(stats?.outstandingBalance || 0)}</p>
            </div>
            <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500">
              <TrendingDown size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-brand-600/70 font-semibold uppercase tracking-wider">Claims Collection Rate</span>
              <p className="text-2xl font-bold text-brand-900">{getCollectionRate()}</p>
            </div>
            <div className="h-10 w-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-500">
              <TrendingUp size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-brand-600/70 font-semibold uppercase tracking-wider">Active Patient Records</span>
              <p className="text-2xl font-bold text-brand-900">{stats?.activePatients}</p>
            </div>
            <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500">
              <Users size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Revenue chart (2/3 width) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Billed vs Collected Trend</CardTitle>
            <CardDescription>Clinical cash flow statements over active billing cycles</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Legend iconSize={10} verticalAlign="top" height={36} wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="Billed" stroke="#6366f1" fillOpacity={1} fill="url(#colorBilled)" strokeWidth={2} name="Total Statement Billed" />
                <Area type="monotone" dataKey="Collected" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCollected)" strokeWidth={2} name="Claims Revenue Collected" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Collection Distribution Pie (1/3 width) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Claims Ratios</CardTitle>
            <CardDescription>Collected cash against accounts receivable</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex flex-col items-center justify-center">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend detail */}
            <div className="flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-cyan-500" /> Collected
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-amber-500" /> Outstanding
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specialty volume Bar chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Specialty visits Volume</CardTitle>
            <CardDescription>Departmental patient encounters completed</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialtyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="specialty" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="appointments" fill="#0891b2" radius={[4, 4, 0, 0]} name="Completed Visits" maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Collection Table Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Billing Cycle summaries</CardTitle>
            <CardDescription>Outstanding statements by billing month</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-elevated/40 text-[9px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                    <th className="px-4 py-2 font-semibold">Month</th>
                    <th className="px-4 py-2 font-semibold">Billed</th>
                    <th className="px-4 py-2 font-semibold">Collected</th>
                    <th className="px-4 py-2 font-semibold text-right">Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/50 font-mono">
                  {revenueData.map((row: any, idx) => {
                    const rate = row.Billed === 0 ? 0 : (row.Collected / row.Billed) * 100;
                    return (
                      <tr key={idx} className="hover:bg-surface/20 transition-colors">
                        <td className="px-4 py-3 font-sans font-medium">{row.month} 2026</td>
                        <td className="px-4 py-3">{formatCurrency(row.Billed)}</td>
                        <td className="px-4 py-3 text-emerald-600">{formatCurrency(row.Collected)}</td>
                        <td className="px-4 py-3 text-right font-bold text-brand-900">{rate.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};
