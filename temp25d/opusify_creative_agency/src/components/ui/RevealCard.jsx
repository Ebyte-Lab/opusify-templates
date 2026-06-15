import React from 'react';

const RevealCard = ({ href = '#', className = '', children }) => {
  return (
    <a
      href={href}
      className={`reveal-card group cursor-none block ${className}`}
    >
      {children}
    </a>
  );
};

export default RevealCard;
