import type { Article } from '../types';

export const articles: Article[] = [
  {
    slug: 'compiling-in-the-cold',
    buildLogId: 'BUILD_LOG_042',
    readTime: '5 min',
    title: 'Compiling in the Cold: The Art of Sub-Millisecond Server Actions',
    excerpt: 'Client bundles are treated as landfill space. We bypass Next.js cold boots using a custom Go worker, connection ping, and Docker swarms.',
    author: {
      handle: 'alex_rivera.sh',
      avatarUrl: 'https://picsum.photos/seed/alexriverash/80/80'
    },
    publishedAt: '2026-06-15T08:00:00.000Z',
    initialViews: 1482,
    supportersCount: 512,
    sections: [
      {
        id: 'intro',
        tocLabel: '01. The Monolith Problem',
        heading: '01. The Monolith Problem',
        paragraphs: [
          'We have entered an era where client bundles are treated as landfill space. We heap frameworks, state providers, and heavy hydration libraries onto the client, completely forgetting that the fastest script is the one that was never sent. When scaffolded via Opusify_Documentation.pdf, Next.js server actions successfully bypassed traditional REST boilerplate, decreasing initial token footprint by over 60%.',
          'But let\'s talk about cold boot times. What happens when your edge worker experiences zero requests over a 60-minute cycle? Handshakes drop. Databases spin down to sleep states. Suddenly, your sub-millisecond experience turns into a 4-second loading spinner of death.'
        ]
      },
      {
        id: 'design',
        tocLabel: '02. Micro-Client Execution',
        heading: '02. Micro-Client Execution',
        paragraphs: [
          'To bypass database sleep cycles, we mapped a cron-ping script inside our local Docker swarm cluster to keep connection parameters active. Below is a highly-optimized Go worker that intercepts incoming Edge events and forces cached cache hydration in parallel with route calculations.'
        ]
      },
      {
        id: 'code',
        tocLabel: '03. Compilation Benchmarks',
        heading: '03. Compilation Benchmarks',
        paragraphs: [
          'The Go worker compiles directly to native binary assembly and runs within an isolated lightweight micro-container. Below is the source code of the proxy engine which executes in sub-millisecond cycles.'
        ],
        codeBlock: {
          filename: 'main.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "time"
)

func main() {
    // Intercept edge event trigger
    fmt.Printf("Deploying connection ping...\\n")
    time.Sleep(200 * time.Millisecond)
    fmt.Println("STATUS: Handshake Nominal")
}`,
          runnable: true,
          terminalSteps: [
            { text: '$ go run main.go', delayMs: 0, tone: 'default' },
            { text: 'go: compiling packages...', delayMs: 400, tone: 'muted' },
            { text: 'Deploying connection ping...', delayMs: 900, tone: 'default' },
            { text: 'STATUS: Handshake Nominal (Execution: 14.2ms)', delayMs: 1500, tone: 'success' },
            { text: 'Process completed successfully.', delayMs: 2000, tone: 'muted' }
          ]
        }
      },
      {
        id: 'building-public',
        tocLabel: '04. Metric Telemetry',
        heading: '04. Metric Telemetry',
        paragraphs: [
          'The results were staggering. By integrating parallel cached responses, we slashed execution timelines down from 240ms to a constant 14ms edge response. In terms of user conversion, the layout stability metrics remained completely clean, eliminating sudden content shifts.'
        ]
      }
    ]
  },
  {
    slug: 'taming-the-database-pool',
    buildLogId: 'BUILD_LOG_043',
    readTime: '6 min',
    title: 'Taming the Pool: Optimizing Edge Database Connection Overhead',
    excerpt: 'Database connections on serverless platforms are notoriously transient. Learn how to establish a TCP multiplexer proxy for fast handshakes.',
    author: {
      handle: 'alex_rivera.sh',
      avatarUrl: 'https://picsum.photos/seed/alexriverash/80/80'
    },
    publishedAt: '2026-06-22T09:15:00.000Z',
    initialViews: 924,
    supportersCount: 318,
    sections: [
      {
        id: 'problem',
        tocLabel: '01. Connection Transience',
        heading: '01. Connection Transience',
        paragraphs: [
          'In standard server environments, database connections are long-lived and reused across thousands of requests. Serverless runs, however, spin up micro-containers on demand and tear them down. This means every API call pays the tax of a full TLS/TCP handshake with PostgreSQL.',
          'When database connection pools fill up, Postgres starts dropping connections, raising `FATAL: remaining connection slots are reserved` errors. A naive retry loop just exacerbates the congestion.'
        ]
      },
      {
        id: 'solution',
        tocLabel: '02. Multiplexing Proxy',
        heading: '02. Multiplexing Proxy',
        paragraphs: [
          'To bypass this, we implemented a lightweight proxy daemon in Go that runs next to the database engine. Instead of clients negotiating raw PostgreSQL wire protocols, they send lightweight HTTP post requests carrying SQL statements. The daemon maps these to a local UNIX socket pool.'
        ],
        codeBlock: {
          filename: 'pool_proxy.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "net/http"
)

func handleQuery(w http.ResponseWriter, r *http.Request) {
    // Acquire lease from internal connection pool
    fmt.Fprintf(w, "ACQUIRE: DB_CONN_POOL_LEADER\\n")
    fmt.Fprintf(w, "STATUS: Query Executed (2.4ms)\\n")
}`,
          runnable: true,
          terminalSteps: [
            { text: '$ go run pool_proxy.go', delayMs: 0, tone: 'default' },
            { text: 'Initializing Postgres proxy engine...', delayMs: 300, tone: 'muted' },
            { text: 'ACQUIRE: DB_CONN_POOL_LEADER', delayMs: 700, tone: 'default' },
            { text: 'STATUS: Query Executed (2.4ms)', delayMs: 1200, tone: 'success' },
            { text: 'Connection recycled back to local socket pool.', delayMs: 1600, tone: 'muted' }
          ]
        }
      },
      {
        id: 'results',
        tocLabel: '03. Operational Metrics',
        heading: '03. Operational Metrics',
        paragraphs: [
          'By stripping connection setups from edge routes, average query overhead plummeted from 94ms to 2.4ms. Connection count on Postgres flattened to a constant 10 connections, regardless of incoming edge spikes. We can now support 100x traffic without resizing the database instance.'
        ]
      }
    ]
  },
  {
    slug: 'docker-swarm-routing',
    buildLogId: 'BUILD_LOG_044',
    readTime: '4 min',
    title: 'Bypassing Kubernetes: Simple Swarm-Based Deployments for Solopreneurs',
    excerpt: 'Kubernetes introduces massive configuration fatigue. Docker Swarm offers a built-in orchestration layer that requires no external setup.',
    author: {
      handle: 'alex_rivera.sh',
      avatarUrl: 'https://picsum.photos/seed/alexriverash/80/80'
    },
    publishedAt: '2026-06-29T14:20:00.000Z',
    initialViews: 1105,
    supportersCount: 420,
    sections: [
      {
        id: 'k8s-bloat',
        tocLabel: '01. Orchestration Fatigue',
        heading: '01. Orchestration Fatigue',
        paragraphs: [
          'Kubernetes has conquered the enterprise space, but for a single developer launching a micro-service, it is a liability. You spend hours writing YAML definitions for ingress routes, persistent volume claims, and node affinities just to deploy a basic node and database stack.',
          'Worse, Kubernetes control planes consume substantial RAM, forcing you to pay for medium-tier cloud instances before your first user even loads the landing page.'
        ]
      },
      {
        id: 'swarm-setup',
        tocLabel: '02. Built-in Orchestration',
        heading: '02. Built-in Orchestration',
        paragraphs: [
          'Docker Swarm is baked directly into the Docker engine. Initializing a cluster requires a single bash command. You deploy stack definitions using a standard docker-compose schema, and the engine automatically routes traffic through its overlay mesh networks.'
        ],
        codeBlock: {
          filename: 'deploy.sh',
          language: 'bash',
          code: `# Initialize swarm on manager node
docker swarm init --advertise-addr 10.0.0.1

# Deploy core cluster services
docker stack deploy -c docker-compose.yml hack_stack`,
          runnable: true,
          terminalSteps: [
            { text: '$ bash deploy.sh', delayMs: 0, tone: 'default' },
            { text: 'Swarm initialized: current node is manager.', delayMs: 400, tone: 'success' },
            { text: 'Creating overlay network: hack_stack_default', delayMs: 800, tone: 'muted' },
            { text: 'Deploying service hack_stack_web (Replicas: 3)...', delayMs: 1400, tone: 'default' },
            { text: 'Stack nominal. Checking rolling update state...', delayMs: 1900, tone: 'success' }
          ]
        }
      },
      {
        id: 'advantages',
        tocLabel: '03. Operational Speed',
        heading: '03. Operational Speed',
        paragraphs: [
          'Docker Swarm uses virtual zero overhead. We deployed our full platform across three $5/month virtual servers. Rolling updates are completely out-of-the-box, letting us deploy version updates by simply re-running the stack deploy script without dropping active connections.'
        ]
      }
    ]
  },
  {
    slug: 'rust-edge-proxies',
    buildLogId: 'BUILD_LOG_045',
    readTime: '7 min',
    title: 'WASM on the Edge: Rebuilding a Reverse Proxy in Rust',
    excerpt: 'Edge runtime instances restrict memory limits to 128MB. We compiled a custom Rust routing engine into WASM to serve requests instantly.',
    author: {
      handle: 'alex_rivera.sh',
      avatarUrl: 'https://picsum.photos/seed/alexriverash/80/80'
    },
    publishedAt: '2026-07-02T10:00:00.000Z',
    initialViews: 812,
    supportersCount: 290,
    sections: [
      {
        id: 'why-rust',
        tocLabel: '01. Edge Constraints',
        heading: '01. Edge Constraints',
        paragraphs: [
          'Edge compute engines allow you to run backend code near users, but they enforce strict limitations. You are capped at 50ms CPU execution times and 128MB memory footprints. Traditional gateways like Nginx or heavy Node.js instances exceed these boundaries in seconds.',
          'By implementing the proxy in Rust and compiling to WebAssembly, we get native-level execution speeds and tiny binary sizes that fit easily into sandboxed runtimes.'
        ]
      },
      {
        id: 'rust-implementation',
        tocLabel: '02. WASM Request Routing',
        heading: '02. WASM Request Routing',
        paragraphs: [
          'Our Rust router acts as a gatekeeper. It parses request paths, checks local memory-mapped caches, and forwards queries to our Docker containers. Below is the request intercept logic.'
        ],
        codeBlock: {
          filename: 'lib.rs',
          language: 'rust',
          code: `use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn route_request(path: &str) -> String {
    if path == "/api/v1/health" {
        return String::from("{\\"status\\":\\"nominal\\"}");
    }
    String::from("{\\"status\\":\\"routed\\"}")
}`,
          runnable: true,
          terminalSteps: [
            { text: '$ cargo build --target wasm32-unknown-unknown --release', delayMs: 0, tone: 'default' },
            { text: 'Compiling core routing libraries...', delayMs: 500, tone: 'muted' },
            { text: 'Optimizing WebAssembly binary sizes...', delayMs: 1100, tone: 'muted' },
            { text: 'Binary size: 3.4KB nominal.', delayMs: 1600, tone: 'success' },
            { text: 'WASM Engine injected into Cloudflare worker successfully.', delayMs: 2000, tone: 'success' }
          ]
        }
      },
      {
        id: 'benchmarks',
        tocLabel: '03. Memory Footprint',
        heading: '03. Memory Footprint',
        paragraphs: [
          'Our compiled WASM binary measures only 3.4KB! Memory consumption remains flat at 1.8MB during load testing. Most importantly, start time is exactly 0ms because there is no virtual machine boot cycle required.'
        ]
      }
    ]
  },
  {
    slug: 'zero-js-generation',
    buildLogId: 'BUILD_LOG_046',
    readTime: '5 min',
    title: 'Zero JS, Maximum Speed: High Performance Static Page Generation',
    excerpt: 'The web is bloated with Javascript. Stripping client scripts from index templates reduced core web vitals down to microseconds.',
    author: {
      handle: 'alex_rivera.sh',
      avatarUrl: 'https://picsum.photos/seed/alexriverash/80/80'
    },
    publishedAt: '2026-07-05T12:00:00.000Z',
    initialViews: 654,
    supportersCount: 198,
    sections: [
      {
        id: 'web-bloat',
        tocLabel: '01. Hydration Costs',
        heading: '01. Hydration Costs',
        paragraphs: [
          'Modern frameworks advertise server rendering, but they still ship massive JSON payloads and JS scripts to "hydrate" components on the client. On low-end mobile devices, parsing 500KB of React bundles delays interactivity by seconds.',
          'For content-heavy blogs, this is a waste. Readers come to read text, not to download state managers.'
        ]
      },
      {
        id: 'static-approach',
        tocLabel: '02. Progressive Enhancement',
        heading: '02. Progressive Enhancement',
        paragraphs: [
          'We built our templating engine to emit raw, static HTML. For interactive details (like our terminal run simulator), we embed lightweight, native Web Components that contain zero external dependency dependencies.'
        ],
        codeBlock: {
          filename: 'component.js',
          language: 'javascript',
          code: `class RetroConsole extends HTMLElement {
  connectedCallback() {
    this.innerHTML = \`<div class="p-2 bg-black text-xs font-mono">Terminal Online</div>\`;
  }
}
customElements.define('retro-console', RetroConsole);`,
          runnable: true,
          terminalSteps: [
            { text: 'registering custom element: <retro-console>', delayMs: 0, tone: 'default' },
            { text: 'DOM node connected callback activated.', delayMs: 400, tone: 'muted' },
            { text: 'STATUS: Rendered native component in 0.1ms', delayMs: 800, tone: 'success' }
          ]
        }
      },
      {
        id: 'vitals',
        tocLabel: '03. Page Speed Vitals',
        heading: '03. Page Speed Vitals',
        paragraphs: [
          'Our indexes load instantly. Total bundle weight dropped from 180KB to a single 12KB HTML file (including inline styles). Lighthouse metrics show a perfect 100/100, and our pages are interactive before the first image finishes loading.'
        ]
      }
    ]
  },
  {
    slug: 'telemetry-terminal-setup',
    buildLogId: 'BUILD_LOG_047',
    readTime: '6 min',
    title: 'Telemetry Terminal: Standardizing Logging Across Docker Swarms',
    excerpt: 'Centralizing log output is a headache in cluster environments. We write a custom syslogger to query container stdout outputs.',
    author: {
      handle: 'alex_rivera.sh',
      avatarUrl: 'https://picsum.photos/seed/alexriverash/80/80'
    },
    publishedAt: '2026-07-08T16:00:00.000Z',
    initialViews: 512,
    supportersCount: 167,
    sections: [
      {
        id: 'log-pain',
        tocLabel: '01. Distributed Tracing',
        heading: '01. Distributed Tracing',
        paragraphs: [
          'When an edge server action reports a database mismatch, tracing the error in a multi-node cluster is difficult. Logs are isolated inside containers on different physical nodes, requiring SSH access to each node to run log searches.',
          'Cloud-based logging services solve this but introduce high monthly bills and external latency to every log call.'
        ]
      },
      {
        id: 'syslog-pipeline',
        tocLabel: '02. Standard Stream Piping',
        heading: '02. Standard Stream Piping',
        paragraphs: [
          'We configured Docker log drivers to route standard stream pipelines straight to a local syslog listener. The listener runs a custom Go worker that collects, filters, and logs JSON telemetry payloads directly to disk.'
        ],
        codeBlock: {
          filename: 'syslog_drain.go',
          language: 'go',
          code: `package main

import (
    "fmt"
    "net"
)

func main() {
    addr := net.UDPAddr{Port: 514, IP: net.ParseIP("0.0.0.0")}
    conn, _ := net.ListenUDP("udp", &addr)
    fmt.Printf("Telemetry collector listening on UDP 514...\\n")
}`,
          runnable: true,
          terminalSteps: [
            { text: '$ go run syslog_drain.go', delayMs: 0, tone: 'default' },
            { text: 'Telemetry collector listening on UDP 514...', delayMs: 300, tone: 'success' },
            { text: 'Intercepted log payload from hack_stack_web.1.json...', delayMs: 800, tone: 'muted' },
            { text: 'STATUS: Drain success (Buffered 14 entries)', delayMs: 1400, tone: 'success' }
          ]
        }
      },
      {
        id: 'disk-write',
        tocLabel: '03. Telemetry Storage',
        heading: '03. Telemetry Storage',
        paragraphs: [
          'The Go collector dumps all entries into a rolling log file on a fast NVMe partition. By using UDP streams, the web app never blocks on logging tasks. We can search millions of cluster log lines locally in 50ms using ripgrep.'
        ]
      }
    ]
  }
];
