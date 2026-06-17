import React from 'react';
import { Button } from '../ui/Button';

export const PromoBanner: React.FC = () => {
  return (
    <div className="w-full h-48 md:h-64 bg-gray-200 rounded-sm overflow-hidden relative shadow-sm border border-gray-300">
      <img
        src="https://picsum.photos/seed/megabanner/1200/400"
        alt="Huge Tech Clearance Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div className="px-8 text-white max-w-lg">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-2 shadow-sm">
            Huge Tech Clearance
          </h2>
          <p className="text-sm md:text-lg mb-4 text-gray-100">
            Save up to 40% on top-rated electronics, laptops, and smart home devices.
          </p>
          <Button
            variant="cta"
            className="rounded px-6 py-2 text-sm shadow hover:bg-ctaHover border border-ctaBorder text-text"
          >
            Shop Deals
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PromoBanner;
