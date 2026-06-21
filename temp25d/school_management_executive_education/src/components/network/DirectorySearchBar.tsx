import React from 'react';
import { Search, X } from 'lucide-react';
import { useDirectorySearch } from '@/hooks/useDirectorySearch';

export const DirectorySearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useDirectorySearch();

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text/40">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name, company, or title..."
        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-text/40"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text/40 hover:text-text transition-colors"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
