import type { Module } from '../types/module';

export const mockModules: Module[] = [
  {
    id: 'm1',
    title: 'Fundamentals of Web Development',
    description: 'Learn the core building blocks of the web: HTML5, CSS3, Modern JavaScript (ES6+), and Git/GitHub version control basics.',
    progressPercent: 100,
    lessonCount: 8,
    status: 'complete',
    lessons: [
      { id: 'l1_1', moduleId: 'm1', title: 'HTML5 Semantic Layouts', durationMinutes: 45, completed: true },
      { id: 'l1_2', moduleId: 'm1', title: 'CSS Grid & Flexbox Systems', durationMinutes: 60, completed: true },
      { id: 'l1_3', moduleId: 'm1', title: 'JavaScript Engine & Call Stack', durationMinutes: 90, completed: true },
      { id: 'l1_4', moduleId: 'm1', title: 'ES6+ Variables & Destructuring', durationMinutes: 45, completed: true },
      { id: 'l1_5', moduleId: 'm1', title: 'Asynchronous Programming (Promises/Async-Await)', durationMinutes: 120, completed: true },
      { id: 'l1_6', moduleId: 'm1', title: 'DOM Manipulation & Event Listeners', durationMinutes: 75, completed: true },
      { id: 'l1_7', moduleId: 'm1', title: 'Git Branching & Pull Requests', durationMinutes: 60, completed: true },
      { id: 'l1_8', moduleId: 'm1', title: 'Deployment to Vercel/Netlify', durationMinutes: 30, completed: true }
    ]
  },
  {
    id: 'm2',
    title: 'APIs & Databases with Node.js',
    description: 'Build robust REST APIs using Express.js and learn database design, indexing, and modeling with PostgreSQL and MongoDB.',
    progressPercent: 100,
    lessonCount: 6,
    status: 'complete',
    lessons: [
      { id: 'l2_1', moduleId: 'm2', title: 'Express Routing & Middleware', durationMinutes: 60, completed: true },
      { id: 'l2_2', moduleId: 'm2', title: 'Relational Database Schema Design', durationMinutes: 90, completed: true },
      { id: 'l2_3', moduleId: 'm2', title: 'SQL Joins & CRUD Queries', durationMinutes: 120, completed: true },
      { id: 'l2_4', moduleId: 'm2', title: 'Object-Relational Mapping (ORM) with Prisma', durationMinutes: 90, completed: true },
      { id: 'l2_5', moduleId: 'm2', title: 'NoSQL & Document Modeling with Mongoose', durationMinutes: 75, completed: true },
      { id: 'l2_6', moduleId: 'm2', title: 'RESTful API Standards & Error Handling', durationMinutes: 60, completed: true }
    ]
  },
  {
    id: 'm3',
    title: 'Advanced React Frameworks',
    description: 'Master component optimization, local and global state management (Context, Redux), custom hooks, routing, and Next.js SSR.',
    progressPercent: 65,
    lessonCount: 6,
    status: 'in-progress',
    lessons: [
      { id: 'l3_1', moduleId: 'm3', title: 'Component Lifecycles & useEffect', durationMinutes: 60, completed: true },
      { id: 'l3_2', moduleId: 'm3', title: 'Context API & Custom Hooks', durationMinutes: 90, completed: true },
      { id: 'l3_3', moduleId: 'm3', title: 'React Router Setup & Dynamic Routes', durationMinutes: 75, completed: true },
      { id: 'l3_4', moduleId: 'm3', title: 'State Management with Redux Toolkit', durationMinutes: 120, completed: false },
      { id: 'l3_5', moduleId: 'm3', title: 'React Performance: useMemo & useCallback', durationMinutes: 90, completed: false },
      { id: 'l3_6', moduleId: 'm3', title: 'Introduction to Next.js App Router', durationMinutes: 105, completed: false }
    ]
  },
  {
    id: 'm4',
    title: 'Capstone: Enterprise Applications',
    description: 'Synthesize everything you have learned to build, test, and deploy a full-stack production-grade application featuring real-time features and secure payment gateways.',
    progressPercent: 0,
    lessonCount: 5,
    status: 'locked',
    lessons: [
      { id: 'l4_1', moduleId: 'm4', title: 'Microservices & System Architecture', durationMinutes: 90, completed: false },
      { id: 'l4_2', moduleId: 'm4', title: 'Stripe API Payment Gateway Integration', durationMinutes: 120, completed: false },
      { id: 'l4_3', moduleId: 'm4', title: 'WebSockets & Socket.io for Real-time Feeds', durationMinutes: 90, completed: false },
      { id: 'l4_4', moduleId: 'm4', title: 'CI/CD Pipelines with GitHub Actions', durationMinutes: 75, completed: false },
      { id: 'l4_5', moduleId: 'm4', title: 'Final Project Defense & Showcase', durationMinutes: 180, completed: false }
    ]
  }
];
