import { BentoCard } from '../ui/BentoCard';
import { CommitGraph } from '../ui/CommitGraph';
import { useCommitGraph } from '../../hooks/useCommitGraph';

export function ContributionCard() {
  const commitData = useCommitGraph();

  return (
    <BentoCard
      ariaLabel="GitHub Contributions"
      className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 p-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl">Contributions</h2>
        <span className="text-xs text-text/50 font-mono">
          {commitData.totalCommits.toLocaleString()} commits this year
        </span>
      </div>
      <div className="flex-grow flex items-end">
        <CommitGraph data={commitData} />
      </div>
    </BentoCard>
  );
}
