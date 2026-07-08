import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types';
import LikeButton from '../ui/LikeButton';
import BookmarkButton from '../ui/BookmarkButton';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

interface HeroArticleProps {
  article: Article;
}

export const HeroArticle: React.FC<HeroArticleProps> = ({ article }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-borderCol pb-12">
      {/* Article Image container */}
      <div className="lg:col-span-7 relative group overflow-hidden border border-borderCol rounded-2xl bg-secondary aspect-video">
        <Link to={`/news/${article.slug}`} className="block w-full h-full">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {article.breaking && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="danger">BREAKING</Badge>
          </div>
        )}
      </div>

      {/* Article Info container */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
        <div className="flex items-center gap-3 text-xs font-semibold text-primary uppercase tracking-widest">
          <Badge>{article.category}</Badge>
          <span className="w-1.5 h-1.5 rounded-full bg-borderCol"></span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-5xl leading-tight tracking-tight uppercase hover:text-primary transition-colors">
          <Link to={`/news/${article.slug}`}>
            {article.title}
          </Link>
        </h1>
        <p className="text-text/70 text-sm leading-relaxed">
          {article.excerpt}
        </p>

        {/* Footer info: author, buttons */}
        <div className="flex items-center justify-between border-t border-borderCol pt-6">
          <div className="flex items-center gap-3">
            <Avatar src={article.author.avatarUrl} alt={article.author.name} />
            <div>
              <span className="font-bold text-sm block">{article.author.name}</span>
              <span className="text-xs text-text/50">{article.author.role}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LikeButton initialCount={article.likeCount} initialLiked={article.liked} />
            <BookmarkButton initialBookmarked={article.bookmarked} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroArticle;
