import React from 'react';
import clsx from 'clsx';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={clsx(
        'rounded-full object-cover shadow-sm border border-secondary',
        {
          'w-8 h-8': size === 'sm',
          'w-12 h-12': size === 'md',
          'w-16 h-16': size === 'lg',
        },
        className
      )}
    />
  );
};
