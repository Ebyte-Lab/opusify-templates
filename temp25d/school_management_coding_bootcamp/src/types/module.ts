export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progressPercent: number;
  lessonCount: number;
  status: 'locked' | 'in-progress' | 'complete';
  lessons?: Lesson[];
}
