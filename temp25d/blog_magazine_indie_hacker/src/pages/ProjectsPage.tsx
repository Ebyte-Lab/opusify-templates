import React from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/listings/ProjectCard';
import { NewsletterSection } from '../components/newsletter/NewsletterSection';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-12 flex-grow space-y-12">
      <header className="space-y-4 select-none">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2">
          <span className="text-primary">#</span> Project Build Board
        </h1>
        <p className="text-sm text-text/60 max-w-xl leading-relaxed">
          Open-source microservices, retro dashboards, and networking configurations built in public by solo developers. Click any board item to see its detailed status sheet.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <NewsletterSection />
    </div>
  );
};
