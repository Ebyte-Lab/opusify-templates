import React from 'react';
import { Link } from 'react-router-dom';

interface QuickActionTileProps {
  color: 'purple' | 'blue' | 'green' | 'pink';
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  to: string;
  badgeCount?: number;
}

export const QuickActionTile: React.FC<QuickActionTileProps> = ({
  color,
  icon,
  title,
  subtitle,
  to,
  badgeCount,
}) => {
  const styles = {
    purple: {
      container: 'bg-purple-100 border-purple-200 hover:bg-purple-200 text-purple-900',
      iconContainer: 'text-purple-500',
      subtitle: 'text-purple-700',
    },
    blue: {
      container: 'bg-blue-100 border-blue-200 hover:bg-blue-200 text-blue-900',
      iconContainer: 'text-blue-500',
      subtitle: 'text-blue-700',
    },
    green: {
      container: 'bg-green-100 border-green-200 hover:bg-green-200 text-green-900',
      iconContainer: 'text-green-500',
      subtitle: 'text-green-700',
    },
    pink: {
      container: 'bg-secondary/40 border-secondary hover:bg-secondary/60 text-pink-900',
      iconContainer: 'text-pink-500',
      subtitle: 'text-pink-700',
    },
  };

  const currentStyle = styles[color];

  return (
    <Link
      to={to}
      className={`border-2 rounded-[2rem] p-6 flex items-center gap-4 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 ${currentStyle.container}`}
    >
      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 relative text-2xl font-bold">
        <div className={currentStyle.iconContainer}>{icon}</div>
        {badgeCount && badgeCount > 0 ? (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
            {badgeCount}
          </span>
        ) : null}
      </div>
      <div>
        <h3 className="font-heading font-bold text-lg leading-tight">{title}</h3>
        <p className={`text-sm font-medium ${currentStyle.subtitle}`}>{subtitle}</p>
      </div>
    </Link>
  );
};
export default QuickActionTile;
