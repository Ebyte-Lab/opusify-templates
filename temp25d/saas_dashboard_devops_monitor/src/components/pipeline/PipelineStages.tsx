import React from 'react';
import { DeploymentStage } from '../../types';

interface PipelineStagesProps {
  stages: DeploymentStage[];
}

export const PipelineStages: React.FC<PipelineStagesProps> = ({ stages }) => {
  return (
    <div className="flex items-center gap-3 bg-zinc-950/60 p-3 rounded border border-zinc-900 font-mono text-[10px]">
      <span className="text-zinc-500 uppercase tracking-wider mr-2 select-none">
        Stages:
      </span>
      <div className="flex items-center gap-4 flex-wrap">
        {stages.map((stage, idx) => {
          let statusIcon = null;
          let textColor = 'text-zinc-500';

          if (stage.status === 'success') {
            statusIcon = (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-emerald-500"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            );
            textColor = 'text-zinc-300';
          } else if (stage.status === 'failed') {
            statusIcon = (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-red-500"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            );
            textColor = 'text-red-400 font-bold';
          } else if (stage.status === 'running') {
            statusIcon = (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-amber-500 animate-spin"
              >
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
            );
            textColor = 'text-amber-400 font-bold';
          } else {
            // pending
            statusIcon = <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 block" />;
            textColor = 'text-zinc-600';
          }

          return (
            <React.Fragment key={stage.name}>
              {idx > 0 && <span className="text-zinc-700 select-none">→</span>}
              <div className="flex items-center gap-1.5">
                <span className="flex items-center justify-center w-4 h-4 shrink-0">
                  {statusIcon}
                </span>
                <div className="flex flex-col">
                  <span className={`${textColor} font-semibold`}>{stage.name}</span>
                  {stage.duration !== '0s' && (
                    <span className="text-[8px] text-zinc-500">{stage.duration}</span>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
