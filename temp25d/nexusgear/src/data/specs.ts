import type { SpecGroup } from '../types/product';

export const specsData: SpecGroup[] = [
  {
    id: 'processor',
    title: 'PROCESSOR ARCHITECTURE',
    rows: [
      { label: 'Cores', value: '16 Performance, 8 Efficiency' },
      { label: 'Base Clock', value: '3.2 GHz' },
      { label: 'Boost Clock', value: '5.8 GHz' },
      { label: 'L3 Cache', value: '128 MB' }
    ]
  },
  {
    id: 'memory',
    title: 'UNIFIED MEMORY',
    rows: [
      { label: 'Capacity', value: 'Up to 128GB LPDDR5X' },
      { label: 'Bandwidth', value: '800 GB/s' }
    ]
  },
  {
    id: 'thermal',
    title: 'THERMAL DYNAMICS',
    rows: [
      { label: 'Cooling System', value: 'Dual Vapor Chamber' },
      { label: 'Acoustics', value: '< 22dBA under load' }
    ]
  }
];
