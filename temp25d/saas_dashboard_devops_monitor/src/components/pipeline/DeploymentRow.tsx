import React, { useState } from 'react';
import { Deployment } from '../../types';
import { PipelineStages } from './PipelineStages';

interface DeploymentRowProps {
  deployment: Deployment;
}

export const DeploymentRow: React.FC<DeploymentRowProps> = ({ deployment }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    service,
    version,
    environment,
    status,
    triggeredBy,
    branch,
    commit,
    startedAt,
    duration,
    stages
  } = deployment;

  // Environment badge styles
  let envStyle = 'border-zinc-800 bg-zinc-900 text-zinc-400';
  if (environment === 'production') {
    envStyle = 'border-purple-800/40 bg-purple-950/20 text-purple-400';
  } else if (environment === 'staging') {
    envStyle = 'border-blue-800/40 bg-blue-950/20 text-blue-400';
  }

  // Status badge styles
  let statusStyle = 'border-zinc-800 bg-zinc-900 text-zinc-500';
  if (status === 'success') {
    statusStyle = 'border-emerald-800/40 bg-emerald-950/20 text-emerald-400';
  } else if (status === 'failed') {
    statusStyle = 'border-red-800/40 bg-red-950/20 text-red-400';
  } else if (status === 'running') {
    statusStyle = 'border-amber-800/40 bg-amber-950/20 text-amber-400 animate-pulse';
  }

  return (
    <>
      <tr 
        onClick={() => setIsExpanded(!isExpanded)}
        className="border-b border-zinc-800/60 hover:bg-zinc-900/30 transition-all font-mono text-[11px] cursor-pointer"
      >
        {/* Service + Branch */}
        <td className="px-6 py-4">
          <div className="font-heading font-semibold text-white text-xs">{service}</div>
          <div className="text-[9px] text-zinc-500 mt-0.5">
            branch: <span className="text-zinc-400">{branch}</span> @{' '}
            <span className="text-zinc-500">{commit}</span>
          </div>
        </td>

        {/* Version */}
        <td className="px-6 py-4 text-zinc-300 font-semibold">{version}</td>

        {/* Environment */}
        <td className="px-6 py-4">
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase ${envStyle}`}>
            {environment}
          </span>
        </td>

        {/* Status */}
        <td className="px-6 py-4">
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase ${statusStyle}`}>
            {status}
          </span>
        </td>

        {/* Triggered By */}
        <td className="px-6 py-4 text-zinc-400">{triggeredBy}</td>

        {/* Started */}
        <td className="px-6 py-4 text-zinc-500">{startedAt}</td>

        {/* Duration */}
        <td className="px-6 py-4 text-zinc-400">{duration || '--'}</td>

        {/* Quick status dots summary */}
        <td className="px-6 py-4 hidden lg:table-cell">
          <div className="flex gap-1">
            {stages.map((stage) => {
              let dotColor = 'bg-zinc-800';
              if (stage.status === 'success') dotColor = 'bg-emerald-500';
              else if (stage.status === 'failed') dotColor = 'bg-red-500';
              else if (stage.status === 'running') dotColor = 'bg-amber-500 animate-pulse';
              return (
                <span 
                  key={stage.name} 
                  className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
                  title={`${stage.name}: ${stage.status}`}
                />
              );
            })}
          </div>
        </td>

        {/* Actions View Toggle */}
        <td className="px-6 py-4 text-right">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-[9px] font-sans font-bold uppercase tracking-wider text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded transition-colors"
          >
            {isExpanded ? 'Hide' : 'View'}
          </button>
        </td>
      </tr>

      {/* Expanded Stages Sub-row */}
      {isExpanded && (
        <tr>
          <td colSpan={9} className="px-6 py-3 bg-zinc-950/20 border-b border-zinc-800/80">
            <div className="py-1">
              <PipelineStages stages={stages} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
