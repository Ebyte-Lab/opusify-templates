export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'admin' | 'editor' | 'viewer';
  lastActive: string;
  projectCount: number;
}
