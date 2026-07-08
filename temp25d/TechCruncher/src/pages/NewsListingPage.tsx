import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockArticles } from '../data/articles';
import ArticleCard from '../components/articles/ArticleCard';

export const NewsListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredArticles = useMemo(() => {
    if (!query.trim()) return mockArticles;
    const lowerQuery = query.toLowerCase();
    return mockArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(lowerQuery) ||
        a.excerpt.toLowerCase().includes(lowerQuery) ||
        a.category.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="border-b border-borderCol pb-6">
        <h1 className="font-heading text-3xl md:text-5xl uppercase tracking-tight">
          {query ? `Search Results for "${query}"` : 'News Stream'}
        </h1>
        <p className="text-text/60 text-sm mt-2">
          {query
            ? `Found ${filteredArticles.length} matching articles`
            : 'Deep diagnostics, system protocols, and hardware specifications.'}
        </p>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-secondary/20 rounded-2xl border border-borderCol">
          <p className="font-heading text-lg text-text/50 uppercase">
            No articles found matching your query
          </p>
          <p className="text-xs text-text/40 mt-1">
            Try checking spelling or using different keywords.
          </p>
        </div>
      )}
    </div>
  );
};
export default NewsListingPage;
