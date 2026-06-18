import React from 'react';
import type { Assignment } from '../../../types/assignment';
import { Link } from 'react-router-dom';
import { formatTimeAgo } from '../../../lib/format';
import { Badge } from '../../ui/Badge';
import { ChevronRight } from 'lucide-react';

interface AssignmentListItemProps {
  assignment: Assignment;
}

export const AssignmentListItem: React.FC<AssignmentListItemProps> = ({ assignment }) => {
  const getBadgeVariant = (status: Assignment['status']) => {
    switch (status) {
      case 'due':
        return 'warning';
      case 'submitted':
        return 'info';
      case 'graded':
        return 'success';
      case 'overdue':
        return 'error';
    }
  };

  const getStatusText = (status: Assignment['status']) => {
    switch (status) {
      case 'due':
        return 'Due Soon';
      case 'submitted':
        return 'Submitted';
      case 'graded':
        return 'Graded';
      case 'overdue':
        return 'Overdue';
    }
  };

  return (
    <div className="bg-[#18181B] border border-secondary rounded-lg p-4 hover:border-primary/50 transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-text/60 font-mono uppercase">
              {assignment.moduleId === 'm1'
                ? 'Fundamentals'
                : assignment.moduleId === 'm2'
                ? 'Node & DB'
                : 'Advanced React'}
            </span>
            <Badge variant={getBadgeVariant(assignment.status)}>
              {getStatusText(assignment.status)}
            </Badge>
          </div>
          <Link
            to={`/assignments/${assignment.id}`}
            className="block text-white font-heading font-bold text-base hover:text-primary transition-colors truncate"
          >
            {assignment.title}
          </Link>
          <div className="text-[11px] text-text/50">
            {formatTimeAgo(assignment.dueDate)}
          </div>
        </div>
        <Link
          to={`/assignments/${assignment.id}`}
          className="text-xs font-bold text-primary hover:text-white flex items-center gap-1 self-end sm:self-auto shrink-0 transition-colors"
        >
          View Workspace
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
