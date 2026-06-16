import type { ContributionData } from '../../types';

interface CommitGraphProps {
  data: ContributionData;
}

export function CommitGraph({ data }: CommitGraphProps) {
  const getLevelClass = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-primary/30 animate-[pulse-opacity_3s_infinite_alternate]';
      case 2:
        return 'bg-primary/65 animate-[pulse-opacity_3s_infinite_alternate]';
      case 3:
        return 'bg-primary shadow-[0_0_8px_rgba(56,189,248,0.6)] animate-[pulse-opacity_3s_infinite_alternate]';
      default:
        return 'bg-[#131b2e] border border-white/10';
    }
  };

  return (
    <figure className="w-full flex flex-col gap-2">
      <figcaption className="sr-only">
        GitHub contribution graph — {data.totalCommits.toLocaleString()} commits in {data.year}
      </figcaption>
      <div className="flex gap-1.5 overflow-hidden w-full h-full transition-opacity">
        {data.grid.map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-1.5">
            {column.map((square, rowIdx) => (
              <div
                key={rowIdx}
                className={`w-3 h-3 rounded-[2px] ${getLevelClass(square.level)}`}
                style={{ animationDelay: `${square.animationDelay}s` }}
              />
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}
