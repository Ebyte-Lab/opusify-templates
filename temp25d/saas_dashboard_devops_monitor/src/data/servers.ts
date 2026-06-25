import { ServerNode } from '../types';

export const mockServers: ServerNode[] = [
  {
    id: 'srv-01',
    hostname: 'prod-api-01',
    zone: 'us-east-2a',
    status: 'online',
    cpu: 45,
    memory: 62,
    disk: 54,
    networkIn: 84.5,
    networkOut: 112.4,
    uptime: '45d 12h 14m',
    os: 'Ubuntu 22.04 LTS'
  },
  {
    id: 'srv-02',
    hostname: 'prod-db-primary',
    zone: 'us-east-2a',
    status: 'online',
    cpu: 72,
    memory: 88,
    disk: 78,
    networkIn: 142.1,
    networkOut: 245.8,
    uptime: '112d 8h 45m',
    os: 'Ubuntu 22.04 LTS'
  },
  {
    id: 'srv-03',
    hostname: 'prod-cache-01',
    zone: 'us-east-2b',
    status: 'online',
    cpu: 28,
    memory: 92, // Degraded CPU/memory triggers can happen above 90%
    disk: 34,
    networkIn: 310.2,
    networkOut: 295.4,
    uptime: '14d 6h 32m',
    os: 'Ubuntu 22.04 LTS'
  },
  {
    id: 'srv-04',
    hostname: 'prod-k8s-worker-1',
    zone: 'eu-west-1',
    status: 'degraded',
    cpu: 91,
    memory: 78,
    disk: 85,
    networkIn: 195.4,
    networkOut: 180.2,
    uptime: '8d 22h 10m',
    os: 'Ubuntu 22.04 LTS'
  },
  {
    id: 'srv-05',
    hostname: 'prod-k8s-worker-2',
    zone: 'eu-west-1',
    status: 'online',
    cpu: 58,
    memory: 67,
    disk: 44,
    networkIn: 120.5,
    networkOut: 115.1,
    uptime: '8d 22h 08m',
    os: 'Ubuntu 22.04 LTS'
  },
  {
    id: 'srv-06',
    hostname: 'staging-web-02',
    zone: 'us-east-2b',
    status: 'online',
    cpu: 18,
    memory: 42,
    disk: 29,
    networkIn: 12.4,
    networkOut: 15.6,
    uptime: '3d 4h 15m',
    os: 'Ubuntu 22.04 LTS'
  },
  {
    id: 'srv-07',
    hostname: 'staging-db-01',
    zone: 'us-east-2b',
    status: 'degraded',
    cpu: 82,
    memory: 94,
    disk: 89,
    networkIn: 45.8,
    networkOut: 32.1,
    uptime: '28d 14h 50m',
    os: 'Ubuntu 22.04 LTS'
  },
  {
    id: 'srv-08',
    hostname: 'legacy-reporting-srv',
    zone: 'ap-south-1',
    status: 'offline',
    cpu: 0,
    memory: 0,
    disk: 0,
    networkIn: 0,
    networkOut: 0,
    uptime: '0d 0h 0m',
    os: 'Debian 11'
  }
];
