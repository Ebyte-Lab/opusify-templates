import React from 'react';
import { Avatar } from '../../ui/Avatar';
import { MessageThread } from '../../../types/messages';

interface ThreadPreviewItemProps {
  thread: MessageThread;
  isActive: boolean;
  onClick: () => void;
}

export const ThreadPreviewItem: React.FC<ThreadPreviewItemProps> = ({
  thread,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3.5 p-4 text-left border-b border-gray-50 transition-colors focus:outline-none ${
        isActive
          ? 'bg-primary/10 border-r-4 border-r-primary'
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <Avatar src={thread.avatarUrl} alt={thread.teacherName} size="lg" />
      
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <h4 className={`font-heading text-sm truncate ${isActive ? 'font-bold text-text' : 'font-semibold text-gray-700'}`}>
            {thread.teacherName}
          </h4>
          <span className="text-[10px] font-bold text-gray-400 shrink-0">
            {thread.messages[thread.messages.length - 1]?.timestamp || ''}
          </span>
        </div>
        
        <p className="text-xs font-semibold text-gray-400 mb-1 truncate">
          {thread.teacherRole}
        </p>
        
        <p className={`text-xs truncate ${thread.unreadCount > 0 ? 'text-text font-bold' : 'text-gray-500 font-medium'}`}>
          {thread.lastMessagePreview}
        </p>
      </div>

      {thread.unreadCount > 0 && (
        <span className="shrink-0 w-2.5 h-2.5 bg-red-500 rounded-full mt-1.5 self-center" />
      )}
    </button>
  );
};
export default ThreadPreviewItem;
