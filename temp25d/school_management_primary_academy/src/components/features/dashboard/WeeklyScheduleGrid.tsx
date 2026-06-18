import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card } from '../../ui/Card';
import { useActiveChild } from '../../../hooks/useActiveChild';
import { useWeekNavigation } from '../../../hooks/useWeekNavigation';
import { mockClassSessions } from '../../../data/mockSchedule';

export const WeeklyScheduleGrid: React.FC = () => {
  const { activeChild } = useActiveChild();
  const { weekOffset, weekInfo, nextWeek, prevWeek } = useWeekNavigation();

  const sessions = mockClassSessions[activeChild.id] || [];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM'];

  // Check if a specific column day is actually "Today"
  const isToday = (dayName: string) => {
    if (weekOffset !== 0) return false;
    const todayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const dayMap: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 };
    return dayMap[dayName] === todayIndex;
  };

  // Maps custom color IDs to specific Tailwind classes
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    primary: 'bg-primary/20 text-yellow-700 border-primary/30',
    pink: 'bg-rose-100 text-pink-700 border-rose-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    gray: 'bg-gray-100 text-gray-500 border-gray-200',
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
            <Calendar size={20} strokeWidth={2.5} />
          </div>
          <h2 className="font-heading text-2xl text-text">Class Schedule</h2>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full border border-gray-100 self-stretch sm:self-auto justify-between">
          <button
            onClick={prevWeek}
            aria-label="Previous week"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-text hover:bg-gray-100 transition-colors shadow-sm focus:outline-none"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <span className="font-heading font-bold text-sm text-text px-4 select-none">
            {weekInfo.label}
          </span>
          <button
            onClick={nextWeek}
            aria-label="Next week"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-text hover:bg-gray-100 transition-colors shadow-sm focus:outline-none"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Grid container */}
      <div className="flex-grow overflow-x-auto pb-4">
        <div className="min-w-[600px] grid grid-cols-6 gap-4 h-full">
          {/* Time Column */}
          <div className="flex flex-col gap-4 pt-12 text-[11px] font-bold text-gray-400 text-right pr-2">
            <div className="h-16 flex items-start justify-end">09:00 AM</div>
            <div className="h-16 flex items-start justify-end">11:00 AM</div>
            <div className="h-16 flex items-start justify-end">01:00 PM</div>
          </div>

          {/* Days Columns */}
          {daysOfWeek.map((day) => {
            const isColumnToday = isToday(day);
            return (
              <div key={day} className="flex flex-col gap-4">
                {/* Column header */}
                <div
                  className={`font-heading font-bold text-center text-sm py-1 rounded-lg transition-colors ${
                    isColumnToday
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-gray-500'
                  }`}
                >
                  {day}
                </div>

                {/* Day slots */}
                {timeSlots.map((time) => {
                  const session = sessions.find((s) => s.day === day && s.startTime === time);

                  if (!session) {
                    return (
                      <div
                        key={time}
                        className="h-16 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100"
                      />
                    );
                  }

                  const colorClasses = colorMap[session.color] || colorMap.gray;

                  return (
                    <div
                      key={time}
                      className={`h-16 rounded-2xl border-2 p-3 font-semibold text-xs flex flex-col justify-center shadow-inner relative ${colorClasses}`}
                    >
                      <span className="font-bold truncate">{session.subject}</span>
                      <span className="text-[10px] font-normal opacity-80 mt-0.5 truncate">
                        {session.room}
                      </span>
                      {/* Bouncing Today indicator */}
                      {isColumnToday && !session.subject.includes('Release') && !session.subject.includes('Release') && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold shadow-sm animate-bounce">
                          Today
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
export default WeeklyScheduleGrid;
