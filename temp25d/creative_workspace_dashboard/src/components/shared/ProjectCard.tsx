import React from 'react';
import { Project } from '../../types/project.types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Progress } from '../ui/Progress';
import { Dropdown } from '../ui/Dropdown';
import { Calendar, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete
}) => {
  const dropdownItems = [
    ...(onEdit ? [{
      label: 'Edit Project',
      icon: <Edit2 className="w-3.5 h-3.5" />,
      onClick: () => onEdit(project)
    }] : []),
    ...(onDelete ? [{
      label: 'Delete Project',
      icon: <Trash2 className="w-3.5 h-3.5 text-accent-rose" />,
      onClick: () => onDelete(project),
      variant: 'danger' as const
    }] : [])
  ];

  const getStatusVariant = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'purple';
      case 'completed':
        return 'success';
      case 'archived':
        return 'error';
      case 'draft':
      default:
        return 'gray';
    }
  };

  return (
    <Card className="flex flex-col h-76 hover:border-brand-500/30 group">
      {/* Cover Gradient */}
      <div className={`h-12 w-full bg-gradient-to-r ${project.coverColor} shrink-0 relative`} />

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between">
            <Link to={`/projects/${project.id}`} className="hover:text-brand-400 transition-colors">
              <h3 className="font-heading font-bold text-sm text-white group-hover:text-brand-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
            </Link>
            
            {dropdownItems.length > 0 && (
              <Dropdown
                trigger={
                  <button className="p-1 rounded-lg hover:bg-surface-elevated text-gray-500 hover:text-white transition-colors focus-ring">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                }
                items={dropdownItems}
              />
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 mt-4 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
            <Badge variant={getStatusVariant(project.status)} size="sm">
              {project.status}
            </Badge>
            
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-600" />
              <span>{project.deadline}</span>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-5 space-y-3">
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-gray-500">Progress</span>
              <span className="text-gray-300">{project.progress}%</span>
            </div>
            <Progress value={project.progress} color={project.status === 'completed' ? 'bg-accent-teal' : 'bg-brand-500'} />
          </div>

          {/* Member avatars */}
          <div className="flex items-center justify-between border-t border-surface-border/40 pt-3">
            <span className="text-[10px] text-gray-500 font-bold uppercase">Team</span>
            <div className="flex -space-x-1.5 overflow-hidden">
              {project.members.map((member) => (
                <Avatar
                  key={member.id}
                  name={member.name}
                  src={member.avatarUrl}
                  size="sm"
                  className="ring-2 ring-surface-card"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
