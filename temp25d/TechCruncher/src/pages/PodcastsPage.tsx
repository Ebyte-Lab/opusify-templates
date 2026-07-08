import React from 'react';
import { Play, Calendar, Clock } from 'lucide-react';
import { mockPodcasts } from '../data/podcasts';
import { useToast } from '../context/ToastContext';

export const PodcastsPage: React.FC = () => {
  const toast = useToast();

  const handlePlayClick = (episodeTitle: string) => {
    toast.push(`Initializing audio stream: "${episodeTitle}"`);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-borderCol pb-6">
        <h1 className="font-heading text-3xl md:text-5xl uppercase tracking-tight">
          Podcasts
        </h1>
        <p className="text-text/60 text-sm mt-2">
          Technical conversations with systems developers, security auditors, and core architects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockPodcasts.map((episode) => {
          const formattedDate = new Date(episode.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <div
              key={episode.slug}
              className="bg-secondary/15 border border-borderCol/40 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/30 transition-all group"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-text/40">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {episode.durationMinutes} Minutes
                  </span>
                </div>

                {/* Title & Info */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-primary font-mono uppercase tracking-widest block">
                    GUEST: {episode.guest}
                  </span>
                  <h3 className="font-heading text-lg uppercase tracking-wide text-text group-hover:text-primary transition-colors">
                    {episode.title}
                  </h3>
                  <p className="text-xs text-text/60 leading-relaxed">
                    {episode.description}
                  </p>
                </div>
              </div>

              {/* Play CTA */}
              <div className="mt-6 pt-4 border-t border-borderCol/30 flex items-center justify-between">
                <button
                  onClick={() => handlePlayClick(episode.title)}
                  className="flex items-center gap-2 bg-primary hover:bg-green-700 text-white font-heading text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Listen Now</span>
                </button>
                <span className="text-[10px] text-text/40 font-mono">
                  Spec: MP3 320kbps
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PodcastsPage;
