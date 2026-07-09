import React from 'react';
import { articles } from '../data/articles';
import { ArticleCard } from '../components/listings/ArticleCard';
import { NewsletterSection } from '../components/newsletter/NewsletterSection';

export const ArticlesPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-12 flex-grow space-y-12">
      <header className="space-y-4 select-none">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2">
          <span className="text-primary">#</span> Articles & Build Logs
        </h1>
        <p className="text-sm text-text/60 max-w-xl leading-relaxed">
          Deep-dives into systems engineering, database pooling, container configurations, and developer workflows built in public.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <NewsletterSection />
    </div>
  );
};
