import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockReviews } from '../../data/reviews';

export const ReviewTelemetryCard: React.FC = () => {
  const navigate = useNavigate();
  const topReviews = mockReviews.slice(0, 2);

  return (
    <div className="bg-secondary/40 border border-borderCol rounded-2xl p-6 flex flex-col justify-between">
      <div className="border-b border-borderCol/50 pb-3 mb-4 flex items-center justify-between">
        <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-text">
          Review Telemetry
        </h3>
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      </div>

      <div className="space-y-4">
        {topReviews.map((review) => (
          <div
            key={review.slug}
            onClick={() => navigate(`/reviews/${review.slug}`)}
            className="p-3 bg-bg/50 border border-borderCol/40 rounded-xl hover:border-primary/20 transition-all cursor-pointer"
          >
            <span className="text-[10px] font-bold text-primary font-mono uppercase">
              {review.score} / 10 • {review.scoreLabel}
            </span>
            <h4 className="font-heading text-xs uppercase tracking-wide text-text mt-1">
              {review.title}
            </h4>
            <p className="text-[11px] text-text/50 mt-1">
              "{review.summary.length > 75 ? `${review.summary.slice(0, 75)}...` : review.summary}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ReviewTelemetryCard;
