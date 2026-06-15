import React, { useState } from 'react';
import { MasonryItem } from '../ui/MasonryItem';
import { galleryImages } from '../../data/galleryImages';

interface EditorialSectionProps {
  onImageSelect: (src: string, alt: string) => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onImageSelect }) => {
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const editorialImages = galleryImages.filter((img) => img.category === 'editorial');
  const displayedImages = editorialImages.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="editorial" className="p-4 md:p-8 lg:p-12 border-b border-secondary">
      <div className="flex justify-between items-end mb-8 mt-4">
        <div>
          <span className="font-body text-xs tracking-widest uppercase text-text/40 block mb-1">
            Category
          </span>
          <h3 className="font-heading text-2xl md:text-3xl text-primary italic font-semibold">
            Editorial
          </h3>
        </div>
        <span className="font-body text-xs text-text/50 tracking-widest uppercase">
          {editorialImages.length} Images
        </span>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {displayedImages.map((image, index) => (
          <div key={image.id} className="break-inside-avoid mb-4">
            <MasonryItem
              image={image}
              index={index}
              onSelect={onImageSelect}
            />
          </div>
        ))}
      </div>
      
      {visibleCount < editorialImages.length && (
        <div className="w-full flex justify-center mt-12 mb-8">
          <button
            onClick={handleLoadMore}
            className="font-body text-xs tracking-widest uppercase border-b border-primary pb-1 hover:text-text/50 hover:border-text/50 transition-colors cursor-pointer"
          >
            Load More Editorial
          </button>
        </div>
      )}
    </section>
  );
};
