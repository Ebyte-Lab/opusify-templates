import { HeroCard } from './HeroCard';
import { TechStackCard } from './TechStackCard';
import { StatusCard } from './StatusCard';
import { ContributionCard } from './ContributionCard';
import { RepoCard } from './RepoCard';
import { CodeSnippetCard } from './CodeSnippetCard';

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(180px,_auto)] gap-4 md:gap-6">
      <HeroCard />
      <TechStackCard />
      <StatusCard />
      <ContributionCard />
      <RepoCard />
      <CodeSnippetCard />
    </div>
  );
}
