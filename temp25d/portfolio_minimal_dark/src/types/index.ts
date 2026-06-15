// src/types/index.ts

export interface NavLink {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  version: string;
  language: 'go' | 'python' | string;
  codeSnippet: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  description: string;
  tags: string[];
  current: boolean;
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | string;
  href: string;
}
