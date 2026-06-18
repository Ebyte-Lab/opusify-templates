import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { mockDiscussions } from '../data/mockDiscussions';
import { useFetchMock } from '../hooks/useFetchMock';
import { ThreadReply } from '../components/features/discussions/ThreadReply';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Loader2, ArrowLeft, Send } from 'lucide-react';
import type { DiscussionThread, ThreadReply as ThreadReplyType } from '../types/discussion';

export const DiscussionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const rawThread = mockDiscussions.find((t: DiscussionThread) => t.id === id);

  if (!rawThread) {
    return <Navigate to="/404" replace />;
  }

  const { data: thread, loading } = useFetchMock<DiscussionThread>(rawThread, 300);

  // Local state for replies so posting is interactive
  const [replies, setReplies] = useState<ThreadReplyType[]>(rawThread.replies || []);
  const [replyText, setReplyText] = useState('');

  // Sync state if mock loads
  React.useEffect(() => {
    if (thread && thread.replies) {
      setReplies(thread.replies);
    }
  }, [thread]);

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply: ThreadReplyType = {
      id: `reply-${Date.now()}`,
      threadId: rawThread.id,
      author: 'Alex.dev',
      role: 'student' as const,
      avatarUrl: 'https://picsum.photos/seed/dev1/100/100',
      text: replyText.trim(),
      timestamp: new Date().toISOString(),
    };

    setReplies((prev: ThreadReplyType[]) => [...prev, newReply]);
    setReplyText('');
  };

  const mainPost = thread?.replies?.[0];
  const mainAuthorRole = mainPost?.role || 'student';
  const mainTimestamp = mainPost?.timestamp || '';
  const mainContent = mainPost?.text || '';
  const comments = replies.slice(1);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/discussions"
          className="inline-flex items-center gap-1.5 text-xs text-text/50 hover:text-white transition-colors select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discussions
        </Link>
      </div>

      {loading || !thread ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Main Thread Content */}
          <div className="bg-[#18181B] border border-secondary rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={thread.avatarUrl || 'https://picsum.photos/seed/placeholder/100/100'}
                alt={thread.author}
                size="md"
                border={mainAuthorRole === 'instructor'}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-heading">
                    {thread.author}
                  </span>
                  {mainAuthorRole === 'instructor' && <Badge variant="staff">Staff</Badge>}
                </div>
                <span className="text-[10px] text-text/40">
                  Posted on {new Date(mainTimestamp).toLocaleDateString()}
                </span>
              </div>
              <span className="ml-auto text-[10px] text-text/40 font-mono uppercase bg-secondary px-2 py-0.5 rounded">
                {thread.tag}
              </span>
            </div>

            <h2 className="font-heading text-xl font-extrabold text-white leading-snug">
              {thread.title}
            </h2>

            <div className="text-xs md:text-sm text-text/80 leading-relaxed whitespace-pre-wrap font-sans">
              {mainContent}
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-4">
            <h3 className="font-heading font-bold text-white text-base">
              Comments ({comments.length})
            </h3>
            
            <div className="space-y-4">
              {comments.map((reply: ThreadReplyType) => (
                <ThreadReply key={reply.id} reply={reply} />
              ))}
            </div>
          </div>

          {/* Reply Composer */}
          <div className="bg-[#18181B] border border-secondary rounded-lg p-4 mt-6">
            <h4 className="text-xs font-bold text-white mb-3 font-heading uppercase tracking-wider select-none">
              Leave a Comment
            </h4>
            <form onSubmit={handlePostReply} className="space-y-3">
              <textarea
                required
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your comment here..."
                className="w-full bg-secondary border border-white/10 rounded p-3 text-xs text-white placeholder:text-text/30 focus:outline-none focus:border-primary/50 transition-colors font-sans resize-none"
              />
              <div className="flex justify-end">
                <Button type="submit" variant="primary" className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  Post Comment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
