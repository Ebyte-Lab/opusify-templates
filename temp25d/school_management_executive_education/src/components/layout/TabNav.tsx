import React from 'react';
import { NavLink } from 'react-router-dom';

export const TabNav: React.FC = () => {
  const tabs = [
    { name: 'Overview', path: '/overview' },
    { name: 'Courses', path: '/courses' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Network', path: '/network' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm relative z-30">
      <div className="max-w-[1400px] mx-auto px-6 overflow-x-auto no-scrollbar">
        <ul className="flex space-x-8 text-sm font-semibold whitespace-nowrap">
          {tabs.map((tab) => (
            <li key={tab.path}>
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  `block py-4 border-b-2 transition-colors focus:outline-none focus-visible:border-primary ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text/60 hover:text-text'
                  }`
                }
              >
                {tab.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
