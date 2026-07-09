import React from 'react';
import { articles } from '../data/articles';
import { TableOfContents } from '../components/article/TableOfContents';
import { ArticleMetaHeader } from '../components/article/ArticleMetaHeader';
import { CodeBlock } from '../components/article/CodeBlock';
import { AppreciateWidget } from '../components/article/AppreciateWidget';
import { NewsletterSection } from '../components/newsletter/NewsletterSection';

export const HomePage: React.FC = () => {
  // Render the featured article ('compiling-in-the-cold') as the landing page
  const article = articles[0];

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
      {/* Table of Contents */}
      <TableOfContents sections={article.sections} />

      {/* Reading Flow */}
      <main className="lg:col-span-9 max-w-2xl mx-auto w-full space-y-12">
        <ArticleMetaHeader
          buildLogId={article.buildLogId}
          readTime={article.readTime}
          initialViews={article.initialViews}
          title={article.title}
          author={article.author}
          publishedAt={article.publishedAt}
        />

        <article className="prose prose-invert max-w-none text-text/80 text-sm sm:text-base leading-relaxed space-y-6">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-primary">#</span> {section.heading}
              </h2>
              {section.paragraphs.map((p, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              {section.codeBlock && (
                <CodeBlock block={section.codeBlock} />
              )}
            </section>
          ))}
        </article>

        <AppreciateWidget initialCount={article.supportersCount} initialSupported={article.supported} />
        
        <NewsletterSection />
      </main>
    </div>
  );
};
