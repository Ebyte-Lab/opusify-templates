import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockReviews } from '../data/reviews';
import Avatar from '../components/ui/Avatar';

export const ReviewDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const review = mockReviews.find((r) => r.slug === slug);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!review) {
    return (
      <div className="py-24 text-center space-y-6">
        <h1 className="font-heading text-4xl uppercase text-text/40">Review Not Found</h1>
        <p className="text-sm text-text/60">The review you are looking for does not exist or has been relocated.</p>
        <Link
          to="/reviews"
          className="inline-block bg-primary hover:bg-green-700 text-white font-heading text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all"
        >
          Return to Reviews
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(review.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-borderCol">
        <div className="space-y-3">
          <span className="text-xs font-semibold text-primary font-mono uppercase tracking-widest block">
            {review.scoreLabel}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl leading-tight uppercase">
            {review.title}
          </h1>
          <p className="text-text/60 text-xs font-mono">Published on {formattedDate}</p>
        </div>

        {/* Big Score Badge */}
        <div className="flex flex-col items-center justify-center bg-secondary border border-borderCol p-6 rounded-2xl shrink-0 aspect-square w-32 shadow-md">
          <span className="font-heading text-4xl text-primary">{review.score}</span>
          <span className="text-[10px] text-text/50 uppercase tracking-widest font-bold mt-1">OUT OF 10</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-secondary border border-borderCol">
        <img src={review.imageUrl} alt={review.title} className="w-full h-full object-cover" />
      </div>

      {/* Author Bio */}
      <div className="flex items-center gap-3 border-b border-borderCol pb-6">
        <Avatar src={review.author.avatarUrl} alt={review.author.name} />
        <div>
          <span className="font-bold text-sm block">{review.author.name}</span>
          <span className="text-xs text-text/50">{review.author.role}</span>
        </div>
      </div>

      {/* Verdict & Summary */}
      <div className="space-y-4">
        <h2 className="font-heading text-xl uppercase tracking-wide">The Verdict</h2>
        <p className="text-text/80 text-base leading-relaxed">{review.summary}</p>
      </div>

      {/* Pros & Cons detailed lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/10 p-6 rounded-2xl border border-borderCol/50">
        {/* Pros */}
        <div className="space-y-3">
          <h3 className="font-heading text-sm uppercase text-primary tracking-wider">Pros</h3>
          {review.pros && review.pros.length > 0 ? (
            <ul className="list-disc pl-4 text-sm text-text/80 space-y-2">
              {review.pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-text/40">No specific pros listed.</p>
          )}
        </div>

        {/* Cons */}
        <div className="space-y-3">
          <h3 className="font-heading text-sm uppercase text-red-500 tracking-wider">Cons</h3>
          {review.cons && review.cons.length > 0 ? (
            <ul className="list-disc pl-4 text-sm text-text/80 space-y-2">
              {review.cons.map((con, index) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-text/40">No specific cons listed.</p>
          )}
        </div>
      </div>

      {/* Back button */}
      <div className="pt-6">
        <Link
          to="/reviews"
          className="inline-block bg-secondary hover:bg-secondary/80 border border-borderCol text-text font-heading text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all"
        >
          &larr; Back to Reviews
        </Link>
      </div>
    </article>
  );
};
export default ReviewDetailPage;
