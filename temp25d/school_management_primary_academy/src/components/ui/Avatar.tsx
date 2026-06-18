import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const initial = alt.charAt(0).toUpperCase();

  return (
    <div
      className={`${sizes[size]} rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0 bg-blue-100 text-blue-700 font-heading font-bold text-sm ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
};
export default Avatar;
