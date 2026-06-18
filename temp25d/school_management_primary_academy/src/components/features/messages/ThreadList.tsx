import React from 'react';
import { ThreadPreviewItem } from './ThreadPreviewItem';
import { MessageThread } from '../../../types/messages';
import { EmptyState } from '../../ui/EmptyState';
import { MessageSquare } from 'lucide-react';

interface ThreadListProps {
  threads: MessageThread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
}

export const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
}) => {
  if (threads.length === 0) {
    return (
      <EmptyState
        title="No Conversations"
        description="You have no messages from SunnySide staff yet."
        icon={<MessageSquare size={24} />}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      {threads.map((thread) => (
        <ThreadPreviewItem
          key={thread.id}
          thread={thread}
          isActive={thread.id === activeThreadId}
          onClick={() => onSelectThread(thread.id)}
        />
      ))}
    </div>
  );
};
export default ThreadList;
