import { Project, Task } from '../../types/project.types';
import { mockTeamMembers } from './team.mock';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Design System V2 Spec',
    description: 'Constructing core UI kits, typography variables, and atomic layout assets for cross-platform components.',
    status: 'active',
    coverColor: 'from-purple-500 to-indigo-500',
    deadline: '2026-07-15',
    progress: 68,
    members: [mockTeamMembers[0], mockTeamMembers[1], mockTeamMembers[7]],
    tags: ['UI/UX', 'Figma', 'System'],
    createdAt: '2026-06-01',
    updatedAt: '2026-06-25'
  },
  {
    id: 'proj-2',
    title: 'Abstract Clay Shapes',
    description: 'High-fidelity procedural materials and abstract shape configurations constructed via clay-based shaders for marketing sites.',
    status: 'active',
    coverColor: 'from-fuchsia-500 to-pink-500',
    deadline: '2026-07-28',
    progress: 45,
    members: [mockTeamMembers[1], mockTeamMembers[4]],
    tags: ['3D Render', 'Blender', 'Creative'],
    createdAt: '2026-06-10',
    updatedAt: '2026-06-24'
  },
  {
    id: 'proj-3',
    title: 'Visual Identity Guideline',
    description: 'Core logotype typography guidelines, brand color theories, and graphic system blueprints for product rebranding.',
    status: 'completed',
    coverColor: 'from-amber-500 to-orange-500',
    deadline: '2026-06-20',
    progress: 100,
    members: [mockTeamMembers[0], mockTeamMembers[3]],
    tags: ['Branding', 'Vector', 'Identity'],
    createdAt: '2026-05-15',
    updatedAt: '2026-06-20'
  },
  {
    id: 'proj-4',
    title: 'Kinetic Typography Frames',
    description: 'Keyframes and tracking structures mapped for the promotional spring launch campaign.',
    status: 'active',
    coverColor: 'from-emerald-500 to-teal-500',
    deadline: '2026-08-05',
    progress: 30,
    members: [mockTeamMembers[0], mockTeamMembers[1], mockTeamMembers[4]],
    tags: ['Motion', 'AfterEffects', 'Video'],
    createdAt: '2026-06-18',
    updatedAt: '2026-06-25'
  },
  {
    id: 'proj-5',
    title: 'Spring Campaign Launch',
    description: 'Developing copywriting drafts, promotional layouts, social grids, and ad designs for the spring rollouts.',
    status: 'active',
    coverColor: 'from-sky-500 to-blue-500',
    deadline: '2026-07-10',
    progress: 85,
    members: [mockTeamMembers[2], mockTeamMembers[5], mockTeamMembers[6]],
    tags: ['Marketing', 'Copywriting', 'Campaign'],
    createdAt: '2026-05-20',
    updatedAt: '2026-06-25'
  },
  {
    id: 'proj-6',
    title: 'Web Redesign 2026',
    description: 'Replacing our legacy brochure website with an interactive marketing portfolio and Next.js CMS.',
    status: 'active',
    coverColor: 'from-rose-500 to-red-500',
    deadline: '2026-08-30',
    progress: 15,
    members: [mockTeamMembers[2], mockTeamMembers[7], mockTeamMembers[8]],
    tags: ['Nextjs', 'Tailwind', 'Dev'],
    createdAt: '2026-06-20',
    updatedAt: '2026-06-25'
  },
  {
    id: 'proj-7',
    title: 'Icon Set Expansion',
    description: 'Designing 150+ custom SVG iconography components optimized for interface design systems.',
    status: 'completed',
    coverColor: 'from-cyan-500 to-teal-500',
    deadline: '2026-06-15',
    progress: 100,
    members: [mockTeamMembers[3], mockTeamMembers[6]],
    tags: ['Design', 'Vector', 'Icons'],
    createdAt: '2026-05-01',
    updatedAt: '2026-06-15'
  },
  {
    id: 'proj-8',
    title: 'Mobile App UI Kit',
    description: 'Creating dark-themed React Native component mocks for iOS and Android application templates.',
    status: 'draft',
    coverColor: 'from-violet-500 to-purple-500',
    deadline: '2026-09-15',
    progress: 0,
    members: [mockTeamMembers[0], mockTeamMembers[7]],
    tags: ['UI/UX', 'Mobile', 'App'],
    createdAt: '2026-06-24',
    updatedAt: '2026-06-24'
  },
  {
    id: 'proj-9',
    title: 'Product Photoshoot Specs',
    description: 'Curating lighting instructions, background profiles, and post-production parameters for new 2026 products.',
    status: 'archived',
    coverColor: 'from-yellow-500 to-amber-500',
    deadline: '2026-05-10',
    progress: 100,
    members: [mockTeamMembers[1], mockTeamMembers[3]],
    tags: ['Photography', 'Assets', 'Branding'],
    createdAt: '2026-04-01',
    updatedAt: '2026-05-10'
  }
];

export const mockTasks: Record<string, Task[]> = {
  'proj-1': [
    {
      id: 'task-1-1',
      title: 'Audit existing typography variables',
      description: 'Check line heights and letter spacing specs for mobile viewport grids.',
      status: 'done',
      assignee: mockTeamMembers[0],
      priority: 'high',
      dueDate: '2026-06-15',
      labels: ['Typography', 'Audit']
    },
    {
      id: 'task-1-2',
      title: 'Design atomic button components',
      description: 'Create default, hover, focus, disabled and loading states for variants (solid, outline, ghost).',
      status: 'in_progress',
      assignee: mockTeamMembers[7],
      priority: 'medium',
      dueDate: '2026-06-30',
      labels: ['UI Kit', 'Figma']
    },
    {
      id: 'task-1-3',
      title: 'Review layout system with developer team',
      description: 'Check flexbox vs grid implementations for compound layouts.',
      status: 'review',
      assignee: mockTeamMembers[0],
      priority: 'high',
      dueDate: '2026-06-28',
      labels: ['Layout', 'Sync']
    },
    {
      id: 'task-1-4',
      title: 'Draft dark-mode surface palette rules',
      description: 'Set rules for card, hover card, elevated panels, and border colors.',
      status: 'backlog',
      assignee: mockTeamMembers[1],
      priority: 'low',
      dueDate: '2026-07-05',
      labels: ['Colors', 'Theme']
    }
  ],
  'proj-2': [
    {
      id: 'task-2-1',
      title: 'Setup procedural clay shaders',
      description: 'Create node networks in Blender to model soft matte reflections.',
      status: 'done',
      assignee: mockTeamMembers[1],
      priority: 'high',
      dueDate: '2026-06-20',
      labels: ['Shaders', 'Blender']
    },
    {
      id: 'task-2-2',
      title: 'Draft 5 abstract mesh configurations',
      description: 'Model spheres, toruses, and waves with soft organic distortions.',
      status: 'in_progress',
      assignee: mockTeamMembers[4],
      priority: 'high',
      dueDate: '2026-07-10',
      labels: ['Modeling', 'Mesh']
    },
    {
      id: 'task-2-3',
      title: 'Render test frames for light balance',
      description: 'Test high-key vs dark ambient setups under cycles path tracer.',
      status: 'backlog',
      assignee: mockTeamMembers[1],
      priority: 'medium',
      dueDate: '2026-07-20',
      labels: ['Rendering', 'Cycles']
    }
  ],
  'proj-3': [
    {
      id: 'task-3-1',
      title: 'Complete brand moodboard',
      status: 'done',
      assignee: mockTeamMembers[0],
      priority: 'medium',
      labels: ['Moodboard', 'Ideation']
    },
    {
      id: 'task-3-2',
      title: 'Finalize core typography and wordmark',
      status: 'done',
      assignee: mockTeamMembers[3],
      priority: 'high',
      labels: ['Typography', 'Logo']
    }
  ],
  'proj-4': [
    {
      id: 'task-4-1',
      title: 'Map text spring animation curves',
      description: 'Write custom bezier variables for spring-back bounce effects.',
      status: 'in_progress',
      assignee: mockTeamMembers[4],
      priority: 'medium',
      dueDate: '2026-07-05',
      labels: ['AfterEffects', 'Motion']
    },
    {
      id: 'task-4-2',
      title: 'Script keyframe offset parameters',
      description: 'Create staggered text character enter timelines.',
      status: 'backlog',
      assignee: mockTeamMembers[0],
      priority: 'high',
      dueDate: '2026-07-15',
      labels: ['Expressions', 'AE']
    }
  ],
  'proj-5': [
    {
      id: 'task-5-1',
      title: 'Write promo video script drafts',
      status: 'done',
      assignee: mockTeamMembers[6],
      priority: 'high',
      labels: ['Copywriting']
    },
    {
      id: 'task-5-2',
      title: 'Design static social media grids',
      status: 'in_progress',
      assignee: mockTeamMembers[2],
      priority: 'medium',
      labels: ['Figma', 'Grid']
    }
  ],
  'proj-6': [
    {
      id: 'task-6-1',
      title: 'Setup repository and project folders',
      status: 'done',
      assignee: mockTeamMembers[7],
      priority: 'high',
      labels: ['Setup']
    },
    {
      id: 'task-6-2',
      title: 'Convert UI mocks into layouts',
      status: 'in_progress',
      assignee: mockTeamMembers[7],
      priority: 'high',
      labels: ['Layouts']
    }
  ]
};
