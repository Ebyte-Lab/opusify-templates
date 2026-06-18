import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProgressBar } from '../components/ui/ProgressBar';
import { TabNav } from '../components/ui/TabNav';
import { Badge } from '../components/ui/Badge';
import { AdvisorMeetingModal } from '../components/modals/AdvisorMeetingModal';
import { student } from '../data/student';
import { courses } from '../data/courses';
import { allTerms } from '../data/allTerms';
import { degreeProgress } from '../data/degreeProgress';
import { Calendar, Mail, MapPin, Clock, BookOpen, ExternalLink } from 'lucide-react';

export const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState('Fall 2025');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  const handleAdvisorSchedule = (slot) => {
    alert(`Appointment confirmed for ${slot.date} at ${slot.time} in ${slot.location}.`);
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'green';
    if (grade.startsWith('B')) return 'blue';
    return 'amber';
  };

  return (
    <div className="space-y-8">
      {/* Current Enrollment Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-900 text-white p-6 rounded-lg shadow-sm">
        <h2 className="font-heading text-2xl font-bold">Fall 2025 Enrollment</h2>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-secondary/90">
          <span className="font-semibold">15 Credit Hours Enrolled</span>
          <span className="hidden sm:inline">•</span>
          <span>Major: {student.major}</span>
          <span className="hidden sm:inline">•</span>
          <span>Minor: {student.minor}</span>
        </div>
      </div>

      {/* Grid: Courses (2/3 width) + Sidebar widgets (1/3 width) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Courses + Transcript */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Current Semester Courses */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-text">Current Courses</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.code} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Badge label={course.code} color="navy" />
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        course.grade.startsWith('A')
                          ? 'text-green-700 bg-green-50'
                          : 'text-blue-700 bg-blue-50'
                      }`}>
                        Current: {course.grade}
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-text leading-snug mt-1">{course.title}</h4>
                    <p className="text-xs text-muted font-medium mt-1">{course.professor}</p>
                    
                    <div className="mt-4 space-y-1.5 text-xs text-muted">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{course.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Office Hours: {course.officeHours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-muted">{course.credits} Credits</span>
                    <button
                      onClick={() => alert(`Syllabus for ${course.code} is not available in the demo.`)}
                      className="text-primary hover:text-blue-800 text-xs font-semibold flex items-center gap-1.5 focus:outline-none"
                    >
                      <span>View Syllabus</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Academic Transcript */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
            <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h3 className="font-heading text-xl font-bold text-text">Academic Transcript</h3>
                <p className="text-xs text-muted">View course and grade records by term</p>
              </div>
              <TabNav
                tabs={Object.keys(allTerms)}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>

            {/* Transcript Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" aria-label={`Transcript: ${activeTab}`}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-muted font-bold">
                    <th className="p-3">Course Code</th>
                    <th className="p-3">Course Title</th>
                    <th className="p-3 text-center">Credits</th>
                    <th className="p-3 text-center">Grade</th>
                    <th className="p-3 text-center">Points</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {allTerms[activeTab].courses.map((c) => (
                    <tr key={c.code} className="hover:bg-gray-50/35 transition-colors">
                      <td className="p-3 font-semibold text-primary">{c.code}</td>
                      <td className="p-3 text-text">{c.title}</td>
                      <td className="p-3 text-center text-muted font-medium">{c.credits.toFixed(1)}</td>
                      <td className="p-3 text-center">
                        <Badge label={c.grade} color={getGradeColor(c.grade)} />
                      </td>
                      <td className="p-3 text-center text-muted font-medium">{c.points.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50/50 font-bold border-t border-gray-200 text-sm">
                    <td colSpan="2" className="p-3 text-right text-muted">Term Totals:</td>
                    <td className="p-3 text-center text-text">{allTerms[activeTab].totals.credits.toFixed(1)}</td>
                    <td className="p-3 text-center text-muted">Term GPA:</td>
                    <td className="p-3 text-center text-primary font-bold">
                      {allTerms[activeTab].totals.gpa.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Advisor Card + Degree Audit */}
        <div className="space-y-6">
          
          {/* Advisor Info Card */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
            <h3 className="font-heading text-lg font-bold text-text border-b border-gray-100 pb-2 mb-4">
              Academic Advisor
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-heading text-xl font-bold text-text">{student.advisor}</h4>
                <p className="text-xs text-muted font-semibold mt-0.5">Department of Computer Science</p>
              </div>

              <div className="space-y-2.5 text-sm text-text">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                  <span className="break-all font-medium text-xs">m.holt@university.edu</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                  <span className="text-xs">Science Building, Room 318</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                  <span className="text-xs">Office Hours: Mon/Wed 2:00 PM – 4:00 PM</span>
                </div>
                <div className="flex items-start gap-3 border-t border-gray-100 pt-3 mt-3">
                  <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-text block">Next Appointment</span>
                    <span className="text-muted block mt-0.5">Nov 8, 2:00 PM</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsAdvisorOpen(true)}
                className="w-full mt-4 bg-primary hover:bg-blue-900 text-white font-medium py-2 rounded transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm"
              >
                Schedule Meeting
              </button>
            </div>
          </div>

          {/* Degree Audit Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-text border-b border-gray-100 pb-2 mb-4">
              Degree Audit Summary
            </h3>
            <div className="space-y-5">
              {degreeProgress.audit.map((item) => (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-text">{item.category}</span>
                    <span className="text-muted font-medium">{item.earned}/{item.required} credits</span>
                  </div>
                  <ProgressBar value={item.percent} color="bg-primary" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Advisor Appointment Scheduler Modal */}
      <AdvisorMeetingModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onConfirm={handleAdvisorSchedule}
        advisorName={student.advisor}
      />
    </div>
  );
};

export default AcademicsPage;
