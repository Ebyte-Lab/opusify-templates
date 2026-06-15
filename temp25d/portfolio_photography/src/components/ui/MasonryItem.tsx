import React from 'react';
import type { GalleryImage } from '../../types';

interface MasonryItemProps {
  image: GalleryImage;
  index: number;
  onSelect: (src: string, alt: string) => void;
}

export const MasonryItem: React.FC<MasonryItemProps> = ({ image, index, onSelect }) => {
  const isAboveFold = index < 3;

  return (
    <div
      onClick={() => onSelect(image.src, image.alt)}
      className="masonry-item group cursor-zoom-in relative block bg-secondary"
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={isAboveFold ? 'eager' : 'lazy'}
        className="w-full h-auto"
      />
      {/* EXIF Data Hover Overlay */}
      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-body text-bg text-sm font-light tracking-wide mb-1">
            {image.exif.lens} &middot; {image.exif.aperture} &middot; {image.exif.shutter} &middot; ISO {image.exif.iso}
          </p>
          <p className="font-heading text-bg/60 text-xs italic uppercase tracking-widest">
            {image.sourceLabel}
          </p>
        </div>
      </div>
    </div>
  );
};
