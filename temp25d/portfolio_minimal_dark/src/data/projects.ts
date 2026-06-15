// src/data/projects.ts
import type { Project } from '../types';

// TODO: replace with your real projects
export const projects: Project[] = [
  {
    id: 'distributed-cache-node',
    title: 'Distributed Cache Node',
    description: 'A high-performance distributed caching layer. Reduces database read load by 85% with minimal footprint.',
    image: 'https://picsum.photos/seed/system/600/400',
    version: 'v2.0.1',
    language: 'go',
    codeSnippet: `func GetNode(key string) *Node {
  // Hash key to find ring position
  return ring.nodes[hash(key)]
}`,
  },
  {
    id: 'neural-log-analyzer',
    title: 'Neural Log Analyzer',
    description: 'Real-time log anomaly detection using lightweight models running at the edge.',
    image: 'https://picsum.photos/seed/terminal/600/400',
    version: 'v1.1.0',
    language: 'python',
    codeSnippet: `import torch
def detect(stream):
  model.predict(stream)
  return anomaly_score`,
  },
];
