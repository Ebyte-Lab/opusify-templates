import { Asset } from '../../types/asset.types';
import { mockTeamMembers } from './team.mock';

export const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    name: 'Design System V2 Spec.pdf',
    type: 'document',
    mimeType: 'application/pdf',
    sizeBytes: 15400000, // 15.4 MB
    url: 'https://picsum.photos/seed/designapp/600/500', // using picsum image url for demo preview
    thumbnailUrl: 'https://images.unsplash.com/photo-1541462608141-2ff030a62502?w=300',
    folderId: 'doc-folder',
    uploadedBy: mockTeamMembers[0],
    uploadedAt: '2026-06-25T11:20:00Z',
    usedInProjects: ['proj-1']
  },
  {
    id: 'asset-2',
    name: 'Abstract Clay Shapes.blend',
    type: 'other',
    mimeType: 'application/x-blender',
    sizeBytes: 84200000, // 84.2 MB
    url: 'https://picsum.photos/seed/render3d/600/700',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300',
    folderId: 'render-folder',
    uploadedBy: mockTeamMembers[1],
    uploadedAt: '2026-06-24T14:35:00Z',
    usedInProjects: ['proj-2']
  },
  {
    id: 'asset-3',
    name: 'Visual Identity Guideline.fig',
    type: 'image',
    mimeType: 'image/vnd.figma',
    sizeBytes: 24600000, // 24.6 MB
    url: 'https://picsum.photos/seed/brandingopus/600/600',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300',
    folderId: 'brand-folder',
    uploadedBy: mockTeamMembers[3],
    uploadedAt: '2026-06-22T09:12:00Z',
    usedInProjects: ['proj-3']
  },
  {
    id: 'asset-4',
    name: 'Kinetic Typography Frames.mp4',
    type: 'video',
    mimeType: 'video/mp4',
    sizeBytes: 112000000, // 112 MB
    url: 'https://picsum.photos/seed/motionanim/600/650',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300',
    folderId: 'motion-folder',
    uploadedBy: mockTeamMembers[4],
    uploadedAt: '2026-06-20T17:45:00Z',
    usedInProjects: ['proj-4']
  },
  {
    id: 'asset-5',
    name: 'Brand Guidelines Deck.pdf',
    type: 'document',
    mimeType: 'application/pdf',
    sizeBytes: 8900000, // 8.9 MB
    url: 'https://picsum.photos/seed/brandingdeck/600/400',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=300',
    folderId: 'brand-folder',
    uploadedBy: mockTeamMembers[3],
    uploadedAt: '2026-06-18T10:15:00Z',
    usedInProjects: ['proj-3']
  },
  {
    id: 'asset-6',
    name: 'Spring Launch Video Raw.mov',
    type: 'video',
    mimeType: 'video/quicktime',
    sizeBytes: 450000000, // 450 MB
    url: 'https://picsum.photos/seed/rawvideo/600/350',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300',
    folderId: 'raw-assets',
    uploadedBy: mockTeamMembers[4],
    uploadedAt: '2026-06-12T16:00:00Z',
    usedInProjects: ['proj-4', 'proj-5']
  },
  {
    id: 'asset-7',
    name: 'Vector SVG Icons Expansion.zip',
    type: 'export',
    mimeType: 'application/zip',
    sizeBytes: 4200000, // 4.2 MB
    url: 'https://picsum.photos/seed/svgicons/600/380',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=300',
    folderId: 'export-folder',
    uploadedBy: mockTeamMembers[7],
    uploadedAt: '2026-06-14T11:30:00Z',
    usedInProjects: ['proj-7']
  },
  {
    id: 'asset-8',
    name: 'Copywriting Copy Deck.docx',
    type: 'document',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    sizeBytes: 1200000, // 1.2 MB
    url: 'https://picsum.photos/seed/copydeck/600/420',
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300',
    folderId: 'doc-folder',
    uploadedBy: mockTeamMembers[5],
    uploadedAt: '2026-06-25T08:10:00Z',
    usedInProjects: ['proj-5']
  }
];

export interface DiscussionComment {
  id: string;
  user: string;
  role: string;
  text: string;
  avatar: string;
  timestamp: string;
}

export const mockDiscussions: Record<string, DiscussionComment[]> = {
  'asset-1': [
    {
      id: 'comm-1-1',
      user: 'Sarah Jenkins',
      role: 'UI/UX Designer',
      text: "Are the font weight profiles matched with standard Tailwind classes? Let's check spacing configs.",
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      timestamp: '2h ago'
    },
    {
      id: 'comm-1-2',
      user: 'Devon King',
      role: '3D Artist',
      text: 'Verified! Merging standard spacing profiles to master package now.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      timestamp: '1h ago'
    }
  ],
  'asset-2': [
    {
      id: 'comm-2-1',
      user: 'Devon King',
      role: '3D Artist',
      text: "Shaders look smooth under current render parameters. Let's try high-key lighting setup.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      timestamp: '1d ago'
    }
  ],
  'asset-3': [],
  'asset-4': [
    {
      id: 'comm-4-1',
      user: 'Sarah Jenkins',
      role: 'UI/UX Designer',
      text: "Great speed profiles! Let's double check keyframe durations under custom easing curve configurations.",
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      timestamp: '5d ago'
    },
    {
      id: 'comm-4-2',
      user: 'Devon King',
      role: '3D Artist',
      text: 'Agreed. Tweaked bezier variables to ease-out profiles for fluid renders.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      timestamp: '4d ago'
    }
  ],
  'asset-5': [
    {
      id: 'comm-5-1',
      user: 'Marcus Thorne',
      role: 'Brand Designer',
      text: 'Added color palette variants for digital vs print. Please review page 12.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      timestamp: '7d ago'
    }
  ]
};
