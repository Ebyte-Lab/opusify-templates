import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockArticles } from '../data/articles';
import LikeButton from '../components/ui/LikeButton';
import BookmarkButton from '../components/ui/BookmarkButton';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import RelatedCard from '../components/articles/RelatedCard';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = mockArticles.find((a) => a.slug === slug);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="py-24 text-center space-y-6">
        <h1 className="font-heading text-4xl uppercase text-text/40">Article Not Found</h1>
        <p className="text-sm text-text/60">The article you are looking for does not exist or has been relocated.</p>
        <Link
          to="/news"
          className="inline-block bg-primary hover:bg-green-700 text-white font-heading text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all"
        >
          Return to News
        </Link>
      </div>
    );
  }

  // Get related articles (same category, or just other articles, up to 3)
  const relatedArticles = mockArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-semibold text-primary uppercase tracking-widest">
          <Badge>{article.category}</Badge>
          <span className="w-1.5 h-1.5 rounded-full bg-borderCol"></span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-5xl leading-tight uppercase">
          {article.title}
        </h1>
        <p className="text-text/60 text-xs font-mono">Published on {formattedDate}</p>
      </div>

      {/* Hero Image */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-secondary border border-borderCol">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Author & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-y border-borderCol py-6 gap-4">
        <div className="flex items-center gap-3">
          <Avatar src={article.author.avatarUrl} alt={article.author.name} />
          <div>
            <span className="font-bold text-sm block">{article.author.name}</span>
            <span className="text-xs text-text/50">{article.author.role}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LikeButton initialCount={article.likeCount} initialLiked={article.liked} />
          <BookmarkButton initialBookmarked={article.bookmarked} />
        </div>
      </div>

      {/* Body Content */}
      <div className="prose dark:prose-invert max-w-none text-text/80 text-base leading-relaxed space-y-6">
        {article.body && article.body.length > 0 ? (
          article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        ) : (
          <p>{article.excerpt}</p>
        )}
      </div>

      {/* Related Coverage Rail */}
      <section className="border-t border-borderCol pt-12 mt-12 space-y-6">
        <h2 className="font-heading text-2xl uppercase tracking-tight">Related Coverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((related) => (
            <RelatedCard key={related.slug} article={related} />
          ))}
        </div>
      </section>
    </article>
  );
};
export default ArticleDetailPage;
