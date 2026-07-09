import React from 'react';

interface ArticleHeaderProps {
  authorName: string;
  publishedAt: string;
  title: string;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  authorName,
  publishedAt,
  title,
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="text-center space-y-6">
      <div className="flex items-center justify-center gap-3 text-xs tracking-[0.2em] font-bold text-primary uppercase">
        <span>By {authorName}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
        <span>{formattedDate}</span>
      </div>
      <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight leading-tight">
        {title}
      </h2>
      <div className="w-16 h-[2px] bg-primary/40 mx-auto"></div>
    </header>
  );
};
