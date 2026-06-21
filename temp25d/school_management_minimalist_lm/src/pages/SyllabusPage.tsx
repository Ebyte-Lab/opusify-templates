import React, { useState } from 'react';
import { syllabusData } from '../data/syllabus';
import { ModuleAccordion } from '../components/syllabus/ModuleAccordion';
import { useCourse } from '../context/CourseContext';

export const SyllabusPage: React.FC = () => {
  const { getOverallProgress, completedLessons } = useCourse();
  const overallProgress = getOverallProgress();
  const completedLessonsCount = Object.values(completedLessons).filter(Boolean).length;
  
  // Track open state for modules; default open the first module
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    m1: true,
  });

  const toggleModule = (id: string) => {
    setOpenModules(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full max-w-[680px] mx-auto px-6 pt-32 pb-24 font-body text-text">
      {/* Page Meta */}
      <div className="mb-10 focus-hide transition-opacity duration-500">
        <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-primary mb-4 font-semibold">
          <span>Course Syllabus</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6 text-[#0f172a] tracking-tight leading-tight">
          Visual Systems & Design
        </h1>
        <p className="text-lg text-text/75 leading-relaxed mb-8">
          Master the fundamentals of visual layout, color harmony, user psychology, and minimalist design patterns. Below is your structured learning outline.
        </p>

        {/* Global Progress Card */}
        <div className="bg-secondary/40 border border-secondary p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="font-heading font-semibold text-[#0f172a]">Your Learning Progress</span>
            <span className="text-xs text-text/50">
              {completedLessonsCount} of 3 lessons completed
            </span>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-1/2">
            <div className="flex-grow h-2.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className="font-heading font-bold text-[#0f172a]">{overallProgress}%</span>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-[#0f172a] mb-6">Course Modules</h2>
        {syllabusData.map(module => (
          <ModuleAccordion
            key={module.id}
            module={module}
            isOpen={!!openModules[module.id]}
            onToggle={() => toggleModule(module.id)}
          />
        ))}
      </div>
    </div>
  );
};
