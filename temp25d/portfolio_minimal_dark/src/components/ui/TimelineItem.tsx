// src/components/ui/TimelineItem.tsx
import React from 'react';
import SkillTag from './SkillTag';
import type { ExperienceEntry } from '../../types';

interface TimelineItemProps {
  entry: ExperienceEntry;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ entry }) => {
  const { role, company, dateRange, description, tags, current } = entry;

  return (
    <div className="relative pl-8 md:pl-12">
      {/* Timeline Dot Indicator */}
      {current ? (
        <div 
          className="absolute w-4 h-4 bg-bg border-2 border-primary rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(0,255,65,0.5)] z-10" 
          aria-hidden="true"
        />
      ) : (
        <div 
          className="absolute w-3 h-3 bg-secondary border-2 border-bg rounded-full -left-[7px] top-1.5 z-10" 
          aria-hidden="true"
        />
      )}

      {/* Role and Company */}
      <div className="flex flex-col md:flex-row md:items-baseline mb-2">
        <h3
          className={`font-heading text-xl font-bold ${
            current ? 'text-white' : 'text-white/80'
          }`}
        >
          {role}
        </h3>
        <span
          className={`text-sm font-medium md:ml-4 ${
            current ? 'text-primary' : 'text-text/60'
          }`}
        >
          @ {company}
        </span>
      </div>

      {/* Date Range */}
      <time
        className={`block mb-4 text-xs font-medium uppercase tracking-widest ${
          current ? 'text-text/50' : 'text-text/40'
        }`}
      >
        {dateRange}
      </time>

      {/* Description */}
      <p
        className={`text-sm mb-5 leading-relaxed ${
          current ? 'text-text/80' : 'text-text/70'
        }`}
      >
        {description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <SkillTag key={tag} name={tag} variant="timeline" isCurrent={current} />
        ))}
      </div>
    </div>
  );
};

export default TimelineItem;
