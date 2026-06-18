import React, { useState, useEffect } from 'react';
import { Heart, Star } from 'lucide-react';
import { Card } from '../../ui/Card';
import { useActiveChild } from '../../../hooks/useActiveChild';

export const StarBehaviorTracker: React.FC = () => {
  const { activeChild, incrementStars } = useActiveChild();
  const { id, name, weeklyStarGoal, earnedStars } = activeChild;
  
  const [animateCounter, setAnimateCounter] = useState(false);
  const [justEarnedIndex, setJustEarnedIndex] = useState<number | null>(null);

  // Trigger animation when earnedStars count updates
  useEffect(() => {
    setAnimateCounter(true);
    const timer = setTimeout(() => setAnimateCounter(false), 400);
    return () => clearTimeout(timer);
  }, [earnedStars]);

  const handleAwardStar = (index: number) => {
    if (earnedStars < weeklyStarGoal) {
      setJustEarnedIndex(index);
      incrementStars(id);
      setTimeout(() => setJustEarnedIndex(null), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAwardStar(index);
    }
  };

  // Generate array for rendering all star slots
  const starsArray = Array.from({ length: weeklyStarGoal });

  // Teacher feedback notes by child
  const getTeacherNote = (childId: string) => {
    if (childId === 'mia-miller') {
      return 'Mia did a wonderful job sharing her toys in sandbox play and cleanup today!';
    }
    return 'Leo did an amazing job helping clean up the art supplies today!';
  };

  const firstName = name.split(' ')[0];

  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="font-heading text-2xl text-text mb-1">{firstName}'s Behavior</h2>
          <p className="text-sm font-semibold text-gray-400">Weekly Goal: {weeklyStarGoal} Stars</p>
        </div>
        <div className="w-12 h-12 bg-secondary/30 text-pink-500 rounded-2xl flex items-center justify-center">
          <Heart size={24} fill="currentColor" stroke="none" />
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-6 flex-grow flex flex-col justify-center border-2 border-gray-100 border-dashed">
        <div className="flex justify-between items-center mb-4">
          <span className="font-heading font-bold text-gray-500 text-lg">Current Stars</span>
          <span
            className={`font-heading font-bold text-3xl text-primary transition-transform duration-150 inline-block ${
              animateCounter ? 'star-pop' : ''
            }`}
          >
            {earnedStars} / {weeklyStarGoal}
          </span>
        </div>

        {/* Star visualizer */}
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Behavior stars goal status">
          {starsArray.map((_, index) => {
            const isFilled = index < earnedStars;
            const isJustEarned = index === justEarnedIndex;

            return (
              <div
                key={index}
                role="button"
                tabIndex={isFilled ? -1 : 0}
                onClick={() => !isFilled && handleAwardStar(index)}
                onKeyDown={(e) => !isFilled && handleKeyDown(e, index)}
                aria-label={
                  isFilled
                    ? `Star ${index + 1} of ${weeklyStarGoal}: Earned`
                    : `Award star ${index + 1} of ${weeklyStarGoal}`
                }
                className={`w-10 h-10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg ${
                  isFilled
                    ? 'text-primary'
                    : 'text-gray-200 cursor-pointer hover:text-primary/40'
                } ${isJustEarned ? 'star-pop' : ''}`}
              >
                <Star
                  size={40}
                  fill="currentColor"
                  stroke={isFilled ? 'none' : 'currentColor'}
                  strokeWidth={isFilled ? 0 : 2}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Teacher Note banner */}
      <div className="bg-green-100 border-2 border-green-200 text-green-700 p-4 rounded-2xl text-sm font-semibold flex gap-3 items-start leading-relaxed">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="mt-0.5 flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p>
          <strong>Note from teacher:</strong> "{getTeacherNote(id)}"
        </p>
      </div>
    </Card>
  );
};
export default StarBehaviorTracker;
