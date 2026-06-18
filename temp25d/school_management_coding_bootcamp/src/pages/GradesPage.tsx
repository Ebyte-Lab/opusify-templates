import React from 'react';
import { mockGrades } from '../data/mockGrades';
import { useFetchMock } from '../hooks/useFetchMock';
import { GradeSummaryCard } from '../components/features/grades/GradeSummaryCard';
import { GradeBreakdownTable } from '../components/features/grades/GradeBreakdownTable';
import { Loader2 } from 'lucide-react';

export const GradesPage: React.FC = () => {
  const { data: grades, loading } = useFetchMock(mockGrades, 300);
  const alexXp = 2450;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <div className="border-b border-secondary pb-6">
        <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1 select-none">
          Alex.dev Standing
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
          Academic Grades
        </h1>
        <p className="text-sm text-text/70 mt-2 max-w-2xl">
          Review your scores, percentage marks, cumulative XP points, and read written feedback comments left by instructors on your submitted programming labs.
        </p>
      </div>

      {loading || !grades ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* GPA and XP Summaries */}
          <GradeSummaryCard grades={grades} xp={alexXp} />

          {/* Grades List & Feedback comments */}
          <GradeBreakdownTable grades={grades} />
        </div>
      )}
    </div>
  );
};
