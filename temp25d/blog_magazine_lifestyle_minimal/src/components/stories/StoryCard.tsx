import React from 'react';
import { Link } from 'react-router-dom';
import type { Story } from '../../types';
import { useAppreciate } from '../../hooks/useAppreciate';
import { useToast } from '../../context/ToastContext';

interface StoryCardProps {
  story: Story;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const { showToast } = useToast();

  const { liked, likeCount, toggle } = useAppreciate(
    story.likeCount,
    false,
    () => showToast('Appreciation saved. Thank you!'),
    () => {}
  );

  // Compute page route based on story category
  let detailRoute = '';
  if (story.category === 'greece' || story.category === 'travel') {
    detailRoute = `/destinations/${story.slug}`;
  } else if (story.category === 'minimalism' || story.category === 'interiors') {
    detailRoute = `/style/${story.slug}`;
  } else if (story.category === 'wellness') {
    detailRoute = `/wellness/${story.slug}`;
  }

  return (
    <div className="story-card bg-secondary/10 border border-secondary/30 rounded-xl p-4 flex flex-col justify-between transition-all hover:border-primary/30">
      <div>
        <Link to={detailRoute} className="block aspect-square bg-secondary rounded-lg overflow-hidden mb-4 relative group">
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="space-y-2">
          <span className="text-[9px] uppercase tracking-widest text-primary font-bold">
            {story.categoryLabel}
          </span>
          <h4 className="font-heading text-lg font-bold hover:text-primary transition-colors">
            <Link to={detailRoute}>{story.title}</Link>
          </h4>
          <p className="text-xs text-text/60 leading-relaxed line-clamp-2">
            {story.excerpt}
          </p>
        </div>
      </div>
      <div className="pt-4 border-t border-secondary/30 mt-4 flex justify-between items-center text-[10px] text-text/40">
        <span>{story.readTime}</span>
        <button
          onClick={toggle}
          className={`flex items-center gap-1.5 transition-colors font-bold uppercase ${
            liked ? 'text-primary' : 'text-text/40 hover:text-primary'
          }`}
          aria-label={liked ? 'Unlike story' : 'Like story'}
        >
          <span>❤</span> <span className="like-counter">{likeCount}</span>
        </button>
      </div>
    </div>
  );
};
