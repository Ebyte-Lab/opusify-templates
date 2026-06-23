import React, { useState } from 'react';
import type { Deal, DealStage } from '../../types';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  stage: DealStage;
  deals: Deal[];
  count: number;
  dragCard: (e: React.DragEvent, id: string) => void;
  allowDrop: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetStage: DealStage) => void;
  moveCardDirectly: (id: string, targetStage: DealStage) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  stage,
  deals,
  count,
  dragCard,
  allowDrop,
  onDrop,
  moveCardDirectly
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false);
    onDrop(e, stage);
  };

  // Stage dot colors mapping
  const stageDots = {
    contacted: <span className="w-2 h-2 rounded-full bg-blue-400"></span>,
    proposal: <span className="w-2 h-2 rounded-full bg-amber-400"></span>,
    negotiation: <span className="w-2 h-2 rounded-full bg-purple-400"></span>,
    won: <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
  }[stage];

  return (
    <div
      className={`flex-1 min-w-[260px] max-w-[320px] bg-slate-100/60 rounded-2xl p-4 flex flex-col space-y-4 snap-start border transition-all duration-200 ${
        isDragOver
          ? 'border-primary border-dashed shadow-inner bg-pink-50/10'
          : 'border-slate-200/40'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        allowDrop(e);
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Title and count */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 shrink-0">
        <span className="font-heading font-bold text-sm text-slate-700 flex items-center gap-1.5">
          {stageDots}
          {title}
        </span>
        <span className="text-xs font-bold text-slate-400 font-mono bg-white px-2 py-0.5 rounded-full shadow-sm">
          {count}
        </span>
      </div>

      {/* Deal Cards Container */}
      <div className="flex-1 flex flex-col space-y-3 overflow-y-auto min-h-[300px]">
        {deals.map(deal => (
          <KanbanCard
            key={deal.id}
            deal={deal}
            onDragStart={dragCard}
            moveCardDirectly={moveCardDirectly}
          />
        ))}
        {deals.length === 0 && (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
            <span className="text-xs text-slate-400 font-medium">No deals in this stage</span>
          </div>
        )}
      </div>
    </div>
  );
};
