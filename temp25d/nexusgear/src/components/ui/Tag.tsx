import React from 'react';
import type { StockTag } from '../../types/product';

interface TagProps {
  tag: StockTag;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ tag, className = '' }) => {
  return (
    <div className={`bg-secondary/80 border border-primary/50 text-primary font-mono text-[10px] px-2 py-1 backdrop-blur-sm tracking-wide ${className}`}>
      {tag}
    </div>
  );
};
