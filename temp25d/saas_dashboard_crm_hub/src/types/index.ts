import React from 'react';

export type DealStage = 'contacted' | 'proposal' | 'negotiation' | 'won';

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  avatars: string[];        // picsum.photos seed URLs
  updatedAt: string;        // human-readable e.g. "2h ago"
  badgeColor: string;       // tailwind class e.g. "bg-blue-50 text-blue-600"
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'Active' | 'Prospect' | 'Inactive';
  lastContact: string;
  avatarSeed: string;
}

export interface ActivityEntry {
  id: string;
  type: 'moved' | 'note' | 'created';
  dealTitle: string;
  stage?: DealStage;
  note?: string;
  author: string;
  time: string;
  iconColor: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'Sent' | 'Draft' | 'Scheduled';
  recipients: number;
  openRate: number;
  clickRate: number;
  sentDate: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  done: boolean;
  assignee: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}
