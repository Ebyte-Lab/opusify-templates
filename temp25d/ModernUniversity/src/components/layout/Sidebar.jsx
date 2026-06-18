import React from 'react';
import { student } from '../../data/student';
import { navLinks } from '../../data/navLinks';
import { NavItem } from '../ui/NavItem';
import { useUI } from '../../context/UIContext';
import { LogOut } from 'lucide-react';

export const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useUI();

  return (
    <aside
      id="sidebar"
      className={`bg-primary text-white w-64 flex-shrink-0 flex flex-col fixed md:relative inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-50 shadow-2xl md:shadow-none md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Branding */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10 hidden md:flex">
        <div className="w-10 h-10 bg-white text-primary rounded flex items-center justify-center font-heading font-bold text-2xl shadow-sm">
          U
        </div>
        <span className="font-heading text-2xl font-semibold tracking-wide">University</span>
      </div>

      {/* Student Profile Summary */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-12 h-12 rounded-full border-2 border-secondary object-cover"
          />
          <div>
            <h3 className="font-semibold text-sm leading-tight">{student.name}</h3>
            <p className="text-xs text-secondary/80 mt-1">ID: {student.id}</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavItem
                name={link.name}
                path={link.path}
                icon={link.icon}
                onClick={closeSidebar}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => alert('Sign Out clicked (UI Demo Only)')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
