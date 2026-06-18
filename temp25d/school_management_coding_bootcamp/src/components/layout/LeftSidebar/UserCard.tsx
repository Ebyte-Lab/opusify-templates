import React from 'react';
import { Avatar } from '../../ui/Avatar';

export const UserCard: React.FC = () => {
  return (
    <div className="p-6 border-b border-secondary shrink-0 flex items-center gap-3">
      <Avatar
        src="https://picsum.photos/seed/dev1/100/100"
        alt="Alex.dev avatar"
        size="lg"
        isOnline={true}
      />
      <div className="flex flex-col">
        <span className="text-sm font-bold text-white font-heading">Alex.dev</span>
        <span className="text-[10px] text-text/60">Cohort 42 • FS Web</span>
      </div>
    </div>
  );
};
