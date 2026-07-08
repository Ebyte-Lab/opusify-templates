import React from 'react';
import { Link } from 'react-router-dom';
import { mockReviews } from '../data/reviews';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="border-b border-borderCol pb-6">
        <h1 className="font-heading text-3xl md:text-5xl uppercase tracking-tight">
          Review Telemetry
        </h1>
        <p className="text-text/60 text-sm mt-2">
          Strict technical audits, benchmark results, and hardware diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockReviews.map((review) => {
          const formattedDate = new Date(review.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <div
              key={review.slug}
              className="bg-secondary/15 border border-borderCol/40 rounded-2xl overflow-hidden flex flex-col justify-between p-6 transition-all hover:border-primary/30"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary mb-4">
                  <Link to={`/reviews/${review.slug}`} className="block w-full h-full">
                    <img
                      src={review.imageUrl}
                      alt={review.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="absolute top-4 left-4 bg-primary text-bg font-heading text-[10px] uppercase tracking-widest px-3 py-1.5 rounded shadow-lg">
                    {review.score} / 10
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-primary font-mono uppercase tracking-widest block">
                    {review.scoreLabel}
                  </span>
                  <h3 className="font-heading text-lg uppercase tracking-wide text-text hover:text-primary transition-colors">
                    <Link to={`/reviews/${review.slug}`}>{review.title}</Link>
                  </h3>
                  <p className="text-xs text-text/60 leading-relaxed">
                    {review.summary}
                  </p>
                </div>
              </div>

              {/* Pros & Cons overview */}
              {review.pros && review.pros.length > 0 && (
                <div className="mt-4 pt-4 border-t border-borderCol/30 grid grid-cols-2 gap-4 text-[11px] leading-normal">
                  <div>
                    <h4 className="font-heading text-text/50 uppercase mb-1">Pros</h4>
                    <ul className="list-disc pl-3 text-text/75 space-y-0.5">
                      {review.pros.slice(0, 2).map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  {review.cons && review.cons.length > 0 && (
                    <div>
                      <h4 className="font-heading text-text/50 uppercase mb-1">Cons</h4>
                      <ul className="list-disc pl-3 text-text/75 space-y-0.5">
                        {review.cons.slice(0, 2).map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Reviewer Details */}
              <div className="flex items-center justify-between border-t border-borderCol/30 pt-4 mt-6">
                <span className="text-[10px] text-text/40">
                  By {review.author.name}
                </span>
                <span className="text-[10px] text-text/40 font-mono">
                  {formattedDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ReviewsPage;
