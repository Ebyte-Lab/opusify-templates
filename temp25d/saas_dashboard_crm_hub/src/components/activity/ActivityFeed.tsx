import React, { useState } from 'react';
import type { ActivityEntry } from '../../types';
import { Button } from '../ui/Button';

interface ActivityFeedProps {
  activities: ActivityEntry[];
  deals: { id: string; title: string }[];
  onPostNote: (dealTitle: string, noteContent: string) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  deals,
  onPostNote
}) => {
  const [selectedDealTitle, setSelectedDealTitle] = useState(deals[0]?.title || '');
  const [noteText, setNoteText] = useState('');

  // Handle Note Submission
  const handleSubmitNote = () => {
    if (!noteText.trim()) return;
    const dealTitle = selectedDealTitle || deals[0]?.title || 'General';
    onPostNote(dealTitle, noteText.trim());
    setNoteText('');
  };

  // Get Activity Icon based on type/stage
  const getActivityIcon = (act: ActivityEntry) => {
    if (act.type === 'note') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    }

    const stage = act.stage;
    if (stage === 'won') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    } else if (stage === 'proposal') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    } else if (stage === 'negotiation') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    } else {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      );
    }
  };

  // Get Activity Message based on type
  const renderActivityMessage = (act: ActivityEntry) => {
    if (act.type === 'note') {
      return (
        <p className="text-sm font-semibold text-text">
          New note logged to <span className="font-bold">{act.dealTitle}</span>
        </p>
      );
    }

    let readableStage = 'Contacted';
    if (act.stage === 'proposal') readableStage = 'Proposal Sent';
    if (act.stage === 'negotiation') readableStage = 'Negotiation';
    if (act.stage === 'won') readableStage = 'Closed Won';

    if (act.type === 'created') {
      return (
        <p className="text-sm font-semibold text-text">
          New deal <span className="font-bold">{act.dealTitle}</span> created in <span className="font-bold text-primary">{readableStage}</span>
        </p>
      );
    }

    return (
      <p className="text-sm font-semibold text-text">
        {act.dealTitle} moved to{' '}
        <span className={`font-bold ${act.stage === 'won' ? 'text-green-500' : 'text-primary'}`}>
          {readableStage}
        </span>
      </p>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-body">
      {/* Left: Recent Activity Feed List (Spans 2 columns) */}
      <div className="lg:col-span-2 bg-secondary border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 shrink-0">
          <h3 className="font-heading text-lg font-bold text-text">Recent Activity Feed</h3>
          <span className="text-xs font-semibold text-slate-400">Chronological Updates</span>
        </div>

        <div className="space-y-6 max-h-[360px] overflow-y-auto pr-2">
          {activities.map(act => (
            <div key={act.id} className="flex items-start gap-4 animate-fadeIn">
              <div className={`w-9 h-9 rounded-full ${act.iconColor} flex items-center justify-center shrink-0`}>
                {getActivityIcon(act)}
              </div>
              <div className="flex-1 min-w-0">
                {renderActivityMessage(act)}
                {act.type === 'note' && act.note && (
                  <p className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50 break-words font-medium">
                    "{act.note}"
                  </p>
                )}
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Updated by {act.author} &middot; {act.time}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              No recent activity logs.
            </div>
          )}
        </div>
      </div>

      {/* Right: Quick Activity Poster Form (1 column) */}
      <div className="bg-secondary border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-text mb-2">Publish Note</h3>
          <p className="text-xs text-slate-400 font-medium mb-6">
            Instantly log progress to the global activity feed
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
                Select Related Deal
              </label>
              <select
                value={selectedDealTitle}
                onChange={(e) => setSelectedDealTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
              >
                {deals.map(d => (
                  <option key={d.id} value={d.title}>
                    {d.title}
                  </option>
                ))}
                {deals.length === 0 && <option value="">No active deals</option>}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
                Detailed Notes
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="E.g., Client confirmed signature tomorrow morning..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm font-medium resize-none transition-all"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmitNote}
          variant="primary"
          disabled={!noteText.trim()}
          className="w-full mt-6"
        >
          Post Activity
        </Button>
      </div>
    </div>
  );
};
