import React from 'react';
import { AttendanceCalendar } from '../components/features/attendance/AttendanceCalendar';
import { AttendanceStatCard } from '../components/features/attendance/AttendanceStatCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useActiveChild } from '../hooks/useActiveChild';
import { mockAttendance } from '../data/mockAttendance';
import { useFetchMock } from '../hooks/useFetchMock';
import { ClipboardList, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { activeChild } = useActiveChild();

  // Simulated fetch of child attendance
  const childAttendance = mockAttendance[activeChild.id] || [];
  const { data: attendanceData, isLoading } = useFetchMock(childAttendance, 400);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="h-28 bg-gray-200 rounded-[2rem]" />
          <div className="h-28 bg-gray-200 rounded-[2rem]" />
          <div className="h-28 bg-gray-200 rounded-[2rem]" />
          <div className="h-28 bg-gray-200 rounded-[2rem]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-gray-200 rounded-[2rem]" />
          <div className="h-96 bg-gray-200 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={16} className="text-green-500 shrink-0" />;
      case 'tardy':
        return <Clock size={16} className="text-orange-500 shrink-0" />;
      case 'absent':
      case 'excused':
        return <AlertTriangle size={16} className="text-blue-500 shrink-0" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === 'present') return 'green';
    if (status === 'tardy') return 'orange';
    if (status === 'excused') return 'blue';
    return 'red';
  };

  // Get the last 10 records for chronological logs
  const recentLogs = attendanceData ? attendanceData.slice(0, 10) : [];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center">
          <ClipboardList size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-heading text-3xl text-text leading-tight">Attendance Record</h1>
          <p className="text-sm font-semibold text-gray-400">
            Daily logs and status breakdowns for {activeChild.name}
          </p>
        </div>
      </div>

      {attendanceData && (
        <>
          {/* Stat Cards */}
          <AttendanceStatCard records={attendanceData} />

          {/* Grid section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* June Calendar View */}
            <div className="lg:col-span-2">
              <AttendanceCalendar records={attendanceData} />
            </div>

            {/* Chronological History Log */}
            <div className="lg:col-span-1">
              <Card className="flex flex-col h-full overflow-hidden">
                <h3 className="font-heading font-bold text-xl text-text mb-4 pb-2 border-b border-gray-100 shrink-0">
                  Recent Logs
                </h3>
                
                <div className="flex-grow overflow-y-auto flex flex-col gap-4 max-h-[360px] pr-1">
                  {recentLogs.map((log, idx) => {
                    const formattedDate = new Date(log.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      timeZone: 'UTC', // Ensure consistent date formatting without offset shifts
                    });

                    return (
                      <div
                        key={idx}
                        className="bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl p-4 transition-colors flex flex-col gap-2.5"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-600">{formattedDate}</span>
                          <Badge variant={getStatusBadgeVariant(log.status)}>
                            <span className="capitalize">{log.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="flex items-start gap-2.5 text-xs text-gray-500 font-semibold leading-relaxed">
                          {getStatusIcon(log.status)}
                          <p>
                            {log.status === 'present'
                              ? 'Logged present in homeroom.'
                              : log.note || 'No notes provided.'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default AttendancePage;
