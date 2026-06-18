export interface CodeExample {
  filename: string;
  language: string;
  code: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  dueDate: string;
  status: 'due' | 'submitted' | 'graded' | 'overdue';
  codeExample?: CodeExample;
}
