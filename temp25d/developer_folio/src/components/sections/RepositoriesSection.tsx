import { BookOpen, Star, GitFork, ExternalLink } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { repositories } from '../../data/repositories';

export function RepositoriesSection() {
  return (
    <section id="repositories" className="pt-20 pb-10" aria-label="Repositories Portfolio">
      <div className="mb-10 text-left">
        <h2 className="font-heading text-3xl md:text-4xl mb-3">Repositories</h2>
        <p className="text-text/60 max-w-xl">
          A selection of active open-source projects, system utilities, and libraries I have written and maintain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repositories.map((repo) => (
          <BentoCard
            key={repo.id}
            ariaLabel={`Repository ${repo.name}`}
            className="p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-primary flex-shrink-0" size={18} />
                  <h3 className="font-heading font-bold text-lg text-text truncate max-w-[200px] md:max-w-[260px]">
                    {repo.name}
                  </h3>
                </div>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text/40 hover:text-primary transition-colors"
                  aria-label={`Open ${repo.name} repository`}
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <p className="text-sm text-text/70 leading-relaxed mb-6">
                {repo.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-text/60 border-t border-white/5 pt-4 mt-auto">
              <div className="flex items-center gap-1.5 font-medium">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: repo.languageColor }}
                />
                {repo.language}
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-text/50" fill="currentColor" /> {repo.stars.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={14} className="text-text/50" /> {repo.forks.toLocaleString()}
                </span>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
