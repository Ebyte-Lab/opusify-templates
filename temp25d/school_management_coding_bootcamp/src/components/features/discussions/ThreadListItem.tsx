import React from 'react';
import type { DiscussionThread } from '../../../types/discussion';
import { Link } from 'react-router-dom';
import { MessageSquare, CheckCircle } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface ThreadListItemProps {
  thread: DiscussionThread;
}

export const ThreadListItem: React.FC<ThreadListItemProps> = ({ thread }) => {
  return (
    <div className="bg-[#18181B] border border-secondary rounded-lg p-5 hover:border-primary/50 transition-all">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-text/40 font-mono uppercase bg-secondary px-2 py-0.5 rounded">
              {thread.tag}
            </span>
            {thread.instructorAnswered && (
              <Badge variant="success">
                <span className="flex items-center gap-1 normal-case font-bold">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  Staff Answered
                </span>
              </Badge>
            )}
          </div>
          <Link
            to={`/discussions/${thread.id}`}
            className="block text-white font-heading font-bold text-base hover:text-primary transition-colors truncate"
          >
            {thread.title}
          </Link>
          <div className="text-[11px] text-text/50">
            Posted by <span className="text-text/80 font-bold">{thread.author}</span> • {thread.lastActivity}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-text/40 shrink-0 text-xs md:text-sm">
          <MessageSquare className="w-4 h-4" />
          <span className="font-bold text-text/70">{thread.replyCount}</span>
          <span>replies</span>
        </div>
      </div>
    </div>
  );
};
