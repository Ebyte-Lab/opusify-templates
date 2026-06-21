import React from 'react';
import type { Lesson } from '../../types/lesson';
import { Avatar } from '../ui/Avatar';

interface LessonHeroProps {
  lesson: Lesson;
}

export const LessonHero: React.FC<LessonHeroProps> = ({ lesson }) => {
  return (
    <div className="mb-10 focus-hide transition-opacity duration-500">
      <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-primary mb-4 font-semibold">
        <span>{lesson.moduleLabel}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span>
        <span>{lesson.topicLabel}</span>
      </div>
      
      <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6 text-[#0f172a] tracking-tight leading-tight">
        {lesson.title}
      </h1>
      
      <div className="flex items-center gap-4 border-b border-secondary pb-8">
        <Avatar src={lesson.tutorAvatarUrl} alt={lesson.tutorName} size="md" />
        <div className="flex flex-col">
          <span className="font-heading font-semibold text-sm text-[#0f172a]">
            {lesson.tutorName}
          </span>
          <span className="text-xs text-text/60">
            {lesson.readMinutes} Min Read &middot; {lesson.hasVideo ? 'Video Included' : 'No Video'}
          </span>
        </div>
      </div>
    </div>
  );
};
