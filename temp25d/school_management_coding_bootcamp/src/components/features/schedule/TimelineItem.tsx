import React from 'react';
import type { ScheduleEvent } from '../../../types/schedule';

interface TimelineItemProps {
  event: ScheduleEvent;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ event }) => {
  return (
    <div className="relative">
      <div
        className={`absolute w-2 h-2 rounded-full -left-[21px] top-1.5 ${
          event.isToday
            ? 'bg-primary shadow-[0_0_8px_#A855F7]'
            : 'bg-secondary'
        }`}
      />
      <div
        className={`text-[10px] font-bold uppercase mb-0.5 ${
          event.isToday ? 'text-primary' : 'text-text/50'
        }`}
      >
        {event.datetime}
      </div>
      <div
        className={`text-xs ${
          event.isToday ? 'text-white font-bold' : 'text-text/80'
        }`}
      >
        {event.label}
      </div>
      <div className="text-[10px] text-text/60 mt-1">{event.location}</div>
    </div>
  );
};
