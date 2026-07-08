import type { Review } from '../types';

export const mockReviews: Review[] = [
  {
    slug: 'opusify-v1-evaluation',
    title: 'SaaS Framework Opusify v1.0.0 Evaluation',
    score: 9.8,
    scoreLabel: 'EDITORS CHOICE',
    summary: 'Scaffold optimizations cut initial token overhead by 60%, delivering a lightning-fast boilerplating experience for engineering teams.',
    pros: [
      'Token optimization mechanism is highly effective',
      'Extremely quick startup and scaffold generation',
      'Clean directory structures out of the box'
    ],
    cons: [
      'Relatively steep learning curve for junior developers',
      'Limited third-party plugins in early release'
    ],
    imageUrl: 'https://picsum.photos/seed/opusify/600/400',
    author: {
      name: 'Evelyn Vance',
      role: 'Senior Tech Journalist',
      avatarUrl: 'https://picsum.photos/seed/reporter/100/100'
    },
    publishedAt: '2026-07-08T08:00:00Z'
  },
  {
    slug: 'nextjs-14-app-router',
    title: 'Framework Review: Next.js 14 App Router',
    score: 8.5,
    scoreLabel: 'DETAILED SPECS',
    summary: 'Server components successfully eliminate client bloat, though runtime server dependencies require structured caching policies.',
    pros: [
      'Server components minimize client-side bundle size',
      'Built-in data caching at the fetch layer',
      'Simplified routing and layouts structure'
    ],
    cons: [
      'Server action debugging can be frustrating',
      'High learning curve transitioning from Page router'
    ],
    imageUrl: 'https://picsum.photos/seed/nextjs/600/400',
    author: {
      name: 'Arthur Pendragon',
      role: 'Hardware Analyst',
      avatarUrl: 'https://picsum.photos/seed/arthur/100/100'
    },
    publishedAt: '2026-07-07T11:00:00Z'
  },
  {
    slug: 'bun-1-1-bundler-runtime',
    title: 'Bun 1.1 Bundler & Runtime Suite',
    score: 9.2,
    scoreLabel: 'EDITORS CHOICE',
    summary: 'An outstanding drop-in Node.js replacement that speeds up tests and package installation scripts by multiple orders of magnitude.',
    pros: [
      'Unbelievably fast package installation times',
      'Native JSX and TypeScript execution support',
      'Includes test runner and packager out-of-the-box'
    ],
    cons: [
      'Windows support is still stabilizing',
      'Occasional minor bugs with complex legacy node_modules'
    ],
    imageUrl: 'https://picsum.photos/seed/bun/600/400',
    author: {
      name: 'Jane Developer',
      role: 'Principal Engineer',
      avatarUrl: 'https://picsum.photos/seed/jane/100/100'
    },
    publishedAt: '2026-07-06T10:00:00Z'
  },
  {
    slug: 'tailwind-css-v4-alpha',
    title: 'Tailwind CSS v4.0 Alpha Build',
    score: 8.9,
    scoreLabel: 'DETAILED SPECS',
    summary: 'A complete rewrite that leverages CSS variables for faster compile times and eliminates the need for complex JS configs.',
    pros: [
      'Super-fast compilation times',
      'Decluttering project root by dropping tailwind.config.js',
      'Great CSS variables integration'
    ],
    cons: [
      'Breaking changes for custom plugins',
      'Requires updating build tools setup'
    ],
    imageUrl: 'https://picsum.photos/seed/tailwind/600/400',
    author: {
      name: 'Lancelot Knight',
      role: 'Cybersecurity Expert',
      avatarUrl: 'https://picsum.photos/seed/lance/100/100'
    },
    publishedAt: '2026-07-05T09:00:00Z'
  },
  {
    slug: 'copilot-workspace-ide',
    title: 'Copilot Workspace IDE Integration',
    score: 7.8,
    scoreLabel: 'DETAILED SPECS',
    summary: 'A bold step toward agent-driven engineering. Great for scaffolding, but complex refactors still require manual steering.',
    pros: [
      'Automates tedious boilerplate generation',
      'Deep integration with GitHub issue lists',
      'Clear explanations of proposed changes'
    ],
    cons: [
      'Can make incorrect assumptions on large repos',
      'Requires substantial review for safety-critical code'
    ],
    imageUrl: 'https://picsum.photos/seed/copilot/600/400',
    author: {
      name: 'Desk Alpha',
      role: 'Security lead',
      avatarUrl: 'https://picsum.photos/seed/alpha/100/100'
    },
    publishedAt: '2026-07-04T12:00:00Z'
  },
  {
    slug: 'biome-linter-formatter-cli',
    title: 'Biome Linter & Formatter CLI',
    score: 9.0,
    scoreLabel: 'EDITORS CHOICE',
    summary: 'A single, fast Rust tool that replaces ESLint and Prettier, making lint checks and formatting near-instantaneous.',
    pros: [
      'Sub-millisecond execution speeds',
      'Consolidates formatting and linting rules',
      'No complex dependency chains'
    ],
    cons: [
      'Smaller ecosystem of plugins compared to ESLint',
      'Fewer advanced rule customizations'
    ],
    imageUrl: 'https://picsum.photos/seed/biome/600/400',
    author: {
      name: 'Inst. Davis',
      role: 'DevOps Architect',
      avatarUrl: 'https://picsum.photos/seed/davis/100/100'
    },
    publishedAt: '2026-07-03T15:30:00Z'
  }
];
