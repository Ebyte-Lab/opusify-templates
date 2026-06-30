import { AnalyticsSummary, DailyMetric } from '../../types/analytics.types';
import {
  mockAnalyticsSummary,
  mockDailyActiveUsers,
  mockProjectStatusData,
  mockTeamProductivity,
  mockStorageBreakdown,
  mockTopAssets
} from '../mock/analytics.mock';
import { delay } from './client';

export const analyticsApi = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    await delay(600);
    return { ...mockAnalyticsSummary };
  },

  getDAU: async (): Promise<DailyMetric[]> => {
    await delay(500);
    return [...mockDailyActiveUsers];
  },

  getProjectStatus: async () => {
    await delay(400);
    return [...mockProjectStatusData];
  },

  getTeamProductivity: async () => {
    await delay(500);
    return [...mockTeamProductivity];
  },

  getStorageUsage: async () => {
    await delay(400);
    return [...mockStorageBreakdown];
  },

  getTopAssets: async () => {
    await delay(500);
    return [...mockTopAssets];
  }
};
