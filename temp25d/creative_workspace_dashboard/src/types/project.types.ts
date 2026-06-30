import { TeamMember } from './team.types';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived' | 'draft';
  coverColor: string;
  deadline: string;
  progress: number;
  members: TeamMember[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'backlog' | 'in_progress' | 'review' | 'done';
  assignee?: TeamMember;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  labels: string[];
}
