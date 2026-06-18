import React from 'react';
import type { Lesson } from '../../../types/module';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface LessonListItemProps {
  lesson: Lesson;
}

export const LessonListItem: React.FC<LessonListItemProps> = ({ lesson }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded bg-[#09090B] border border-secondary/50 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        {lesson.completed ? (
          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
        ) : (
          <Circle className="w-4 h-4 text-text/30 shrink-0" />
        )}
        <span className={`text-xs md:text-sm truncate ${lesson.completed ? 'text-text/70 line-through' : 'text-white'}`}>
          {lesson.title}
        </span>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-text/40 shrink-0 font-mono">
        <Clock className="w-3 h-3" />
        <span>{lesson.durationMinutes}m</span>
      </div>
    </div>
  );
};
