import { CalendarEvent } from '../types/calendar';

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    date: '2026-06-03',
    title: 'PTA Monthly Meeting',
    type: 'social',
    description: 'Join us in the cafeteria at 6:30 PM to discuss upcoming summer events and budget planning.',
  },
  {
    id: 'e2',
    date: '2026-06-05',
    title: 'School Art Exhibition',
    type: 'social',
    description: 'Student artwork from all grades will be displayed in the main gymnasium. Light refreshments served.',
  },
  {
    id: 'e3',
    date: '2026-06-12',
    title: 'Staff Professional Development - Early Release',
    type: 'academic',
    description: 'All classes will be dismissed at 12:30 PM. Buses will run on adjusted schedules.',
  },
  {
    id: 'e4',
    date: '2026-06-15',
    title: '2nd Grade Zoo Field Trip',
    type: 'academic',
    description: 'Leo and his classmates will visit the City Zoo. Remember to pack a sack lunch and wear walking shoes.',
  },
  {
    id: 'e5',
    date: '2026-06-18',
    title: 'Art Class Smock Day (Today!)',
    type: 'academic',
    description: 'Watercolors painting session with Mr. Davis. Please bring a protective smock.',
  },
  {
    id: 'e6',
    date: '2026-06-19',
    title: 'Juneteenth (Holiday) - School Closed',
    type: 'holiday',
    description: 'National holiday. SunnySide Academy school buildings and administrative offices are closed.',
  },
  {
    id: 'e7',
    date: '2026-06-23',
    title: 'SunnySide Annual Science Fair',
    type: 'academic',
    description: 'Projects will be judged starting at 10:00 AM. Parent viewing opens at 2:00 PM in the auditorium.',
  },
  {
    id: 'e8',
    date: '2026-06-25',
    title: 'Spring Make-up Picture Day',
    type: 'other',
    description: 'For students who missed fall picture day or need retakes. Dress in standard school uniform.',
  },
  {
    id: 'e9',
    date: '2026-06-26',
    title: 'Academy Field Day',
    type: 'sports',
    description: 'Outdoor athletics, relay races, and games! Dress in athletic wear. Sunscreen and water bottles required.',
  },
];
