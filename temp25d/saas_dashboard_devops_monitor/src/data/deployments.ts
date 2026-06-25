import { Deployment } from '../types';

export const mockDeployments: Deployment[] = [
  {
    id: 'dep-101',
    service: 'api-gateway',
    version: 'v2.14.1',
    environment: 'production',
    status: 'success',
    triggeredBy: 'alex.chen',
    branch: 'main',
    commit: '8b7fa43',
    startedAt: '10m ago',
    duration: '4m 12s',
    stages: [
      { name: 'Build', status: 'success', duration: '1m 20s' },
      { name: 'Test', status: 'success', duration: '1m 45s' },
      { name: 'Deploy', status: 'success', duration: '45s' },
      { name: 'Verify', status: 'success', duration: '22s' }
    ]
  },
  {
    id: 'dep-102',
    service: 'frontend-web',
    version: 'v1.89.0',
    environment: 'production',
    status: 'failed',
    triggeredBy: 'sarah.k',
    branch: 'release/2.14',
    commit: 'a4d5e6f',
    startedAt: '45m ago',
    duration: '2m 15s',
    stages: [
      { name: 'Build', status: 'success', duration: '1m 15s' },
      { name: 'Test', status: 'failed', duration: '1m 00s' },
      { name: 'Deploy', status: 'pending', duration: '0s' },
      { name: 'Verify', status: 'pending', duration: '0s' }
    ]
  },
  {
    id: 'dep-103',
    service: 'auth-service',
    version: 'v3.1.2',
    environment: 'staging',
    status: 'running',
    triggeredBy: 'devops-bot',
    branch: 'feature/oauth-refresh',
    commit: 'f3a2b1c',
    startedAt: '1m ago',
    duration: '1m 45s',
    stages: [
      { name: 'Build', status: 'success', duration: '1m 30s' },
      { name: 'Test', status: 'running', duration: '15s' },
      { name: 'Deploy', status: 'pending', duration: '0s' },
      { name: 'Verify', status: 'pending', duration: '0s' }
    ]
  },
  {
    id: 'dep-104',
    service: 'worker-queue',
    version: 'v0.9.4',
    environment: 'development',
    status: 'pending',
    triggeredBy: 'john.smith',
    branch: 'feature/batch-process',
    commit: 'b9c8d7e',
    startedAt: 'Just now',
    duration: '0s',
    stages: [
      { name: 'Build', status: 'pending', duration: '0s' },
      { name: 'Test', status: 'pending', duration: '0s' },
      { name: 'Deploy', status: 'pending', duration: '0s' },
      { name: 'Verify', status: 'pending', duration: '0s' }
    ]
  },
  {
    id: 'dep-105',
    service: 'db-migrations',
    version: 'v1.44.0',
    environment: 'production',
    status: 'success',
    triggeredBy: 'alex.chen',
    branch: 'main',
    commit: '7e8d9c0',
    startedAt: '2h ago',
    duration: '3m 50s',
    stages: [
      { name: 'Build', status: 'success', duration: '50s' },
      { name: 'Test', status: 'success', duration: '1m 30s' },
      { name: 'Deploy', status: 'success', duration: '1m 10s' },
      { name: 'Verify', status: 'success', duration: '20s' }
    ]
  },
  {
    id: 'dep-106',
    service: 'frontend-web',
    version: 'v1.88.4',
    environment: 'staging',
    status: 'success',
    triggeredBy: 'sarah.k',
    branch: 'main',
    commit: '3d4e5f6',
    startedAt: '4h ago',
    duration: '4m 05s',
    stages: [
      { name: 'Build', status: 'success', duration: '1m 18s' },
      { name: 'Test', status: 'success', duration: '1m 52s' },
      { name: 'Deploy', status: 'success', duration: '35s' },
      { name: 'Verify', status: 'success', duration: '20s' }
    ]
  },
  {
    id: 'dep-107',
    service: 'api-gateway',
    version: 'v2.14.0',
    environment: 'staging',
    status: 'success',
    triggeredBy: 'alex.chen',
    branch: 'release/2.14',
    commit: '1a2b3c4',
    startedAt: '6h ago',
    duration: '4m 20s',
    stages: [
      { name: 'Build', status: 'success', duration: '1m 25s' },
      { name: 'Test', status: 'success', duration: '1m 50s' },
      { name: 'Deploy', status: 'success', duration: '40s' },
      { name: 'Verify', status: 'success', duration: '25s' }
    ]
  },
  {
    id: 'dep-108',
    service: 'worker-queue',
    version: 'v0.9.3',
    environment: 'development',
    status: 'success',
    triggeredBy: 'john.smith',
    branch: 'feature/redis-retry',
    commit: 'e5d6c7b',
    startedAt: '1d ago',
    duration: '2m 55s',
    stages: [
      { name: 'Build', status: 'success', duration: '45s' },
      { name: 'Test', status: 'success', duration: '1m 10s' },
      { name: 'Deploy', status: 'success', duration: '40s' },
      { name: 'Verify', status: 'success', duration: '20s' }
    ]
  }
];
