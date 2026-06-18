import React from 'react';
import { mockAssignments } from '../data/mockAssignments';
import { useFetchMock } from '../hooks/useFetchMock';
import { AssignmentListItem } from '../components/features/assignments/AssignmentListItem';
import { Loader2 } from 'lucide-react';

export const AssignmentsPage: React.FC = () => {
  const { data: assignments, loading } = useFetchMock(mockAssignments, 350);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      <div className="border-b border-secondary pb-6">
        <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1 select-none">
          Alex.dev Workspace
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
          Coding Assignments
        </h1>
        <p className="text-sm text-text/70 mt-2 max-w-2xl">
          Check due dates, review instructor comments on graded tasks, and submit your project source code packages. Click on any assignment to view details, specifications, and upload solutions.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {assignments?.map((assignment) => (
            <AssignmentListItem key={assignment.id} assignment={assignment} />
          ))}
        </div>
      )}
    </div>
  );
};
