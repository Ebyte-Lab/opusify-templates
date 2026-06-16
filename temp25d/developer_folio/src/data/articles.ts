import type { Article } from '../types';

export const articles: Article[] = [
  {
    id: '1',
    title: 'Building a Custom Raft Consensus Protocol in Rust',
    description: 'A deep dive into distributed consensus, building network state machines, and resolving replication conflicts.',
    date: 'May 12, 2026',
    readTime: '12 min read',
    url: '#',
  },
  {
    id: '2',
    title: 'Optimizing PostgreSQL Queries for Multi-tenant Architectures',
    description: 'Learn how to configure connection pools, write optimized indexes, and partition tables to handle millions of requests.',
    date: 'April 28, 2026',
    readTime: '8 min read',
    url: '#',
  },
  {
    id: '3',
    title: 'Why We Migrated Our Microservices to Next.js and Tailwind CSS',
    description: 'An architectural review of the productivity gains and performance improvements achieved during our frontend migration.',
    date: 'March 15, 2026',
    readTime: '6 min read',
    url: '#',
  },
];
