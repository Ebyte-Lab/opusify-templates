import React from 'react';
import { mockModules } from '../data/mockModules';
import { useFetchMock } from '../hooks/useFetchMock';
import { ModuleCard } from '../components/features/modules/ModuleCard';
import { Loader2 } from 'lucide-react';

export const ModulesPage: React.FC = () => {
  const { data: modules, loading } = useFetchMock(mockModules, 400);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      <div className="border-b border-secondary pb-6">
        <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1 select-none">
          Alex.dev Portal
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
          Curriculum Modules
        </h1>
        <p className="text-sm text-text/70 mt-2 max-w-2xl">
          Browse through the syllabus, lessons list, and track your progress as you master backend web development, APIs, database architectures, advanced React frameworks, and complete your Capstone.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {modules?.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      )}
    </div>
  );
};
