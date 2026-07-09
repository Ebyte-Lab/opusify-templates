import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { snippets } from '../data/snippets';
import { CodeBlock } from '../components/article/CodeBlock';
import { NewsletterSection } from '../components/newsletter/NewsletterSection';

export const SnippetDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const snippet = snippets.find((s) => s.slug === slug);

  if (!snippet) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center font-heading">
        <h2 className="text-2xl font-bold text-white mb-4">SNIPPET_NOT_FOUND</h2>
        <p className="text-text/60 mb-6">The requested code snippet could not be located in the telemetry archives.</p>
        <Link to="/snippets" className="border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-bg transition-all font-bold">
          RETURN_TO_LIBRARY
        </Link>
      </div>
    );
  }

  // Determine file extension for display purposes
  const getExtension = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'go': return 'go';
      case 'sql': return 'sql';
      case 'rust': return 'rs';
      case 'yaml': return 'yml';
      case 'nginx': return 'conf';
      case 'bash': return 'sh';
      case 'javascript': return 'js';
      default: return 'txt';
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-grow space-y-8">
      <div className="space-y-4 select-none">
        <Link to="/snippets" className="font-heading text-xs text-primary hover:underline flex items-center gap-1">
          <span>&lt;</span> Back to Snippets
        </Link>
        
        <header className="space-y-3">
          <span className="bg-secondary px-2 py-0.5 border border-secondary/80 rounded text-[10px] font-heading font-bold text-white uppercase tracking-wider inline-block">
            {snippet.language}
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            {snippet.title}
          </h1>
          <p className="text-sm text-text/60 leading-relaxed">
            {snippet.description}
          </p>
        </header>
      </div>

      <div>
        <CodeBlock 
          block={{
            filename: `${snippet.slug}.${getExtension(snippet.language)}`,
            language: snippet.language,
            code: snippet.code,
            runnable: false
          }}
        />
      </div>

      <NewsletterSection />
    </div>
  );
};
