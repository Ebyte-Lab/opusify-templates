import React from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  ringColor?: string; // e.g. "ring-primary/40" or "ring-white"
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  ringColor = 'ring-white'
}) => {
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ring-2 ${ringColor} ${sizeStyles[size]}`}
    />
  );
};
