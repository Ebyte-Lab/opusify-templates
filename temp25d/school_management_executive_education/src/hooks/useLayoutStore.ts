import { create } from 'zustand';

interface LayoutStore {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  unreadCount: 3,
  setUnreadCount: (count) => set({ unreadCount: count }),
}));
