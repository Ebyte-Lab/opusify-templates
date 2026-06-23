import React from 'react';
import type { NavItem } from '../types';

export const navigationItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
      React.createElement('polyline', { points: '9 22 9 12 15 12 15 22' })
    )
  },
  {
    label: 'Contacts',
    path: '/contacts',
    icon: React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
      React.createElement('circle', { cx: 9, cy: 7, r: 4 })
    )
  },
  {
    label: 'Deals',
    path: '/deals',
    icon: React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('line', { x1: 12, y1: 1, x2: 12, y2: 23 }),
      React.createElement('path', { d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' })
    )
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('polyline', { points: '9 11 12 14 22 4' }),
      React.createElement('path', { d: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' })
    )
  },
  {
    label: 'Campaigns',
    path: '/campaigns',
    icon: React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
      React.createElement('polyline', { points: '22,6 12,13 2,6' })
    )
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('line', { x1: 18, y1: 20, x2: 18, y2: 10 }),
      React.createElement('line', { x1: 12, y1: 20, x2: 12, y2: 4 }),
      React.createElement('line', { x1: 6, y1: 20, x2: 6, y2: 14 })
    )
  }
];
