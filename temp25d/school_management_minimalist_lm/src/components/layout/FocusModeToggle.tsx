import React from 'react';
import { useCourse } from '../../context/CourseContext';
import { Maximize2, Minimize2 } from 'lucide-react';

export const FocusModeToggle: React.FC = () => {
  const { preferences, updatePreferences } = useCourse();
  const isFocusMode = preferences.focusMode;

  const handleToggle = () => {
    updatePreferences({ focusMode: !isFocusMode });
  };

  return (
    <button
      id="focus-toggle"
      onClick={handleToggle}
      className={`flex items-center gap-2 text-xs uppercase tracking-widest font-semibold font-heading focus:outline-none px-3.5 py-2 rounded-full transition-all duration-300 ${
        isFocusMode
          ? 'bg-primary/10 text-primary'
          : 'bg-secondary/50 text-text/50 hover:text-primary'
      }`}
      aria-label={isFocusMode ? "Disable focus mode" : "Enable focus mode"}
    >
      {isFocusMode ? (
        <>
          <Minimize2 size={14} />
          <span>Unfocus</span>
        </>
      ) : (
        <>
          <Maximize2 size={14} />
          <span>Focus</span>
        </>
      )}
    </button>
  );
};
