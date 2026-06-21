import type { Module } from '../types/lesson';

export const syllabusData: Module[] = [
  {
    id: 'm1',
    title: 'Visual Design Fundamentals',
    lessons: [
      { slug: 'color-theory', title: 'Color Theory & Contrast', readMinutes: 8 }
    ]
  },
  {
    id: 'm2',
    title: 'Interaction Fundamentals',
    lessons: [
      { slug: 'interaction-design', title: 'Interaction Design & Feedback', readMinutes: 10 }
    ]
  },
  {
    id: 'm3',
    title: 'Visual Hierarchy',
    lessons: [
      { slug: 'principles-of-minimalist-design', title: 'The Principles of Minimalist Design', readMinutes: 12 }
    ]
  }
];
