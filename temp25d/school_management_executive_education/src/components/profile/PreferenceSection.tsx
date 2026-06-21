import React from 'react';
import { useProfileStore } from '@/hooks/useProfileStore';
import { useToast } from '@/hooks/useToast';
import { CreditCard, Bell, Shield, Key } from 'lucide-react';
import { clsx } from 'clsx';

export const PreferenceSection: React.FC = () => {
  const { billing, preferences, twoFactorEnabled, updatePreferences, toggleTwoFactor, profile } = useProfileStore();
  const { addToast } = useToast();

  const handleManageBilling = () => {
    addToast('Redirecting to secure billing portal (Stripe)...', 'info');
  };

  const handleResetPassword = () => {
    addToast(`Password reset link sent to ${profile.email}`, 'success');
  };

  const handleTogglePref = (key: keyof typeof preferences) => {
    updatePreferences({ [key]: !preferences[key] });
  };

  return (
    <div className="space-y-8">
      {/* Billing Summary */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
        <h3 className="font-heading font-bold text-base text-text mb-4 flex items-center gap-2">
          <CreditCard size={18} className="text-primary" />
          <span>Billing Summary</span>
        </h3>
        
        <div className="bg-gray-50 border border-gray-150 rounded-sm p-4 space-y-3">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <div className="text-xs font-bold text-text/50 uppercase tracking-wide">Subscription Plan</div>
              <div className="font-bold text-text text-sm sm:text-base">{billing.planName}</div>
            </div>
            <span className="px-2.5 py-0.5 bg-green-50 text-green-700 font-bold text-[10px] uppercase rounded-full">
              {billing.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 text-xs border-t border-gray-200">
            <div>
              <div className="text-text/50 font-semibold">Next Invoice Date</div>
              <div className="font-bold text-text mt-0.5">{billing.nextBillingDate}</div>
            </div>
            <div>
              <div className="text-text/50 font-semibold">Total Invoice Amount</div>
              <div className="font-bold text-text mt-0.5">{billing.amount}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleManageBilling}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 focus:outline-none"
          >
            Manage Billing & Payment Methods
          </button>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
        <h3 className="font-heading font-bold text-base text-text mb-4 flex items-center gap-2">
          <Bell size={18} className="text-primary" />
          <span>Notification Settings</span>
        </h3>

        <div className="divide-y divide-gray-100">
          <div className="py-3.5 flex justify-between items-center">
            <div>
              <div className="text-sm font-bold text-text">Email Communications</div>
              <div className="text-xs text-text/60">Receive weekly digests, cohort updates, and administrative notes.</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.emailNotifications}
              onChange={() => handleTogglePref('emailNotifications')}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="py-3.5 flex justify-between items-center">
            <div>
              <div className="text-sm font-bold text-text">SMS Reminders</div>
              <div className="text-xs text-text/60">Receive urgent text updates for live lectures or schedule alterations.</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.smsNotifications}
              onChange={() => handleTogglePref('smsNotifications')}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="py-3.5 flex justify-between items-center">
            <div>
              <div className="text-sm font-bold text-text">Webinar Registrations</div>
              <div className="text-xs text-text/60">Receive automated calendar holds and reminder mails 1 hour prior to seminars.</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.webinarReminders}
              onChange={() => handleTogglePref('webinarReminders')}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="py-3.5 flex justify-between items-center">
            <div>
              <div className="text-sm font-bold text-text">Direct Cohort Messaging</div>
              <div className="text-xs text-text/60">Notify me when alumni or cohort connections request links or send messages.</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.cohortMessages}
              onChange={() => handleTogglePref('cohortMessages')}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Security & Access */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
        <h3 className="font-heading font-bold text-base text-text mb-4 flex items-center gap-2">
          <Shield size={18} className="text-primary" />
          <span>Security & Session Settings</span>
        </h3>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-bold text-text">Two-Factor Authentication</div>
              <div className="text-xs text-text/60">Secure your executive portal with secondary verification codes.</div>
            </div>
            <button
              onClick={toggleTwoFactor}
              className={clsx(
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                twoFactorEnabled ? 'bg-primary' : 'bg-gray-200'
              )}
              role="switch"
              aria-checked={twoFactorEnabled}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="text-sm font-bold text-text">Credential Management</div>
              <div className="text-xs text-text/60">Update your password or rotate active API keys.</div>
            </div>
            <button
              onClick={handleResetPassword}
              className="px-4 py-2 border border-gray-250 hover:bg-gray-50 text-text text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5 focus:outline-none"
            >
              <Key size={14} className="text-text/60" />
              <span>Reset Password</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
