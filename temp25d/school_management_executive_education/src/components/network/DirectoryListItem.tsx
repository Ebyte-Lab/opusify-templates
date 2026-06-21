import React from 'react';
import { CohortMember } from '@/types/cohortMember';
import { Avatar } from '../common/Avatar';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

interface DirectoryListItemProps {
  member: CohortMember;
  onConnectToggle: (id: string) => void;
}

export const DirectoryListItem: React.FC<DirectoryListItemProps> = ({
  member,
  onConnectToggle,
}) => {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <Avatar
          src={member.avatarUrl}
          alt={member.name}
          size="md"
          className="rounded-sm"
        />
        <div>
          <h4 className="text-sm font-bold text-text leading-tight">{member.name}</h4>
          <p className="text-xs text-text/60">{member.title} @ {member.company}</p>
        </div>
      </div>
      
      <button
        onClick={() => onConnectToggle(member.id)}
        title={member.connected ? "Disconnect" : "Connect"}
        className={clsx(
          "transition-all p-2 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          member.connected
            ? "text-green-600 bg-green-50 hover:bg-red-50 hover:text-red-650 opacity-100"
            : "opacity-0 group-hover:opacity-100 focus:opacity-100 text-primary bg-primary/10 hover:bg-primary hover:text-white"
        )}
      >
        {member.connected ? (
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1">
            <Check size={12} />
            <span className="hidden sm:inline">Connected</span>
          </div>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        )}
      </button>
    </div>
  );
};
