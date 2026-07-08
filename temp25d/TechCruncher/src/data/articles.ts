import type { Article } from '../types';

export const mockArticles: Article[] = [
  {
    slug: 'llms-at-the-edge-local-models',
    category: 'Artificial Intelligence',
    readTime: '10 Min Read',
    title: 'LLMs at the Edge: Local Models Bypass Cloud Dependencies',
    excerpt: 'With recent micro-processor enhancements, lightweight language engines are successfully running local server actions on offline hardware pools, cutting API roundtrips and token consumption by 90% across modern architectures.',
    body: [
      'In the rapid evolution of artificial intelligence, a silent revolution is taking place at the boundary of network topologies. For years, running large language models meant relying on massive cloud server farms, enduring significant latency, and sending sensitive operational data over the public web. Today, a new generation of lightweight, highly optimized model engines is changing the equation.',
      'Recent breakthroughs in hardware-specific model compilation and 4-bit quantization have made it possible to run sub-10-billion parameter models directly on edge devices. These local engines are not merely sandboxed playgrounds; they are actively orchestrating complex application workflows, routing database transactions, and parsing unstructured data streams without once pinging a remote server.',
      'By running these models locally, engineering teams are reporting up to a 90% reduction in API token costs. More importantly, they have bypassed the network roundtrips that historically degraded the user experience of interactive AI systems. A local model can respond in milliseconds, operating with complete data privacy and total immunity to external network outages.',
      'As silicon fabricators continue to build dedicated neural processing units (NPUs) directly into consumer and edge-server hardware, the boundary of what can be processed locally will only expand. We are moving from a cloud-first AI ecosystem to a highly distributed, edge-native intelligence layer where every terminal operates as its own autonomous thinking center.'
    ],
    imageUrl: 'https://picsum.photos/seed/cyber/1200/800',
    author: {
      name: 'Evelyn Vance',
      role: 'Senior Tech Journalist',
      avatarUrl: 'https://picsum.photos/seed/reporter/100/100'
    },
    publishedAt: '2026-07-08T10:00:00Z',
    likeCount: 1482,
    liked: false,
    bookmarked: false,
    breaking: true
  },
  {
    slug: '3nm-architecture-bottlenecks-threaten-gpu',
    category: 'Hardware',
    readTime: '6 Min Read',
    title: '3nm Architecture Bottlenecks Threaten Consumer GPU Timelines',
    excerpt: 'Founders and fabricators warn that atomic-scale lithography errors are raising production costs, which may limit next-gen gaming card yields for the upcoming fiscal calendar.',
    body: [
      'The race to shrink transistors is hitting a physical and financial wall. As silicon fabrication moves toward the 3-nanometer nodes and beyond, the margins for error have shrunk to the width of individual atoms. Leading foundries are reporting unprecedented difficulties in maintaining wafer yield rates, raising serious concerns for the next generation of consumer graphics hardware.',
      'At this scale, quantum tunneling and extreme ultraviolet (EUV) lithography scattering create microscopic defects that render entire chips useless. To compensate, fabricators are forced to implement more rigorous inspection stages and multi-patterning runs, which directly drives up the production cost of each silicon wafer.',
      'For consumers, this translates to potential delays in next-generation GPU launches and higher launch prices. Hardware manufacturers are already exploring alternative designs, such as multi-die chiplet architectures, to bypass the yield issues of single monolithic dies. However, these chiplet designs present their own packaging and interconnect bottlenecks that engineers must solve before prime-time release.'
    ],
    imageUrl: 'https://picsum.photos/seed/silicon/600/400',
    author: {
      name: 'Arthur Pendragon',
      role: 'Hardware Analyst',
      avatarUrl: 'https://picsum.photos/seed/arthur/100/100'
    },
    publishedAt: '2026-07-07T14:30:00Z',
    likeCount: 428,
    liked: false,
    bookmarked: false
  },
  {
    slug: 'post-quantum-encryption-baseline-standard',
    category: 'Security',
    readTime: '8 Min Read',
    title: 'Post-Quantum Encryption Becomes Baseline Standard on SaaS Platforms',
    excerpt: 'Top architecture boards have officially deployed lattice-based algorithms to standard SSH protocols, ensuring secure key exchange even against hypothetically complete quantum decryption grids.',
    body: [
      'The cryptographic community is no longer waiting for the "Q-Day" — the hypothetical point at which quantum computers become powerful enough to break standard RSA and ECC encryption. Instead, SaaS engineering platforms are taking proactive measures to deploy post-quantum cryptography (PQC) algorithms across all production traffic.',
      'Recent guidelines from standard organizations have accelerated the transition. Lattice-based cryptography, which relies on the mathematical hardness of high-dimensional geometric lattices, is now the preferred choice for secure key exchange. Major cloud providers and code hosting platforms have begun enabling hybrid modes that combine classical algorithms with PQC, ensuring security without sacrificing backward compatibility.',
      'This migration represents one of the largest infrastructure overhauls of the internet era. Every client library, proxy server, and identity provider must be updated to handle the larger key sizes and signature lengths required by post-quantum algorithms. Teams that delay this transition risk leaving their long-term archived data vulnerable to future decryption.'
    ],
    imageUrl: 'https://picsum.photos/seed/crypto-quantum/600/400',
    author: {
      name: 'Lancelot Knight',
      role: 'Cybersecurity Expert',
      avatarUrl: 'https://picsum.photos/seed/lance/100/100'
    },
    publishedAt: '2026-07-08T09:00:00Z',
    likeCount: 194,
    liked: false,
    bookmarked: false
  },
  {
    slug: 'how-server-components-cut-ai-token-cost',
    category: 'Optimizations',
    readTime: '5 Min Read',
    title: 'How Server Components Cut AI Token Cost',
    excerpt: 'Detailed analyses on how migrating from client-side bundles to Server Components cuts daily codebase reviews down by half.',
    body: [
      'Modern web frameworks have introduced server-side execution paradigms that do more than just speed up initial page renders. By shifting complex data orchestration and AI model prompting to the server, developers can radically optimize how client applications interact with large language models.',
      'With React Server Components (RSC), the client no longer needs to download heavy LLM client libraries or make direct API calls to model endpoints. Instead, the server fetches the required data, performs the prompt compilation, evaluates the response, and streams the finished UI nodes down to the client.',
      'This architecture prevents token bloat by ensuring that only refined, structured context is passed to the AI model. In client-heavy apps, developers often pass large portions of application state to the model because the client is the only coordinator. Server Components centralize this state, filtering out extraneous data and reducing the input token overhead by up to 50%.'
    ],
    imageUrl: 'https://picsum.photos/seed/opt/600/400',
    author: {
      name: 'Jane Developer',
      role: 'Principal Engineer',
      avatarUrl: 'https://picsum.photos/seed/jane/100/100'
    },
    publishedAt: '2026-07-08T13:20:00Z',
    likeCount: 512,
    liked: false,
    bookmarked: false
  },
  {
    slug: 'zod-variable-security-framework',
    category: 'Security',
    readTime: '7 Min Read',
    title: 'The Zod Variable Security Framework',
    excerpt: 'Hardening systems at build time with type-safe environmental checking limits structural exposure.',
    body: [
      'Environmental variables are the Achilles\' heel of many deployment pipelines. A single missing variable, or a malformed API key, can cause silent run-time failures that are difficult to debug and highly vulnerable to exploitation. Enter type-safe schema validation at the system boundary.',
      'By utilizing libraries like Zod, developers can validate all environment configurations before a single line of application code runs. The schema acts as a strict firewall: if an environment variable is missing, incorrect, or malformed, the process crashes immediately with a detailed error message.',
      'This build-time and initialization-time validation prevents invalid states from reaching production servers. Furthermore, it generates strict TypeScript definitions of the environment, ensuring that engineers cannot reference non-existent configurations during development, thereby limiting potential leaks and operational vulnerabilities.'
    ],
    imageUrl: 'https://picsum.photos/seed/cyberaudit/600/400',
    author: {
      name: 'Desk Alpha',
      role: 'Security lead',
      avatarUrl: 'https://picsum.photos/seed/alpha/100/100'
    },
    publishedAt: '2026-07-08T11:00:00Z',
    likeCount: 310,
    liked: false,
    bookmarked: false
  },
  {
    slug: 'husky-hooks-vs-pattern-matchers',
    category: 'Automation',
    readTime: '9 Min Read',
    title: 'Husky Hooks vs Pattern Matchers',
    excerpt: 'Comparing modern local git verification models and standard CI audits for preventing production leaks.',
    body: [
      'Preventing security credentials and broken builds from entering your git history is a foundational tenet of modern software engineering. However, there is an ongoing debate about where this validation should take place: locally via git hooks, or remotely during CI pipelines.',
      'Git hook managers like Husky make it trivial to run linters, tests, and secret scanners right before a commit or push is finalized. This local barrier catches mistakes immediately, keeping the commit history clean and saving CI minutes. However, hooks can be bypassed easily with the `--no-verify` flag, making them unreliable as a sole source of truth.',
      'Remote CI verification, on the other hand, is non-bypassable and guarantees a uniform check across all contributors. The downside is the feedback loop: engineers must wait for a server run to discover syntax or credential errors. The most resilient systems utilize a hybrid approach, using Husky for immediate local feedback and CI as the final gatekeeper.'
    ],
    imageUrl: 'https://picsum.photos/seed/gitops/600/400',
    author: {
      name: 'Inst. Davis',
      role: 'DevOps Architect',
      avatarUrl: 'https://picsum.photos/seed/davis/100/100'
    },
    publishedAt: '2026-07-07T12:00:00Z',
    likeCount: 88,
    liked: false,
    bookmarked: false
  },
  {
    slug: 'orchestrating-multi-agent-systems-k8s',
    category: 'Artificial Intelligence',
    readTime: '12 Min Read',
    title: 'Orchestrating Multi-Agent Systems on Kubernetes',
    excerpt: 'Deploying autonomous LLM agents in container clusters requires fine-grained resource routing and secure network policies.',
    body: [
      'As autonomous AI agents move from simple script executions to long-running system tasks, scaling their workloads becomes a major infrastructure challenge. Running multiple agents in parallel requires dynamic provisioning, isolation, and orchestrations that only containers can provide.',
      'Using Kubernetes, engineers are deploying agents inside isolated pods with strict CPU and memory limits. Since an agent running code can occasionally enter runaway loops, resource scoping is critical to prevent a single agent from exhausting the cluster\'s resources.',
      'Additionally, network policies must be put in place to restrict what local assets the agents can reach. By default, pods in a namespace can communicate freely, which poses a security risk if an agent is executing untrusted code. Hardening the cluster is the first step before exposing agentic systems to real-world pipelines.'
    ],
    imageUrl: 'https://picsum.photos/seed/k8s/600/400',
    author: {
      name: 'Sarah Chen',
      role: 'Cloud Native Engineer',
      avatarUrl: 'https://picsum.photos/seed/sarah/100/100'
    },
    publishedAt: '2026-07-06T15:10:00Z',
    likeCount: 299,
    liked: false,
    bookmarked: false
  },
  {
    slug: 'next-gen-solid-state-batteries-edge',
    category: 'Hardware',
    readTime: '8 Min Read',
    title: 'Next-Gen Solid State Batteries for Edge Devices',
    excerpt: 'Silicon-anode designs promise to double battery longevity in remote IoT terminals and mobile devices.',
    body: [
      'Battery energy density has been the primary constraint for remote IoT sensors and mobile hardware. The standard lithium-ion technology is reaching its chemical limits, urging research institutions to look toward solid-state chemistry.',
      'Silicon-anode solid-state cells have emerged as the most promising successor. By replacing volatile liquid electrolytes with solid ceramic substrates, these batteries can operate safely under extreme temperatures while reducing the physical footprint of the battery pack.',
      'This technology promises to double the run time of remote hardware, enabling edge terminals to run continuous monitoring models for years without requiring replacement or solar recharging grids.'
    ],
    imageUrl: 'https://picsum.photos/seed/battery/600/400',
    author: {
      name: 'Liam Murphy',
      role: 'Material Scientist',
      avatarUrl: 'https://picsum.photos/seed/liam/100/100'
    },
    publishedAt: '2026-07-05T09:15:00Z',
    likeCount: 160,
    liked: false,
    bookmarked: false
  },
  {
    slug: 'implementing-ebpf-zero-overhead-telemetry',
    category: 'Optimizations',
    readTime: '9 Min Read',
    title: 'Implementing eBPF for Zero-Overhead Telemetry',
    excerpt: 'Bypassing user-space context switching allows real-time packet tracking and system metrics monitoring directly inside the kernel.',
    body: [
      'Traditional telemetry tools collect application performance metrics by running sidecar processes or injecting agent libraries. While effective, these methods introduce significant CPU overhead and context switching delays.',
      'Extended Berkeley Packet Filter (eBPF) solves this by executing custom tracking code directly inside the Linux kernel. When system calls are made, the kernel triggers sandboxed eBPF programs, collecting execution telemetry with virtually zero overhead.',
      'This allows DevOps teams to audit network packets, database query times, and process lifetimes in high-load production clusters without degrading application throughput. It represents a paradigm shift in system observability.'
    ],
    imageUrl: 'https://picsum.photos/seed/ebpf/600/400',
    author: {
      name: 'Elena Rostova',
      role: 'Systems Engineer',
      avatarUrl: 'https://picsum.photos/seed/elena/100/100'
    },
    publishedAt: '2026-07-04T11:00:00Z',
    likeCount: 215,
    liked: false,
    bookmarked: false
  }
];
