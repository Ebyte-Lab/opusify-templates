import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { stories, instagridItems } from '../data/stories';
import { ParallaxHero } from '../components/hero/ParallaxHero';
import { ArticleHeader } from '../components/article/ArticleHeader';
import { PullQuote } from '../components/article/PullQuote';
import { MidStoryImage } from '../components/article/MidStoryImage';
import { MainAppreciateWidget } from '../components/article/MainAppreciateWidget';
import { CategoryTabs } from '../components/stories/CategoryTabs';
import { StoryCard } from '../components/stories/StoryCard';
import { InstagridItem } from '../components/stories/InstagridItem';
import { NewsletterSection } from '../components/newsletter/NewsletterSection';
import { useToast } from '../context/ToastContext';

export const HomePage: React.FC = () => {
  const { showToast } = useToast();
  const location = useLocation();
  const readingColumnRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState('all');

  // Find the featured essay
  const featuredEssay = stories.find(
    (s) => s.slug === 'architecture-along-coastline-amorgos'
  ) || stories[0];

  // Exclude featured essay from grid
  const gridStories = stories.filter(
    (s) => s.slug !== 'architecture-along-coastline-amorgos'
  );

  // Filter grid stories
  const filteredStories = activeCategory === 'all'
    ? gridStories.slice(0, 4)
    : gridStories.filter((s) => s.category === activeCategory);

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    showToast(`Destination filter: ${category.toUpperCase()}`);
  };

  const handleScrollCue = () => {
    readingColumnRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.state?.scrollToNewsletter) {
      setTimeout(() => {
        const el = document.getElementById('newsletter-opt');
        el?.scrollIntoView({ behavior: 'smooth' });
        // Clear state
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  return (
    <div className="flex-grow">
      {/* Parallax Hero */}
      <ParallaxHero
        imageUrl={featuredEssay.imageUrl}
        categoryLabel="Travel & Escapes"
        title="Chasing the Horizon"
        excerpt="A minimal exploration into hidden Mediterranean archipelagos, visual balance, and intentional slow living."
        onScrollCueClick={handleScrollCue}
      />

      {/* Main Reading Column */}
      <main
        ref={readingColumnRef}
        id="reading-column"
        className="max-w-[700px] mx-auto w-full px-6 py-12 md:py-20 space-y-16"
      >
        {/* Article Header */}
        <ArticleHeader
          authorName={featuredEssay.author.name}
          publishedAt={featuredEssay.publishedAt}
          title={featuredEssay.title}
        />

        {/* Prose Body */}
        <article className="prose max-w-none text-text/80 text-sm md:text-base leading-[2.1] tracking-wide font-light space-y-8 text-justify">
          <p>{featuredEssay.body?.[0]}</p>
          <p>{featuredEssay.body?.[1]}</p>

          {/* Pull Quote */}
          {featuredEssay.pullQuote && (
            <PullQuote
              text={featuredEssay.pullQuote.text}
              citation={featuredEssay.pullQuote.citation}
            />
          )}

          <p>{featuredEssay.body?.[2]}</p>

          {/* Mid Story Image */}
          {featuredEssay.midStoryImage && (
            <MidStoryImage
              url={featuredEssay.midStoryImage.url}
              caption={featuredEssay.midStoryImage.caption}
            />
          )}

          <p>{featuredEssay.body?.[3]}</p>
        </article>

        {/* Category Explorer / Story Grid */}
        <section id="destinations" className="border-t border-b border-secondary/40 py-10 space-y-6">
          <h3 className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-text text-center">
            Explore Categories
          </h3>

          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {filteredStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>

        {/* main essay appreciate widget */}
        <MainAppreciateWidget initialLikes={featuredEssay.likeCount} />
      </main>

      {/* Instagram Grid */}
      <section className="border-t border-secondary/40 pt-16 pb-8 space-y-8 bg-secondary/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs font-heading tracking-[0.3em] uppercase text-text/40">
            Curated Vision
          </span>
          <h3 className="font-heading text-2xl font-light italic mt-2">Visual Inspirations</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 px-2">
          {instagridItems.map((item) => (
            <InstagridItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};
