import React from 'react';
import { snippets } from '../data/snippets';
import { SnippetCard } from '../components/listings/SnippetCard';
import { NewsletterSection } from '../components/newsletter/NewsletterSection';

export const SnippetsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-12 flex-grow space-y-12">
      <header className="space-y-4 select-none">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2">
          <span className="text-primary">#</span> Snippets Library
        </h1>
        <p className="text-sm text-text/60 max-w-xl leading-relaxed">
          Highly-optimized scripts, configuration boilerplate, and utility functions for developer workflows. Click any snippet to view its full details.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.slug} snippet={snippet} />
        ))}
      </div>

      <NewsletterSection />
    </div>
  );
};
