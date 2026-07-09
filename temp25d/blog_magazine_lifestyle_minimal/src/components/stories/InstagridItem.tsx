import React from 'react';
import type { InstagridItem as InstagridItemType } from '../../types';

interface InstagridItemProps {
  item: InstagridItemType;
}

export const InstagridItem: React.FC<InstagridItemProps> = ({ item }) => {
  return (
    <div className="aspect-square bg-secondary relative overflow-hidden group rounded-lg shadow-sm">
      <img
        src={item.imageUrl}
        alt="Visual Inspiration"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-text/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-3 select-none">
        <span>❤ {item.likeCount}</span>
        <span>✉ {item.commentCount}</span>
      </div>
    </div>
  );
};
