export interface ThreadReply {
  id: string;
  threadId: string;
  author: string;
  avatarUrl?: string;
  role: 'student' | 'instructor';
  text: string;
  timestamp: string;
}

export interface DiscussionThread {
  id: string;
  title: string;
  author: string;
  avatarUrl?: string;
  tag: string;
  replyCount: number;
  lastActivity: string;
  instructorAnswered: boolean;
  replies?: ThreadReply[];
}
