import React from 'react';
import type { ThreadReply as ThreadReplyType } from '../../../types/discussion';
import { Avatar } from '../../ui/Avatar';
import { Badge } from '../../ui/Badge';

interface ThreadReplyProps {
  reply: ThreadReplyType;
}

export const ThreadReply: React.FC<ThreadReplyProps> = ({ reply }) => {
  const isInstructor = reply.role === 'instructor';

  return (
    <div
      className={`flex gap-4 p-4 rounded-lg border ${
        isInstructor
          ? 'bg-primary/5 border-primary/20'
          : 'bg-[#18181B] border-secondary'
      }`}
    >
      <Avatar
        src={reply.avatarUrl || 'https://picsum.photos/seed/placeholder/100/100'}
        alt={reply.author}
        size="md"
        border={isInstructor}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className={`text-xs font-bold ${isInstructor ? 'text-primary' : 'text-white'}`}>
            {reply.author}
          </span>
          {isInstructor && <Badge variant="staff">Staff</Badge>}
          <span className="text-[10px] text-text/40">
            {new Date(reply.timestamp).toLocaleDateString()} at {new Date(reply.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <p className="text-xs md:text-sm text-text/80 leading-relaxed whitespace-pre-wrap break-words">
          {reply.text}
        </p>
      </div>
    </div>
  );
};
