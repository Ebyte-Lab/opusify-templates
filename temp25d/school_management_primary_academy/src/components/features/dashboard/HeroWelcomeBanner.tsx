import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '../../ui/Button';
import { getGreeting } from '../../../lib/date';
import { Child } from '../../../types/child';

interface HeroWelcomeBannerProps {
  activeChild: Child;
}

export const HeroWelcomeBanner: React.FC<HeroWelcomeBannerProps> = ({ activeChild }) => {
  const greeting = getGreeting();

  const getChildHighlight = (childId: string) => {
    if (childId === 'mia-miller') {
      return "Mia has music class today. Don't forget comfortable clothes for dancing! Next Friday is the Playground Picnic.";
    }
    return "Leo has art class today. Don't forget to pack his painting smock! Next week is the Science Fair.";
  };

  return (
    <div className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] rounded-[2rem] p-8 sm:p-10 text-white shadow-card relative overflow-hidden">
      <div className="relative z-10 max-w-2xl">
        <h1 className="font-heading text-4xl sm:text-5xl mb-4 text-white leading-tight">
          {greeting}, Sarah! ☀️
        </h1>
        <p className="text-lg font-medium text-blue-100 mb-8 leading-relaxed">
          {getChildHighlight(activeChild.id)}
        </p>
        <Button
          variant="chunky"
          to="/calendar"
          className="hover:bg-yellow-400 self-start text-base px-6 py-3.5"
        >
          <Calendar size={20} strokeWidth={2.5} />
          View School Calendar
        </Button>
      </div>

      {/* Decorative clouds */}
      <svg
        className="absolute top-4 right-10 opacity-20 w-32 h-32 hidden md:block"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.5 19c-2.48 0-4.5-2.02-4.5-4.5 0-.25.02-.5.06-.74-.26-.06-.52-.1-.79-.1C9.68 13.66 7.5 15.68 7.5 18c0 2.21 1.79 4 4 4h6c1.66 0 3-1.34 3-3s-1.34-3-3-3zM5.5 14c-1.93 0-3.5 1.57-3.5 3.5S3.57 21 5.5 21c1.38 0 2.58-.8 3.14-1.95C7.94 18.66 7.5 18.11 7.5 17.5c0-.98.39-1.87 1.02-2.52C7.54 14.39 6.57 14 5.5 14zm12-9c-2.76 0-5 2.24-5 5 0 .42.06.82.16 1.2C11.51 10.45 10.3 10 9 10c-2.21 0-4 1.79-4 4 0 .61.14 1.18.38 1.7.99-1.22 2.5-2.03 4.2-2.17.65-2.09 2.59-3.53 4.92-3.53 2.15 0 4.02 1.32 4.74 3.2.14 0 .28-.03.42-.03C21.32 13.17 23 11.49 23 9.4 23 6.97 21.03 5 18.6 5c-.32 0-.63.04-.93.11C16.89 5.65 15.99 5 15 5c-1.32 0-2.45.85-2.85 2.05-.21-.03-.42-.05-.65-.05z" />
      </svg>
      <svg
        className="absolute -bottom-8 right-40 opacity-20 w-48 h-48 hidden md:block"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.5 19c-2.48 0-4.5-2.02-4.5-4.5 0-.25.02-.5.06-.74-.26-.06-.52-.1-.79-.1C9.68 13.66 7.5 15.68 7.5 18c0 2.21 1.79 4 4 4h6c1.66 0 3-1.34 3-3s-1.34-3-3-3zM5.5 14c-1.93 0-3.5 1.57-3.5 3.5S3.57 21 5.5 21c1.38 0 2.58-.8 3.14-1.95C7.94 18.66 7.5 18.11 7.5 17.5c0-.98.39-1.87 1.02-2.52C7.54 14.39 6.57 14 5.5 14zm12-9c-2.76 0-5 2.24-5 5 0 .42.06.82.16 1.2C11.51 10.45 10.3 10 9 10c-2.21 0-4 1.79-4 4 0 .61.14 1.18.38 1.7.99-1.22 2.5-2.03 4.2-2.17.65-2.09 2.59-3.53 4.92-3.53 2.15 0 4.02 1.32 4.74 3.2.14 0 .28-.03.42-.03C21.32 13.17 23 11.49 23 9.4 23 6.97 21.03 5 18.6 5c-.32 0-.63.04-.93.11C16.89 5.65 15.99 5 15 5c-1.32 0-2.45.85-2.85 2.05-.21-.03-.42-.05-.65-.05z" />
      </svg>
    </div>
  );
};
export default HeroWelcomeBanner;
