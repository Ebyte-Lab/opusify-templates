import React from 'react';
import type { Deal, DealStage, ActivityEntry } from '../types';
import { StatCard } from '../components/ui/StatCard';
import { CircularProgress } from '../components/ui/CircularProgress';
import { KanbanBoard } from '../components/kanban/KanbanBoard';
import { ActivityFeed } from '../components/activity/ActivityFeed';

interface HomePageProps {
  deals: Deal[];
  columns: Record<DealStage, Deal[]>;
  columnCounts: Record<DealStage, number>;
  dragCard: (e: React.DragEvent, id: string) => void;
  allowDrop: (e: React.DragEvent) => void;
  dropCard: (e: React.DragEvent, targetStage: DealStage) => void;
  moveCardDirectly: (id: string, targetStage: DealStage) => void;
  activities: ActivityEntry[];
  onPostNote: (dealTitle: string, noteContent: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  deals,
  columns,
  columnCounts,
  dragCard,
  allowDrop,
  dropCard,
  moveCardDirectly,
  activities,
  onPostNote
}) => {
  // Calculations for KPI Cards
  // 1. Pipeline Conversion (won / total deals)
  const wonCount = columnCounts.won;

  // Let's use the exact KPI values requested in the spec:
  // Pipeline Conversion: 68.4% (pink ring), trend: "+3.2% vs last month"
  // Quarterly Target: 82.1% (blue ring), trend: "On track for Q2"
  // Win Rate MTD: 74.0% (green ring), trend: "+5.1% vs last month"

  return (
    <div className="space-y-8 font-body">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-text tracking-tight">
            Active Sales Workspace
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Hello Sarah, you've won {wonCount} deals this week. Drag cards to update statuses.
          </p>
        </div>
      </div>

      {/* 3 KPI Stat Cards with CircularProgress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Pipeline Conversion"
          value="68.4%"
          trend="+3.2% vs last month"
          trendPositive={true}
        >
          <CircularProgress value={68.4} color="text-primary" size={64} />
        </StatCard>

        <StatCard
          label="Quarterly Target"
          value="82.1%"
          trend="On track for Q2"
          trendPositive={true}
        >
          <CircularProgress value={82.1} color="text-blue-500" size={64} />
        </StatCard>

        <StatCard
          label="Win Rate MTD"
          value="74.0%"
          trend="+5.1% vs last month"
          trendPositive={true}
        >
          <CircularProgress value={74.0} color="text-green-500" size={64} />
        </StatCard>
      </div>

      {/* Kanban Pipeline Board Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-bold text-text">Deals Pipeline</h2>
          <span className="text-xs text-slate-400 font-semibold">
            Drag cards between stages
          </span>
        </div>

        <KanbanBoard
          columns={columns}
          columnCounts={columnCounts}
          dragCard={dragCard}
          allowDrop={allowDrop}
          dropCard={dropCard}
          moveCardDirectly={moveCardDirectly}
        />
      </div>

      {/* Activity Section */}
      <ActivityFeed
        activities={activities}
        deals={deals.map(d => ({ id: d.id, title: d.title }))}
        onPostNote={onPostNote}
      />
    </div>
  );
};
