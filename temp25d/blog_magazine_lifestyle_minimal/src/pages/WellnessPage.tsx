import React from 'react';
import { stories } from '../data/stories';
import { StoryCard } from '../components/stories/StoryCard';

export const WellnessPage: React.FC = () => {
  // Filter for wellness category
  const wellnessStories = stories.filter((s) => s.category === 'wellness');

  return (
    <div className="flex-grow max-w-5xl mx-auto w-full px-6 py-12 md:py-20 space-y-12">
      <header className="text-center space-y-4">
        <span className="text-xs font-heading tracking-[0.3em] uppercase text-text/40">
          Slow Living
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-light italic">
          Wellness
        </h1>
        <p className="text-sm text-text/60 max-w-md mx-auto tracking-wider leading-relaxed">
          Meditations on sensory fasting, quiet mornings, somatic routines, and restoring cognitive clarity in an overstimulated world.
        </p>
        <div className="w-16 h-[2px] bg-primary/40 mx-auto pt-2"></div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wellnessStories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </div>
  );
};
