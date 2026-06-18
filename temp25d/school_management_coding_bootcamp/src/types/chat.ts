export interface ChatMessage {
  id: string;
  author: string;
  role: 'student' | 'instructor';
  avatarUrl: string;
  text: string;
  timestamp: string;
}
