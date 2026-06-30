import { Notification } from '../../types/common.types';
import { mockNotifications } from '../mock/notifications.mock';
import { delay } from './client';

let localNotifications = [...mockNotifications];

export const notificationsApi = {
  getAll: async (): Promise<Notification[]> => {
    await delay(400);
    return [...localNotifications];
  },

  markAllRead: async (): Promise<void> => {
    await delay(300);
    localNotifications = localNotifications.map(n => ({ ...n, isRead: true }));
  },

  dismiss: async (id: string): Promise<void> => {
    await delay(300);
    localNotifications = localNotifications.filter(n => n.id !== id);
  },

  markRead: async (id: string): Promise<void> => {
    await delay(200);
    localNotifications = localNotifications.map(n => n.id === id ? { ...n, isRead: true } : n);
  }
};
