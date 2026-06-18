import React from 'react';
import { ProgressBar } from '../../ui/ProgressBar';

export const ModuleProgressCard: React.FC = () => {
  return (
    <div className="p-4 border-t border-secondary shrink-0">
      <div className="bg-secondary/50 rounded-lg p-4 border border-white/5">
        <h4 className="text-xs font-bold text-white mb-2 font-heading">Module 3 Progress</h4>
        <ProgressBar progress={65} className="mb-2" />
        <div className="flex justify-between text-[10px] text-text/60">
          <span>Advanced React</span>
          <span>65%</span>
        </div>
      </div>
    </div>
  );
};
