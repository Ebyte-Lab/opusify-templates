import type { ChatMessage } from '../types/chat';

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    author: 'MikeCode',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100',
    text: 'Is anyone else getting a CORS error when hitting the local API from React?',
    timestamp: '10:24 AM'
  },
  {
    id: 'msg2',
    author: 'Inst. Davis',
    role: 'instructor',
    avatarUrl: 'https://picsum.photos/seed/instructor1/100/100',
    text: 'Make sure you added the cors middleware in your Express setup file. Check module 3.2 for the code snippet!',
    timestamp: '10:28 AM'
  },
  {
    id: 'msg3',
    author: 'DevNinja',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/user3/100/100',
    text: 'Thanks! That fixed it. 🙏',
    timestamp: '11:05 AM'
  },
  {
    id: 'msg4',
    author: 'SarahJ',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    text: 'I am having trouble with JWT verify. Is anybody online to pair program?',
    timestamp: '11:15 AM'
  },
  {
    id: 'msg5',
    author: 'DevNinja',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/user3/100/100',
    text: '@SarahJ I can jump on a Discord voice channel in 5 minutes if you want!',
    timestamp: '11:20 AM'
  },
  {
    id: 'msg6',
    author: 'SarahJ',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    text: 'Awesome! Heading to voice-channel-1 now. Appreciate it!',
    timestamp: '11:22 AM'
  }
];
