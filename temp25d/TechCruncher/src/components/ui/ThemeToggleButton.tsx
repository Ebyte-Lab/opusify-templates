import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-borderCol text-text transition-all"
      title="Toggle Visual Mode"
      aria-label="Toggle visual mode"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-text" />
      ) : (
        <Moon className="w-4 h-4 text-text" />
      )}
    </button>
  );
};
export default ThemeToggleButton;
