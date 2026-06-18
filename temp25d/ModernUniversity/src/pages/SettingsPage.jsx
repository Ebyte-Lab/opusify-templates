import React, { useState } from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Toggle } from '../components/ui/Toggle';
import { TabNav } from '../components/ui/TabNav';
import { DownloadModal } from '../components/modals/DownloadModal';
import { ConfirmModal } from '../components/modals/ConfirmModal';
import { student as defaultStudent } from '../data/student';
import { defaultNotificationPrefs } from '../data/notificationPrefs';
import { defaultPrivacyPrefs } from '../data/privacyPrefs';
import { User, Shield, Key, Download, Trash2, CheckCircle } from 'lucide-react';

export const SettingsPage = () => {
  const [student, setStudent] = useState(defaultStudent);
  const [advisorName, setAdvisorName] = useState(student.advisor);
  const [studentEmail, setStudentEmail] = useState(student.email);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState('Notification Settings');
  const [notifications, setNotifications] = useState(defaultNotificationPrefs);
  const [privacySettings, setPrivacySettings] = useState(defaultPrivacyPrefs);

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setStudent(prev => ({ ...prev, advisor: advisorName, email: studentEmail }));
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handleToggleNotification = (id, field) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: !item[field] } : item))
    );
  };

  const handleTogglePrivacy = (id) => {
    setPrivacySettings(prev =>
      prev.map(item => (item.id === id ? { ...item, value: !item.value } : item))
    );
  };

  const handleDeleteAccount = () => {
    alert('Account deletion confirmed (UI Demo Only).');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Card (1/3 width) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-fit">
          <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-24 h-24 rounded-full border-4 border-secondary object-cover shadow-sm mb-4"
            />
            <h3 className="font-heading text-xl font-bold text-text">{student.name}</h3>
            <p className="text-xs text-muted font-medium mt-1">{student.major} · {student.year}</p>
          </div>

          <form onSubmit={handleProfileSave} className="mt-6 space-y-4">
            <h4 className="font-heading text-sm font-bold text-text uppercase tracking-wider mb-2">Edit Details</h4>
            
            {profileSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-2.5 rounded text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <div>
              <label htmlFor="settings-advisor" className="block text-xs font-semibold text-muted mb-1">
                Advisor Name
              </label>
              <input
                id="settings-advisor"
                type="text"
                value={advisorName}
                onChange={(e) => setAdvisorName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-text"
                required
              />
            </div>

            <div>
              <label htmlFor="settings-email" className="block text-xs font-semibold text-muted mb-1">
                Student Email
              </label>
              <input
                id="settings-email"
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-text"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-blue-900 text-white font-medium py-2 rounded transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm"
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* Right Column: Settings Tabs (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <TabNav
                tabs={['Notification Settings', 'Privacy Settings', 'Account Management']}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>

            {/* Notification Settings Tab */}
            {activeTab === 'Notification Settings' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading text-lg font-bold text-text">Notification Channels</h4>
                  <p className="text-xs text-muted">Configure how and when you receive portal alerts.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm" aria-label="Notification settings table">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-muted font-bold">
                        <th className="p-3 pl-4">Alert Category</th>
                        <th className="p-3 text-center">Email</th>
                        <th className="p-3 text-center">Push</th>
                        <th className="p-3 text-center pr-4">SMS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {notifications.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/35 transition-colors">
                          <td className="p-3 pl-4 font-semibold text-text">{item.category}</td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={item.email}
                              onChange={() => handleToggleNotification(item.id, 'email')}
                              className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                              aria-label={`Email alerts for ${item.category}`}
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={item.push}
                              onChange={() => handleToggleNotification(item.id, 'push')}
                              className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                              aria-label={`Push alerts for ${item.category}`}
                            />
                          </td>
                          <td className="p-3 text-center pr-4">
                            <input
                              type="checkbox"
                              checked={item.sms}
                              onChange={() => handleToggleNotification(item.id, 'sms')}
                              className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                              aria-label={`SMS alerts for ${item.category}`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Privacy Settings Tab */}
            {activeTab === 'Privacy Settings' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading text-lg font-bold text-text">Privacy Preferences</h4>
                  <p className="text-xs text-muted">Control how your student data is shared inside the campus network.</p>
                </div>

                <div className="space-y-5">
                  {privacySettings.map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg">
                      <span className="text-sm font-semibold text-text pr-4">{pref.label}</span>
                      <Toggle
                        checked={pref.value}
                        onChange={() => handleTogglePrivacy(pref.id)}
                        label={pref.label}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Account Management Tab */}
            {activeTab === 'Account Management' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading text-lg font-bold text-text">Account Safety & Export</h4>
                  <p className="text-xs text-muted">Safely export your profile archives or terminate your student credential access.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Download Card */}
                  <div className="bg-gray-50 border border-gray-100 p-5 rounded-lg flex flex-col justify-between items-start">
                    <div>
                      <div className="p-2 bg-blue-100 text-primary rounded mb-3">
                        <Download className="w-5 h-5" />
                      </div>
                      <h5 className="font-heading text-base font-bold text-text">Export My Student Data</h5>
                      <p className="text-xs text-muted mt-1 leading-relaxed">
                        Request a secure ZIP folder containing all course records, grades, billing receipts, and profile history.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsDownloadOpen(true)}
                      className="mt-4 bg-white border border-gray-300 text-text hover:bg-gray-50 font-semibold px-4 py-2 rounded text-xs transition-colors shadow-xs focus:outline-none"
                    >
                      Download My Data
                    </button>
                  </div>

                  {/* Delete Card */}
                  <div className="bg-red-50/30 border border-red-100 p-5 rounded-lg flex flex-col justify-between items-start">
                    <div>
                      <div className="p-2 bg-red-100 text-red-600 rounded mb-3">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <h5 className="font-heading text-base font-bold text-text">Deactivate Student Account</h5>
                      <p className="text-xs text-muted mt-1 leading-relaxed">
                        Permanently close your student portal credentials. This will not affect official registrar records.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsDeleteOpen(true)}
                      className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded text-xs transition-colors shadow-xs focus:outline-none"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Export Student Data Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        title="Data Export Scheduled"
        message="Your data export is being prepared. You'll receive an email at e.shellstrop@university.edu within 24 hours."
      />

      {/* Delete Account Safety Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Deactivate Portal Account?"
        message="This will immediately revoke your access to the student portal. To confirm deactivation, type 'DELETE' in the field below."
        confirmText="DELETE"
      />
    </div>
  );
};

export default SettingsPage;
