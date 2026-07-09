// src/types.ts
// Shared domain types for the "hack_journal" (Indie Hacker) React migration.
// Import these everywhere instead of redefining shapes per-component.

export interface ToastMessage {
  id: string;
  message: string;
}

export interface NavItem {
  label: string;
  path: string; // real route, e.g. "/articles" — not a "#anchor"
}

export interface Author {
  handle: string; // e.g. "alex_rivera.sh"
  avatarUrl: string;
}

export interface ArticleSection {
  id: string; // used for TOC anchor + scroll-spy
  tocLabel: string; // e.g. "01. The Monolith Problem"
  heading: string;
  paragraphs: string[];
  codeBlock?: CodeBlock;
}

export interface TerminalStep {
  text: string;
  delayMs: number;
  tone?: 'default' | 'success' | 'muted';
}

export interface CodeBlock {
  filename: string; // e.g. "main.go"
  language: string; // e.g. "go"
  code: string; // raw source, syntax-highlighted at render time
  runnable?: boolean;
  terminalSteps?: TerminalStep[];
}

export interface Article {
  slug: string;
  buildLogId: string; // e.g. "BUILD_LOG_042"
  readTime: string; // e.g. "5 min"
  title: string;
  excerpt: string;
  author: Author;
  publishedAt: string; // ISO date string
  initialViews: number;
  supportersCount: number;
  supported?: boolean;
  sections: ArticleSection[];
}

export interface Snippet {
  slug: string;
  title: string;
  language: string;
  description: string;
  code: string;
  publishedAt: string;
}

export type ProjectStatus = 'shipped' | 'building' | 'archived';

export interface Project {
  slug: string;
  name: string;
  pitch: string;
  stack: string[];
  status: ProjectStatus;
  linkUrl?: string;
}

export interface NewsletterSubmission {
  email: string;
}
