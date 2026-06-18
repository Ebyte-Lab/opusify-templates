import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from './Badge';

export const StatCard = ({ label, value, sub = '', badge = '', badgeColor = 'gray', gradient = false }) => {
  if (gradient) {
    return (
      <div className="bg-gradient-to-br from-primary to-blue-800 text-white p-6 rounded-lg border border-transparent shadow-sm flex flex-col relative overflow-hidden h-full">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <span className="text-white/70 text-xs font-semibold uppercase tracking-wider block mb-1">{label}</span>
            <h3 className="font-heading text-2xl font-bold leading-tight mt-1">{value}</h3>
          </div>
          {sub && <p className="text-sm text-secondary/90 mt-4 font-medium">{sub}</p>}
        </div>
        {/* Simple decorative background SVG to give it a premium feel */}
        <svg
          className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 pointer-events-none"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col h-full justify-between">
      <div>
        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-1">{label}</span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-heading text-4xl font-bold text-text">{value}</span>
        </div>
      </div>
      {(sub || badge) && (
        <div className="mt-4 flex items-center justify-between gap-2">
          {sub && <p className="text-xs text-muted font-medium">{sub}</p>}
          {badge && <Badge label={badge} color={badgeColor} />}
        </div>
      )}
    </div>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sub: PropTypes.string,
  badge: PropTypes.string,
  badgeColor: PropTypes.string,
  gradient: PropTypes.bool
};
