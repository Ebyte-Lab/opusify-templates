import { TeamMember } from '../../types/team.types';
import { mockTeamMembers } from '../mock/team.mock';
import { delay } from './client';

let localTeamMembers = [...mockTeamMembers];

export const teamApi = {
  getAll: async (): Promise<TeamMember[]> => {
    await delay(500);
    return [...localTeamMembers];
  },

  invite: async (payload: { email: string; role: 'admin' | 'editor' | 'viewer' }): Promise<TeamMember> => {
    await delay(600);
    
    // Extract name prefix from email
    const namePart = payload.email.split('@')[0];
    const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    const newMember: TeamMember = {
      id: `user-${Date.now()}`,
      name: capitalizedName,
      email: payload.email,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`, // Default demo avatar
      role: payload.role,
      lastActive: 'Invited',
      projectCount: 0
    };
    localTeamMembers.push(newMember);
    return newMember;
  },

  updateRole: async (id: string, role: 'admin' | 'editor' | 'viewer'): Promise<TeamMember> => {
    await delay(400);
    const index = localTeamMembers.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Member not found');
    const updated = {
      ...localTeamMembers[index],
      role
    };
    localTeamMembers[index] = updated;
    return updated;
  },

  delete: async (id: string): Promise<void> => {
    await delay(400);
    localTeamMembers = localTeamMembers.filter(m => m.id !== id);
  }
};
