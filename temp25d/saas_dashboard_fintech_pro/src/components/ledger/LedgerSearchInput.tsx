import React from 'react';
import { Search } from 'lucide-react';

interface LedgerSearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export const LedgerSearchInput: React.FC<LedgerSearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-800 bg-gray-900/40 rounded-lg focus-within:border-primary/40 transition-colors">
      <Search className="w-3.5 h-3.5 text-text/45" />
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filter ledger..." 
        className="bg-transparent border-none outline-none text-xs text-white max-w-40 font-mono"
      />
    </div>
  );
};
