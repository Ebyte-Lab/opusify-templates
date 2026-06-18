import React from 'react';
import { ClassCard } from '../components/features/classes/ClassCard';
import { useActiveChild } from '../hooks/useActiveChild';
import { mockSubjects } from '../data/mockSchedule';
import { useFetchMock } from '../hooks/useFetchMock';
import { BookOpen } from 'lucide-react';

export const ClassesPage: React.FC = () => {
  const { activeChild } = useActiveChild();
  
  // Simulated fetch of child subjects
  const childSubjects = mockSubjects[activeChild.id] || [];
  const { data: subjects, isLoading } = useFetchMock(childSubjects, 400);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-80 bg-gray-200 rounded-[2rem]" />
          <div className="h-80 bg-gray-200 rounded-[2rem]" />
          <div className="h-80 bg-gray-200 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center">
          <BookOpen size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-heading text-3xl text-text leading-tight">Enrolled Classes</h1>
          <p className="text-sm font-semibold text-gray-400">
            Current syllabus and teacher notes for {activeChild.name}
          </p>
        </div>
      </div>

      {/* Classes Grid */}
      {subjects && subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <ClassCard key={subject.id} subject={subject} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 font-semibold">No classes found for this student.</p>
        </div>
      )}
    </div>
  );
};
export default ClassesPage;
