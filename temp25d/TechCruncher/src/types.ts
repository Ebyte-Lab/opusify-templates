// src/types.ts
// Shared domain types for the Tech Cruncher React migration.
// Import these everywhere instead of redefining shapes per-component.

export type Theme = 'light' | 'dark';

export interface ToastMessage {
  id: string;
  message: string;
}

export interface NavItem {
  label: string;
  path: string; // real route, e.g. "/news" — not a "#anchor"
}

export interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

export type ArticleCategory =
  | 'Artificial Intelligence'
  | 'Hardware'
  | 'Security'
  | 'Automation'
  | 'Optimizations'
  | 'Cryptography';

export interface Article {
  slug: string;
  category: ArticleCategory;
  readTime: string; // e.g. "6 Min Read"
  title: string;
  excerpt: string;
  body?: string[]; // full paragraphs, used on ArticleDetailPage
  imageUrl: string;
  author: Author;
  publishedAt: string; // ISO date string
  likeCount: number;
  liked?: boolean;
  bookmarked?: boolean;
  breaking?: boolean;
}

export interface Review {
  slug: string;
  title: string;
  score: number; // e.g. 9.8
  scoreLabel: string; // e.g. "EDITORS CHOICE" | "DETAILED SPECS"
  summary: string;
  pros?: string[];
  cons?: string[];
  imageUrl: string;
  author: Author;
  publishedAt: string;
}

export interface PodcastEpisode {
  slug: string;
  title: string;
  guest: string;
  durationMinutes: number;
  publishedAt: string;
  description: string;
  audioUrl?: string;
}

export interface TechEvent {
  slug: string;
  name: string;
  date: string; // ISO date string
  format: 'Virtual' | 'In-Person' | 'Hybrid';
  location: string;
  description: string;
  registerUrl?: string;
}

export interface CommunityStats {
  readerCount: string; // e.g. "128k"
  syncStatus: 'NOMINAL' | 'DEGRADED' | 'OFFLINE';
  version: string; // e.g. "v1.0.0"
}

export interface TickerItem {
  id: string;
  text: string;
}

export interface NewsletterSubmission {
  email: string;
}
