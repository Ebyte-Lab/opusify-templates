import { create } from 'zustand';
import { useToastStore } from './useToast';

interface WebinarRegistrationStore {
  registrations: Record<string, 'idle' | 'pending' | 'registered'>;
  registerWebinar: (webinarId: string, webinarTitle: string) => Promise<void>;
}

export const useWebinarRegistrationStore = create<WebinarRegistrationStore>((set, get) => ({
  registrations: {},
  registerWebinar: async (webinarId, webinarTitle) => {
    const current = get().registrations[webinarId] || 'idle';
    if (current !== 'idle') return;

    set((state) => ({
      registrations: { ...state.registrations, [webinarId]: 'pending' }
    }));

    // Simulate 800ms delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    set((state) => ({
      registrations: { ...state.registrations, [webinarId]: 'registered' }
    }));

    useToastStore.getState().addToast(`Successfully registered for "${webinarTitle}"`);
  }
}));

export const useWebinarRegistration = (webinarId: string) => {
  const status = useWebinarRegistrationStore((state) => state.registrations[webinarId] || 'idle');
  const registerWebinar = useWebinarRegistrationStore((state) => state.registerWebinar);
  return {
    status,
    register: (title: string) => registerWebinar(webinarId, title)
  };
};
