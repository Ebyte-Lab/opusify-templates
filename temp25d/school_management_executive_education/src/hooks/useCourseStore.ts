import { create } from 'zustand';
import { Course } from '@/types/course';
import { coursesMockData } from '@/data/courses';
import { useToastStore } from './useToast';

interface CourseStore {
  courses: Course[];
  enrollCourse: (courseId: string) => void;
  updateProgress: (courseId: string, percent: number) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: coursesMockData,
  enrollCourse: (courseId) => set((state) => {
    const updated = state.courses.map((course) => {
      if (course.id === courseId) {
        setTimeout(() => {
          useToastStore.getState().addToast(`Enrolled in "${course.title}" successfully!`, 'success');
        }, 0);
        return { ...course, status: 'enrolled' as const, percentComplete: 0 };
      }
      return course;
    });
    return { courses: updated };
  }),
  updateProgress: (courseId, percent) => set((state) => ({
    courses: state.courses.map((course) =>
      course.id === courseId ? { ...course, percentComplete: percent } : course
    )
  }))
}));
export const useCourses = () => {
  const courses = useCourseStore((state) => state.courses);
  const enrollCourse = useCourseStore((state) => state.enrollCourse);
  const updateProgress = useCourseStore((state) => state.updateProgress);
  return { courses, enrollCourse, updateProgress };
};
