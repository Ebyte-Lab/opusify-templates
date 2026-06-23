import React, { useMemo } from 'react';
import type { Deal, DealStage } from '../types';
import { BarChart } from '../components/charts/BarChart';
import { monthlyRevenue, pipelineFunnel } from '../data/analytics';
import { Badge } from '../components/ui/Badge';

interface AnalyticsPageProps {
  deals: Deal[];
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ deals }) => {
  // Dynamically calculate KPIs based on current deals
  const stats = useMemo(() => {
    const totalCount = deals.length;
    const wonDeals = deals.filter(d => d.stage === 'won');
    const totalVal = deals.reduce((sum, d) => sum + d.value, 0);
    
    const avgDealSize = totalCount > 0 ? totalVal / totalCount : 0;
    const winRate = totalCount > 0 ? (wonDeals.length / totalCount) * 100 : 0;

    return {
      totalPipeline: totalVal,
      avgDealSize,
      winRate,
      wonDealsCount: wonDeals.length
    };
  }, [deals]);

  // Sort and get top 5 deals by value
  const topDeals = useMemo(() => {
    return [...deals]
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [deals]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getStageConfig = (stage: DealStage) => {
    switch (stage) {
      case 'contacted':
        return { label: 'Contacted', badgeVariant: 'blue' as const };
      case 'proposal':
        return { label: 'Proposal Sent', badgeVariant: 'amber' as const };
      case 'negotiation':
        return { label: 'Negotiation', badgeVariant: 'purple' as const };
      case 'won':
        return { label: 'Closed Won', badgeVariant: 'green' as const };
      default:
        return { label: 'Contacted', badgeVariant: 'slate' as const };
    }
  };

  return (
    <div className="space-y-8 font-body">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-text tracking-tight">
          Analytics & Reports
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Monitor sales cycle conversions, revenue charts, and top accounts
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-secondary border border-slate-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Total Monthly Revenue
          </span>
          <h3 className="text-2xl font-extrabold text-text font-heading mt-1">$60,500</h3>
          <p className="text-xs text-green-500 font-semibold mt-1 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            +4.3% vs last month
          </p>
        </div>

        <div className="bg-secondary border border-slate-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
            Win Rate (MTD)
          </span>
          <h3 className="text-2xl font-extrabold text-text font-heading mt-1">
            {stats.winRate.toFixed(1)}%
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            {stats.wonDealsCount} of {deals.length} deals closed won
          </p>
        </div>

        <div className="bg-secondary border border-slate-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500">
            Avg Deal Size
          </span>
          <h3 className="text-2xl font-extrabold text-text font-heading mt-1">
            {formatCurrency(stats.avgDealSize)}
          </h3>
          <p className="text-xs text-green-500 font-semibold mt-1 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            +2.1% from Q1 average
          </p>
        </div>

        <div className="bg-secondary border border-slate-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Customer Churn Rate
          </span>
          <h3 className="text-2xl font-extrabold text-text font-heading mt-1">2.4%</h3>
          <p className="text-xs text-pink-500 font-semibold mt-1 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            -0.2% vs last month
          </p>
        </div>
      </div>

      {/* Grid Layout: Bar Chart + Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Bar Chart */}
        <div className="bg-secondary border border-slate-200/60 rounded-3xl p-6 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-text mb-2">Monthly Revenue</h3>
          <p className="text-xs text-slate-400 font-semibold mb-6">Target attainment overview ($)</p>
          <BarChart data={monthlyRevenue} />
        </div>

        {/* Pipeline Funnel */}
        <div className="bg-secondary border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-text mb-2">Pipeline conversion rates</h3>
            <p className="text-xs text-slate-400 font-semibold mb-6 font-body">Stage dropoff and conversions</p>

            <div className="space-y-5">
              {pipelineFunnel.map((item, idx) => {
                // Color mapping for progress bars
                const barColor = {
                  0: 'bg-blue-400',
                  1: 'bg-amber-400',
                  2: 'bg-purple-400',
                  3: 'bg-green-500'
                }[idx] || 'bg-slate-400';

                return (
                  <div key={item.stageName} className="space-y-1.5 font-body">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600 font-heading">{item.stageName}</span>
                      <span className="text-slate-400 font-mono">
                        {item.count} Accounts &middot; {item.conversionRate}%
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barColor} rounded-full transition-all duration-700`}
                        style={{ width: `${item.conversionRate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 font-medium italic mt-6 border-t border-slate-100 pt-4 font-body">
            Note: Industry standard funnel optimization recommends Closed Won target &gt; 25% for SaaS pipelines.
          </p>
        </div>
      </div>

      {/* Top Accounts Table */}
      <div className="bg-secondary border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-text">Top Accounts</h3>
          <span className="text-xs text-slate-400 font-semibold">Sorted by deal value</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Company / Client
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Deal Title
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Pipeline Stage
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400 text-right">
                  Deal Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topDeals.map(deal => {
                const config = getStageConfig(deal.stage);
                return (
                  <tr key={deal.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-heading font-bold text-sm text-text">
                      {deal.company}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-600">
                      {deal.title}
                    </td>
                    <td className="py-4 px-6">
                      <Badge label={config.label} variant={config.badgeVariant} />
                    </td>
                    <td className="py-4 px-6 text-right font-heading font-bold text-sm text-text">
                      {formatCurrency(deal.value)}
                    </td>
                  </tr>
                );
              })}
              {topDeals.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400 text-sm">
                    No active deals available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
