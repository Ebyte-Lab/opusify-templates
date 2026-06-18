export interface GradeRecord {
  assignmentId: string;
  assignmentTitle: string;
  score: number;
  maxScore: number;
  feedback?: string;
}
