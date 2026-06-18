import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Icons from 'lucide-react';
import PropTypes from 'prop-types';

export const NavItem = ({ name, path, icon, onClick = null }) => {
  const IconComponent = Icons[icon] || Icons.HelpCircle;

  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-colors border-l-4 ${
          isActive
            ? 'bg-white/10 text-white border-secondary'
            : 'text-white/70 hover:bg-white/5 hover:text-white border-transparent'
        }`
      }
    >
      <IconComponent className="w-[18px] h-[18px]" />
      <span>{name}</span>
    </NavLink>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
