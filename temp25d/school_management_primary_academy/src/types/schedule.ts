export interface ClassSession {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  startTime: string; // e.g. "09:00 AM" or "01:00 PM"
  color: string; // tailwind color class prefix, e.g. "blue", "purple", "green"
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
  teacherAvatar: string;
  room: string;
  schedule: string; // e.g. "Mon, Wed, Fri - 09:00 AM"
  currentUnit: string;
  materialsNeeded: string[];
  teacherNote: string;
}
