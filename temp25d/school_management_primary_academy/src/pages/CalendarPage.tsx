import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockCalendarEvents } from '../data/mockCalendar';
import { useFetchMock } from '../hooks/useFetchMock';
import { Calendar, ChevronRight, Bell, Sparkles } from 'lucide-react';

export const CalendarPage: React.FC = () => {
  // Simulated fetch of calendar events
  const { data: events, isLoading } = useFetchMock(mockCalendarEvents, 400);

  // Selected date state (defaults to today, June 18, 2026)
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-18');

  // June 2026 starts on Monday and has 30 days
  const daysInMonth = 30;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getEventsForDate = (dateStr: string) => {
    return events ? events.filter((e) => e.date === dateStr) : [];
  };

  const getDayEvents = (day: number) => {
    const dateStr = `2026-06-${day.toString().padStart(2, '0')}`;
    return getEventsForDate(dateStr);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'holiday':
        return 'bg-red-500 text-white';
      case 'academic':
        return 'bg-blue-500 text-white';
      case 'social':
        return 'bg-green-500 text-white';
      case 'sports':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getEventBadgeVariant = (type: string) => {
    if (type === 'holiday') return 'red';
    if (type === 'academic') return 'blue';
    if (type === 'social') return 'green';
    if (type === 'sports') return 'orange';
    return 'gray';
  };

  const selectedDateLabel = new Date(selectedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const selectedEvents = getEventsForDate(selectedDate);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[400px] bg-gray-200 rounded-[2rem]" />
          <div className="h-[400px] bg-gray-200 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center">
          <Calendar size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-heading text-3xl text-text leading-tight">School Calendar</h1>
          <p className="text-sm font-semibold text-gray-400">
            SunnySide Academy holidays, parent conferences, and campus activities
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-heading font-bold text-xl text-text">June 2026</h3>
              <div className="flex gap-2 text-[10px] font-bold">
                <Badge variant="blue">Academic</Badge>
                <Badge variant="red">Holidays</Badge>
                <Badge variant="green">Social</Badge>
                <Badge variant="orange">Sports</Badge>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 mb-2">
              {weekDays.map((wd) => (
                <div key={wd} className="py-1">
                  {wd}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2 flex-grow">
              {days.map((day) => {
                const dateStr = `2026-06-${day.toString().padStart(2, '0')}`;
                const isSelected = dateStr === selectedDate;
                const dayEvents = getDayEvents(day);

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`aspect-square border-2 rounded-2xl p-1.5 flex flex-col items-stretch justify-between transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                    }`}
                  >
                    <span className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-gray-600'}`}>
                      {day}
                    </span>
                    
                    {/* Event indicators */}
                    <div className="flex flex-col gap-0.5 mt-1">
                      {dayEvents.map((e) => (
                        <div
                          key={e.id}
                          className={`text-[8px] px-1 py-0.5 rounded font-bold truncate text-left ${getEventTypeColor(
                            e.type
                          )}`}
                          title={e.title}
                        >
                          {e.title}
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar Info & Events List */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Day Details Card */}
          <Card className="border-secondary bg-rose-50/5 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-rose-100/50 pb-2">
              <Bell size={18} className="text-pink-500" />
              <h3 className="font-heading font-bold text-base text-text">
                {selectedDateLabel}
              </h3>
            </div>

            <div className="flex flex-col gap-3 min-h-[140px] overflow-y-auto">
              {selectedEvents.length > 0 ? (
                selectedEvents.map((e) => (
                  <div key={e.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-sm text-text">
                        {e.title}
                      </span>
                      <Badge variant={getEventBadgeVariant(e.type)}>
                        <span className="capitalize">{e.type}</span>
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                      {e.description || 'No description provided.'}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-6 text-gray-400 gap-1.5">
                  <Sparkles size={24} className="text-gray-300" />
                  <p className="text-xs font-semibold">No school events scheduled for this day.</p>
                </div>
              )}
            </div>
          </Card>

          {/* Monthly Summary Sidebar */}
          <Card className="flex flex-col flex-grow">
            <h3 className="font-heading font-bold text-base text-text mb-4 pb-2 border-b border-gray-100">
              Upcoming Events
            </h3>
            
            <div className="flex-grow overflow-y-auto flex flex-col gap-3 max-h-[200px] pr-1">
              {events &&
                events.map((e) => {
                  const evDate = new Date(e.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    timeZone: 'UTC',
                  });

                  return (
                    <button
                      key={e.id}
                      onClick={() => setSelectedDate(e.date)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 text-left transition-colors focus:outline-none"
                    >
                      <div className="min-w-0">
                        <h4 className="font-heading font-bold text-xs text-text truncate">
                          {e.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-bold">{evDate}</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-400 shrink-0 ml-2" />
                    </button>
                  );
                })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CalendarPage;
