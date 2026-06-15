// src/components/ui/ProjectCard.tsx
import React from 'react';
import type { Project } from '../../types';
import CodeBlock from './CodeBlock';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, image, version, language, codeSnippet } = project;

  return (
    <div className="group border border-secondary bg-[#111] rounded-md overflow-hidden hover:border-primary transition-colors duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="h-48 overflow-hidden relative border-b border-secondary">
        <img
          src={image}
          alt={`Screenshot/visualization of ${title}`}
          loading="lazy"
          className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-300 grayscale group-hover:grayscale-0 mix-blend-luminosity"
        />
        <div className="absolute top-3 right-3 bg-bg/90 px-2 py-1 text-xs border border-secondary text-primary font-heading backdrop-blur-sm select-none">
          {version}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-text/70 mb-6 flex-grow">
          {description}
        </p>
        
        {/* Code Block */}
        <CodeBlock code={codeSnippet} language={language} />
      </div>
    </div>
  );
};

export default ProjectCard;
