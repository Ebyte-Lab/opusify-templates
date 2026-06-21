import React from 'react';
import type { Module } from '../../types/lesson';
import { LessonListItem } from './LessonListItem';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { Badge } from '../ui/Badge';

interface ModuleAccordionProps {
  module: Module;
  isOpen: boolean;
  onToggle: () => void;
}

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({ module, isOpen, onToggle }) => {
  const { getModuleProgress } = useCourse();
  const progress = getModuleProgress(module.id);

  return (
    <div className="border border-secondary rounded-2xl overflow-hidden mb-4 bg-white shadow-sm transition-all duration-300">
      {/* Header Button */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/20 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <span className="font-heading font-semibold text-lg text-[#0f172a]">{module.title}</span>
          <Badge variant={progress === 100 ? 'primary' : 'secondary'}>
            {progress}% Completed
          </Badge>
        </div>
        <div className="text-text/50">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {/* Accordion Content */}
      <div
        className={`transition-all duration-350 ease-in-out ${
          isOpen ? 'max-h-[1000px] border-t border-secondary opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-4 space-y-2 bg-secondary/10">
          {module.lessons.map(lesson => (
            <LessonListItem key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};
