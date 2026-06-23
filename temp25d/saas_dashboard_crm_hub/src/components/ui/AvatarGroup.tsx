import React from 'react';
import { Avatar } from './Avatar';

interface AvatarGroupProps {
  avatars: string[];
  size?: 'sm' | 'md' | 'lg';
  max?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = 'sm',
  max = 3
}) => {
  const visibleAvatars = avatars.slice(0, max);
  const extraCount = avatars.length - max;

  const spacingClass = {
    sm: '-space-x-1.5',
    md: '-space-x-2',
    lg: '-space-x-2.5'
  }[size];

  const sizeClass = {
    sm: 'w-6 h-6 text-[9px]',
    md: 'w-8 h-8 text-[11px]',
    lg: 'w-10 h-10 text-[13px]'
  }[size];

  return (
    <div className={`flex items-center ${spacingClass}`}>
      {visibleAvatars.map((src, idx) => (
        <Avatar key={idx} src={src} size={size} ringColor="ring-white" />
      ))}
      {extraCount > 0 && (
        <div className={`rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 ring-2 ring-white ${sizeClass}`}>
          +{extraCount}
        </div>
      )}
    </div>
  );
};
