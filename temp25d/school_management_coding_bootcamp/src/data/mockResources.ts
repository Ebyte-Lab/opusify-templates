import type { Resource } from '../types/resource';

export const mockResources: Resource[] = [
  {
    id: 'res1',
    title: 'CSS Flexbox & Grid Cheat Sheet',
    type: 'cheatsheet',
    url: 'https://css-tricks.com',
    description: 'Visual diagrams and quick-reference syntax for all Flexbox and CSS Grid layout parameters.',
    category: 'Frontend & UI'
  },
  {
    id: 'res2',
    title: 'PostgreSQL Indexes & Performance Optimization',
    type: 'doc',
    url: 'https://www.postgresql.org/docs/',
    description: 'Detailed official guide on utilizing indexes (B-Tree, Hash, GIN), understanding EXPLAIN ANALYZE, and optimizing slow SQL queries.',
    category: 'Backend & DB'
  },
  {
    id: 'res3',
    title: 'React 18 Concurrent Rendering Deep Dive',
    type: 'video',
    url: 'https://www.youtube.com',
    description: 'Video seminar discussing how the virtual DOM schedules updates, using useTransition, useDeferredValue, and concurrent mechanisms.',
    category: 'React & Frameworks'
  },
  {
    id: 'res4',
    title: 'Express JWT Auth Reference Boilerplate',
    type: 'repo',
    url: 'https://github.com',
    description: 'An open-source boilerplate repository demonstrating secure JWT token sign, refresh, storage in cookies, and express middleware auth guards.',
    category: 'Security'
  },
  {
    id: 'res5',
    title: 'Vercel Deployment & Custom Domain Configuration',
    type: 'doc',
    url: 'https://vercel.com/docs',
    description: 'Official documentation describing steps to integrate GitHub hooks for continuous deployment and configuring SSL certs on custom domains.',
    category: 'DevOps & Git'
  },
  {
    id: 'res6',
    title: 'JavaScript Event Loop Visualizer tool',
    type: 'cheatsheet',
    url: 'https://latentflip.com/loupe/',
    description: 'An interactive simulator showing how the call stack, web APIs, callback queue, and event loop interact in real time.',
    category: 'JS Core'
  }
];
