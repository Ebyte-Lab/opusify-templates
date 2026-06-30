import { TeamMember } from './team.types';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  timezone?: string;
  language?: string;
}

export interface Workspace {
  id: string;
  name: string;
  logoUrl?: string;
  slug: string;
  defaultRole: 'admin' | 'editor' | 'viewer';
  plan: 'free' | 'pro' | 'team' | 'enterprise';
}

export interface Notification {
  id: string;
  type: 'mention' | 'project' | 'team' | 'system';
  icon: string;
  description: string;
  boldActor?: string;
  boldObject?: string;
  timestamp: string;
  isRead: boolean;
}

export interface MessageAttachment {
  name: string;
  url: string;
  sizeBytes: number;
  type: 'image' | 'document' | 'other';
}

export interface Message {
  id: string;
  sender: TeamMember;
  text: string;
  timestamp: string;
  reactions: { emoji: string; count: number; users: string[] }[];
  attachments?: MessageAttachment[];
}

export interface Conversation {
  id: string;
  name: string;
  avatarUrl?: string;
  type: 'dm' | 'channel';
  isOnline?: boolean;
  unreads: number;
  lastMessage?: {
    text: string;
    timestamp: string;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  dateTime: string;
  type: 'deadline' | 'meeting' | 'milestone';
  assignees: TeamMember[];
  notes?: string;
}
