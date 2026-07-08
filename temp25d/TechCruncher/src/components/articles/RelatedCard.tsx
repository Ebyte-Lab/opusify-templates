import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types';
import Badge from '../ui/Badge';

interface RelatedCardProps {
  article: Article;
}

export const RelatedCard: React.FC<RelatedCardProps> = ({ article }) => {
  // Let's compute a simple time display (relative or date)
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-secondary/15 border border-borderCol/40 hover:border-primary/30 rounded-2xl overflow-hidden flex flex-col justify-between p-5 transition-all group cursor-pointer">
      <Link to={`/news/${article.slug}`}>
        <div className="aspect-video rounded-xl overflow-hidden bg-secondary mb-4">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />
        </div>
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            <Badge>{article.category}</Badge>
          </span>
          <h3 className="font-heading text-sm uppercase tracking-wide mt-2 mb-2 text-text group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-xs text-text/60 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-borderCol/30 pt-4 mt-auto">
        <span className="text-[10px] text-text/40 font-mono">
          By {article.author.name}
        </span>
        <span className="text-[10px] text-text/40">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};
export default RelatedCard;
