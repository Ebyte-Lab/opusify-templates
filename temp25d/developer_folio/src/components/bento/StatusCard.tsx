import { BentoCard } from '../ui/BentoCard';
import { statusInfo } from '../../data/statusInfo';

export function StatusCard() {
  return (
    <BentoCard
      ariaLabel="Status and Current Focus"
      className="col-span-1 row-span-1 p-6 flex flex-col justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
          <img
            src={statusInfo.avatarUrl}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-heading text-sm text-text/60 uppercase tracking-wider">
            Current Focus
          </h3>
          <p className="font-medium text-text">{statusInfo.currentFocus}</p>
        </div>
      </div>
      <div className="mt-4 bg-bg p-4 rounded-xl border border-white/5 font-mono text-xs text-primary group-hover:bg-primary/5 transition-colors">
        {statusInfo.terminalLines.map((line, idx) => (
          <div key={idx}>
            &gt; {line}
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
