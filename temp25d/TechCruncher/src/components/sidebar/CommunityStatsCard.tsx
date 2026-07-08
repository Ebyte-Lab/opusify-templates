import React from 'react';
import type { CommunityStats } from '../../types';

export const CommunityStatsCard: React.FC = () => {
  const stats: CommunityStats = {
    readerCount: '128k',
    syncStatus: 'NOMINAL',
    version: 'v1.0.0',
  };

  return (
    <div className="bg-gradient-to-br from-primary to-green-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
      <span className="text-[9px] font-mono tracking-widest uppercase text-green-200">
        Community Stats
      </span>
      <h3 className="font-heading text-2xl uppercase tracking-wider mt-2">
        {stats.readerCount} Dispatch Readers
      </h3>
      <p className="text-xs text-green-100 mt-2 leading-relaxed">
        Read on-chain updates, hardware spec breakdowns, and developmental code briefs.
      </p>
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono">
        <span>
          SYNC STATUS:{' '}
          <strong className="font-bold text-green-200">{stats.syncStatus}</strong>
        </span>
        <span className="opacity-80">{stats.version}</span>
      </div>
    </div>
  );
};
export default CommunityStatsCard;
