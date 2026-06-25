import React from 'react';
import { useTelemetry } from '../../hooks/useTelemetry';
import { GaugeCircle } from '../ui/GaugeCircle';

export const SystemGaugeGrid: React.FC = () => {
  const { metrics } = useTelemetry();

  // Network fills relative to 250 MB/s capacity
  const netPercentage = Math.floor((metrics.network / 250) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* CPU Gauge */}
      <div className="bg-secondary/40 border border-zinc-800/80 rounded p-4 relative overflow-hidden flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">
            CPU Pool Load
          </span>
          <h3 className="text-2xl font-bold font-mono text-white tracking-tight">
            {Math.round(metrics.cpu)}%
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono mt-1 select-none">
            &gt;_ Hyperthreads: 32 active
          </p>
        </div>
        <GaugeCircle value={metrics.cpu} label="CPU" size={64} />
      </div>

      {/* Memory Gauge */}
      <div className="bg-secondary/40 border border-zinc-800/80 rounded p-4 relative overflow-hidden flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">
            RAM Capacity
          </span>
          <h3 className="text-2xl font-bold font-mono text-white tracking-tight">
            {Math.round(metrics.memory)}%
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono mt-1 select-none">
            &gt;_ Swapped: 4.12 GB / 64GB
          </p>
        </div>
        <GaugeCircle value={metrics.memory} label="RAM" size={64} />
      </div>

      {/* Disk I/O Gauge */}
      <div className="bg-secondary/40 border border-zinc-800/80 rounded p-4 relative overflow-hidden flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">
            Disk I/O Write
          </span>
          <h3 className="text-2xl font-bold font-mono text-white tracking-tight">
            {Math.round(metrics.disk)}%
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono mt-1 select-none">
            &gt;_ IOPS: 12.4k raw
          </p>
        </div>
        <GaugeCircle value={metrics.disk} label="DISK" size={64} />
      </div>

      {/* Network Gauge */}
      <div className="bg-secondary/40 border border-zinc-800/80 rounded p-4 relative overflow-hidden flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">
            Network Throughput
          </span>
          <h3 className="text-2xl font-bold font-mono text-white tracking-tight">
            {Math.round(metrics.network)}MB/s
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono mt-1 select-none">
            &gt;_ Packet drop: 0.001%
          </p>
        </div>
        <GaugeCircle value={netPercentage} label="NET" size={64} />
      </div>
    </div>
  );
};
