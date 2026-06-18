import React from 'react';
import { Card } from '../../ui/Card';
import { CalendarRange, ShieldAlert, Award } from 'lucide-react';
import { AttendanceRecord } from '../../../types/attendance';

interface AttendanceStatCardProps {
  records: AttendanceRecord[];
}

export const AttendanceStatCard: React.FC<AttendanceStatCardProps> = ({ records }) => {
  const totalDays = records.length;
  const presentDays = records.filter((r) => r.status === 'present').length;
  const absentDays = records.filter((r) => r.status === 'absent').length;
  const tardyDays = records.filter((r) => r.status === 'tardy').length;
  const excusedDays = records.filter((r) => r.status === 'excused').length;

  const attendanceRate = totalDays
    ? Math.round(((presentDays + tardyDays) / totalDays) * 100)
    : 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Attendance rate */}
      <Card className="flex items-center gap-4 bg-gradient-to-br from-blue-600 to-blue-500 text-white border-0">
        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0 border border-white/10">
          <Award size={28} />
        </div>
        <div>
          <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider block mb-0.5">Attendance Rate</span>
          <h3 className="font-heading font-bold text-3xl leading-tight">{attendanceRate}%</h3>
          <span className="text-xs font-semibold text-blue-100/80">Excellent standing</span>
        </div>
      </Card>

      {/* Present days */}
      <Card className="flex items-center gap-4 hoverable">
        <div className="w-14 h-14 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center shrink-0 border border-green-200">
          <CalendarRange size={28} />
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Present Days</span>
          <h3 className="font-heading font-bold text-3xl text-text leading-tight">{presentDays + tardyDays}</h3>
          <span className="text-xs font-semibold text-green-600">{presentDays} on-time, {tardyDays} late</span>
        </div>
      </Card>

      {/* Absent days */}
      <Card className="flex items-center gap-4 hoverable">
        <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center shrink-0 border border-red-200">
          <ShieldAlert size={28} />
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Absences</span>
          <h3 className="font-heading font-bold text-3xl text-text leading-tight">{absentDays + excusedDays}</h3>
          <span className="text-xs font-semibold text-red-500">
            {excusedDays} excused, {absentDays} unexcused
          </span>
        </div>
      </Card>

      {/* Tardy days */}
      <Card className="flex items-center gap-4 hoverable">
        <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center shrink-0 border border-orange-200">
          <CalendarRange size={28} />
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Tardiness</span>
          <h3 className="font-heading font-bold text-3xl text-text leading-tight">{tardyDays}</h3>
          <span className="text-xs font-semibold text-orange-600">Requires early travel</span>
        </div>
      </Card>
    </div>
  );
};
export default AttendanceStatCard;
