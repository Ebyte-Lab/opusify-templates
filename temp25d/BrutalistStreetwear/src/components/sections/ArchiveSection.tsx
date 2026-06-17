import React from 'react';
import { ARCHIVE_PRODUCTS } from '../../data/products';

export const ArchiveSection: React.FC = () => {
  return (
    <section id="archive" className="w-full">
      <div className="bg-bg text-text p-4 heavy-border-b border-t-2 border-text">
        <h2 className="font-heading text-4xl md:text-6xl text-secondary">THE ARCHIVE [SOLD OUT]</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 w-full">
        {ARCHIVE_PRODUCTS.map((item, index) => (
          <div 
            key={item.id}
            className={`aspect-square heavy-border-b relative group overflow-hidden bg-secondary ${
              index !== 3 ? 'heavy-border-r' : ''
            }`}
          >
            <img 
              src={item.img} 
              className="w-full h-full object-cover grayscale opacity-50 mix-blend-multiply" 
              alt={item.name}
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-text text-bg font-heading text-2xl px-3 py-1 transform -rotate-12 select-none">
                SOLD OUT
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArchiveSection;
