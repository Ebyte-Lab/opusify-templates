import { create } from 'zustand';
import { User } from '../types/common.types';
import { mockTeamMembers } from '../lib/mock/team.mock';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: mockTeamMembers[0].id,
    name: mockTeamMembers[0].name,
    email: mockTeamMembers[0].email,
    avatarUrl: mockTeamMembers[0].avatarUrl,
    bio: 'Lead UI/UX Architect creating fluid interfaces and interactive digital design systems.',
    timezone: 'GMT+02:00',
    language: 'English (US)'
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}));
