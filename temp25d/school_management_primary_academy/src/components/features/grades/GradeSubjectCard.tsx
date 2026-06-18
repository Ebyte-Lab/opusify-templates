import React from 'react';
import { Card } from '../../ui/Card';
import { ProgressBar } from '../../ui/ProgressBar';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { GradeRecord } from '../../../types/grades';

interface GradeSubjectCardProps {
  record: GradeRecord;
}

export const GradeSubjectCard: React.FC<GradeSubjectCardProps> = ({ record }) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center border border-green-200">
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </span>
        );
      case 'down':
        return (
          <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-red-200">
            <ArrowDownRight size={18} strokeWidth={2.5} />
          </span>
        );
      default:
        return (
          <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center border border-gray-200">
            <Minus size={18} strokeWidth={2.5} />
          </span>
        );
    }
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'green';
    if (percentage >= 80) return 'blue';
    if (percentage >= 70) return 'primary'; // yellow
    return 'rose'; // red
  };

  return (
    <Card className="hoverable flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-heading font-bold text-xl text-text">{record.subject}</h3>
        {getTrendIcon(record.trend)}
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-heading font-bold text-4xl text-text">{record.letterGrade}</span>
        <span className="text-gray-400 font-semibold text-lg">({record.percentage}%)</span>
      </div>

      <ProgressBar
        value={record.percentage}
        max={100}
        color={getProgressBarColor(record.percentage)}
        className="mb-5"
      />

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex-grow text-xs font-semibold text-gray-600 leading-relaxed">
        <span className="font-bold text-text block mb-1">Teacher Feedback</span>
        "{record.teacherComment}"
      </div>
    </Card>
  );
};
export default GradeSubjectCard;
