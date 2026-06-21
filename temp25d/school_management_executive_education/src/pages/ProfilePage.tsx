import React from 'react';
import { SectionCard } from '@/components/common/SectionCard';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { PreferenceSection } from '@/components/profile/PreferenceSection';

export const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-text mb-2">Executive Profile</h1>
        <p className="text-text/70 text-sm max-w-2xl">
          Review and update your corporate details, manage secure login credentials, inspect payment logs, and adjust alert notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Edit Form */}
        <div className="lg:col-span-2">
          <SectionCard title="General Profile Information">
            <div className="p-6">
              <ProfileForm />
            </div>
          </SectionCard>
        </div>

        {/* Security, Billing & Settings */}
        <div className="lg:col-span-1">
          <PreferenceSection />
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
