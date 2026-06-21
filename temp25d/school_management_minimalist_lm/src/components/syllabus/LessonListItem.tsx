import React from 'react';
import { Link } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import clsx from 'clsx';

interface LessonListItemProps {
  lesson: {
    slug: string;
    title: string;
    readMinutes: number;
  };
}

export const LessonListItem: React.FC<LessonListItemProps> = ({ lesson }) => {
  const { completedLessons, toggleLessonComplete } = useCourse();
  const isCompleted = !!completedLessons[lesson.slug];

  return (
    <div className="flex items-center justify-between p-3.5 bg-white border border-secondary rounded-xl hover:shadow-sm transition-all duration-200 group">
      <div className="flex items-center gap-3">
        {/* Completion Checkbox */}
        <button
          onClick={() => toggleLessonComplete(lesson.slug)}
          className={clsx("transition-colors focus:outline-none", {
            "text-primary": isCompleted,
            "text-text/30 hover:text-primary": !isCompleted,
          })}
          title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          aria-label={isCompleted ? `Mark ${lesson.title} as incomplete` : `Mark ${lesson.title} as complete`}
        >
          {isCompleted ? <CheckCircle2 size={20} className="fill-primary/10" /> : <Circle size={20} />}
        </button>

        {/* Lesson Navigation Link */}
        <Link
          to={`/lessons/${lesson.slug}`}
          className="font-heading text-sm font-semibold text-text/80 group-hover:text-primary transition-colors"
        >
          {lesson.title}
        </Link>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-text/45">
        <Clock size={13} />
        <span>{lesson.readMinutes} min</span>
      </div>
    </div>
  );
};
