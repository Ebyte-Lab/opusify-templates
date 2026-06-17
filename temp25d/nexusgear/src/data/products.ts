import type { Product } from '../types/product';

export const products: Product[] = [
  { id: 1, name: 'NEXUS BLADE 14', price: 1899.0, specs: 'M2 Chip / 32GB RAM / 1TB SSD', img: 'https://picsum.photos/seed/laptop1/400/300', tag: 'IN STOCK', category: 'laptops' },
  { id: 2, name: 'QUANTUM CORE X9', price: 2499.0, specs: 'M3 Ultra / 64GB RAM / 2TB NVMe', img: 'https://picsum.photos/seed/laptop2/400/300', tag: 'PRE-ORDER', category: 'laptops' },
  { id: 3, name: 'NEURAL HEADSET V2', price: 349.0, specs: 'ANC / 40hr Battery / Spatial Audio', img: 'https://picsum.photos/seed/audio1/400/300', tag: 'CYBER EDITION', category: 'audio' },
  { id: 4, name: 'HAPTIC GLOVES PRO', price: 599.0, specs: 'Sub-1ms Latency / Force Feedback', img: 'https://picsum.photos/seed/acc1/400/300', tag: 'LOW STOCK', category: 'accessories' },
  { id: 5, name: 'EXTERNAL GPU NODE', price: 899.0, specs: 'Thunderbolt 5 / 1000W PSU', img: 'https://picsum.photos/seed/gpu1/400/300', tag: 'IN STOCK', category: 'components' },
  { id: 6, name: 'MECHANICAL DECK 65', price: 199.0, specs: 'Optical Switches / PBT Keycaps', img: 'https://picsum.photos/seed/key1/400/300', tag: 'IN STOCK', category: 'accessories' },
];
