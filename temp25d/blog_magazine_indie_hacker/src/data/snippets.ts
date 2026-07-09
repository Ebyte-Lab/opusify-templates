import type { Snippet } from '../types';

export const snippets: Snippet[] = [
  {
    slug: 'go-tls-config',
    title: 'Highly-Optimized Go TLS Listener Config',
    language: 'go',
    description: 'Forces modern cipher suites and disables legacy versions for safe and fast edge communication.',
    code: `package main

import (
    "crypto/tls"
    "net/http"
)

func main() {
    config := &tls.Config{
        MinVersion:               tls.VersionTLS13,
        PreferServerCipherSuites: true,
    }
    server := &http.Server{
        Addr:      ":443",
        TLSConfig: config,
    }
    server.ListenAndServeTLS("cert.pem", "key.pem")
}`,
    publishedAt: '2026-06-18T10:00:00.000Z'
  },
  {
    slug: 'postgres-conn-limits',
    title: 'PostgreSQL Idle Transaction Reaper Query',
    language: 'sql',
    description: 'Terminates connections that stay in "idle in transaction" state for longer than 60 seconds.',
    code: `SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle in transaction'
  AND state_change < current_timestamp - INTERVAL '60 seconds';`,
    publishedAt: '2026-06-25T11:20:00.000Z'
  },
  {
    slug: 'docker-compose-overlay',
    title: 'Docker Compose Mesh Routing Config',
    language: 'yaml',
    description: 'Declares overlay networks with custom ingress MTU values for Docker Swarms.',
    code: `version: '3.8'

services:
  web:
    image: nginx:alpine
    networks:
      - swarm_mesh

networks:
  swarm_mesh:
    driver: overlay
    driver_opts:
      com.docker.network.driver.mtu: "1450"`,
    publishedAt: '2026-06-30T09:15:00.000Z'
  },
  {
    slug: 'rust-byte-scanner',
    title: 'Rust Zero-Copy Buffer Scanner',
    language: 'rust',
    description: 'Scans stream buffers for token indicators without performing heap allocations.',
    code: `fn find_token(buffer: &[u8], token: &[u8]) -> Option<usize> {
    buffer.windows(token.len())
          .position(|window| window == token)
}`,
    publishedAt: '2026-07-03T15:30:00.000Z'
  },
  {
    slug: 'nginx-reverse-cache',
    title: 'Nginx Static Resource Reverse Caching',
    language: 'nginx',
    description: 'Enables microcaching for assets with custom header bypass parameters.',
    code: `proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=microcache:10m max_size=1g inactive=60m;

server {
    location /static/ {
        proxy_cache microcache;
        proxy_cache_valid 200 10m;
        proxy_pass http://backend_upstream;
        add_header X-Cache-Status $upstream_cache_status;
    }
}`,
    publishedAt: '2026-07-06T13:45:00.000Z'
  },
  {
    slug: 'bash-reaper-script',
    title: 'Docker Dangling Volume Reaper Script',
    language: 'bash',
    description: 'Safely removes containers and volumes that are orphaned from local Docker instances.',
    code: `#!/bin/bash
# Remove stopped containers
docker container prune -f

# Purge anonymous unused volumes
docker volume prune -f

# Clear builder cache
docker builder prune -a -f`,
    publishedAt: '2026-07-09T08:00:00.000Z'
  }
];
