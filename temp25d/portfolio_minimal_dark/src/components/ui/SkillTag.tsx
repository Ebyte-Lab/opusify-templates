// src/components/ui/SkillTag.tsx
import React from 'react';

interface SkillTagProps {
  name: string;
  variant?: 'terminal' | 'timeline';
  isCurrent?: boolean;
}

export const SkillTag: React.FC<SkillTagProps> = ({
  name,
  variant = 'terminal',
  isCurrent = true,
}) => {
  if (variant === 'terminal') {
    return (
      <span className="flex items-center gap-2 select-none">
        <span className="text-primary font-bold">&gt;</span>
        <span className="text-text/80">{name}</span>
      </span>
    );
  }

  // timeline tag variant
  return (
    <span
      className={`px-3 py-1.5 border rounded transition-all duration-300 font-body text-xs ${
        isCurrent
          ? 'border-secondary text-text/80 bg-secondary/20 hover:border-primary/50 hover:text-white'
          : 'border-secondary/50 text-text/60 bg-secondary/10 hover:border-primary/30'
      }`}
    >
      {name}
    </span>
  );
};

export default SkillTag;
