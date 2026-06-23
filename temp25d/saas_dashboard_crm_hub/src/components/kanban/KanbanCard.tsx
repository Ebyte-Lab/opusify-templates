import React, { useState } from 'react';
import type { Deal, DealStage } from '../../types';
import { AvatarGroup } from '../ui/AvatarGroup';

interface KanbanCardProps {
  deal: Deal;
  onDragStart: (e: React.DragEvent, id: string) => void;
  moveCardDirectly: (id: string, stage: DealStage) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  deal,
  onDragStart,
  moveCardDirectly
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Extract clean badge labels and variants
  const getBadgeConfig = (colorClass: string) => {
    if (colorClass.includes('blue')) return { variant: 'blue' as const };
    if (colorClass.includes('pink')) return { variant: 'pink' as const };
    if (colorClass.includes('amber')) return { variant: 'amber' as const };
    if (colorClass.includes('purple')) return { variant: 'purple' as const };
    if (colorClass.includes('green')) return { variant: 'green' as const };
    return { variant: 'slate' as const };
  };

  const badgeConfig = getBadgeConfig(deal.badgeColor);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleMobileMove = (stage: DealStage) => {
    moveCardDirectly(deal.id, stage);
    setIsMobileMenuOpen(false);
  };

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(deal.value);

  const badgeStyles = {
    blue: 'bg-blue-50 text-blue-600',
    pink: 'bg-pink-50 text-pink-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    slate: 'bg-slate-100 text-slate-600'
  }[badgeConfig.variant];

  return (
    <div
      id={deal.id}
      draggable
      onDragStart={(e) => onDragStart(e, deal.id)}
      onDragEnd={(e) => {
        (e.currentTarget as HTMLElement).classList.remove('opacity-50');
      }}
      className="kanban-card bg-secondary p-4 rounded-xl shadow-sm border border-slate-200/50 cursor-grab hover:shadow-md transition-all relative group"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`px-2 py-0.5 rounded font-heading font-bold text-[9px] uppercase tracking-wider ${badgeStyles}`}>
          {deal.company}
        </span>

        {/* Mobile Stage Selector Dropdown */}
        <div className="relative block sm:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-slate-400 hover:text-primary focus:outline-none p-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="5" r="1.5"></circle>
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="12" cy="19" r="1.5"></circle>
            </svg>
          </button>
          
          {isMobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className="mobile-move-menu absolute right-0 mt-1 bg-white border border-slate-200 shadow-xl rounded-xl py-1 w-32 z-20 text-xs text-text font-body">
                <button
                  onClick={() => handleMobileMove('contacted')}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium"
                >
                  Contacted
                </button>
                <button
                  onClick={() => handleMobileMove('proposal')}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium"
                >
                  Proposal
                </button>
                <button
                  onClick={() => handleMobileMove('negotiation')}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium"
                >
                  Negotiating
                </button>
                <button
                  onClick={() => handleMobileMove('won')}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium text-green-500 font-semibold"
                >
                  Won
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <h4 className="font-heading font-bold text-sm text-text line-clamp-2">{deal.title}</h4>
      <p className="text-xs text-slate-400 font-semibold mt-1 font-body">
        {deal.company} &middot; {formattedValue}
      </p>

      <div className="flex items-center justify-between mt-4">
        <AvatarGroup avatars={deal.avatars} size="sm" max={2} />
        <span className="text-[9px] text-slate-400 font-mono font-semibold">
          {deal.updatedAt}
        </span>
      </div>
    </div>
  );
};
