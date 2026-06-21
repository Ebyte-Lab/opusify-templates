export interface Course {
  id: string;
  title: string;
  instructor: string;
  schedule: string;
  percentComplete: number;
  status: 'enrolled' | 'available' | 'completed';
}
