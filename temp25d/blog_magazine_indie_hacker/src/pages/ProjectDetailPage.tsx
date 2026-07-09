import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { NewsletterSection } from '../components/newsletter/NewsletterSection';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center font-heading">
        <h2 className="text-2xl font-bold text-white mb-4">PROJECT_NOT_FOUND</h2>
        <p className="text-text/60 mb-6">The requested project could not be located in the developer registries.</p>
        <Link to="/projects" className="border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-bg transition-all font-bold">
          RETURN_TO_BOARD
        </Link>
      </div>
    );
  }

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
    <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-grow space-y-8">
      <div className="space-y-4 select-none">
        <Link to="/projects" className="font-heading text-xs text-primary hover:underline flex items-center gap-1">
          <span>&lt;</span> Back to Projects
        </Link>
        
        <header className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              {project.name}
            </h1>
            <span className={`px-2.5 py-0.5 border rounded text-xs font-heading font-bold uppercase tracking-wider select-none ${getStatusStyles(project.status)}`}>
              {project.status}
            </span>
          </div>
          <p className="text-sm text-text/70 leading-relaxed font-mono">
            {project.pitch}
          </p>
        </header>
      </div>

      {/* Details block */}
      <div className="border border-secondary/60 rounded-xl p-6 sm:p-8 bg-[#151515]/60 space-y-6">
        <div className="space-y-2">
          <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider select-none">
            Tech Stack Integration
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span key={tag} className="bg-secondary/40 text-text/80 border border-secondary/60 px-2 py-0.5 rounded text-xs font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {project.linkUrl && (
          <div className="space-y-2">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider select-none">
              Source Repository
            </h3>
            <a 
              href={project.linkUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline font-mono text-sm break-all"
            >
              {project.linkUrl}
            </a>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider select-none">
            Operational Telemetry Log
          </h3>
          <div className="bg-[#0C0C0C] border border-secondary/50 rounded-lg p-4 font-mono text-xs text-text/50 space-y-2">
            <div>[2026-07-09T08:12:00Z] STATUS: nominal // uptime: 99.98%</div>
            <div>[2026-07-08T16:45:00Z] HEALTH: check_ok // node count: 3 replicas</div>
            <div>[2026-07-07T12:00:00Z] DEPLOY: build_log_applied // revision: v1.4.2</div>
            <div>[2026-07-05T09:30:00Z] METRIC: response_latency // average: 14.2ms</div>
          </div>
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
};
