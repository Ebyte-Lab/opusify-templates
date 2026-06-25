import React, { useState, useEffect, useRef } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { useTelemetry } from '../hooks/useTelemetry';
import { LogLevel } from '../types';

type LevelFilter = 'ALL' | LogLevel;

export const LogsPage: React.FC = () => {
  const { lines, clear } = useTerminal();
  const { isRunning, pause, resume } = useTelemetry();

  const [levelFilter, setLevelFilter] = useState<LevelFilter>('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new lines arrive
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines]);

  // List of mock services to populate the service dropdown
  const services = [
    'ALL',
    'api-gateway',
    'prod-db',
    'prod-cache',
    'frontend-web',
    'worker-queue',
    'docker-swarm'
  ];

  // Filtering logic
  const filteredLines = lines.filter((line) => {
    // 1. Level Filter
    if (levelFilter !== 'ALL' && line.type !== levelFilter) {
      return false;
    }

    // 2. Service Filter
    if (serviceFilter !== 'ALL') {
      const matchText = serviceFilter.toLowerCase();
      // Search for service name inside the message
      const containsService = line.message.toLowerCase().includes(matchText);
      
      // Special mappings for specific services
      const isDocker = matchText === 'docker-swarm' && line.message.toLowerCase().includes('docker');
      const isDb = matchText === 'prod-db' && line.message.toLowerCase().includes('postgres');
      const isCache = matchText === 'prod-cache' && line.message.toLowerCase().includes('redis');
      
      if (!containsService && !isDocker && !isDb && !isCache) {
        return false;
      }
    }

    // 3. Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchMessage = line.message.toLowerCase().includes(query);
      const matchLevel = line.type.toLowerCase().includes(query);
      if (!matchMessage && !matchLevel) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-heading font-extrabold uppercase tracking-tight text-white select-none">
          System Logs
        </h1>
        <p className="text-[10px] text-zinc-500 font-mono mt-0.5 select-none">
          &gt;_ Real-time log stream compiled from active cluster nodes
        </p>
      </div>

      {/* Toolbar: Filters & Controls */}
      <div className="bg-secondary/40 border border-zinc-800 rounded p-4 flex flex-col gap-4 select-none font-mono text-[10px]">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Level Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-zinc-500 uppercase font-bold mr-1">Level:</span>
            {(['ALL', 'INFO', 'WARN', 'ERROR', 'SUCCESS', 'SYS'] as LevelFilter[]).map((lvl) => {
              let activeClass = 'bg-primary text-black';
              if (levelFilter === lvl) {
                if (lvl === 'ERROR') activeClass = 'bg-red-500 text-white font-bold';
                else if (lvl === 'WARN') activeClass = 'bg-yellow-500 text-black font-bold';
                else if (lvl === 'SUCCESS') activeClass = 'bg-emerald-500 text-white font-bold';
                else if (lvl === 'INFO') activeClass = 'bg-cyan-400 text-black font-bold';
              }
              
              return (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-2 py-1 rounded transition-all border ${
                    levelFilter === lvl
                      ? activeClass + ' border-transparent'
                      : 'border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          {/* Controls: Pause & Clear */}
          <div className="flex items-center gap-2 self-start xl:self-auto">
            <button
              onClick={isRunning ? pause : resume}
              className={`px-3 py-1.5 rounded uppercase font-bold border transition-all ${
                isRunning
                  ? 'border-zinc-800 text-zinc-400 hover:text-white'
                  : 'bg-primary border-transparent text-black animate-pulse'
              }`}
            >
              {isRunning ? 'Pause Stream' : 'Resume Stream'}
            </button>
            <button
              onClick={clear}
              className="px-3 py-1.5 rounded uppercase font-bold border border-zinc-800 text-zinc-500 hover:text-white transition-all"
            >
              Clear Buffer
            </button>
          </div>
        </div>

        {/* Search and Service Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Service Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-500 uppercase font-bold">Filter Service</label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded px-3 py-2 outline-none focus:border-zinc-700 font-mono text-[11px]"
            >
              {services.map((srv) => (
                <option key={srv} value={srv}>
                  {srv.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-zinc-500 uppercase font-bold">Search Message</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded pl-8 pr-3 py-2 outline-none focus:border-zinc-700 font-mono text-[11px]"
              />
              <span className="absolute left-2.5 top-2.5 text-zinc-600">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Console Window */}
      <div className="bg-[#030303] border border-zinc-800 rounded p-4 h-[450px] overflow-y-auto font-mono text-xs text-zinc-300 flex flex-col scanline relative">
        <div className="flex-grow flex flex-col justify-end gap-1.5">
          {filteredLines.length > 0 ? (
            filteredLines.map((line) => {
              let typeColor = 'text-zinc-400';
              let typeTag = `[${line.type}]`;

              if (line.type === 'INFO') {
                typeColor = 'text-cyan-400 font-bold';
              } else if (line.type === 'SUCCESS') {
                typeColor = 'text-emerald-500 font-bold';
              } else if (line.type === 'WARN') {
                typeColor = 'text-yellow-500 font-bold';
              } else if (line.type === 'ERROR') {
                typeColor = 'text-red-500 font-bold';
              } else if (line.type === 'SYS') {
                typeColor = 'text-zinc-500';
                typeTag = '>_';
              }

              return (
                <div key={line.id} className="leading-relaxed hover:bg-zinc-900/40 py-0.5 rounded px-1 transition-colors select-text">
                  <span className="text-zinc-600 mr-2 select-none">[{line.timestamp}]</span>
                  <span className={`${typeColor} mr-2 select-none`}>{typeTag}</span>
                  <span className="text-zinc-300">{line.message}</span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-zinc-600 select-none">
              NO_LOGS_MATCHING_FILTER
            </div>
          )}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
};
