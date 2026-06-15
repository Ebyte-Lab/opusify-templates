// src/data/experience.ts
import type { ExperienceEntry } from '../types';

// TODO: replace with your real experience
export const experienceData: ExperienceEntry[] = [
  {
    id: 'exp-1',
    role: 'Senior Backend Engineer',
    company: 'TechCorp',
    dateRange: '2023 - Present',
    description: 'Architected microservices infrastructure. Optimized query execution plans reducing latency by 40% across core endpoints. Implemented robust CI/CD pipelines.',
    tags: ['Kubernetes', 'PostgreSQL', 'Redis'],
    current: true,
  },
  {
    id: 'exp-2',
    role: 'Software Developer',
    company: 'StartUp Inc',
    dateRange: '2020 - 2023',
    description: 'Developed full-stack features using React and Node.js. Built real-time WebSocket communication channels increasing user engagement by 20%.',
    tags: ['React', 'Node.js', 'WebSockets'],
    current: false,
  },
];
