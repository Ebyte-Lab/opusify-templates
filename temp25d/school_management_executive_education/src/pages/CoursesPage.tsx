import React, { useState } from 'react';
import { useCourses } from '@/hooks/useCourseStore';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { EmptyState } from '@/components/common/EmptyState';
import { BookOpen } from 'lucide-react';
import { clsx } from 'clsx';

export const CoursesPage: React.FC = () => {
  const { courses } = useCourses();
  const [activeTab, setActiveTab] = useState<'enrolled' | 'in-progress' | 'available' | 'completed'>('enrolled');

  const filteredCourses = courses.filter((course) => {
    switch (activeTab) {
      case 'enrolled':
        return course.status === 'enrolled' || course.status === 'completed';
      case 'in-progress':
        return course.status === 'enrolled' && course.percentComplete < 100;
      case 'completed':
        return course.status === 'completed';
      case 'available':
        return course.status === 'available';
      default:
        return true;
    }
  });

  const getEmptyStateDescription = () => {
    switch (activeTab) {
      case 'in-progress':
        return "You don't have any in-progress curriculum tracks currently. Explore available options to enroll.";
      case 'completed':
        return "You haven't completed any certified tracks yet. Finish your enrolled courses to earn credentials.";
      case 'available':
        return "All available curriculum programs have been enrolled. Check back soon for new semester listings.";
      default:
        return "You are not enrolled in any executive courses yet.";
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-text mb-2">Curriculum Explorer</h1>
        <p className="text-text/70 text-sm max-w-2xl">
          Access your enrolled coursework, view schedules, monitor credits, and enroll in upcoming masterclasses.
        </p>
      </div>

      {/* Tab Filter Links */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6 text-sm font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={clsx(
              'pb-3 border-b-2 transition-colors whitespace-nowrap focus:outline-none',
              activeTab === 'enrolled' ? 'border-primary text-primary' : 'border-transparent text-text/60 hover:text-text'
            )}
          >
            My Enrolled
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={clsx(
              'pb-3 border-b-2 transition-colors whitespace-nowrap focus:outline-none',
              activeTab === 'in-progress' ? 'border-primary text-primary' : 'border-transparent text-text/60 hover:text-text'
            )}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={clsx(
              'pb-3 border-b-2 transition-colors whitespace-nowrap focus:outline-none',
              activeTab === 'completed' ? 'border-primary text-primary' : 'border-transparent text-text/60 hover:text-text'
            )}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={clsx(
              'pb-3 border-b-2 transition-colors whitespace-nowrap focus:outline-none',
              activeTab === 'available' ? 'border-primary text-primary' : 'border-transparent text-text/60 hover:text-text'
            )}
          >
            Available Programs
          </button>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredCourses.length > 0 ? (
        <CourseGrid courses={filteredCourses} />
      ) : (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12">
          <EmptyState
            icon={<BookOpen size={48} />}
            title="No Courses Found"
            description={getEmptyStateDescription()}
          />
        </div>
      )}
    </div>
  );
};
export default CoursesPage;
