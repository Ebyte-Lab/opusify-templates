import React from 'react';
import { Course } from '@/types/course';
import { useCourses } from '@/hooks/useCourseStore';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { ProgressTrack } from '../common/ProgressTrack';
import { Calendar, User, ArrowRight, Award } from 'lucide-react';
import { clsx } from 'clsx';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { enrollCourse } = useCourses();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAction = () => {
    if (course.status === 'available') {
      enrollCourse(course.id);
    } else if (course.status === 'enrolled') {
      addToast(`Launching curriculum player for "${course.title}"...`, 'info');
    } else if (course.status === 'completed') {
      addToast(`Showing completed syllabus for "${course.title}"`, 'info');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 flex flex-col justify-between h-full hover:border-gray-300 transition-colors">
      <div className="space-y-4">
        {/* Status Badge */}
        <div className="flex justify-between items-center">
          <span
            className={clsx(
              'px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm',
              course.status === 'enrolled' && 'bg-blue-50 text-primary',
              course.status === 'available' && 'bg-gray-100 text-text/60',
              course.status === 'completed' && 'bg-green-50 text-green-700'
            )}
          >
            {course.status}
          </span>
          {course.status === 'completed' && (
            <span className="text-green-600 flex items-center gap-1 text-xs font-semibold">
              <Award size={14} />
              <span>Certified</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg text-text leading-snug">
          {course.title}
        </h3>

        {/* Meta Info */}
        <div className="space-y-2 text-xs text-text/70">
          <div className="flex items-center gap-2">
            <User size={14} className="text-text/40 shrink-0" />
            <span>Instructor: <strong className="text-text">{course.instructor}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-text/40 shrink-0" />
            <span>Schedule: <strong className="text-text">{course.schedule}</strong></span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Progress Tracker (For enrolled/completed) */}
        {course.status !== 'available' && (
          <ProgressTrack
            title=""
            subtitle={course.status === 'completed' ? 'Curriculum Complete' : 'Syllabus Progress'}
            percentComplete={course.percentComplete}
          />
        )}

        {/* CTA Button */}
        {course.status === 'completed' ? (
          <div className="flex gap-2">
            <button
              onClick={handleAction}
              className="flex-grow py-2 border border-gray-200 text-text/70 hover:text-text hover:bg-gray-50 text-sm font-semibold rounded-sm transition-colors focus:outline-none"
            >
              Review Curriculum
            </button>
            <button
              onClick={() => navigate('/certificates')}
              className="px-3 py-2 bg-green-50 text-green-700 hover:bg-green-100 text-sm font-semibold rounded-sm transition-colors focus:outline-none flex items-center justify-center"
              title="View Certificate"
            >
              <Award size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAction}
            className={clsx(
              'w-full py-2.5 text-sm font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              course.status === 'enrolled'
                ? 'bg-primary hover:bg-[#0A365C] text-white focus-visible:ring-primary'
                : 'border border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary'
            )}
          >
            <span>{course.status === 'enrolled' ? 'Continue' : 'Enroll'}</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
