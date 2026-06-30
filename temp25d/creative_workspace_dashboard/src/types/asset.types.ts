import { TeamMember } from './team.types';

export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'export' | 'other';
  mimeType: string;
  sizeBytes: number;
  url: string;
  thumbnailUrl?: string;
  folderId: string;
  uploadedBy: TeamMember;
  uploadedAt: string;
  usedInProjects: string[];
}
