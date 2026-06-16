import type { ReactNode } from 'react';

interface BentoCardProps {
  className?: string;
  children: ReactNode;
  id?: string;
  ariaLabel?: string;
}

export function BentoCard({ className = '', children, id, ariaLabel }: BentoCardProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`group bg-secondary border border-white/5 rounded-3xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ${className}`}
    >
      {children}
    </section>
  );
}
