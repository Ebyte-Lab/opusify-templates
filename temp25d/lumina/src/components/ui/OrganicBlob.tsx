import React from 'react';

interface OrganicBlobProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const OrganicBlob: React.FC<OrganicBlobProps> = ({ variant = 'primary', className = '' }) => {
  const baseStyles = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] transition-all duration-1000';
  
  const variantStyles =
    variant === 'primary'
      ? 'w-[90%] h-[90%] bg-primary/10 organic-shape'
      : 'w-[110%] h-[110%] bg-secondary/40 organic-shape-2';

  return (
    <div
      className={`${baseStyles} ${variantStyles} ${className}`}
      data-testid={`organic-blob-${variant}`}
    />
  );
};
