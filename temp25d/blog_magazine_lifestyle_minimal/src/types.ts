// Shared domain types for the "THE_JOURNAL" (Lifestyle Minimal) React migration.
// Import these everywhere instead of redefining shapes per-component.

export interface ToastMessage {
  id: string;
  message: string;
}

export interface NavItem {
  label: string;
  path: string; // real route, e.g. "/destinations" — not a "#anchor"
}

export interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

export type StoryCategory =
  | 'greece'
  | 'minimalism'
  | 'interiors'
  | 'wellness'
  | 'travel';

export interface Story {
  slug: string;
  category: StoryCategory;
  categoryLabel: string; // display label, e.g. "Aegean Sea", "Visual Theory"
  readTime: string; // e.g. "10m read"
  title: string;
  excerpt: string;
  body?: string[]; // full paragraphs, used on detail pages
  pullQuote?: {
    text: string;
    citation: string;
  };
  midStoryImage?: {
    url: string;
    caption: string;
  };
  imageUrl: string;
  author: Author;
  publishedAt: string; // ISO date string
  likeCount: number;
  liked?: boolean;
}

export interface InstagridItem {
  id: string;
  imageUrl: string;
  likeCount: string; // e.g. "1.4k" — pre-formatted display string
  commentCount: number;
}

export interface AboutContent {
  heading: string;
  mission: string[];
  editor: Author;
}

export interface NewsletterSubmission {
  email: string;
}
