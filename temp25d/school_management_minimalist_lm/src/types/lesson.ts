export type ContentBlock =
  | { type: 'lead'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; author: string }
  | { type: 'quiz'; quiz: QuizQuestion };

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: { id: string; label: string; correct: boolean }[];
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface Lesson {
  slug: string;
  moduleLabel: string;
  topicLabel: string;
  title: string;
  tutorName: string;
  tutorAvatarUrl: string;
  readMinutes: number;
  hasVideo: boolean;
  videoThumbnailUrl: string;
  prevLessonSlug?: string;
  nextLessonSlug?: string;
  body: ContentBlock[];
}

export interface Module {
  id: string;
  title: string;
  lessons: {
    slug: string;
    title: string;
    readMinutes: number;
  }[];
}
