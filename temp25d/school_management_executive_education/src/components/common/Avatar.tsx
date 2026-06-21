import React from 'react';
import { clsx } from 'clsx';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <img
      src={src}
      alt={alt}
      className={clsx(
        "rounded-sm object-cover border border-gray-200 shrink-0",
        sizeClasses[size],
        className
      )}
      loading="lazy"
    />
  );
};
