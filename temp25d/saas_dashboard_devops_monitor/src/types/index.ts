export type ServerStatus  = 'online' | 'degraded' | 'offline';
export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type LogLevel      = 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS' | 'SYS';
export type DeployStatus  = 'success' | 'failed' | 'running' | 'pending';

export interface ServerNode {
  id: string;
  hostname: string;
  zone: string;               // e.g. "us-east-2a"
  status: ServerStatus;
  cpu: number;                // 0–100
  memory: number;             // 0–100
  disk: number;               // 0–100
  networkIn: number;          // Mbps
  networkOut: number;         // Mbps
  uptime: string;             // e.g. "14d 6h 32m"
  os: string;                 // e.g. "Ubuntu 22.04"
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export interface TerminalLine {
  id: string;
  type: LogLevel;
  message: string;
  timestamp: string;          // HH:MM:SS
}

export interface AlertIncident {
  id: string;
  title: string;              // e.g. "KUBE_SWARM_FAILURE"
  text: string;
  severity: AlertSeverity;
  host: string;               // e.g. "cluster-0x4f12"
  timestamp: string;
  dismissed: boolean;
}

export interface Deployment {
  id: string;
  service: string;            // e.g. "api-gateway"
  version: string;            // e.g. "v2.14.1"
  environment: 'production' | 'staging' | 'development';
  status: DeployStatus;
  triggeredBy: string;        // git username
  branch: string;
  commit: string;             // short SHA
  startedAt: string;
  duration: string;           // e.g. "4m 12s"
  stages: DeploymentStage[];
}

export interface DeploymentStage {
  name: string;               // e.g. "Build" | "Test" | "Deploy" | "Verify"
  status: DeployStatus;
  duration: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  alertBadge?: boolean;       // shows pulsing red dot for Alerts nav item
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string;          // e.g. "CPU > 90% for 5min"
  severity: AlertSeverity;
  enabled: boolean;
}
