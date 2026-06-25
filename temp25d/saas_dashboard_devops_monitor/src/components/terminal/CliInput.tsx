import React, { useState } from 'react';

interface CliInputProps {
  onExecute: (command: string) => void;
}

export const CliInput: React.FC<CliInputProps> = ({ onExecute }) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = value.trim();
      if (trimmed) {
        onExecute(trimmed);
        setValue('');
      }
    }
  };

  const handleQuickAction = (cmd: string) => {
    onExecute(cmd);
  };

  return (
    <div className="bg-zinc-950 border-t border-zinc-800/80 px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs select-none">
      <div className="flex items-center gap-2 flex-grow text-white">
        <span className="text-primary font-bold">root@opusify-cluster:~$</span>
        <div className="flex-grow flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type diagnostic command (e.g. ping db, rebuild-cache, help)..."
            className="bg-transparent border-none outline-none text-zinc-200 w-full py-0.5"
          />
          <span className="text-primary font-bold animate-pulse ml-0.5">|</span>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => handleQuickAction('ping db')}
          className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all"
        >
          Ping DB
        </button>
        <button
          onClick={() => handleQuickAction('rebuild-cache')}
          className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all"
        >
          Rebuild Cache
        </button>
      </div>
    </div>
  );
};
