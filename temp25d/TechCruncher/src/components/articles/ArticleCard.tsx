import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types';
import LikeButton from '../ui/LikeButton';
import BookmarkButton from '../ui/BookmarkButton';
import Badge from '../ui/Badge';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-secondary/20 p-5 rounded-2xl border border-borderCol/50 hover:border-primary/30 transition-all">
      {/* Image */}
      <div className="sm:col-span-4 aspect-[4/3] rounded-xl overflow-hidden bg-secondary">
        <Link to={`/news/${article.slug}`} className="block w-full h-full">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Info Content */}
      <div className="sm:col-span-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            <Badge>{article.category}</Badge>
            <span className="w-1 h-1 rounded-full bg-borderCol"></span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="font-heading text-lg leading-tight uppercase hover:text-primary transition-colors mb-2">
            <Link to={`/news/${article.slug}`}>
              {article.title}
            </Link>
          </h3>
          <p className="text-xs text-text/65 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between mt-4 border-t border-borderCol/40 pt-4">
          <span className="text-xs text-text/45">
            By {article.author.name} &middot; {formattedDate}
          </span>
          <div className="flex items-center gap-3">
            <LikeButton initialCount={article.likeCount} initialLiked={article.liked} />
            <BookmarkButton initialBookmarked={article.bookmarked} />
          </div>
        </div>
      </div>
    </article>
  );
};
export default ArticleCard;
