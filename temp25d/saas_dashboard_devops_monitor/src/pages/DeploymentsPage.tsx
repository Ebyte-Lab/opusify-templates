import React, { useState } from 'react';
import { mockDeployments } from '../data/deployments';
import { DeploymentRow } from '../components/pipeline/DeploymentRow';

type EnvFilter = 'ALL' | 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';

export const DeploymentsPage: React.FC = () => {
  const [filter, setFilter] = useState<EnvFilter>('ALL');

  // Counts for summary chips
  const countAll = mockDeployments.length;
  const countProd = mockDeployments.filter((d) => d.environment === 'production').length;
  const countStaging = mockDeployments.filter((d) => d.environment === 'staging').length;
  const countDev = mockDeployments.filter((d) => d.environment === 'development').length;

  // Filtered dataset
  const filteredDeployments = mockDeployments.filter((d) => {
    if (filter === 'ALL') return true;
    return d.environment.toUpperCase() === filter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-heading font-extrabold uppercase tracking-tight text-white select-none">
          Deployments
        </h1>
        <p className="text-[10px] text-zinc-500 font-mono mt-0.5 select-none">
          &gt;_ CI/CD pipeline runs and build releases across all services
        </p>
      </div>

      {/* Filter Toolbar & Summary Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between select-none">
        {/* Tabs */}
        <div className="flex bg-secondary p-1 rounded border border-zinc-800 self-start font-mono text-[10px]">
          {(['ALL', 'PRODUCTION', 'STAGING', 'DEVELOPMENT'] as EnvFilter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded uppercase font-bold transition-all ${
                filter === tab
                  ? 'bg-primary text-black font-semibold'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Counts summary row */}
        <div className="flex gap-2 flex-wrap font-mono text-[10px]">
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-3 py-1.5 rounded">
            ALL: <b className="text-white">{countAll}</b>
          </span>
          <span className="bg-purple-950/20 border border-purple-800/40 text-purple-400 px-3 py-1.5 rounded">
            PROD: <b className="text-white">{countProd}</b>
          </span>
          <span className="bg-blue-950/20 border border-blue-800/40 text-blue-400 px-3 py-1.5 rounded">
            STAGING: <b className="text-white">{countStaging}</b>
          </span>
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-500 px-3 py-1.5 rounded">
            DEV: <b className="text-white">{countDev}</b>
          </span>
        </div>
      </div>

      {/* Deployments Table Panel */}
      <div className="bg-secondary/20 border border-zinc-800 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase select-none">
                <th className="px-6 py-3 font-semibold">Service & Branch</th>
                <th className="px-6 py-3 font-semibold">Release Version</th>
                <th className="px-6 py-3 font-semibold">Environment</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Triggered By</th>
                <th className="px-6 py-3 font-semibold">Started</th>
                <th className="px-6 py-3 font-semibold">Duration</th>
                <th className="px-6 py-3 font-semibold hidden lg:table-cell">Stages Summary</th>
                <th className="px-6 py-3 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeployments.length > 0 ? (
                filteredDeployments.map((dep) => (
                  <DeploymentRow key={dep.id} deployment={dep} />
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-zinc-500 font-mono text-xs">
                    NO_DEPLOYMENTS_FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
