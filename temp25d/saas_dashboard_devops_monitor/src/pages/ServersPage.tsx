import React, { useState } from 'react';
import { mockServers } from '../data/servers';
import { StatusDot } from '../components/ui/StatusDot';
import { MetricBar } from '../components/ui/MetricBar';
import { useTerminal } from '../hooks/useTerminal';

interface ToastMessage {
  id: string;
  message: string;
}

export const ServersPage: React.FC = () => {
  const [servers, setServers] = useState(mockServers);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const { write } = useTerminal();

  // Statistics calculations
  const totalNodes = servers.length;
  const onlineCount = servers.filter((s) => s.status === 'online').length;
  const degradedCount = servers.filter((s) => s.status === 'degraded').length;
  const offlineCount = servers.filter((s) => s.status === 'offline').length;

  const handleRestart = (hostname: string) => {
    // Show top-right toast
    const toastId = `toast-${Date.now()}`;
    const newToast: ToastMessage = {
      id: toastId,
      message: `System reboot signal transmitted to ${hostname}...`
    };
    setToasts((prev) => [...prev, newToast]);

    // Log to terminal emulator
    write(`Manual reboot sequence initiated for server [${hostname}] by admin.`, 'SYS');

    // Simulate recovery of degraded/offline servers locally for extra user-interaction wow!
    setServers((prev) =>
      prev.map((s) => {
        if (s.hostname === hostname && (s.status === 'degraded' || s.status === 'offline')) {
          write(`Server [${hostname}] recovery healthcheck: OK. Status set to ONLINE.`, 'SUCCESS');
          return { ...s, status: 'online', cpu: 25, memory: 40, disk: s.disk };
        }
        return s;
      })
    );

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 3000);
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-8rem)]">
      {/* Toast Notification Container */}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none select-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-zinc-900 border border-primary/30 text-white font-mono text-[10px] py-3 px-4 rounded shadow-2xl flex items-center gap-2 animate-[slideIn_0.2s_ease] border-l-4 border-l-primary pointer-events-auto"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-primary animate-pulse"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-heading font-extrabold uppercase tracking-tight text-white select-none">
          Server Fleet
        </h1>
        <p className="text-[10px] text-zinc-500 font-mono mt-0.5 select-none">
          &gt;_ Live resource utilization across all active cluster nodes
        </p>
      </div>

      {/* Fleet Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
        <div className="bg-secondary/40 border border-zinc-800/80 rounded p-3 flex items-center justify-between font-mono text-[11px]">
          <span className="text-zinc-500">Online Nodes</span>
          <span className="text-emerald-500 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#22C55E]"></span>
            {onlineCount}
          </span>
        </div>
        <div className="bg-secondary/40 border border-zinc-800/80 rounded p-3 flex items-center justify-between font-mono text-[11px]">
          <span className="text-zinc-500">Degraded Nodes</span>
          <span className="text-amber-500 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {degradedCount}
          </span>
        </div>
        <div className="bg-secondary/40 border border-zinc-800/80 rounded p-3 flex items-center justify-between font-mono text-[11px]">
          <span className="text-zinc-500">Offline Nodes</span>
          <span className="text-red-500 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {offlineCount}
          </span>
        </div>
        <div className="bg-secondary/40 border border-zinc-800/80 rounded p-3 flex items-center justify-between font-mono text-[11px]">
          <span className="text-zinc-500">Total Swarm</span>
          <span className="text-white font-bold">{totalNodes} nodes</span>
        </div>
      </div>

      {/* Server Table Panel */}
      <div className="bg-secondary/20 border border-zinc-800 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase select-none">
                <th className="px-6 py-3 font-semibold">Hostname</th>
                <th className="px-6 py-3 font-semibold">Zone</th>
                <th className="px-6 py-3 font-semibold">OS Distribution</th>
                <th className="px-6 py-3 font-semibold w-24 sm:w-32">CPU Load</th>
                <th className="px-6 py-3 font-semibold w-24 sm:w-32">RAM Usage</th>
                <th className="px-6 py-3 font-semibold w-24 sm:w-32">Disk Storage</th>
                <th className="px-6 py-3 font-semibold">Uptime</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((server) => (
                <tr
                  key={server.id}
                  className="border-b border-zinc-800/60 hover:bg-zinc-900/10 transition-colors font-mono text-[11px]"
                >
                  {/* Hostname with StatusDot */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusDot status={server.status} />
                      <span className="font-heading font-semibold text-white text-xs">
                        {server.hostname}
                      </span>
                    </div>
                  </td>

                  {/* Zone */}
                  <td className="px-6 py-4 text-zinc-400">{server.zone}</td>

                  {/* OS */}
                  <td className="px-6 py-4 text-zinc-500">{server.os}</td>

                  {/* CPU Bar */}
                  <td className="px-6 py-4">
                    <MetricBar value={server.cpu} />
                  </td>

                  {/* Memory Bar */}
                  <td className="px-6 py-4">
                    <MetricBar value={server.memory} />
                  </td>

                  {/* Disk Bar */}
                  <td className="px-6 py-4">
                    <MetricBar value={server.disk} />
                  </td>

                  {/* Uptime */}
                  <td className="px-6 py-4 text-zinc-400">{server.uptime}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right select-none">
                    <button
                      onClick={() => handleRestart(server.hostname)}
                      className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                      title="Reboot node"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
