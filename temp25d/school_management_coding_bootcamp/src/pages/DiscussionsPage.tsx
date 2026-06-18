import React, { useState } from 'react';
import { mockDiscussions } from '../data/mockDiscussions';
import { useFetchMock } from '../hooks/useFetchMock';
import { ThreadListItem } from '../components/features/discussions/ThreadListItem';
import { Loader2, MessageSquarePlus, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { DiscussionThread } from '../types/discussion';

export const DiscussionsPage: React.FC = () => {
  const { data: initialThreads, loading } = useFetchMock<DiscussionThread[]>(mockDiscussions, 350);
  const [threads, setThreads] = useState<DiscussionThread[]>(mockDiscussions);
  const [filter, setFilter] = useState<string>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTag, setNewTag] = useState<string>('React Hooks');
  const [newText, setNewText] = useState('');

  // Keep state sync'd when mock data loads
  React.useEffect(() => {
    if (initialThreads) {
      setThreads(initialThreads);
    }
  }, [initialThreads]);

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    const threadId = `thread-${Date.now()}`;
    const newThread: DiscussionThread = {
      id: threadId,
      title: newTitle.trim(),
      author: 'Alex.dev',
      avatarUrl: 'https://picsum.photos/seed/dev1/100/100',
      tag: newTag,
      lastActivity: 'just now',
      replyCount: 0,
      instructorAnswered: false,
      replies: [
        {
          id: `reply-${Date.now()}`,
          threadId: threadId,
          author: 'Alex.dev',
          role: 'student',
          avatarUrl: 'https://picsum.photos/seed/dev1/100/100',
          text: newText.trim(),
          timestamp: new Date().toISOString(),
        }
      ],
    };

    setThreads((prev: DiscussionThread[]) => [newThread, ...prev]);
    setNewTitle('');
    setNewText('');
    setNewTag('React Hooks');
    setShowCreateModal(false);
  };

  const filteredThreads = threads.filter((t: DiscussionThread) => {
    if (filter === 'ALL') return true;
    return t.tag === filter;
  });

  const categories = [
    { label: 'All Discussions', value: 'ALL' },
    { label: 'React Hooks', value: 'React Hooks' },
    { label: 'Node & Express', value: 'Node & Express' },
    { label: 'Security', value: 'Security' },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 relative">
      <div className="border-b border-secondary pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1 select-none">
            Cohort Forum
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
            Discussions Board
          </h1>
          <p className="text-sm text-text/70 mt-2 max-w-2xl">
            Interact with fellow developers and instructors. Ask technical questions, get assistance on coding labs, or share interesting engineering articles.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 shrink-0"
        >
          <MessageSquarePlus className="w-4 h-4" />
          New Thread
        </Button>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-secondary/50 select-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all border shrink-0 ${
              filter === cat.value
                ? 'bg-primary/10 text-primary border-primary/20'
                : 'bg-transparent text-text hover:bg-secondary border-transparent hover:border-secondary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {filteredThreads.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-secondary rounded-lg bg-[#18181B]/35">
              <span className="text-xs text-text/50">No threads found in this category.</span>
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <ThreadListItem key={thread.id} thread={thread} />
            ))
          )}
        </div>
      )}

      {/* New Thread Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg border border-secondary rounded-lg w-full max-w-lg p-6 shadow-2xl space-y-4 relative animate-scale-up">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute right-4 top-4 text-text/60 hover:text-white transition-colors"
              aria-label="Close new thread modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="font-heading font-extrabold text-white text-lg flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-primary" />
              Create Discussion Thread
            </h2>

            <form onSubmit={handleCreateThread} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-text/60 font-bold uppercase select-none">Thread Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How to fix CORS issue in Express API?"
                  className="w-full bg-secondary border border-white/10 rounded p-2.5 text-xs text-white placeholder:text-text/30 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text/60 font-bold uppercase select-none">Category Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-secondary border border-white/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="React Hooks">React Hooks</option>
                  <option value="Node & Express">Node & Express</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-text/60 font-bold uppercase select-none">Detailed Description</label>
                <textarea
                  required
                  rows={5}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Explain your issue or start a dialogue here. Wrap code blocks in backticks like `npm run dev` to format them."
                  className="w-full bg-secondary border border-white/10 rounded p-2.5 text-xs text-white placeholder:text-text/30 focus:outline-none focus:border-primary/50 transition-colors font-sans resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Publish Thread
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
