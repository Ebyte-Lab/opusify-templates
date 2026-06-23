import type { Campaign } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Q2 Re-engagement Blast',
    status: 'Sent',
    recipients: 5400,
    openRate: 42.6,
    clickRate: 14.8,
    sentDate: 'Jun 12, 2026'
  },
  {
    id: 'camp-2',
    name: 'New Feature Announcement',
    status: 'Sent',
    recipients: 7080,
    openRate: 34.2,
    clickRate: 9.4,
    sentDate: 'May 28, 2026'
  },
  {
    id: 'camp-3',
    name: 'Enterprise Referral Program',
    status: 'Scheduled',
    recipients: 1200,
    openRate: 0,
    clickRate: 0,
    sentDate: 'Jul 01, 2026'
  },
  {
    id: 'camp-4',
    name: 'API Upgrade Outreach',
    status: 'Sent',
    recipients: 420,
    openRate: 68.4,
    clickRate: 31.2,
    sentDate: 'Jun 20, 2026'
  },
  {
    id: 'camp-5',
    name: 'Weekly Developer Newsletter',
    status: 'Draft',
    recipients: 10500,
    openRate: 0,
    clickRate: 0,
    sentDate: 'Not Sent'
  },
  {
    id: 'camp-6',
    name: 'Product Survey Feedback Request',
    status: 'Scheduled',
    recipients: 1800,
    openRate: 0,
    clickRate: 0,
    sentDate: 'Jun 30, 2026'
  }
];
