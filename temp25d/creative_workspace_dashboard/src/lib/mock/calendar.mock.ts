import { CalendarEvent } from '../../types/common.types';
import { mockTeamMembers } from './team.mock';

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Design System V2 Review Sync',
    dateTime: '2026-06-25T14:30:00Z', // Today
    type: 'meeting',
    assignees: [mockTeamMembers[0], mockTeamMembers[7], mockTeamMembers[2]],
    notes: 'Go over atomic component button variants and spacing system. Bring feedback from developers.'
  },
  {
    id: 'evt-2',
    title: 'Clay Mesh Blender Assets Deadline',
    dateTime: '2026-06-28T18:00:00Z',
    type: 'deadline',
    assignees: [mockTeamMembers[1], mockTeamMembers[4]],
    notes: 'Finalize Cycles render node passes and export procedural shaders.'
  },
  {
    id: 'evt-3',
    title: 'Brand Guidelines Sign-off Milestone',
    dateTime: '2026-06-30T10:00:00Z',
    type: 'milestone',
    assignees: [mockTeamMembers[0], mockTeamMembers[3], mockTeamMembers[2]],
    notes: 'Elena and Sarah to review and approve the final Vector logo guidelines PDF.'
  },
  {
    id: 'evt-4',
    title: 'Sprint Planning Sync',
    dateTime: '2026-06-29T09:30:00Z',
    type: 'meeting',
    assignees: [mockTeamMembers[2], mockTeamMembers[0], mockTeamMembers[1], mockTeamMembers[3], mockTeamMembers[4]],
    notes: 'Weekly team layout and task assignments review.'
  },
  {
    id: 'evt-5',
    title: 'Spring Campaign Launch Date',
    dateTime: '2026-07-10T08:00:00Z',
    type: 'milestone',
    assignees: [mockTeamMembers[2], mockTeamMembers[5], mockTeamMembers[6]],
    notes: 'Promotional spring video rollout across social assets.'
  },
  {
    id: 'evt-6',
    title: 'Web Redesign Layout Review',
    dateTime: '2026-06-27T15:00:00Z',
    type: 'meeting',
    assignees: [mockTeamMembers[7], mockTeamMembers[8], mockTeamMembers[0]],
    notes: 'First checkout of Next.js frontend code rendering mobile viewport layouts.'
  }
];
