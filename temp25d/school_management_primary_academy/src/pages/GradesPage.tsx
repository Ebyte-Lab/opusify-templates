import React, { useState } from 'react';
import { GradeSubjectCard } from '../components/features/grades/GradeSubjectCard';
import { ReportCardPanel } from '../components/features/grades/ReportCardPanel';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/EmptyState';
import { useActiveChild } from '../hooks/useActiveChild';
import { mockGrades } from '../data/mockGrades';
import { useFetchMock } from '../hooks/useFetchMock';
import { GraduationCap, Calendar } from 'lucide-react';

export const GradesPage: React.FC = () => {
  const { activeChild } = useActiveChild();
  const [activeTerm, setActiveTerm] = useState('term-1');

  const terms = [
    { id: 'term-1', label: 'Term 1' },
    { id: 'term-2', label: 'Term 2' },
    { id: 'term-3', label: 'Term 3' },
    { id: 'term-4', label: 'Term 4' },
  ];

  // Simulated fetch of child grades
  const childGrades = mockGrades[activeChild.id] || [];
  const { data: grades, isLoading } = useFetchMock(childGrades, 400);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg" />
        <div className="h-14 w-80 bg-gray-200 rounded-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-200 rounded-[2rem]" />
            <div className="h-48 bg-gray-200 rounded-[2rem]" />
          </div>
          <div className="h-72 bg-gray-200 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  const showGrades = activeTerm === 'term-1' && grades && grades.length > 0;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center">
            <GraduationCap size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-heading text-3xl text-text leading-tight">Report Card</h1>
            <p className="text-sm font-semibold text-gray-400">
              Academic records and teacher feedback for {activeChild.name}
            </p>
          </div>
        </div>

        {/* Term Select Tabs */}
        <Tabs tabs={terms} activeTab={activeTerm} onChange={setActiveTerm} />
      </div>

      {showGrades ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grades Cards list */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {grades.map((record, idx) => (
              <GradeSubjectCard key={idx} record={record} />
            ))}
          </div>

          {/* Aggregated Report Card Summary */}
          <div className="lg:col-span-1">
            <ReportCardPanel records={grades} termName="Term 1" />
          </div>
        </div>
      ) : (
        <EmptyState
          title={`${terms.find((t) => t.id === activeTerm)?.label} Grades Pending`}
          description="Grades for this term have not yet been finalized by the administration. Check back at the end of the reporting cycle."
          icon={<Calendar size={24} className="text-purple-500" />}
        />
      )}
    </div>
  );
};
export default GradesPage;
