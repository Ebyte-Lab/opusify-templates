import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { OrganicBlob } from '../ui/OrganicBlob';
import { useSmoothScrollNav } from '../../hooks/useSmoothScrollNav';

export const Hero: React.FC = () => {
  const handleScroll = useSmoothScrollNav();

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left column content */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-primary text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            100% Plant-Based Actives
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-text">
            Nature's <br /> <span className="italic text-primary">Intelligence.</span>
          </h1>
          <p className="text-lg text-text/70 mb-10 max-w-md leading-relaxed">
            Pure, potent skincare and supplements crafted from ethically sourced botanicals. Return to balance.
          </p>
          <div className="flex gap-4">
            <a
              href="#skincare"
              onClick={handleScroll}
              className="bg-primary text-bg px-8 py-4 rounded-full font-semibold hover:bg-text hover:shadow-float transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Shop Essentials
            </a>
            <a
              href="#mission"
              onClick={handleScroll}
              className="px-8 py-4 rounded-full font-semibold text-text hover:bg-secondary/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Discover
            </a>
          </div>
        </div>

        {/* Right column imagery and blobs */}
        <div className="order-1 lg:order-2 relative flex justify-center h-[400px] lg:h-[600px] w-full">
          {/* Background aesthetic shapes */}
          <OrganicBlob variant="secondary" />
          <OrganicBlob variant="primary" />

          {/* Main Image */}
          <img
            src="https://picsum.photos/seed/organic/800/1000"
            alt="Organic ingredients"
            className="relative z-10 object-cover w-4/5 h-4/5 lg:w-3/4 lg:h-[90%] organic-shape shadow-soft my-auto"
          />

          {/* Floating badge */}
          <div
            className="absolute bottom-20 left-10 z-20 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-soft animate-bounce motion-reduce:animate-none"
            style={{ animationDuration: '3s' }}
          >
            <p className="font-heading font-medium text-primary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Dermatologist Tested
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
