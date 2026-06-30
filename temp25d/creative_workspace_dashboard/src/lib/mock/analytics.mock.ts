import { DailyMetric, AnalyticsSummary } from '../../types/analytics.types';

// Daily Active Users (DAU) past 30 days
export const mockDailyActiveUsers: DailyMetric[] = [
  { date: 'Jun 01', value: 45 },
  { date: 'Jun 02', value: 48 },
  { date: 'Jun 03', value: 55 },
  { date: 'Jun 04', value: 50 },
  { date: 'Jun 05', value: 42 },
  { date: 'Jun 06', value: 28 }, // weekend
  { date: 'Jun 07', value: 30 },
  { date: 'Jun 08', value: 60 },
  { date: 'Jun 09', value: 65 },
  { date: 'Jun 10', value: 68 },
  { date: 'Jun 11', value: 72 },
  { date: 'Jun 12', value: 70 },
  { date: 'Jun 13', value: 35 },
  { date: 'Jun 14', value: 38 },
  { date: 'Jun 15', value: 80 },
  { date: 'Jun 16', value: 85 },
  { date: 'Jun 17', value: 92 },
  { date: 'Jun 18', value: 88 },
  { date: 'Jun 19', value: 82 },
  { date: 'Jun 20', value: 40 },
  { date: 'Jun 21', value: 44 },
  { date: 'Jun 22', value: 110 },
  { date: 'Jun 23', value: 115 },
  { date: 'Jun 24', value: 120 },
  { date: 'Jun 25', value: 128 } // today
];

// Project Status Distribution
export const mockProjectStatusData = [
  { name: 'Active', value: 5, color: '#a855f7' },      // purple
  { name: 'Completed', value: 2, color: '#2dd4bf' },   // teal
  { name: 'Draft', value: 1, color: '#fbbf24' },       // amber
  { name: 'Archived', value: 1, color: '#fb7185' }      // rose
];

// Team Productivity output (designs/tasks completed, files created, comments made per week)
export const mockTeamProductivity = [
  { name: 'Sarah J.', Tasks: 28, Assets: 15, Syncs: 42 },
  { name: 'Devon K.', Tasks: 20, Assets: 25, Syncs: 18 },
  { name: 'Elena R.', Tasks: 35, Assets: 8, Syncs: 50 },
  { name: 'Marcus T.', Tasks: 18, Assets: 14, Syncs: 24 },
  { name: 'Chloe W.', Tasks: 24, Assets: 20, Syncs: 30 },
  { name: 'Zoe H.', Tasks: 22, Assets: 18, Syncs: 28 },
  { name: 'Alex M.', Tasks: 30, Assets: 12, Syncs: 35 }
];

// Storage breakdown (used in assets page and analytics)
export const mockStorageBreakdown = [
  { name: 'Videos', usedBytes: 562000000, totalBytes: 10000000000, color: '#2dd4bf' }, // 562 MB
  { name: 'Images', usedBytes: 2460000000, totalBytes: 10000000000, color: '#818cf8' }, // 2.46 GB
  { name: 'Documents', usedBytes: 24300000, totalBytes: 10000000000, color: '#fbbf24' }, // 24.3 MB
  { name: 'Exports & Archives', usedBytes: 4200000, totalBytes: 10000000000, color: '#fb7185' }, // 4.2 MB
  { name: 'Other Shaders/3D files', usedBytes: 84200000, totalBytes: 10000000000, color: '#a855f7' } // 84.2 MB
];

// Top Accessed Assets
export const mockTopAssets = [
  { id: 'asset-1', name: 'Design System V2 Spec.pdf', type: 'document', views: 342, lastAccessed: '10 mins ago' },
  { id: 'asset-2', name: 'Abstract Clay Shapes.blend', type: '3D Render', views: 285, lastAccessed: '1 hr ago' },
  { id: 'asset-4', name: 'Kinetic Typography Frames.mp4', type: 'video', views: 212, lastAccessed: '3 hrs ago' },
  { id: 'asset-3', name: 'Visual Identity Guideline.fig', type: 'image', views: 198, lastAccessed: 'Yesterday' },
  { id: 'asset-5', name: 'Brand Guidelines Deck.pdf', type: 'document', views: 154, lastAccessed: '2 days ago' },
  { id: 'asset-7', name: 'Vector SVG Icons Expansion.zip', type: 'export', views: 120, lastAccessed: '5 days ago' }
];

// Analytics summary values
export const mockAnalyticsSummary: AnalyticsSummary = {
  activeProjects: 5,
  assetsCreated: 148,
  storageUsedBytes: 3132700000, // ~3.13 GB
  teamLogins: 432,
  tasksCompleted: 98,
  periodChange: {
    activeProjects: 25, // +25%
    assetsCreated: 12.4, // +12.4%
    storageUsedBytes: 8.5, // +8.5%
    teamLogins: 18.2, // +18.2%
    tasksCompleted: 34.5 // +34.5%
  }
};
