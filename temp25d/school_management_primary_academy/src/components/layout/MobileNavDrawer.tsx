import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, BookOpen, GraduationCap, Calendar, MessageSquare, Utensils, ClipboardList } from 'lucide-react';
import { useMessages } from '../../hooks/useMessages';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickMessages: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onOpenQuickMessages,
}) => {
  const { totalUnreadCount } = useMessages();

  if (!isOpen) return null;

  const links = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/classes', label: 'Classes', icon: <BookOpen size={20} /> },
    { to: '/grades', label: 'Grades', icon: <GraduationCap size={20} /> },
    { to: '/attendance', label: 'Attendance', icon: <ClipboardList size={20} /> },
    { to: '/messages', label: 'Messages', icon: <MessageSquare size={20} />, badge: totalUnreadCount },
    { to: '/calendar', label: 'Calendar', icon: <Calendar size={20} /> },
    { to: '/lunch', label: 'Lunch Menu', icon: <Utensils size={20} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-text/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-xl border-l-4 border-gray-100 flex flex-col z-50">
        <div className="flex items-center justify-between mb-8">
          <span className="font-heading text-xl text-text">Navigation</span>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-text hover:bg-gray-100 transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-heading font-bold transition-colors relative ${
                  isActive
                    ? 'bg-primary text-text shadow-sm border-b-2 border-primary/20'
                    : 'text-gray-500 hover:text-text hover:bg-gray-50'
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
              {link.badge && link.badge > 0 ? (
                <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {link.badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        {/* Footer actions in drawer */}
        <div className="mt-auto border-t-2 border-gray-100 pt-6">
          <button
            onClick={() => {
              onClose();
              onOpenQuickMessages();
            }}
            className="w-full bg-secondary text-pink-900 font-heading font-bold py-3.5 rounded-2xl shadow-chunky btn-chunky hover:bg-rose-200 flex items-center justify-center gap-2"
          >
            <MessageSquare size={18} />
            Quick Message Mr. Davis
          </button>
        </div>
      </div>
    </div>
  );
};
export default MobileNavDrawer;
