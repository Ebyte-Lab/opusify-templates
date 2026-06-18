import React, { useState } from 'react';
import type { Module } from '../../../types/module';
import { ProgressBar } from '../../ui/ProgressBar';
import { LessonListItem } from './LessonListItem';
import { ChevronDown, ChevronUp, Lock, CheckCircle2, Play } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const [isExpanded, setIsExpanded] = useState(module.status === 'in-progress');

  const isLocked = module.status === 'locked';

  const getStatusBadge = (status: Module['status']) => {
    switch (status) {
      case 'complete':
        return (
          <Badge variant="success">
            <span className="flex items-center gap-1 normal-case font-bold">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              Completed
            </span>
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="primary">
            <span className="flex items-center gap-1 normal-case font-bold">
              <Play className="w-2.5 h-2.5 fill-primary text-primary" />
              In Progress
            </span>
          </Badge>
        );
      case 'locked':
        return (
          <Badge variant="secondary">
            <span className="flex items-center gap-1 normal-case font-bold">
              <Lock className="w-2.5 h-2.5" />
              Locked
            </span>
          </Badge>
        );
    }
  };

  const toggleExpand = () => {
    if (!isLocked) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`bg-[#18181B] border rounded-lg overflow-hidden transition-all duration-300 ${
        isLocked
          ? 'opacity-50 border-secondary select-none'
          : 'border-secondary hover:border-primary/40'
      }`}
    >
      {/* Header Area */}
      <div
        onClick={toggleExpand}
        className={`p-5 flex items-start justify-between gap-4 select-none ${
          isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {getStatusBadge(module.status)}
            <span className="text-[10px] text-text/40 font-mono font-bold">
              {module.lessonCount} lessons
            </span>
          </div>
          <h3 className="font-heading font-extrabold text-white text-base md:text-lg">
            {module.title}
          </h3>
          <p className="text-xs text-text/60 leading-relaxed max-w-2xl">
            {module.description}
          </p>

          {!isLocked && (
            <div className="pt-2 w-full max-w-md">
              <ProgressBar progress={module.progressPercent} className="mb-1.5" />
              <div className="flex justify-between text-[10px] text-text/40 font-mono">
                <span>Completion progress</span>
                <span>{module.progressPercent}%</span>
              </div>
            </div>
          )}
        </div>

        {!isLocked && (
          <button
            className="text-text/40 hover:text-primary transition-colors p-1 self-start"
            aria-label={isExpanded ? 'Collapse module lessons' : 'Expand module lessons'}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Expanded Lessons List */}
      {isExpanded && !isLocked && module.lessons && (
        <div className="border-t border-secondary bg-secondary/10 p-5 space-y-2">
          <h4 className="text-[10px] uppercase tracking-widest text-text/40 font-bold mb-3 select-none">
            Lessons Syllabus
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {module.lessons.map((lesson) => (
              <LessonListItem key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
