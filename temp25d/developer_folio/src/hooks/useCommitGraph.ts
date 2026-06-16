import { useMemo } from 'react';
import type { ContributionData, CommitSquare, CommitLevel } from '../types';

const COLS = 30;
const ROWS = 5;
const SEED = 42; // Fixed seed for reproducible randomness

function mulberry32(a: number) {
  return function() {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function useCommitGraph(): ContributionData {
  return useMemo(() => {
    const random = mulberry32(SEED);
    const grid: CommitSquare[][] = [];
    let totalCommits = 0;

    for (let i = 0; i < COLS; i++) {
      const col: CommitSquare[] = [];
      for (let j = 0; j < ROWS; j++) {
        const rand = random();
        let level: CommitLevel = 0;

        if (rand > 0.3 && rand < 0.6) {
          level = 1;
          totalCommits += Math.floor(rand * 3) + 1;
        } else if (rand >= 0.6 && rand < 0.85) {
          level = 2;
          totalCommits += Math.floor(rand * 6) + 4;
        } else if (rand >= 0.85) {
          level = 3;
          totalCommits += Math.floor(rand * 10) + 10;
        }

        const animationDelay = random() * 2; // Precompute random delay (0-2s)
        col.push({ level, animationDelay });
      }
      grid.push(col);
    }

    return {
      totalCommits,
      year: 2026,
      grid,
    };
  }, []);
}
