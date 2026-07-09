import React from 'react';
import type { ArticleSection } from '../../types';
import { useScrollSpy } from '../../hooks/useScrollSpy';

interface TableOfContentsProps {
  sections: ArticleSection[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const sectionIds = sections.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden lg:block lg:col-span-3 sticky top-28">
      <div className="border-l border-secondary/60 space-y-4 py-2">
        <div className="font-heading text-xs font-bold uppercase tracking-wider text-white pl-4 mb-4">
          Table of Contents
        </div>
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              id={`toc-${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={`block text-xs font-heading font-medium border-l-2 border-transparent pl-4 hover:text-white transition-all ${
                isActive ? 'toc-active text-primary' : 'text-text/60'
              }`}
            >
              {section.tocLabel}
            </a>
          );
        })}
      </div>
    </aside>
  );
};
