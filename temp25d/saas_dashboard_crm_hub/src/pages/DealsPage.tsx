import React, { useState, useMemo } from 'react';
import type { Deal, DealStage } from '../types';
import { AvatarGroup } from '../components/ui/AvatarGroup';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface DealsPageProps {
  deals: Deal[];
}

type TabType = 'All' | DealStage;

export const DealsPage: React.FC<DealsPageProps> = ({ deals }) => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Calculate Summary metrics
  const summary = useMemo(() => {
    const totalVal = deals.reduce((sum, d) => sum + d.value, 0);
    const stageCounts: Record<DealStage, number> = {
      contacted: 0,
      proposal: 0,
      negotiation: 0,
      won: 0
    };
    deals.forEach(d => {
      if (stageCounts[d.stage] !== undefined) {
        stageCounts[d.stage]++;
      }
    });

    return {
      totalValue: totalVal,
      counts: stageCounts
    };
  }, [deals]);

  // Filter deals by active tab
  const filteredDeals = useMemo(() => {
    if (activeTab === 'All') return deals;
    return deals.filter(d => d.stage === activeTab);
  }, [deals, activeTab]);

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
        return { label: 'Contacted', border: 'border-l-blue-500', badgeVariant: 'blue' as const };
      case 'proposal':
        return { label: 'Proposal Sent', border: 'border-l-amber-500', badgeVariant: 'amber' as const };
      case 'negotiation':
        return { label: 'Negotiation', border: 'border-l-purple-500', badgeVariant: 'purple' as const };
      case 'won':
        return { label: 'Closed Won', border: 'border-l-green-500', badgeVariant: 'green' as const };
      default:
        return { label: 'Contacted', border: 'border-l-slate-400', badgeVariant: 'slate' as const };
    }
  };

  return (
    <div className="space-y-6 font-body">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-text tracking-tight">
          All Deals
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Full deal inventory across all pipeline stages
        </p>
      </div>

      {/* Summary Metrics Bar */}
      <div className="bg-secondary p-6 rounded-3xl border border-slate-200/60 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        <div className="flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Total Pipeline Value
          </span>
          <span className="text-xl font-extrabold text-text font-heading mt-1">
            {formatCurrency(summary.totalValue)}
          </span>
        </div>
        <div className="sm:pl-6 flex flex-col justify-center pt-4 sm:pt-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500 flex items-center gap-1.5 font-heading">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Contacted
          </span>
          <span className="text-lg font-extrabold text-text font-heading mt-1">
            {summary.counts.contacted} <span className="text-xs font-semibold text-slate-400">deals</span>
          </span>
        </div>
        <div className="lg:pl-6 flex flex-col justify-center pt-4 lg:pt-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500 flex items-center gap-1.5 font-heading">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Proposal
          </span>
          <span className="text-lg font-extrabold text-text font-heading mt-1">
            {summary.counts.proposal} <span className="text-xs font-semibold text-slate-400">deals</span>
          </span>
        </div>
        <div className="lg:pl-6 flex flex-col justify-center pt-4 lg:pt-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-500 flex items-center gap-1.5 font-heading">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            Negotiation
          </span>
          <span className="text-lg font-extrabold text-text font-heading mt-1">
            {summary.counts.negotiation} <span className="text-xs font-semibold text-slate-400">deals</span>
          </span>
        </div>
        <div className="lg:pl-6 flex flex-col justify-center pt-4 lg:pt-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-green-500 flex items-center gap-1.5 font-heading">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            Closed Won
          </span>
          <span className="text-lg font-extrabold text-text font-heading mt-1">
            {summary.counts.won} <span className="text-xs font-semibold text-slate-400">deals</span>
          </span>
        </div>
      </div>

      {/* Stage Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-px scrollbar-none">
        {(['All', 'contacted', 'proposal', 'negotiation', 'won'] as TabType[]).map(tab => {
          const isActive = activeTab === tab;
          const label = tab === 'All' ? 'All Stage Inventory' : getStageConfig(tab as DealStage).label;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 font-heading font-bold text-xs uppercase tracking-wider shrink-0 transition-all outline-none border-b-2 ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Deals Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDeals.map(deal => {
          const config = getStageConfig(deal.stage);
          return (
            <div
              key={deal.id}
              className={`bg-secondary p-6 rounded-3xl border border-slate-200/50 shadow-sm border-l-4 ${config.border} flex flex-col justify-between hover:shadow-md transition-shadow`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded font-heading font-bold text-[9px] bg-slate-100 text-slate-600 uppercase tracking-wider">
                    {deal.company}
                  </span>
                  <Badge label={config.label} variant={config.badgeVariant} size="xs" />
                </div>
                <h3 className="font-heading font-bold text-base text-text line-clamp-2">
                  {deal.title}
                </h3>
                <p className="text-2xl font-extrabold text-text font-heading">
                  {formatCurrency(deal.value)}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                <AvatarGroup avatars={deal.avatars} size="sm" max={3} />
                <Button
                  onClick={() => setSelectedDeal(deal)}
                  variant="ghost"
                  className="py-1.5 px-3 text-[10px] border-slate-200"
                >
                  View Deal
                </Button>
              </div>
            </div>
          );
        })}
        {filteredDeals.length === 0 && (
          <div className="col-span-full bg-secondary border border-slate-200 rounded-3xl p-12 text-center text-slate-400 text-sm font-medium">
            No deals found in this pipeline stage.
          </div>
        )}
      </div>

      {/* Details View Modal (Placeholder modal) */}
      <Modal
        isOpen={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
        title="Deal Pipeline Details"
      >
        {selectedDeal && (
          <div className="space-y-4 font-body">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <span className="text-[10px] font-heading font-bold text-slate-400 uppercase tracking-wider">
                {selectedDeal.company}
              </span>
              <h3 className="font-heading font-bold text-lg text-slate-800 leading-snug">
                {selectedDeal.title}
              </h3>
              <p className="text-2xl font-extrabold text-primary font-heading pt-1">
                {formatCurrency(selectedDeal.value)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500">
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                  Pipeline Stage
                </span>
                <Badge
                  label={getStageConfig(selectedDeal.stage).label}
                  variant={getStageConfig(selectedDeal.stage).badgeVariant}
                />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 font-heading">
                  Last Activity
                </span>
                <span className="text-text font-mono block pt-1">
                  {selectedDeal.updatedAt}
                </span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
                Assigned Team Members
              </span>
              <AvatarGroup avatars={selectedDeal.avatars} size="md" max={4} />
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                onClick={() => setSelectedDeal(null)}
                className="w-full"
              >
                Close details
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
