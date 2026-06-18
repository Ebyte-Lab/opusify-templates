import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-[2rem] p-6 sm:p-8 shadow-card border-2 border-gray-100 transition-all duration-300 ${
        hoverable ? 'hover:shadow-lg hover:-translate-y-1 hover:border-primary/20' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;
