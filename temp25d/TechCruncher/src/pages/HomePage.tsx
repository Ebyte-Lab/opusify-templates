import React from 'react';
import { mockArticles } from '../data/articles';
import HeroArticle from '../components/articles/HeroArticle';
import ArticleCard from '../components/articles/ArticleCard';
import RelatedCard from '../components/articles/RelatedCard';
import AboutCard from '../components/sidebar/AboutCard';
import ReviewTelemetryCard from '../components/sidebar/ReviewTelemetryCard';
import CommunityStatsCard from '../components/sidebar/CommunityStatsCard';
import NewsletterBanner from '../components/newsletter/NewsletterBanner';

export const HomePage: React.FC = () => {
  // Extract breaking news article
  const breakingArticle = mockArticles.find((a) => a.breaking) || mockArticles[0];

  // Extract primary stream (4 articles after breaking)
  const primaryStreamArticles = mockArticles
    .filter((a) => a.slug !== breakingArticle.slug)
    .slice(0, 4);

  // Extract related coverage (3 articles after primary stream)
  const relatedArticles = mockArticles
    .filter((a) => a.slug !== breakingArticle.slug && !primaryStreamArticles.some((p) => p.slug === a.slug))
    .slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Featured Breaking News */}
      <HeroArticle article={breakingArticle} />

      {/* Two Column Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Primary Articles Stream (Span 8) */}
        <div className="lg:col-span-8 space-y-8">
          <h2 className="font-heading text-2xl uppercase tracking-tight border-b border-borderCol pb-4">
            Primary Stream
          </h2>
          <div className="space-y-6">
            {primaryStreamArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Inline Newsletter Signup */}
          <NewsletterBanner />
        </div>

        {/* Right Column: Sticky Sidebar Layout (Span 4) */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          <AboutCard />
          <ReviewTelemetryCard />
          <CommunityStatsCard />
        </div>
      </section>

      {/* Related Core Coverage Grid */}
      <section className="border-t border-borderCol pt-12 space-y-6">
        <h2 className="font-heading text-2xl uppercase tracking-tight">
          Related Core Coverage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <RelatedCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default HomePage;
