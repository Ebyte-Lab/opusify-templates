import React from 'react';
import { useCourse } from '../context/CourseContext';
import { ProfileCard } from '../components/account/ProfileCard';
import { PreferenceToggleRow } from '../components/account/PreferenceToggleRow';

export const AccountPage: React.FC = () => {
  const { preferences, updatePreferences } = useCourse();

  return (
    <div className="w-full max-w-[680px] mx-auto px-6 pt-32 pb-24 font-body text-text">
      {/* Page Header */}
      <div className="mb-10 focus-hide transition-opacity duration-500">
        <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-primary mb-4 font-semibold">
          <span>Learner Portal</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6 text-[#0f172a] tracking-tight leading-tight">
          Your Account
        </h1>
        <p className="text-lg text-text/75 leading-relaxed">
          Manage your learning profile, track your course progress, and customize your study preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Card */}
        <ProfileCard />

        {/* Preferences Section */}
        <div className="border border-secondary rounded-2xl p-6 bg-white shadow-sm">
          <h3 className="font-heading font-semibold text-lg text-[#0f172a] mb-6 pb-2 border-b border-secondary">
            Settings & Preferences
          </h3>
          
          <div className="divide-y divide-secondary">
            <PreferenceToggleRow
              label="Distraction-Free Focus Mode"
              description="Automatically hide header and chrome while studying."
              checked={preferences.focusMode}
              onChange={(checked) => updatePreferences({ focusMode: checked })}
            />
            
            <PreferenceToggleRow
              label="Email Notifications"
              description="Receive weekly digests and updates on new course materials."
              checked={preferences.emailNotifications}
              onChange={(checked) => updatePreferences({ emailNotifications: checked })}
            />
            
            <PreferenceToggleRow
              label="Push Notifications"
              description="Alert me on my device when quizzes are graded or comments are made."
              checked={preferences.pushNotifications}
              onChange={(checked) => updatePreferences({ pushNotifications: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
