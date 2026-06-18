import type { DiscussionThread } from '../types/discussion';

export const mockDiscussions: DiscussionThread[] = [
  {
    id: 'cors-express-react',
    title: 'CORS issues with React frontend + Express API local setups',
    author: 'MikeCode',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100',
    tag: 'Node & Express',
    replyCount: 2,
    lastActivity: '2 hours ago',
    instructorAnswered: true,
    replies: [
      {
        id: 'r1_1',
        threadId: 'cors-express-react',
        author: 'MikeCode',
        role: 'student',
        avatarUrl: 'https://picsum.photos/seed/user2/100/100',
        text: 'Hey everyone, I am getting a CORS blocker error when hitting my Express backend (running on localhost:5000) from my React frontend app (running on localhost:5173). What is the recommended way to solve this in our cohort?',
        timestamp: '2026-06-18T10:24:00Z'
      },
      {
        id: 'r1_2',
        threadId: 'cors-express-react',
        author: 'Inst. Davis',
        role: 'instructor',
        avatarUrl: 'https://picsum.photos/seed/instructor1/100/100',
        text: 'Make sure you added the npm cors middleware in your Express setup file. Add `app.use(cors())` before declaring your routes. If you need details, check module 3.2 for a complete code snippet!',
        timestamp: '2026-06-18T10:28:00Z'
      },
      {
        id: 'r1_3',
        threadId: 'cors-express-react',
        author: 'DevNinja',
        role: 'student',
        avatarUrl: 'https://picsum.photos/seed/user3/100/100',
        text: 'Thanks Davis! That fixed it for me as well. I was struggling with this last night.',
        timestamp: '2026-06-18T11:05:00Z'
      }
    ]
  },
  {
    id: 'jwt-storage-react',
    title: 'Best practice for secure JWT storage in Single Page Applications (SPA)',
    author: 'SarahJ',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    tag: 'Security',
    replyCount: 2,
    lastActivity: '3 hours ago',
    instructorAnswered: true,
    replies: [
      {
        id: 'r2_1',
        threadId: 'jwt-storage-react',
        author: 'SarahJ',
        role: 'student',
        avatarUrl: 'https://picsum.photos/seed/user1/100/100',
        text: 'I have read conflicting articles online. Some say localstorage is fine for JWTs, others say it is vulnerable to XSS and we must use httpOnly cookies. What should we be using for the capstone database projects?',
        timestamp: '2026-06-18T09:12:00Z'
      },
      {
        id: 'r2_2',
        threadId: 'jwt-storage-react',
        author: 'Inst. Davis',
        role: 'instructor',
        avatarUrl: 'https://picsum.photos/seed/instructor1/100/100',
        text: 'For production-grade systems, httpOnly cookies are indeed the standard because JavaScript cannot read them, preventing XSS-based token theft. For the scope of our Bootcamp assignments, storing the token in local memory (React state) and using a refresh token in a secure cookie is ideal, but localStorage is acceptable for basic mock setups as long as you document the security trade-offs.',
        timestamp: '2026-06-18T09:45:00Z'
      },
      {
        id: 'r2_3',
        threadId: 'jwt-storage-react',
        author: 'MikeCode',
        role: 'student',
        avatarUrl: 'https://picsum.photos/seed/user2/100/100',
        text: 'Thanks for clarifying! I will try to implement the memory + cookie state for extra credit.',
        timestamp: '2026-06-18T10:00:00Z'
      }
    ]
  },
  {
    id: 'custom-hook-deps',
    title: 'How to structure custom React hook dependencies correctly?',
    author: 'Alex.dev',
    avatarUrl: 'https://picsum.photos/seed/dev1/100/100',
    tag: 'React Hooks',
    replyCount: 1,
    lastActivity: '1 day ago',
    instructorAnswered: false,
    replies: [
      {
        id: 'r3_1',
        threadId: 'custom-hook-deps',
        author: 'Alex.dev',
        role: 'student',
        avatarUrl: 'https://picsum.photos/seed/dev1/100/100',
        text: 'I am building the custom useLocalStorage hook for the next assignment. When writing the useEffect that updates values, should key/value be in the dependency array? I am getting an infinite rendering cycle when I pass key.',
        timestamp: '2026-06-17T14:30:00Z'
      },
      {
        id: 'r3_2',
        threadId: 'custom-hook-deps',
        author: 'SarahJ',
        role: 'student',
        avatarUrl: 'https://picsum.photos/seed/user1/100/100',
        text: 'Make sure you are not updating the state *within* the effect that triggers on the state change itself. Also, key should only change if the target localStorage key changes, which usually is static.',
        timestamp: '2026-06-17T16:15:00Z'
      }
    ]
  }
];
