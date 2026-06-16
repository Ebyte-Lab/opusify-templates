import { BookOpen, Star, GitFork } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { repositories } from '../../data/repositories';

export function RepoCard() {
  const repo = repositories[0]; // First featured repo

  if (!repo) return null;

  return (
    <BentoCard
      id="repositories"
      ariaLabel="Top Repository"
      className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 p-6 flex flex-col"
    >
      <h2 className="font-heading text-xl mb-4">Top Repository</h2>
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-bg border border-white/5 rounded-xl p-4 flex-grow flex flex-col justify-between hover:border-primary/30 transition-colors"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-primary flex-shrink-0" size={16} />
            <span className="font-bold text-primary truncate">{repo.name}</span>
          </div>
          <p className="text-xs text-text/60 leading-relaxed line-clamp-2">
            {repo.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-text/70">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: repo.languageColor }}
            />
            {repo.language}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-text/70" fill="currentColor" /> {repo.stars >= 1000 ? `${(repo.stars / 1000).toFixed(1)}k` : repo.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={12} className="text-text/70" /> {repo.forks}
            </span>
          </div>
        </div>
      </a>
    </BentoCard>
  );
}
