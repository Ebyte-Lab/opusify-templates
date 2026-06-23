import type { Deal } from '../types';

export const initialDeals: Deal[] = [
  {
    id: 'deal-1',
    title: 'SaaS Licensing Agreement',
    company: 'Acme Corp',
    value: 12400,
    stage: 'contacted',
    avatars: [
      'https://picsum.photos/seed/alex/50/50',
      'https://picsum.photos/seed/bob/50/50'
    ],
    updatedAt: '3d ago',
    badgeColor: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'deal-2',
    title: 'Platform Redesign Package',
    company: 'Globex Ltd',
    value: 35000,
    stage: 'contacted',
    avatars: [
      'https://picsum.photos/seed/charlie/50/50'
    ],
    updatedAt: '1d ago',
    badgeColor: 'bg-pink-50 text-pink-600'
  },
  {
    id: 'deal-3',
    title: 'Cloud Infrastructure Audit',
    company: 'Initech Corp',
    value: 8500,
    stage: 'proposal',
    avatars: [
      'https://picsum.photos/seed/dave/50/50',
      'https://picsum.photos/seed/eve/50/50'
    ],
    updatedAt: '2h ago',
    badgeColor: 'bg-amber-50 text-amber-600'
  },
  {
    id: 'deal-4',
    title: 'Brokerage Integration Gateway',
    company: 'Tyrell Corp',
    value: 54000,
    stage: 'negotiation',
    avatars: [
      'https://picsum.photos/seed/fred/50/50'
    ],
    updatedAt: '5h ago',
    badgeColor: 'bg-purple-50 text-purple-600'
  },
  {
    id: 'deal-5',
    title: 'Municipal Data Portal',
    company: 'City Govt',
    value: 112000,
    stage: 'won',
    avatars: [
      'https://picsum.photos/seed/george/50/50',
      'https://picsum.photos/seed/hannah/50/50'
    ],
    updatedAt: 'Just now',
    badgeColor: 'bg-green-50 text-green-600'
  }
];
