import React from 'react';
import type { Resource } from '../../../types/resource';
import { Badge } from '../../ui/Badge';
import { ExternalLink, Video, FileText, FileCode } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return <Video className="w-3.5 h-3.5 text-red-400" />;
      case 'doc':
        return <FileText className="w-3.5 h-3.5 text-blue-400" />;
      case 'repo':
        return <FaGithub className="w-3.5 h-3.5 text-purple-400" />;
      case 'cheatsheet':
        return <FileCode className="w-3.5 h-3.5 text-green-400" />;
    }
  };

  const getBadgeVariant = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return 'error';
      case 'doc':
        return 'info';
      case 'repo':
        return 'primary';
      case 'cheatsheet':
        return 'success';
    }
  };

  return (
    <div className="bg-[#18181B] border border-secondary rounded-lg p-5 hover:border-primary/50 transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <Badge variant={getBadgeVariant(resource.type)}>
            <span className="flex items-center gap-1.5 lowercase">
              {getIcon(resource.type)}
              {resource.type}
            </span>
          </Badge>
          <span className="text-[10px] text-text/40 font-mono uppercase">
            {resource.category}
          </span>
        </div>
        <h3 className="font-heading font-bold text-white text-base mb-2">
          {resource.title}
        </h3>
        <p className="text-xs text-text/60 leading-relaxed mb-4">
          {resource.description}
        </p>
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 self-start text-xs font-bold text-primary hover:text-primary/80 transition-colors"
      >
        Access Resource
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
