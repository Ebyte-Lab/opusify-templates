import React from 'react';
import { ProfileSection } from '../components/settings/ProfileSection';
import { ApiKeyTable } from '../components/settings/ApiKeyTable';

export const SettingsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6 flex-grow animate-[fadeIn_0.4s_ease]">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Institutional Terminal Settings</h2>
          <p className="text-xs text-text/45 mt-0.5 font-sans">
            Configure authorization keys, trading density layouts, and profile parameters
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <ProfileSection />

      {/* API Key Manager */}
      <ApiKeyTable />

    </div>
  );
};
