import type { PodcastEpisode } from '../types';

export const mockPodcasts: PodcastEpisode[] = [
  {
    slug: 'future-of-edge-native-ai',
    title: 'The Future of Edge-Native AI',
    guest: 'Dr. Aris Thorne',
    durationMinutes: 45,
    publishedAt: '2026-07-08T06:00:00Z',
    description: 'Dr. Aris Thorne discusses the transition of large language models to edge environments, detailing quantization techniques and NPU hardware acceleration.',
    audioUrl: '#'
  },
  {
    slug: 'quantizing-the-web-webassembly-rust',
    title: 'Quantizing the Web: WebAssembly & Rust compilers',
    guest: 'Linus Ouellet',
    durationMinutes: 38,
    publishedAt: '2026-07-01T08:00:00Z',
    description: 'Linus Ouellet explores the advantages of compiling high-performance Rust tools into WebAssembly targets, bringing near-native speeds to the client browser.',
    audioUrl: '#'
  },
  {
    slug: 'post-quantum-cryptography-implementation',
    title: 'Post-Quantum Cryptography Implementation Details',
    guest: 'Dr. Sarah Jenkins',
    durationMinutes: 52,
    publishedAt: '2026-06-24T07:30:00Z',
    description: 'Dr. Sarah Jenkins breaks down lattice-based cryptography, NIST selections, and practical migration steps for protecting enterprise systems against future quantum threats.',
    audioUrl: '#'
  },
  {
    slug: 'state-of-modern-saas-scaffold-engines',
    title: 'The State of Modern SaaS Scaffold Engines',
    guest: 'Alex River',
    durationMinutes: 30,
    publishedAt: '2026-06-17T09:00:00Z',
    description: 'Alex River shares insights on how code scaffolding engines are reducing development cycles, improving typescript type-safety, and decreasing time-to-market.',
    audioUrl: '#'
  }
];
