export interface ChatMessage {
  id: string;
  sender: 'parent' | 'teacher';
  text: string;
  timestamp: string; // Time format, e.g., "10:30 AM" or ISO
}

export interface MessageThread {
  id: string;
  teacherName: string;
  teacherRole: string;
  avatarUrl: string;
  lastMessagePreview: string;
  unreadCount: number;
  messages: ChatMessage[];
}
