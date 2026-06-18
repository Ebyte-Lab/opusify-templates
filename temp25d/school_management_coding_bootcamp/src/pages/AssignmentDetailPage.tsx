import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockAssignments } from '../data/mockAssignments';
import { mockLeaderboard } from '../data/mockLeaderboard';
import { mockSchedule } from '../data/mockSchedule';
import { useFetchMock } from '../hooks/useFetchMock';
import { AssignmentHeader } from '../components/features/assignments/AssignmentHeader';
import { CodeSnippetViewer } from '../components/features/assignments/CodeSnippetViewer';
import { SubmissionDropzone } from '../components/features/assignments/SubmissionDropzone';
import { LeaderboardRow } from '../components/features/leaderboard/LeaderboardRow';
import { TimelineItem } from '../components/features/schedule/TimelineItem';
import { Loader2, Trophy, Calendar } from 'lucide-react';

export const AssignmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const rawAssignment = mockAssignments.find((a) => a.id === id);

  if (!rawAssignment) {
    return <Navigate to="/404" replace />;
  }

  const { data: assignment, loading } = useFetchMock(rawAssignment, 300);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {loading || !assignment ? (
        <div className="py-32 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* Assignment Header Banner */}
          <AssignmentHeader assignment={assignment} />

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Span 2) */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in">
              {/* Code Editor Snippet Viewer */}
              {assignment.codeExample && (
                <CodeSnippetViewer
                  filename={assignment.codeExample.filename}
                  language={assignment.codeExample.language}
                  code={assignment.codeExample.code}
                />
              )}

              {/* Submission Area */}
              <SubmissionDropzone />
            </div>

            {/* Right Column (Widgets) */}
            <div className="space-y-8">
              
              {/* Leaderboard Widget */}
              <div className="bg-bg border border-secondary rounded-lg overflow-hidden flex flex-col">
                <div className="p-4 border-b border-secondary flex items-center justify-between bg-secondary/20 select-none">
                  <h2 className="font-heading font-bold text-white text-sm flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Cohort Leaderboard
                  </h2>
                  <span className="text-[10px] text-text/50">Sprint 4</span>
                </div>
                <div className="p-2 space-y-1">
                  {mockLeaderboard.map((user) => (
                    <LeaderboardRow key={user.name} entry={user} />
                  ))}
                </div>
              </div>

              {/* Upcoming Schedule Widget */}
              <div className="bg-bg border border-secondary rounded-lg p-4">
                <h2 className="font-heading font-bold text-white text-sm mb-4 select-none flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Upcoming Schedule
                </h2>
                
                <div className="border-l-2 border-secondary ml-2 pl-4 space-y-4">
                  {mockSchedule.map((event) => (
                    <TimelineItem key={event.id} event={event} />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </>
      )}
    </div>
  );
};
