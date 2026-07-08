import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md';
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses} rounded-full border border-borderCol object-cover`}
    />
  );
};
export default Avatar;
