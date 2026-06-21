import React from 'react';
import { Webinar } from '@/types/webinar';
import { WebinarCard } from './WebinarCard';

interface WebinarGridProps {
  webinars: Webinar[];
}

export const WebinarGrid: React.FC<WebinarGridProps> = ({ webinars }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {webinars.map((webinar) => (
        <WebinarCard key={webinar.id} webinar={webinar} />
      ))}
    </div>
  );
};
