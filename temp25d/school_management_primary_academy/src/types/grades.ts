export interface GradeRecord {
  subject: string;
  term: string;
  percentage: number;
  letterGrade: string;
  trend: 'up' | 'down' | 'stable';
  teacherComment: string;
}
