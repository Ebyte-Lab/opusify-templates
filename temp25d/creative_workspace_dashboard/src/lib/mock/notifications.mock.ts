import { Notification } from '../../types/common.types';

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'mention',
    icon: 'MessageSquare',
    description: 'mentioned you in the discussions for',
    boldActor: 'Devon King',
    boldObject: 'Abstract Clay Shapes.blend',
    timestamp: '5 mins ago',
    isRead: false
  },
  {
    id: 'notif-2',
    type: 'project',
    icon: 'CheckCircle',
    description: 'completed the project milestone',
    boldActor: 'Elena Rostova',
    boldObject: 'Visual Identity Guideline',
    timestamp: '2 hours ago',
    isRead: false
  },
  {
    id: 'notif-3',
    type: 'system',
    icon: 'AlertTriangle',
    description: 'Workspace storage is at 82% capacity. Upgrade plan to expand storage capacity.',
    boldActor: 'System Alert',
    timestamp: '4 hours ago',
    isRead: false
  },
  {
    id: 'notif-4',
    type: 'team',
    icon: 'UserPlus',
    description: 'joined the Creative Workspace team as an editor.',
    boldActor: 'Zoe Hastings',
    timestamp: '1 day ago',
    isRead: true
  },
  {
    id: 'notif-5',
    type: 'mention',
    icon: 'AtSign',
    description: 'mentioned you in a chat message in',
    boldActor: 'Chloe Wong',
    boldObject: '#general-sync',
    timestamp: '1 day ago',
    isRead: true
  },
  {
    id: 'notif-6',
    type: 'project',
    icon: 'FolderPlus',
    description: 'uploaded 3 new assets to the',
    boldActor: 'Marcus Thorne',
    boldObject: 'Design System V2 Spec',
    timestamp: '2 days ago',
    isRead: true
  },
  {
    id: 'notif-7',
    type: 'system',
    icon: 'CreditCard',
    description: 'Monthly invoice was generated successfully.',
    boldActor: 'Billing Service',
    timestamp: '3 days ago',
    isRead: true
  }
];
