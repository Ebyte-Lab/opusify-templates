import type { TechEvent } from '../types';

export const mockEvents: TechEvent[] = [
  {
    slug: 'global-edge-ai-summit-2026',
    name: 'Global Edge AI Summit 2026',
    date: '2026-09-15T09:00:00Z',
    format: 'Virtual',
    location: 'Online Broadcast',
    description: 'Join industry experts to discuss the deployment, security, and resource optimization of large language models on edge node clusters.',
    registerUrl: '#'
  },
  {
    slug: 'secure-key-exchange-symposium',
    name: 'Secure Key Exchange Symposium',
    date: '2026-10-22T10:00:00Z',
    format: 'In-Person',
    location: 'Geneva, Switzerland',
    description: 'A deep-dive technical symposium on lattice-based cryptography, NIST post-quantum standardizations, and network handshake security.',
    registerUrl: '#'
  },
  {
    slug: 'scaffold-engine-hackathon',
    name: 'Scaffold Engine Hackathon v1.2',
    date: '2026-11-05T08:00:00Z',
    format: 'Hybrid',
    location: 'San Francisco, CA & Online',
    description: 'Build enterprise-ready full-stack applications in 48 hours utilizing state-of-the-art typescript boilerplates and modular design libraries.',
    registerUrl: '#'
  },
  {
    slug: 'systems-observability-ebpf-workshop',
    name: 'Systems Observability & eBPF Workshop',
    date: '2026-12-08T13:00:00Z',
    format: 'Virtual',
    location: 'Online Workshop',
    description: 'Learn how to write, compile, and deploy custom eBPF sandboxes inside Linux kernels for high-fidelity, zero-overhead systems monitoring.',
    registerUrl: '#'
  }
];
