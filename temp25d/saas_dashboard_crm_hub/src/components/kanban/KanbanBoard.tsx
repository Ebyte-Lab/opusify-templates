import React from 'react';
import type { Deal, DealStage } from '../../types';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  columns: Record<DealStage, Deal[]>;
  columnCounts: Record<DealStage, number>;
  dragCard: (e: React.DragEvent, id: string) => void;
  allowDrop: (e: React.DragEvent) => void;
  dropCard: (e: React.DragEvent, targetStage: DealStage) => void;
  moveCardDirectly: (id: string, targetStage: DealStage) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  columnCounts,
  dragCard,
  allowDrop,
  dropCard,
  moveCardDirectly
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
      <KanbanColumn
        title="Contacted"
        stage="contacted"
        deals={columns.contacted}
        count={columnCounts.contacted}
        dragCard={dragCard}
        allowDrop={allowDrop}
        onDrop={dropCard}
        moveCardDirectly={moveCardDirectly}
      />
      <KanbanColumn
        title="Proposal Sent"
        stage="proposal"
        deals={columns.proposal}
        count={columnCounts.proposal}
        dragCard={dragCard}
        allowDrop={allowDrop}
        onDrop={dropCard}
        moveCardDirectly={moveCardDirectly}
      />
      <KanbanColumn
        title="Negotiation"
        stage="negotiation"
        deals={columns.negotiation}
        count={columnCounts.negotiation}
        dragCard={dragCard}
        allowDrop={allowDrop}
        onDrop={dropCard}
        moveCardDirectly={moveCardDirectly}
      />
      <KanbanColumn
        title="Closed Won"
        stage="won"
        deals={columns.won}
        count={columnCounts.won}
        dragCard={dragCard}
        allowDrop={allowDrop}
        onDrop={dropCard}
        moveCardDirectly={moveCardDirectly}
      />
    </div>
  );
};
