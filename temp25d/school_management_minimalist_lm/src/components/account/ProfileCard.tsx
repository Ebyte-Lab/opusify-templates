import React from 'react';
import { useCourse } from '../../context/CourseContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { BookOpen, Award, RotateCcw } from 'lucide-react';

export const ProfileCard: React.FC = () => {
  const { completedLessons, quizAttempts, getOverallProgress, resetProgress } = useCourse();
  const overallProgress = getOverallProgress();
  const completedLessonsCount = Object.values(completedLessons).filter(Boolean).length;
  const passedQuizzesCount = Object.values(quizAttempts).filter(a => a.score === 100).length;

  return (
    <div className="border border-secondary rounded-2xl p-8 bg-white shadow-sm flex flex-col items-center text-center">
      <Avatar
        src="https://picsum.photos/seed/learner/150/150"
        alt="Learner Avatar"
        size="lg"
        className="w-24 h-24 mb-4 border-2 border-primary/20"
      />
      
      <h2 className="font-heading font-bold text-2xl text-[#0f172a] mb-1">
        Alex Mercer
      </h2>
      <p className="text-sm text-text/60 font-heading tracking-wide mb-6">
        Product Designer Apprentice
      </p>

      {/* Progress Bar */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between text-xs font-heading font-semibold uppercase tracking-wider mb-2">
          <span className="text-text/50">Overall Course Progress</span>
          <span className="text-primary">{overallProgress}%</span>
        </div>
        <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        <div className="border border-secondary rounded-xl p-4 bg-secondary/15 flex flex-col items-center">
          <BookOpen className="text-primary mb-2" size={20} />
          <span className="text-2xl font-bold font-heading text-[#0f172a]">
            {completedLessonsCount}
          </span>
          <span className="text-xs text-text/50 font-heading font-medium">Lessons Done</span>
        </div>
        
        <div className="border border-secondary rounded-xl p-4 bg-secondary/15 flex flex-col items-center">
          <Award className="text-primary mb-2" size={20} />
          <span className="text-2xl font-bold font-heading text-[#0f172a]">
            {passedQuizzesCount}
          </span>
          <span className="text-xs text-text/50 font-heading font-medium">Quizzes Passed</span>
        </div>
      </div>

      {/* Reset progress */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (window.confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
            resetProgress();
          }
        }}
        className="text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <RotateCcw size={14} />
        <span>Reset All Progress</span>
      </Button>
    </div>
  );
};
