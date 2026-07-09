import React from 'react';
import { Link } from 'react-router-dom';
import type { Snippet } from '../../types';
import { useClipboard } from '../../hooks/useClipboard';

interface SnippetCardProps {
  snippet: Snippet;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const copy = useClipboard();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    copy(snippet.code);
  };

  return (
    <div className="bg-[#151515]/60 border border-secondary/60 rounded-xl p-6 hover:border-primary/40 hover:bg-[#151515] transition-all flex flex-col justify-between h-full group shadow-md">
      <div className="space-y-4">
        {/* Language Badge & Copy Button */}
        <div className="flex justify-between items-center select-none">
          <span className="bg-secondary px-2 py-0.5 border border-secondary/80 rounded text-[10px] font-heading font-bold text-white uppercase tracking-wider">
            {snippet.language}
          </span>
          <button 
            onClick={handleCopy}
            className="text-[10px] font-heading font-bold text-text/40 hover:text-primary transition-colors uppercase tracking-wider"
            aria-label={`Copy ${snippet.title}`}
          >
            COPY_CODE
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-heading font-bold leading-snug group-hover:text-primary transition-colors">
          <Link to={`/snippets/${snippet.slug}`}>
            {snippet.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-xs text-text/60 leading-relaxed">
          {snippet.description}
        </p>
      </div>

      {/* Mini Code Preview box */}
      <div className="mt-4 bg-black/40 border border-secondary/40 rounded p-3 font-mono text-[10px] text-text/50 overflow-hidden truncate">
        <code>{snippet.code.split('\n')[0]}...</code>
      </div>
    </div>
  );
};
