import React from 'react';
import type { Author } from '../../types';
import { useLiveCounter } from '../../hooks/useLiveCounter';

// Isolated leaf component to restrict re-renders to just this node
export const LiveViewCount: React.FC<{ initialViews: number }> = ({ initialViews }) => {
  const views = useLiveCounter(initialViews);

  return (
    <span className="flex items-center gap-1.5" aria-live="polite">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      Views: <b className="font-bold text-white">{views.toLocaleString()}</b>
    </span>
  );
};

interface ArticleMetaHeaderProps {
  buildLogId: string;
  readTime: string;
  initialViews: number;
  title: string;
  author: Author;
  publishedAt: string;
}

export const ArticleMetaHeader: React.FC<ArticleMetaHeaderProps> = ({
  buildLogId,
  readTime,
  initialViews,
  title,
  author,
  publishedAt,
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="space-y-6">
      {/* Retro badge line */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-heading font-bold text-primary">
        <span className="bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
          {buildLogId}
        </span>
        <span className="text-text/40" aria-hidden="true">•</span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22c5.523 0 9-4.477 9-10S17.523 2 12 2 3 6.477 3 12s3.477 10 9 10z"></path>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Read Time: {readTime}
        </span>
        <span className="text-text/40" aria-hidden="true">•</span>
        <LiveViewCount initialViews={initialViews} />
      </div>

      <h1 className="font-heading text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white">
        {title}
      </h1>
      
      <div className="flex items-center gap-3 border-b border-secondary/50 pb-6">
        <img 
          src={author.avatarUrl} 
          alt={`${author.handle} avatar`} 
          className="w-8 h-8 rounded border border-white/20"
        />
        <div className="text-xs font-heading">
          <span className="font-bold text-white block">{author.handle}</span>
          <span className="text-text/50">Posted {formattedDate}</span>
        </div>
      </div>
    </header>
  );
};
