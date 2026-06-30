import { Conversation, Message } from '../../types/common.types';
import { mockTeamMembers } from './team.mock';

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    name: 'general-sync',
    type: 'channel',
    unreads: 3,
    lastMessage: {
      text: 'Marcus: Just uploaded the latest marketing logo files to the asset library.',
      timestamp: '2:15 PM'
    }
  },
  {
    id: 'conv-2',
    name: 'ui-ux-design',
    type: 'channel',
    unreads: 0,
    lastMessage: {
      text: 'Sarah: Spacing audits for buttons look clean, merging V2 changes.',
      timestamp: '1:30 PM'
    }
  },
  {
    id: 'conv-3',
    name: 'motion-rendering',
    type: 'channel',
    unreads: 0,
    lastMessage: {
      text: 'Devon: Cycles render nodes are completed. Ready to review.',
      timestamp: '11:45 AM'
    }
  },
  {
    id: 'conv-4',
    name: 'Devon King',
    type: 'dm',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isOnline: true,
    unreads: 0,
    lastMessage: {
      text: 'Hey Sarah, are we still sync\'ing on the clay meshes today?',
      timestamp: '12:10 PM'
    }
  },
  {
    id: 'conv-5',
    name: 'Chloe Wong',
    type: 'dm',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    isOnline: true,
    unreads: 1,
    lastMessage: {
      text: 'Sent the typography easing references. Let me know what you think!',
      timestamp: 'Yesterday'
    }
  },
  {
    id: 'conv-6',
    name: 'Elena Rostova',
    type: 'dm',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    isOnline: false,
    unreads: 0,
    lastMessage: {
      text: 'Billing is upgraded to the Pro team seat layout. Checked invoices.',
      timestamp: '3 days ago'
    }
  }
];

export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1-1',
      sender: mockTeamMembers[2], // Elena
      text: 'Hey team! Welcome to the new sprint planning channel. Let\'s sync here.',
      timestamp: '2026-06-25T10:00:00Z',
      reactions: [{ emoji: '👋', count: 4, users: ['user-1', 'user-2', 'user-4', 'user-5'] }]
    },
    {
      id: 'msg-1-2',
      sender: mockTeamMembers[0], // Sarah
      text: 'Great, I will update the Design System specs PDF this afternoon.',
      timestamp: '2026-06-25T10:15:00Z',
      reactions: [{ emoji: '👍', count: 2, users: ['user-3', 'user-5'] }]
    },
    {
      id: 'msg-1-3',
      sender: mockTeamMembers[4], // Chloe
      text: 'Perfect. I will align the kinetic keyframe offsets once Sarah finishes.',
      timestamp: '2026-06-25T11:30:00Z',
      reactions: [{ emoji: '🔥', count: 3, users: ['user-1', 'user-2', 'user-8'] }]
    },
    {
      id: 'msg-1-4',
      sender: mockTeamMembers[3], // Marcus
      text: 'Just uploaded the latest marketing logo files to the asset library.',
      timestamp: '2026-06-25T14:15:00Z',
      reactions: [{ emoji: '🚀', count: 3, users: ['user-1', 'user-2', 'user-3'] }],
      attachments: [
        {
          name: 'Visual Identity Guideline.fig',
          url: '#',
          sizeBytes: 24600000,
          type: 'image'
        }
      ]
    }
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      sender: mockTeamMembers[7], // Alex
      text: 'Hey Sarah, are the primary button padding specs ready?',
      timestamp: '2026-06-25T12:00:00Z',
      reactions: []
    },
    {
      id: 'msg-2-2',
      sender: mockTeamMembers[0], // Sarah
      text: 'Yes! Check out page 4 of the spec sheet. I did px-4 py-2.5 for medium default.',
      timestamp: '2026-06-25T12:05:00Z',
      reactions: [{ emoji: '🙌', count: 1, users: ['user-8'] }]
    },
    {
      id: 'msg-2-3',
      sender: mockTeamMembers[7], // Alex
      text: 'Got it. Coding the React UI variants button component now.',
      timestamp: '2026-06-25T12:12:00Z',
      reactions: [{ emoji: '💻', count: 1, users: ['user-1'] }]
    },
    {
      id: 'msg-2-4',
      sender: mockTeamMembers[0], // Sarah
      text: 'Spacing audits for buttons look clean, merging V2 changes.',
      timestamp: '2026-06-25T13:30:00Z',
      reactions: [{ emoji: '🎉', count: 2, users: ['user-8', 'user-3'] }]
    }
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      sender: mockTeamMembers[1], // Devon
      text: 'Setting up the Cycles parameters. Running nodes on 4K renders.',
      timestamp: '2026-06-25T11:00:00Z',
      reactions: []
    },
    {
      id: 'msg-3-2',
      sender: mockTeamMembers[4], // Chloe
      text: 'Let me know when the models are ready, I need to check meshes in AE.',
      timestamp: '2026-06-25T11:15:00Z',
      reactions: []
    },
    {
      id: 'msg-3-3',
      sender: mockTeamMembers[1], // Devon
      text: 'Cycles render nodes are completed. Ready to review.',
      timestamp: '2026-06-25T11:45:00Z',
      reactions: [{ emoji: '🎉', count: 2, users: ['user-5', 'user-1'] }]
    }
  ],
  'conv-4': [
    {
      id: 'msg-4-1',
      sender: mockTeamMembers[1], // Devon
      text: 'Hey Sarah, are we still sync\'ing on the clay meshes today?',
      timestamp: '2026-06-25T12:10:00Z',
      reactions: []
    }
  ],
  'conv-5': [
    {
      id: 'msg-5-1',
      sender: mockTeamMembers[4], // Chloe
      text: 'Sent the typography easing references. Let me know what you think!',
      timestamp: '2026-06-24T18:30:00Z',
      reactions: [{ emoji: '❤️', count: 1, users: ['user-1'] }]
    }
  ],
  'conv-6': [
    {
      id: 'msg-6-1',
      sender: mockTeamMembers[2], // Elena
      text: 'Billing is upgraded to the Pro team seat layout. Checked invoices.',
      timestamp: '2026-06-22T10:00:00Z',
      reactions: []
    }
  ]
};
