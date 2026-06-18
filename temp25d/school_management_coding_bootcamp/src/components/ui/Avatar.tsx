import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
  border?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  isOnline = false,
  border = false,
  className = '',
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const indicatorSizes = {
    sm: 'w-2 h-2 -bottom-0.5 -right-0.5',
    md: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5',
    lg: 'w-3 h-3 -bottom-1 -right-1',
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded object-cover ${
          border ? 'border border-primary/50' : 'border border-white/20'
        }`}
      />
      {isOnline && (
        <span
          className={`absolute ${indicatorSizes[size]} bg-green-500 border-2 border-bg rounded-full`}
        />
      )}
    </div>
  );
};
