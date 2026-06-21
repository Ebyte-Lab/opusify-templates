import React from 'react';
import { Course } from '@/types/course';
import { CourseCard } from './CourseCard';

interface CourseGridProps {
  courses: Course[];
}

export const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
