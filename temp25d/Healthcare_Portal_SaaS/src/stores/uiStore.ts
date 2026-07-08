import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  activeModal: string | null;
  selectedPatientId: string | null;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  setSelectedPatient: (id: string | null) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  activeModal: null,
  selectedPatientId: null,
  theme: 'light',
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  setSelectedPatient: (id) => set({ selectedPatientId: id }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
