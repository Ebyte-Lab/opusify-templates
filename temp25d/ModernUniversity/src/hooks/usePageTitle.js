import { useLocation } from 'react-router-dom';

const routeTitleMap = {
  '/': 'Student Dashboard',
  '/academics': 'Academics',
  '/financials': 'Financials',
  '/campus-life': 'Campus Life',
  '/library': 'Library',
  '/settings': 'Settings'
};

export const usePageTitle = () => {
  const location = useLocation();
  return routeTitleMap[location.pathname] || 'Student Portal';
};
