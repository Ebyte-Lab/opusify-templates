import { create } from 'zustand';
import { CohortMember } from '../types/cohortMember';
import { cohortMockData } from '../data/cohort';
import { useToastStore } from './useToast';

interface CohortStore {
  members: CohortMember[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleConnect: (id: string) => void;
}

export const useCohortStore = create<CohortStore>((set) => ({
  members: cohortMockData,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleConnect: (id) => set((state) => {
    const updatedMembers = state.members.map((member) => {
      if (member.id === id) {
        const nextConnected = !member.connected;
        // Schedule a toast notification
        setTimeout(() => {
          if (nextConnected) {
            useToastStore.getState().addToast(`Connected with ${member.name}`);
          } else {
            useToastStore.getState().addToast(`Removed connection with ${member.name}`);
          }
        }, 0);
        return { ...member, connected: nextConnected };
      }
      return member;
    });
    return { members: updatedMembers };
  })
}));

export const useDirectorySearch = () => {
  const members = useCohortStore((state) => state.members);
  const searchQuery = useCohortStore((state) => state.searchQuery);
  const setSearchQuery = useCohortStore((state) => state.setSearchQuery);
  const toggleConnect = useCohortStore((state) => state.toggleConnect);

  const filteredMembers = members.filter((member) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      member.name.toLowerCase().includes(query) ||
      member.company.toLowerCase().includes(query) ||
      member.title.toLowerCase().includes(query)
    );
  });

  return {
    searchQuery,
    setSearchQuery,
    members: filteredMembers,
    toggleConnect
  };
};
