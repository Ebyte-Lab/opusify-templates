import React from 'react';
import type { LeaderboardEntry } from '../../../types/leaderboard';
import { formatXp } from '../../../lib/format';
import { Avatar } from '../../ui/Avatar';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ entry }) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500 font-extrabold';
    if (rank === 2) return 'text-gray-400 font-extrabold';
    if (rank === 3) return 'text-amber-700 font-extrabold';
    return 'text-text/50';
  };

  const isTopThree = entry.rank <= 3;

  return (
    <div
      className={`flex items-center justify-between p-2 rounded transition-colors ${
        entry.isCurrentUser
          ? 'bg-primary/5 border border-primary/20'
          : 'hover:bg-secondary/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`text-xs w-4 text-center ${getRankColor(entry.rank)}`}>
          {entry.rank}
        </span>
        <Avatar
          src={entry.avatarUrl}
          alt={entry.name}
          size="sm"
          border={entry.isCurrentUser}
        />
        <span
          className={`text-xs font-bold ${
            entry.isCurrentUser ? 'text-primary' : 'text-white'
          }`}
        >
          {entry.name} {entry.isCurrentUser && ' (You)'}
        </span>
      </div>
      <span
        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
          isTopThree && !entry.isCurrentUser
            ? 'text-primary bg-primary/10'
            : 'text-text/80 bg-secondary'
        }`}
      >
        {formatXp(entry.xp)}
      </span>
    </div>
  );
};
