import React from 'react';
import { Webinar } from '@/types/webinar';
import { useWebinarRegistration } from '@/hooks/useWebinarRegistration';
import { Avatar } from '../common/Avatar';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

interface WebinarCardProps {
  webinar: Webinar;
}

export const WebinarCard: React.FC<WebinarCardProps> = ({ webinar }) => {
  const { status, register } = useWebinarRegistration(webinar.id);

  const handleRegister = () => {
    register(webinar.title);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col h-full">
      <div className="h-32 bg-gray-100 relative overflow-hidden shrink-0">
        <img
          src={webinar.thumbnailUrl}
          alt={webinar.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary rounded-sm">
          {webinar.tag}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-text/60 mb-2">
          {webinar.dateTimeLabel}
        </div>
        <h3 className="font-bold text-text mb-4 leading-tight">
          {webinar.title}
        </h3>
        
        {/* Speaker Profile */}
        <div className="flex items-center gap-3 mt-auto mb-4">
          <Avatar
            src={webinar.speakerAvatarUrl}
            alt={webinar.speakerName}
            size="sm"
            className="rounded-full"
          />
          <div className="text-xs">
            <span className="font-bold text-text block">{webinar.speakerName}</span>
            <span className="text-text/60 block">{webinar.speakerTitle}</span>
          </div>
        </div>

        {/* Action Button State Machine */}
        <button
          onClick={handleRegister}
          disabled={status !== 'idle'}
          className={clsx(
            'w-full py-2 border font-semibold text-sm rounded-sm transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            status === 'idle' && 'border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary',
            status === 'pending' && 'border-primary bg-primary text-white cursor-wait focus-visible:ring-primary',
            status === 'registered' && 'border-green-600 bg-green-600 text-white focus-visible:ring-green-600'
          )}
        >
          {status === 'pending' && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {status === 'registered' && <Check size={16} />}
          <span>
            {status === 'idle' && 'Register to Attend'}
            {status === 'pending' && 'Processing...'}
            {status === 'registered' && 'Added to Calendar'}
          </span>
        </button>
      </div>
    </div>
  );
};
