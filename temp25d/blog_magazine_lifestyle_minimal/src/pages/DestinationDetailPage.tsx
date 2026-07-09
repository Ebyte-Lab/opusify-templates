import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { stories } from '../data/stories';
import { ArticleHeader } from '../components/article/ArticleHeader';
import { PullQuote } from '../components/article/PullQuote';
import { MidStoryImage } from '../components/article/MidStoryImage';
import { MainAppreciateWidget } from '../components/article/MainAppreciateWidget';

export const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const story = stories.find((s) => s.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!story) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="flex-grow">
      {/* Back Button and Banner */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-text/60 hover:text-primary transition-colors mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Destinations
        </Link>
        <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-secondary">
          <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Reading Column */}
      <main className="max-w-[700px] mx-auto w-full px-6 py-12 md:py-20 space-y-16">
        <ArticleHeader
          authorName={story.author.name}
          publishedAt={story.publishedAt}
          title={story.title}
        />

        <article className="prose max-w-none text-text/80 text-sm md:text-base leading-[2.1] tracking-wide font-light space-y-8 text-justify">
          <p>{story.body?.[0]}</p>
          {story.body?.[1] && <p>{story.body[1]}</p>}

          {story.pullQuote && (
            <PullQuote text={story.pullQuote.text} citation={story.pullQuote.citation} />
          )}

          {story.body?.[2] && <p>{story.body[2]}</p>}

          {story.midStoryImage && (
            <MidStoryImage url={story.midStoryImage.url} caption={story.midStoryImage.caption} />
          )}

          {story.body?.slice(3).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        {/* Appreciation Widget */}
        <MainAppreciateWidget initialLikes={story.likeCount} />
      </main>
    </div>
  );
};
