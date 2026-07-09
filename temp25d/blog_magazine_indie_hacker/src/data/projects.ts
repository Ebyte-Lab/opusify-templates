import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'hack-journal',
    name: 'hack_journal',
    pitch: 'A retro-dev themed single-theme technical log manager optimized for sub-millisecond edge action loads.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'shipped',
    linkUrl: 'https://github.com/alexriverash/hack_journal'
  },
  {
    slug: 'telemetry-hub',
    name: 'TelemetryHub',
    pitch: 'UDP syslog collector daemon that drains Docker containers and spits structured telemetry files.',
    stack: ['Go', 'Docker', 'Linux Syslog', 'InfluxDB'],
    status: 'building',
    linkUrl: 'https://github.com/alexriverash/telemetry-hub'
  },
  {
    slug: 'sql-reaper',
    name: 'SQLReaper',
    pitch: 'Cron-ping utility that hunts and terminates idle Postgres connection sockets to keep caches warm.',
    stack: ['Go', 'PostgreSQL', 'Docker Swarm'],
    status: 'shipped',
    linkUrl: 'https://github.com/alexriverash/sql-reaper'
  },
  {
    slug: 'swarm-mesh-tuner',
    name: 'SwarmMeshTuner',
    pitch: 'Automation script that calculates and forces optimal Ingress MTU settings across node interfaces.',
    stack: ['Bash', 'Python', 'Iptables', 'Docker Engine'],
    status: 'archived',
    linkUrl: 'https://github.com/alexriverash/swarm-mesh-tuner'
  }
];
