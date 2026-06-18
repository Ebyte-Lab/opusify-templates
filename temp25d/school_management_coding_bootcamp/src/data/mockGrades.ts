import type { GradeRecord } from '../types/grade';

export const mockGrades: GradeRecord[] = [
  {
    assignmentId: 'portfolio-website',
    assignmentTitle: 'Portfolio Website Layout',
    score: 95,
    maxScore: 100,
    feedback: 'Excellent semantic structure and CSS styling. The responsive mobile view is perfect. Code is clean, well-formatted, and conforms to all layout standards. Great work, Alex!'
  },
  {
    assignmentId: 'express-rest-api',
    assignmentTitle: 'Simple REST API using Node & Express',
    score: 88,
    maxScore: 100,
    feedback: 'Good routing structure and clean error handling. Try to split your controllers and routers into separate files next time to keep index.js cleaner. Excellent JWT authorization implementation though.'
  }
];
