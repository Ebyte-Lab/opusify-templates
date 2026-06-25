import { TerminalLine } from '../types';

export const mockLogs: Omit<TerminalLine, 'id' | 'timestamp'>[] = [
  { type: 'SYS', message: 'Establishing connection to host us-east-2.opusify.internal...' },
  { type: 'SYS', message: 'Authentication success. Security token assigned.' },
  { type: 'SUCCESS', message: 'Agent node v1.8.44 successfully attached. Listening on ports 80, 443.' },
  { type: 'INFO', message: 'Starting live Docker swarm cluster health check diagnostics.' },
  { type: 'INFO', message: 'Container swarm replication: rebalanced us-east-2a pool (0.12ms)' },
  { type: 'SUCCESS', message: 'Docker health probe responsive: container ID cb4820af' },
  { type: 'WARN', message: 'Postgres query latency alert: execution index exceeded 180ms' },
  { type: 'INFO', message: 'Garbage collection execution: reclaimed 114MB heap cache node' },
  { type: 'SUCCESS', message: 'Next.js server-action router mapping initialized correctly' },
  { type: 'ERROR', message: 'SSL certificate handshake warnings detected on domain api.v2' },
  { type: 'INFO', message: 'Redis session cluster payload syncing initialized successfully' },
  { type: 'INFO', message: 'Database connection pool size verified: 12 / 100 active connections.' },
  { type: 'SUCCESS', message: 'TLS 1.3 cryptographic handshake established on ingress gateway' },
  { type: 'WARN', message: 'Memory consumption on prod-db-primary reached 88% capacity limit' },
  { type: 'INFO', message: 'Cron job [purge_deleted_users] completed successfully in 1.45s' },
  { type: 'ERROR', message: 'Write lock timeout occurred in database table transaction_ledger' },
  { type: 'SUCCESS', message: 'Deployment verification pipeline success: static assets verified' },
  { type: 'INFO', message: 'Autoscaler group: scaled out 1 instance in eu-west-1 region' },
  { type: 'WARN', message: 'Rate limits threshold crossed for client IP 192.168.1.144 on /api/v1/auth' },
  { type: 'SUCCESS', message: 'Service mesh proxy configuration updated: 42 endpoints synchronized' }
];
