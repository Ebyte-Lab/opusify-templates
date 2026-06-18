import React from 'react';
import type { GradeRecord } from '../../../types/grade';
import { MessageSquare } from 'lucide-react';

interface GradeBreakdownTableProps {
  grades: GradeRecord[];
}

export const GradeBreakdownTable: React.FC<GradeBreakdownTableProps> = ({ grades }) => {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-bold text-white">Project Grades & Feedback</h2>
      <div className="bg-[#18181B] border border-secondary rounded-lg overflow-hidden">
        <div className="divide-y divide-secondary">
          {grades.map((grade) => {
            const percentage = Math.round((grade.score / grade.maxScore) * 100);
            
            return (
              <div key={grade.assignmentId} className="p-5 space-y-3">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <h3 className="text-white font-heading font-bold text-sm md:text-base">
                      {grade.assignmentTitle}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-1.5 shrink-0 bg-secondary/50 px-3 py-1 rounded border border-white/5">
                    <span className="text-sm font-extrabold text-primary font-heading">
                      {grade.score}
                    </span>
                    <span className="text-[10px] text-text/40">/</span>
                    <span className="text-[10px] text-text/50">
                      {grade.maxScore}
                    </span>
                    <span className="ml-2 text-xs font-bold text-green-400 font-mono">
                      ({percentage}%)
                    </span>
                  </div>
                </div>

                {grade.feedback && (
                  <div className="bg-secondary/20 border border-secondary rounded p-3 text-xs text-text/70 leading-relaxed flex items-start gap-2.5">
                    <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-white mb-1 select-none">Instructor Feedback</div>
                      <p className="italic">{grade.feedback}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
