import type { Review } from '../types/product';

export const reviewsData: Review[] = [
  {
    id: 'rev-1',
    rating: 5,
    title: 'FLAWLESS EXECUTION',
    quote: '"Compile times dropped by 60%. The thermal management is unreal. Best rig I\'ve ever deployed."',
    userTag: 'USR_8492',
    verifiedTag: 'v2.0 VERIFIED'
  },
  {
    id: 'rev-2',
    rating: 5,
    title: 'AESTHETICS & POWER',
    quote: '"The display calibration is reference-level out of the box. Build quality is aerospace grade."',
    userTag: 'USR_1104',
    verifiedTag: 'v2.0 VERIFIED'
  },
  {
    id: 'rev-3',
    rating: 4,
    title: 'OVERKILL FOR MOST',
    quote: '"More power than I know what to do with. Battery life takes a hit when running local LLMs, but acceptable."',
    userTag: 'USR_0447',
    verifiedTag: 'v2.0 VERIFIED'
  }
];
