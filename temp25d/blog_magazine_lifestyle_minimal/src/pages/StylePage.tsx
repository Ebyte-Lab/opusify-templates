import React from 'react';
import { stories } from '../data/stories';
import { StoryCard } from '../components/stories/StoryCard';

export const StylePage: React.FC = () => {
  // Filter for style/interiors/minimalism category
  const styleStories = stories.filter(
    (s) => s.category === 'minimalism' || s.category === 'interiors'
  );

  return (
    <div className="flex-grow max-w-5xl mx-auto w-full px-6 py-12 md:py-20 space-y-12">
      <header className="text-center space-y-4">
        <span className="text-xs font-heading tracking-[0.3em] uppercase text-text/40">
          Visual Balance
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-light italic">
          Style &amp; Design
        </h1>
        <p className="text-sm text-text/60 max-w-md mx-auto tracking-wider leading-relaxed">
          Essays on architectural volume, subtractive spaces, and the visual weight of materials in interior theory.
        </p>
        <div className="w-16 h-[2px] bg-primary/40 mx-auto pt-2"></div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {styleStories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </div>
  );
};
