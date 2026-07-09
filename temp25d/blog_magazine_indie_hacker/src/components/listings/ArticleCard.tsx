import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="bg-[#151515]/60 border border-secondary/60 rounded-xl p-6 hover:border-primary/40 hover:bg-[#151515] transition-all flex flex-col justify-between h-full group shadow-md">
      <div className="space-y-4">
        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-heading font-bold text-primary">
          <span className="bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
            {article.buildLogId}
          </span>
          <span className="text-text/30" aria-hidden="true">•</span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22c5.523 0 9-4.477 9-10S17.523 2 12 2 3 6.477 3 12s3.477 10 9 10z"></path>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-bold leading-snug group-hover:text-primary transition-colors">
          <Link to={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-text/60 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      </div>

      {/* Author and Date */}
      <div className="flex items-center gap-2.5 border-t border-secondary/40 pt-4 mt-6">
        <img 
          src={article.author.avatarUrl} 
          alt={article.author.handle} 
          className="w-6 h-6 rounded border border-white/10"
        />
        <div className="text-[10px] font-heading flex flex-col">
          <span className="font-bold text-white">{article.author.handle}</span>
          <span className="text-text/40">{formattedDate}</span>
        </div>
      </div>
    </article>
  );
};
