import React from 'react';
import { TerminalLine as ITerminalLine } from '../../types';

interface TerminalLineProps {
  line: ITerminalLine;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({ line }) => {
  const { type, message, timestamp } = line;

  let typeColor = 'text-zinc-400';
  let typeTag = `[${type}]`;

  if (type === 'INFO') {
    typeColor = 'text-cyan-400 font-bold';
  } else if (type === 'SUCCESS') {
    typeColor = 'text-emerald-500 font-bold';
  } else if (type === 'WARN') {
    typeColor = 'text-yellow-500 font-bold';
  } else if (type === 'ERROR') {
    typeColor = 'text-red-500 font-bold';
  } else if (type === 'SYS') {
    typeColor = 'text-zinc-500';
    typeTag = '>_';
  }

  return (
    <div className="font-mono text-xs leading-relaxed select-text">
      <span className="text-zinc-600 mr-2">[{timestamp}]</span>
      <span className={`${typeColor} mr-2`}>{typeTag}</span>
      <span className="text-zinc-300">{message}</span>
    </div>
  );
};
