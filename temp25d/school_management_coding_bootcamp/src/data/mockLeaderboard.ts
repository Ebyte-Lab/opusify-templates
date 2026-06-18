import type { LeaderboardEntry } from '../types/leaderboard';

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'SarahJ',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    xp: 2450,
    isCurrentUser: false
  },
  {
    rank: 2,
    name: 'MikeCode',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100',
    xp: 2310,
    isCurrentUser: false
  },
  {
    rank: 3,
    name: 'DevNinja',
    avatarUrl: 'https://picsum.photos/seed/user3/100/100',
    xp: 2180,
    isCurrentUser: false
  },
  {
    rank: 12,
    name: 'Alex.dev',
    avatarUrl: 'https://picsum.photos/seed/dev1/100/100',
    xp: 1420,
    isCurrentUser: true
  }
];
