import React from 'react';
import type { Assignment } from '../../../types/assignment';
import { formatTimeAgo } from '../../../lib/format';
import { FileText } from 'lucide-react';

interface AssignmentHeaderProps {
  assignment: Assignment;
}

export const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({ assignment }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-secondary pb-6">
      <div>
        <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1">
          {formatTimeAgo(assignment.dueDate)}
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
          {assignment.title}
        </h1>
        <p className="text-sm text-text/70 mt-2 max-w-2xl">
          {assignment.description}
        </p>
      </div>
      <div className="flex gap-3 shrink-0">
        <button className="px-4 py-2 bg-secondary text-white rounded text-xs font-bold hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" />
          View Spec
        </button>
      </div>
    </div>
  );
};
