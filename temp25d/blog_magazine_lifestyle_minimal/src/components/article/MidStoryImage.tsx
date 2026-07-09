import React from 'react';

interface MidStoryImageProps {
  url: string;
  caption: string;
}

export const MidStoryImage: React.FC<MidStoryImageProps> = ({ url, caption }) => {
  return (
    <div className="my-12">
      <div className="group overflow-hidden rounded-xl bg-secondary aspect-[16/10]">
        <img
          src={url}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <span className="text-[10px] uppercase tracking-widest text-text/40 block mt-3 text-center italic">
        {caption}
      </span>
    </div>
  );
};
