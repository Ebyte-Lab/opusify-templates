import React from 'react';
import { usePictureInPicture } from '../../hooks/usePictureInPicture';
import { Play, X } from 'lucide-react';
import clsx from 'clsx';

interface LessonVideoPlayerProps {
  thumbnailUrl: string;
}

export const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({ thumbnailUrl }) => {
  const { anchorRef, pipActive, dismissPip } = usePictureInPicture<HTMLDivElement>();

  return (
    <div ref={anchorRef} id="video-anchor" className="w-full h-auto aspect-video mb-12">
      <div
        id="video-wrapper"
        className={clsx(
          "bg-secondary rounded-2xl overflow-hidden relative shadow-sm group transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          {
            "fixed bottom-6 right-6 w-72 shadow-2xl z-40": pipActive,
            "w-full h-full": !pipActive,
          }
        )}
      >
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
        
        {/* Play Action Overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg text-primary transform group-hover:scale-110 transition-transform">
            <Play size={24} className="ml-1 fill-current text-primary" />
          </div>
        </div>

        {/* Close PIP Button */}
        <button
          id="close-pip"
          onClick={(e) => {
            e.stopPropagation();
            dismissPip();
          }}
          className={clsx(
            "absolute top-3 right-3 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-opacity duration-200 z-50",
            {
              "opacity-100 pointer-events-auto": pipActive,
              "opacity-0 pointer-events-none": !pipActive,
            }
          )}
          aria-label="Dismiss Picture in Picture"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};
