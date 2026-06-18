import React, { useState } from 'react';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { DonutChart } from '../components/ui/DonutChart';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Badge } from '../components/ui/Badge';
import { DownloadModal } from '../components/modals/DownloadModal';
import { announcements } from '../data/announcements';
import { student } from '../data/student';
import { courses } from '../data/courses';
import { degreeProgress } from '../data/degreeProgress';
import { Info, Download, AlertCircle, Calendar, BookOpen, DollarSign, Bell } from 'lucide-react';

export const DashboardPage = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const announcement = announcements[0];

  const dashboardCourses = courses;

  const activities = [
    { id: 1, text: 'Grade posted: CS 315 — A-', time: '2 days ago', type: 'grade' },
    { id: 2, text: 'Fee payment received: $4,200', time: '5 days ago', type: 'payment' },
    { id: 3, text: 'Library book due soon: "Clean Code" — due in 3 days', time: 'due', type: 'library' },
    { id: 4, text: 'Club event: Philosophy Debate — Thursday 6pm', time: 'upcoming', type: 'club' },
    { id: 5, text: 'Advisor meeting confirmed: Nov 8, 2:00 PM', time: 'confirmed', type: 'advisor' }
  ];

  return (
    <div className="space-y-6">
      {/* Announcement Banner */}
      {showAnnouncement && announcement && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-6 py-4 rounded-lg flex items-start justify-between gap-4 shadow-xs transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 text-white p-2 rounded-full hidden sm:block">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-950">{announcement.title}</h4>
              <p className="text-sm mt-0.5 text-amber-900 leading-normal">{announcement.content}</p>
            </div>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="text-amber-700 hover:bg-amber-100 p-1.5 rounded-md transition-colors"
            aria-label="Dismiss announcement"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Cumulative GPA"
          value={student.gpa}
          sub="Out of 4.0 scale"
          badge="Top 15% of Class"
          badgeColor="green"
        />
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-1">
              Credits Earned
            </span>
            <span className="font-heading text-4xl font-bold text-text mt-2 block">
              {degreeProgress.creditsEarned}
            </span>
          </div>
          <div className="mt-4">
            <ProgressBar value={71} color="bg-primary" />
            <p className="text-xs text-muted mt-2 text-right">34 credits remaining toward 120</p>
          </div>
        </div>
        <StatCard
          label="Account Balance"
          value="$0.00"
          sub="Fall semester paid in full"
        />
        <StatCard
          label="Next Class"
          value="Advanced Data Structures"
          sub="Room 402, Science Building"
          badge="In 45 mins"
          badgeColor="amber"
          gradient={true}
        />
      </div>

      {/* Main Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Academic Record (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="font-heading text-2xl font-bold text-text">Academic Record</h2>
              <p className="text-sm text-muted">Fall 2025 Semester Grades</p>
            </div>
            <button
              onClick={() => setIsDownloadOpen(true)}
              className="flex items-center gap-2 bg-white border border-gray-300 text-text hover:bg-gray-50 active:bg-gray-100 transition-colors px-4 py-2 rounded-md text-sm font-medium shadow-sm"
              aria-label="Download unofficial transcript"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse" aria-label="Fall 2025 Grades">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-xs uppercase tracking-wider text-muted font-bold">
                  <th className="p-4">Course Code</th>
                  <th className="p-4">Course Title</th>
                  <th className="p-4 text-center">Credits</th>
                  <th className="p-4 text-center">Grade</th>
                  <th className="p-4 text-center">Points</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {dashboardCourses.map((course) => (
                  <tr key={course.code} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-semibold text-primary">{course.code}</td>
                    <td className="p-4 text-text">{course.title}</td>
                    <td className="p-4 text-center text-muted font-medium">{course.credits.toFixed(1)}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-xs ${
                          course.grade.startsWith('A')
                            ? 'text-green-700 bg-green-50'
                            : course.grade.startsWith('B')
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-amber-700 bg-amber-50'
                        }`}
                      >
                        {course.grade}
                      </span>
                    </td>
                    <td className="p-4 text-center text-muted font-medium">{course.points.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50/50 font-bold border-t border-gray-200 text-sm">
                  <td colSpan="2" className="p-4 text-right text-muted">Term Totals:</td>
                  <td className="p-4 text-center text-text">15.0</td>
                  <td className="p-4 text-center text-muted">Term GPA:</td>
                  <td className="p-4 text-center text-primary font-bold">3.78</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right Column — Degree Progress & Activity Feed (1/3 width) */}
        <div className="space-y-6">
          <DonutChart
            percent={degreeProgress.percentComplete}
            earned={degreeProgress.creditsEarned}
            inProgress={degreeProgress.creditsInProgress}
            required={degreeProgress.creditsRequired}
          />

          {/* Activity Feed */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col">
            <h3 className="font-heading text-xl font-bold text-text border-b border-gray-100 pb-2 mb-4">
              Recent Activity
            </h3>
            <ul className="space-y-4" aria-label="Recent activity feed">
              {activities.map((act) => {
                const getIcon = (type) => {
                  switch (type) {
                    case 'grade': return <BookOpen className="w-4 h-4 text-green-600" />;
                    case 'payment': return <DollarSign className="w-4 h-4 text-blue-600" />;
                    case 'library': return <Bell className="w-4 h-4 text-amber-600" />;
                    case 'club': return <Calendar className="w-4 h-4 text-indigo-600" />;
                    default: return <Info className="w-4 h-4 text-gray-600" />;
                  }
                };

                return (
                  <li key={act.id} className="flex items-start gap-3">
                    <div className="mt-0.5 p-1 bg-gray-50 border border-gray-100 rounded">
                      {getIcon(act.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text leading-tight">{act.text}</p>
                      <span className="text-xs text-muted mt-1 block">{act.time}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Download Transcript Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        title="Transcript Prepared"
        message="Your unofficial transcript PDF has been generated securely and is ready for download."
      />
    </div>
  );
};

export default DashboardPage;
