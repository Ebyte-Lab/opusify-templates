import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SpecGroup } from '../../types/product';

interface AccordionItemProps {
  group: SpecGroup;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ group, isOpen, onToggle }) => {
  return (
    <div className={`neon-border bg-bg ${isOpen ? 'neon-active' : ''}`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${group.id}`}
        id={`header-${group.id}`}
        className="w-full px-6 py-4 flex justify-between items-center text-left hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded outline-none select-none"
      >
        <span className="font-heading tracking-widest text-white">{group.title}</span>
        <span className="text-primary text-xl font-light">{isOpen ? '–' : '+'}</span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`panel-${group.id}`}
            role="region"
            aria-labelledby={`header-${group.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-text/70 space-y-2">
              {group.rows.map((row, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b border-secondary/50 pb-2 last:border-b-0 last:pb-0"
                >
                  <span className="text-white">{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
