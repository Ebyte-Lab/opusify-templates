import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  statusColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  name,
  size = 'md',
  isOnline,
  statusColor = 'bg-accent-teal',
  ...props
}) => {
  const getInitials = (userName: string) => {
    const parts = userName.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return userName[0]?.toUpperCase() || '?';
  };

  const [hasError, setHasError] = React.useState(false);

  return (
    <div
      className={twMerge(
        clsx(
          'relative flex items-center justify-center rounded-full bg-surface-elevated text-gray-300 font-bold border border-surface-border shrink-0 select-none overflow-visible',
          {
            'w-6 h-6 text-[10px]': size === 'sm',
            'w-8 h-8 text-xs': size === 'md',
            'w-10 h-10 text-sm': size === 'lg',
            'w-14 h-14 text-lg': size === 'xl',
          },
          className
        )
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
      
      {isOnline !== undefined && (
        <span
          className={twMerge(
            clsx(
              'absolute bottom-0 right-0 rounded-full ring-2 ring-surface-card animate-pulse',
              statusColor,
              {
                'w-2 h-2': size === 'sm' || size === 'md',
                'w-2.5 h-2.5': size === 'lg',
                'w-3.5 h-3.5': size === 'xl',
              }
            )
          )}
        />
      )}
    </div>
  );
};
