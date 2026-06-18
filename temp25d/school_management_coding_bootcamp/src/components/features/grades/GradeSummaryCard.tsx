import React from 'react';
import type { GradeRecord } from '../../../types/grade';
import { Award, Zap, BookOpen } from 'lucide-react';

interface GradeSummaryCardProps {
  grades: GradeRecord[];
  xp: number;
}

export const GradeSummaryCard: React.FC<GradeSummaryCardProps> = ({ grades, xp }) => {
  const gradedCount = grades.length;
  
  const averagePercentage = gradedCount > 0
    ? Math.round(
        (grades.reduce((sum, item) => sum + (item.score / item.maxScore), 0) / gradedCount) * 100
      )
    : 0;

  const getGpa = (percentage: number) => {
    if (percentage >= 90) return '4.0';
    if (percentage >= 80) return '3.5';
    if (percentage >= 70) return '3.0';
    if (percentage >= 60) return '2.5';
    return '2.0';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* GPA Card */}
      <div className="bg-[#18181B] border border-secondary rounded-lg p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[10px] text-text/50 uppercase tracking-widest font-bold select-none">GPA Standings</div>
          <div className="text-2xl font-extrabold text-white font-heading mt-0.5">
            {getGpa(averagePercentage)} <span className="text-xs text-text/40">/ 4.0</span>
          </div>
          <div className="text-[10px] text-green-400 mt-0.5 font-bold">Average Grade: {averagePercentage}%</div>
        </div>
      </div>

      {/* XP Card */}
      <div className="bg-[#18181B] border border-secondary rounded-lg p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[10px] text-text/50 uppercase tracking-widest font-bold select-none">Accumulated XP</div>
          <div className="text-2xl font-extrabold text-white font-heading mt-0.5">
            {xp.toLocaleString()} <span className="text-xs text-text/40">XP</span>
          </div>
          <div className="text-[10px] text-primary mt-0.5 font-bold">Sprint rank: #12 in Cohort</div>
        </div>
      </div>

      {/* Completed Assignments Card */}
      <div className="bg-[#18181B] border border-secondary rounded-lg p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[10px] text-text/50 uppercase tracking-widest font-bold select-none">Graded Projects</div>
          <div className="text-2xl font-extrabold text-white font-heading mt-0.5">
            {gradedCount} <span className="text-xs text-text/40">completed</span>
          </div>
          <div className="text-[10px] text-text/40 mt-0.5 font-bold">Next project due in 2 days</div>
        </div>
      </div>
    </div>
  );
};
