import { create } from 'zustand';
import { useToastStore } from './useToast';

interface ProfileData {
  name: string;
  title: string;
  company: string;
  email: string;
  avatarUrl: string;
  cohort: string;
}

interface BillingData {
  planName: string;
  status: 'Active' | 'Pending' | 'Cancelled';
  nextBillingDate: string;
  amount: string;
}

interface Preferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  webinarReminders: boolean;
  cohortMessages: boolean;
}

interface ProfileStore {
  profile: ProfileData;
  billing: BillingData;
  preferences: Preferences;
  twoFactorEnabled: boolean;
  updateProfile: (profile: Partial<ProfileData>) => void;
  updatePreferences: (prefs: Partial<Preferences>) => void;
  toggleTwoFactor: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: {
    name: 'Michael Chen',
    title: 'Global Director of Strategy',
    company: 'Apex Global Corp',
    email: 'm.chen@apexglobal.com',
    avatarUrl: 'https://picsum.photos/seed/exec1/100/100',
    cohort: "Global Strategy Cohort '26",
  },
  billing: {
    planName: 'Executive MBA Certification Track',
    status: 'Active',
    nextBillingDate: 'Oct 01, 2026',
    amount: '$4,500 USD / Year',
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    webinarReminders: true,
    cohortMessages: true,
  },
  twoFactorEnabled: false,
  updateProfile: (updatedProfile) => set((state) => {
    setTimeout(() => {
      useToastStore.getState().addToast('Profile updated successfully!', 'success');
    }, 0);
    return {
      profile: { ...state.profile, ...updatedProfile },
    };
  }),
  updatePreferences: (updatedPrefs) => set((state) => {
    setTimeout(() => {
      useToastStore.getState().addToast('Preferences saved.', 'success');
    }, 0);
    return {
      preferences: { ...state.preferences, ...updatedPrefs },
    };
  }),
  toggleTwoFactor: () => set((state) => {
    const nextVal = !state.twoFactorEnabled;
    setTimeout(() => {
      useToastStore.getState().addToast(
        nextVal ? 'Two-Factor Authentication enabled' : 'Two-Factor Authentication disabled',
        'info'
      );
    }, 0);
    return { twoFactorEnabled: nextVal };
  }),
}));
