import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Check, X, Clock, AlertTriangle } from 'lucide-react';
import { AttendanceRecord } from '../../../types/attendance';

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ records }) => {
  // June 2026 starts on a Monday (1) and has 30 days
  const daysInJune = 30;
  const days = Array.from({ length: daysInJune }, (_, i) => i + 1);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDayRecord = (day: number): AttendanceRecord | undefined => {
    const dateStr = `2026-06-${day.toString().padStart(2, '0')}`;
    return records.find((r) => r.date === dateStr);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'present':
        return {
          bg: 'bg-green-50 border-green-200 text-green-700',
          dot: 'bg-green-500',
          icon: <Check size={12} className="text-green-600" />,
        };
      case 'absent':
        return {
          bg: 'bg-red-50 border-red-200 text-red-700',
          dot: 'bg-red-500',
          icon: <X size={12} className="text-red-600" />,
        };
      case 'tardy':
        return {
          bg: 'bg-orange-50 border-orange-200 text-orange-700',
          dot: 'bg-orange-400',
          icon: <Clock size={12} className="text-orange-600" />,
        };
      case 'excused':
        return {
          bg: 'bg-blue-50 border-blue-200 text-blue-700',
          dot: 'bg-blue-400',
          icon: <AlertTriangle size={12} className="text-blue-600" />,
        };
      default:
        return {
          bg: 'bg-gray-50/50 border-gray-100 text-gray-400',
          dot: 'bg-gray-300',
          icon: null,
        };
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-100 pb-4">
        <div>
          <h3 className="font-heading font-bold text-xl text-text">June 2026</h3>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Click log list items for details</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 text-[10px] font-bold">
          <Badge variant="green" className="py-0.5 px-2">Present</Badge>
          <Badge variant="orange" className="py-0.5 px-2">Tardy</Badge>
          <Badge variant="blue" className="py-0.5 px-2">Excused</Badge>
          <Badge variant="red" className="py-0.5 px-2">Absent</Badge>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 mb-2">
        {weekDays.map((wd) => (
          <div key={wd} className="py-1">
            {wd}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const record = getDayRecord(day);
          const dateStr = `2026-06-${day.toString().padStart(2, '0')}`;
          
          // Check if it is a weekend
          const dateObj = new Date(2026, 5, day); // Month is 0-indexed (5 = June)
          const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

          const styles = record
            ? getStatusStyles(record.status)
            : getStatusStyles(isWeekend ? 'weekend' : 'unrecorded');

          return (
            <div
              key={day}
              className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-between p-1.5 transition-all ${
                isWeekend ? 'bg-gray-100/30 border-gray-100/50 text-gray-300' : styles.bg
              }`}
              title={record?.note ? `${dateStr}: ${record.note}` : undefined}
            >
              <span className="text-xs font-bold self-start">{day}</span>
              {record && (
                <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100">
                  {styles.icon}
                </div>
              )}
              {!record && !isWeekend && (
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              )}
              {isWeekend && <span className="text-[8px] font-bold text-gray-300">Wknd</span>}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
export default AttendanceCalendar;
