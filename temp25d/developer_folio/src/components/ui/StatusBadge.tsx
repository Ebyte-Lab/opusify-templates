
interface StatusBadgeProps {
  label: string;
}

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary w-max border border-primary/20">
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    </div>
  );
}
