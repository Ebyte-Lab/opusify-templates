import { create } from 'zustand';

interface UIStore {
  sidebarCollapsed: boolean;
  activeModal: string | null;
  theme: 'dark' | 'light';
  collabSimulationActive: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  toggleTheme: () => void;
  toggleCollabSimulation: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  activeModal: null,
  theme: 'dark',
  collabSimulationActive: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  toggleCollabSimulation: () => set((state) => ({ collabSimulationActive: !state.collabSimulationActive }))
}));
