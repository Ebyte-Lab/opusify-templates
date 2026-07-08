import React from 'react';
import { Calendar, MapPin, Video } from 'lucide-react';
import { mockEvents } from '../data/events';
import { useToast } from '../context/ToastContext';

export const EventsPage: React.FC = () => {
  const toast = useToast();

  const handleRegister = (eventName: string) => {
    toast.push(`Access registration credentials saved for: "${eventName}"`);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-borderCol pb-6">
        <h1 className="font-heading text-3xl md:text-5xl uppercase tracking-tight">
          Upcoming Events
        </h1>
        <p className="text-text/60 text-sm mt-2">
          Hackathons, architecture symposiums, and developmental code briefs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockEvents.map((event) => {
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
          });

          return (
            <div
              key={event.slug}
              className="bg-secondary/15 border border-borderCol/40 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/30 transition-all group"
            >
              <div className="space-y-4">
                {/* Format / Type */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-heading uppercase px-2.5 py-1 rounded shadow-sm tracking-widest ${
                      event.format === 'Virtual'
                        ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20'
                        : event.format === 'In-Person'
                        ? 'bg-orange-600/10 text-orange-500 border border-orange-500/20'
                        : 'bg-purple-600/10 text-purple-500 border border-purple-500/20'
                    }`}
                  >
                    {event.format}
                  </span>
                </div>

                {/* Event Name & Description */}
                <div className="space-y-2">
                  <h3 className="font-heading text-lg uppercase tracking-wide text-text group-hover:text-primary transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-xs text-text/60 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Event details */}
                <div className="space-y-2 pt-2 border-t border-borderCol/20 text-xs font-mono text-text/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {event.format === 'Virtual' ? (
                      <Video className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                    )}
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Register CTA */}
              <div className="mt-6 pt-4 border-t border-borderCol/30 flex items-center justify-between">
                <button
                  onClick={() => handleRegister(event.name)}
                  className="bg-primary hover:bg-green-700 text-white font-heading text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-md"
                >
                  Register Now
                </button>
                <span className="text-[10px] text-text/40 font-mono">
                  Access: FREE
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default EventsPage;
