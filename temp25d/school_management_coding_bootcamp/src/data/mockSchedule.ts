import type { ScheduleEvent } from '../types/schedule';

export const mockSchedule: ScheduleEvent[] = [
  {
    id: 'e1',
    label: 'Live Q&A: Authentication & Cookies',
    datetime: 'Today, 2:00 PM',
    location: 'Zoom • with Instructor Davis',
    isToday: true
  },
  {
    id: 'e2',
    label: 'Pair Programming Session: API Security',
    datetime: 'Tomorrow, 10:00 AM',
    location: 'Discord Voice Channel',
    isToday: false
  },
  {
    id: 'e3',
    label: 'Guest Lecture: Tech Interview Preparation',
    datetime: 'Monday, 1:00 PM',
    location: 'Zoom • with Recruiter Sarah from Stripe',
    isToday: false
  },
  {
    id: 'e4',
    label: 'Advanced React Quiz & Homework Due',
    datetime: 'Wednesday, 11:59 PM',
    location: 'Student Portal Submissions',
    isToday: false
  }
];
