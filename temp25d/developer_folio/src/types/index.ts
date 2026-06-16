// --- Navigation ---
export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

// --- Profile / Hero ---
export interface ProfileInfo {
  title: string[];         // e.g. ["Full-Stack", "Systems Engineer"] — split for styled rendering
  bio: string;
  availability: boolean;
  availabilityLabel: string;
  githubUrl: string;
  contactUrl: string;
}

// --- Tech Stack ---
export interface TechItem {
  id: string;
  label: string;          // short initials, e.g. "Re", "Ts"
  title: string;          // full name for tooltip, e.g. "React", "TypeScript"
  color: string;          // hex or Tailwind color string, e.g. "#61DAFB"
}

// --- GitHub Contribution Graph ---
export type CommitLevel = 0 | 1 | 2 | 3;  // 0=none, 1=low, 2=med, 3=high

export interface CommitSquare {
  level: CommitLevel;
  animationDelay: number;  // seconds, pre-computed in hook
}

export interface ContributionData {
  totalCommits: number;
  year: number;
  grid: CommitSquare[][];  // [col][row], 30 cols × 5 rows (or configurable)
}

// --- Repositories ---
export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
}

// --- Code Snippet ---
export interface CodeToken {
  text: string;
  color?: string;   // hex — undefined means inherit (var(--text)/50)
}

export type CodeLine = CodeToken[];

export interface CodeSnippetData {
  filename: string;
  language: string;
  lines: CodeLine[];   // structured token array for type-safe syntax coloring
}

// --- Status / Focus ---
export interface StatusInfo {
  avatarUrl: string;
  currentFocus: string;
  terminalLines: string[];  // e.g. ["Tailoring microservices", "Optimizing queries"]
}

// --- Articles ---
export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  url: string;
}

// --- Uses ---
export interface UsesItem {
  name: string;
  description: string;
}

export interface UsesCategory {
  category: string;
  items: UsesItem[];
}
