import { Github } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { StatusBadge } from '../ui/StatusBadge';
import { profileInfo } from '../../data/profileInfo';

export function HeroCard() {
  return (
    <BentoCard
      id="overview"
      ariaLabel="Hero and Overview"
      className="md:col-span-2 row-span-2 p-8 md:p-10 flex flex-col justify-center relative"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none text-text">
        <Github size={120} strokeWidth={1.5} />
      </div>

      {profileInfo.availability && (
        <div className="mb-6">
          <StatusBadge label={profileInfo.availabilityLabel} />
        </div>
      )}

      <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 leading-tight">
        {profileInfo.title[0]} <br />
        <span className="text-primary">{profileInfo.title[1]}</span>
      </h1>

      <p className="text-text/70 text-lg md:text-xl max-w-md leading-relaxed">
        {profileInfo.bio}
      </p>

      <div className="mt-8 flex flex-wrap gap-4 z-10">
        <a
          href={profileInfo.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-bg px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          View GitHub
        </a>
        <a
          href={profileInfo.contactUrl}
          className="bg-secondary border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors"
        >
          Contact
        </a>
      </div>
    </BentoCard>
  );
}
