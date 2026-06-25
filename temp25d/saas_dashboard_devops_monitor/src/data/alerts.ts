import { AlertIncident, AlertRule } from '../types';

export const alertPresets: Omit<AlertIncident, 'id' | 'timestamp' | 'dismissed'>[] = [
  {
    title: 'KUBE_SWARM_FAILURE',
    text: 'Kubernetes pod scale failure in zone us-east-2b cluster database cluster.',
    severity: 'CRITICAL',
    host: 'cluster-0x4f12'
  },
  {
    title: 'DB_CONNECTION_EXCEEDED',
    text: 'Maximum PostgreSQL client allocation capacity pool limit was surpassed on port 5432.',
    severity: 'HIGH',
    host: 'prod-db-primary'
  },
  {
    title: 'NEXUS_INGRESS_ERR',
    text: 'Load balancing proxy server TLS handshake dropped packets above nominal 1.4% margin limit.',
    severity: 'MEDIUM',
    host: 'prod-api-01'
  }
];

export const defaultAlertRules: AlertRule[] = [
  {
    id: 'rule-01',
    name: 'High CPU Utilization',
    condition: 'CPU Usage > 90% for 5 mins',
    severity: 'CRITICAL',
    enabled: true
  },
  {
    id: 'rule-02',
    name: 'Out of Memory Risk',
    condition: 'RAM Capacity > 92% for 10 mins',
    severity: 'HIGH',
    enabled: true
  },
  {
    id: 'rule-03',
    name: 'Disk Storage Threshold',
    condition: 'Disk space utilization > 85%',
    severity: 'MEDIUM',
    enabled: true
  },
  {
    id: 'rule-04',
    name: 'Network Packet Drops',
    condition: 'Packet drops > 1.5% for 1 min',
    severity: 'HIGH',
    enabled: true
  },
  {
    id: 'rule-05',
    name: 'SSL Expiry Alert',
    condition: 'Certificate expiry < 7 days',
    severity: 'LOW',
    enabled: false
  }
];

// Historical Resolved Alerts
export interface AlertHistoryItem {
  id: string;
  severity: AlertIncident['severity'];
  name: string;
  description: string;
  triggeredAt: string;
  duration: string;
  resolvedBy: string;
}

export const mockAlertHistory: AlertHistoryItem[] = [
  {
    id: 'hist-01',
    severity: 'CRITICAL',
    name: 'API_GATEWAY_TIMEOUT',
    description: 'API Gateway returned 504 Gateway Timeout error for all incoming requests.',
    triggeredAt: '2026-06-24 14:22:10',
    duration: '4m 12s',
    resolvedBy: 'Auto-recovery (scale-up)'
  },
  {
    id: 'hist-02',
    severity: 'HIGH',
    name: 'REDIS_CONN_FAIL',
    description: 'Could not connect to Redis primary server at prod-cache-01:6379.',
    triggeredAt: '2026-06-24 08:15:30',
    duration: '12m 45s',
    resolvedBy: 'sarah.k (Manual Restart)'
  },
  {
    id: 'hist-03',
    severity: 'MEDIUM',
    name: 'DISK_USAGE_WARN',
    description: 'Root disk usage on staging-web-02 reached 87%.',
    triggeredAt: '2026-06-23 23:45:00',
    duration: '1h 22m',
    resolvedBy: 'cron-daemon (Logrotate)'
  },
  {
    id: 'hist-04',
    severity: 'CRITICAL',
    name: 'INGRESS_SSL_EXPIRED',
    description: 'SSL certificate for domain admin.opusify.internal expired.',
    triggeredAt: '2026-06-22 00:01:00',
    duration: '18m 30s',
    resolvedBy: 'alex.chen (Manual Certbot)'
  },
  {
    id: 'hist-05',
    severity: 'LOW',
    name: 'BACKUP_JOB_FAILED',
    description: 'Daily database backup job failed to upload snapshot to cloud storage bucket.',
    triggeredAt: '2026-06-21 04:00:12',
    duration: '10m 00s',
    resolvedBy: 'Auto-retry (success)'
  },
  {
    id: 'hist-06',
    severity: 'HIGH',
    name: 'CPU_BURN_WORKER',
    description: 'CPU load on worker-queue service exceeded 95% on host worker-0x12.',
    triggeredAt: '2026-06-20 18:32:45',
    duration: '35m 12s',
    resolvedBy: 'Auto-autoscaler (spawn node)'
  }
];
