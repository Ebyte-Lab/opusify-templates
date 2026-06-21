import React from 'react';
import { Link } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import clsx from 'clsx';

interface LessonFooterNavProps {
  lessonSlug: string;
  prevLessonSlug?: string;
  nextLessonSlug?: string;
  prevLessonTitle?: string;
  nextLessonTitle?: string;
}

export const LessonFooterNav: React.FC<LessonFooterNavProps> = ({
  lessonSlug,
  prevLessonSlug,
  nextLessonSlug,
  prevLessonTitle,
  nextLessonTitle
}) => {
  const { completedLessons, toggleLessonComplete } = useCourse();
  const isCompleted = !!completedLessons[lessonSlug];

  return (
    <div className="mt-20 pt-10 border-t border-secondary flex justify-between items-center focus-hide transition-opacity duration-500">
      {/* Previous Lesson Link */}
      {prevLessonSlug && prevLessonTitle ? (
        <Link to={`/lessons/${prevLessonSlug}`} className="flex flex-col text-left group">
          <span className="text-xs font-heading uppercase tracking-widest text-text/40 mb-1 group-hover:text-primary transition-colors font-semibold">
            Previous
          </span>
          <span className="font-heading font-medium text-sm text-text/80 group-hover:text-text transition-colors flex items-center gap-2">
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            {prevLessonTitle}
          </span>
        </Link>
      ) : (
        <div className="w-1/3" /> /* spacer */
      )}

      {/* Complete Button */}
      <button
        onClick={() => toggleLessonComplete(lessonSlug)}
        className={clsx(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
          {
            "bg-primary text-white shadow-primary/25": isCompleted,
            "bg-secondary/50 text-text/40 hover:bg-primary hover:text-white": !isCompleted
          }
        )}
        title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
        aria-label={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
      >
        <Check size={20} />
      </button>

      {/* Next Lesson Link */}
      {nextLessonSlug && nextLessonTitle ? (
        <Link to={`/lessons/${nextLessonSlug}`} className="flex flex-col text-right group">
          <span className="text-xs font-heading uppercase tracking-widest text-text/40 mb-1 group-hover:text-primary transition-colors font-semibold">
            Next Lesson
          </span>
          <span className="font-heading font-medium text-sm text-text/80 group-hover:text-text transition-colors flex items-center gap-2">
            {nextLessonTitle}
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      ) : (
        <div className="w-1/3" /> /* spacer */
      )}
    </div>
  );
};
