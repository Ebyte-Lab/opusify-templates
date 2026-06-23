import { useState, useCallback, useMemo } from 'react';
import type { Deal, DealStage } from '../types';

export interface UseKanbanReturn {
  columns: Record<DealStage, Deal[]>;
  dragCard: (e: React.DragEvent, id: string) => void;
  allowDrop: (e: React.DragEvent) => void;
  dropCard: (e: React.DragEvent, targetStage: DealStage) => void;
  addDeal: (deal: Omit<Deal, 'id' | 'avatars' | 'updatedAt'>) => Deal;
  columnCounts: Record<DealStage, number>;
  moveCardDirectly: (id: string, targetStage: DealStage) => void;
}

export const useKanban = (
  initialDeals: Deal[],
  onStageChange?: (deal: Deal, newStage: DealStage) => void
): UseKanbanReturn => {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  // Group deals by stage
  const columns = useMemo(() => {
    const cols: Record<DealStage, Deal[]> = {
      contacted: [],
      proposal: [],
      negotiation: [],
      won: []
    };
    deals.forEach(deal => {
      if (cols[deal.stage]) {
        cols[deal.stage].push(deal);
      }
    });
    return cols;
  }, [deals]);

  // Column counts
  const columnCounts = useMemo(() => {
    return {
      contacted: columns.contacted.length,
      proposal: columns.proposal.length,
      negotiation: columns.negotiation.length,
      won: columns.won.length
    };
  }, [columns]);

  // Move deal to a new stage
  const moveCardDirectly = useCallback((id: string, targetStage: DealStage) => {
    setDeals(prevDeals => {
      const dealIndex = prevDeals.findIndex(d => d.id === id);
      if (dealIndex === -1) return prevDeals;

      const deal = prevDeals[dealIndex];
      if (deal.stage === targetStage) return prevDeals;

      const updatedDeal = {
        ...deal,
        stage: targetStage,
        updatedAt: 'Just now'
      };

      const newDeals = [...prevDeals];
      newDeals[dealIndex] = updatedDeal;

      if (onStageChange) {
        onStageChange(updatedDeal, targetStage);
      }

      return newDeals;
    });
  }, [onStageChange]);

  // Dragstart handler
  const dragCard = useCallback((e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('dealId', id);
    e.dataTransfer.effectAllowed = 'move';
    const target = e.currentTarget as HTMLElement;
    target.classList.add('opacity-50');
  }, []);

  // Dragover handler
  const allowDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Drop handler
  const dropCard = useCallback((e: React.DragEvent, targetStage: DealStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('dealId');
    if (!id) return;
    moveCardDirectly(id, targetStage);
  }, [moveCardDirectly]);

  // Add deal
  const addDeal = useCallback((dealData: Omit<Deal, 'id' | 'avatars' | 'updatedAt'>): Deal => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      avatars: ['https://picsum.photos/seed/generated/50/50'],
      updatedAt: 'Just now'
    };

    setDeals(prev => [...prev, newDeal]);

    return newDeal;
  }, [onStageChange]);

  return {
    columns,
    dragCard,
    allowDrop,
    dropCard,
    addDeal,
    columnCounts,
    moveCardDirectly
  };
};
