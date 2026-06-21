import { Course } from '../types/course';

export const coursesMockData: Course[] = [
  {
    id: 'course-1',
    title: 'Executive Leadership Program',
    instructor: 'Dr. Sarah Jenkins',
    schedule: 'Mondays 6:00 PM EST',
    percentComplete: 65,
    status: 'enrolled'
  },
  {
    id: 'course-2',
    title: 'Strategic Financial Analysis',
    instructor: "James O'Connor",
    schedule: 'Wednesdays 7:00 PM EST',
    percentComplete: 30,
    status: 'enrolled'
  },
  {
    id: 'course-3',
    title: 'Digital Transformation Strategy',
    instructor: 'Marcus Reid',
    schedule: 'Self-paced',
    percentComplete: 100,
    status: 'completed'
  },
  {
    id: 'course-4',
    title: 'Advanced Negotiation & Influence',
    instructor: 'Alexander Wright',
    schedule: 'Starts Cohort \'26 Q3',
    percentComplete: 0,
    status: 'available'
  },
  {
    id: 'course-5',
    title: 'Corporate Venture Capital',
    instructor: 'Fatima Al-Sayed',
    schedule: 'Starts Cohort \'26 Q4',
    percentComplete: 0,
    status: 'available'
  },
  {
    id: 'course-6',
    title: 'Supply Chain Resilience & Risk',
    instructor: 'Thomas Mueller',
    schedule: 'Self-paced',
    percentComplete: 0,
    status: 'available'
  }
];
