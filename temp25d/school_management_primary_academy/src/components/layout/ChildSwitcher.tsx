import React, { useState, useRef, useEffect } from 'react';
import { useActiveChild } from '../../hooks/useActiveChild';
import { ChevronDown, GraduationCap } from 'lucide-react';

export const ChildSwitcher: React.FC = () => {
  const { activeChild, children, setActiveChild } = useActiveChild();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Chip */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-2xl border-2 border-secondary/50 hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary text-left"
        aria-label="Switch student profile"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <img
          src={activeChild.avatarUrl}
          alt={`${activeChild.name} avatar`}
          className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm shrink-0"
        />
        <div className="flex flex-col pr-1">
          <span className="font-heading font-bold text-sm leading-tight text-text">
            {activeChild.name}
          </span>
          <span className="text-xs text-text/60 font-semibold flex items-center gap-1">
            <GraduationCap size={12} /> {activeChild.grade}
          </span>
        </div>
        <ChevronDown size={16} className={`text-text/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-gray-50 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-150"
          role="listbox"
          aria-label="Students list"
        >
          {children.map((child) => {
            const isSelected = child.id === activeChild.id;
            return (
              <li key={child.id} role="option" aria-selected={isSelected}>
                <button
                  onClick={() => {
                    setActiveChild(child.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    isSelected ? 'bg-primary/5' : ''
                  }`}
                >
                  <img
                    src={child.avatarUrl}
                    alt={child.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className={`font-heading text-sm ${isSelected ? 'font-bold text-text' : 'font-semibold text-gray-600'}`}>
                      {child.name}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{child.grade}</span>
                  </div>
                  {isSelected && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default ChildSwitcher;
