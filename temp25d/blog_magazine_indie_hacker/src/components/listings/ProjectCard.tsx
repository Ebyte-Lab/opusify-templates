import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'shipped':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'building':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'archived':
      default:
        return 'bg-white/5 text-text/40 border-white/10';
    }
  };

  return (
    <div className="bg-[#151515]/60 border border-secondary/60 rounded-xl p-6 hover:border-primary/40 hover:bg-[#151515] transition-all flex flex-col justify-between h-full group shadow-md">
      <div className="space-y-4">
        {/* Name and Status */}
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-heading font-bold leading-none group-hover:text-primary transition-colors">
            <Link to={`/projects/${project.slug}`}>
              {project.name}
            </Link>
          </h3>
          <span className={`px-2 py-0.5 border rounded text-[9px] font-heading font-bold uppercase tracking-wider select-none ${getStatusStyles(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Pitch */}
        <p className="text-xs text-text/60 leading-relaxed">
          {project.pitch}
        </p>
      </div>

      {/* Tech Stack Tags */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tag) => (
            <span key={tag} className="bg-secondary/40 text-text/50 border border-secondary/60 px-1.5 py-0.5 rounded text-[9px] font-mono">
              {tag}
            </span>
          ))}
        </div>

        {/* Link info */}
        {project.linkUrl && (
          <div className="border-t border-secondary/40 pt-3 flex justify-between items-center select-none text-[10px] font-heading">
            <span className="text-text/30">source_code</span>
            <a 
              href={project.linkUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline hover:text-pink-300 flex items-center gap-1"
            >
              EXTERNAL_LINK
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
