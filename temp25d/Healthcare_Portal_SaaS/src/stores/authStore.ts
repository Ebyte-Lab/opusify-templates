import { create } from 'zustand';
import { StaffUser } from '../types/common.types';

interface AuthState {
  user: StaffUser | null;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist';
  setUser: (user: StaffUser) => void;
  setRole: (role: 'admin' | 'doctor' | 'nurse' | 'receptionist') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'USR-002',
    firstName: 'Michael',
    lastName: 'Vance',
    email: 'm.vance@nexusmed.com',
    role: 'doctor',
    specialty: 'Internal Medicine',
    avatarUrl: 'https://picsum.photos/seed/doctor-vance/100/100',
    status: 'active',
  },
  role: 'doctor',
  setUser: (user) => set({ user, role: user.role }),
  setRole: (role) => set((state) => ({ 
    role, 
    user: state.user ? { ...state.user, role } : null 
  })),
  logout: () => set({ user: null }),
}));
