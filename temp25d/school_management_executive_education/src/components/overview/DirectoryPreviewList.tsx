import React from 'react';
import { useDirectorySearch } from '@/hooks/useDirectorySearch';
import { DirectoryListItem } from '../network/DirectoryListItem';

export const DirectoryPreviewList: React.FC = () => {
  const { members, toggleConnect } = useDirectorySearch();
  
  // Show first 5 items as the overview preview
  const previewMembers = members.slice(0, 5);

  return (
    <div className="overflow-y-auto flex-grow divide-y divide-gray-100">
      {previewMembers.map((member) => (
        <DirectoryListItem
          key={member.id}
          member={member}
          onConnectToggle={toggleConnect}
        />
      ))}
    </div>
  );
};
