import { MessageThread } from '../types/messages';

export const mockMessageThreads: MessageThread[] = [
  {
    id: 'thread-davis',
    teacherName: 'Mr. Tyler Davis',
    teacherRole: '2nd Grade Art Teacher',
    avatarUrl: 'https://picsum.photos/seed/teacher1/100/100',
    lastMessagePreview: "Hi Sarah! Just a reminder that Leo needs his smock for art class today. He's been doing fantastic this week!",
    unreadCount: 0,
    messages: [
      {
        id: 'd1',
        sender: 'teacher',
        text: "Hi Sarah! Just a reminder that Leo needs his smock for art class today. He's been doing fantastic this week!",
        timestamp: '08:15 AM',
      },
    ],
  },
  {
    id: 'thread-gable',
    teacherName: 'Mrs. Jennifer Gable',
    teacherRole: '2nd Grade Homeroom Teacher',
    avatarUrl: 'https://picsum.photos/seed/gable1/100/100',
    lastMessagePreview: "I wanted to check if Leo finished his math worksheet. We have a review session tomorrow.",
    unreadCount: 1,
    messages: [
      {
        id: 'g1',
        sender: 'parent',
        text: "Hi Mrs. Gable, I noticed Leo was struggling a bit with subtraction subtraction with regrouping. Does he need extra support?",
        timestamp: 'Yesterday, 04:30 PM',
      },
      {
        id: 'g2',
        sender: 'teacher',
        text: "I wanted to check if Leo finished his math worksheet. We have a review session tomorrow. I can sit down with him for 10 minutes during lunch to review regrouping if he'd like!",
        timestamp: 'Yesterday, 06:12 PM',
      },
    ],
  },
  {
    id: 'thread-rose',
    teacherName: 'Miss Lily Rose',
    teacherRole: 'Kindergarten Homeroom Teacher',
    avatarUrl: 'https://picsum.photos/seed/lily1/100/100',
    lastMessagePreview: "Mia had a wonderful time in sandbox play today!",
    unreadCount: 0,
    messages: [
      {
        id: 'r1',
        sender: 'teacher',
        text: "Hello Sarah, just sharing that Mia had a wonderful time in sandbox play today! She built a beautiful sand castle with her classmates.",
        timestamp: '2 days ago',
      },
      {
        id: 'r2',
        sender: 'parent',
        text: "That is lovely to hear, Miss Lily! She told me all about it. Thanks for the update!",
        timestamp: '2 days ago',
      },
    ],
  },
];
