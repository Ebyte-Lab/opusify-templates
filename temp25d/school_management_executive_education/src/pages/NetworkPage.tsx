import React, { useState } from 'react';
import { useDirectorySearch } from '@/hooks/useDirectorySearch';
import { DirectoryListItem } from '@/components/network/DirectoryListItem';
import { DirectorySearchBar } from '@/components/network/DirectorySearchBar';
import { EmptyState } from '@/components/common/EmptyState';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

export const NetworkPage: React.FC = () => {
  const { searchQuery, setSearchQuery, members, toggleConnect } = useDirectorySearch();
  const [filterType, setFilterType] = useState<'all' | 'connected' | 'not-connected'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter based on connection type
  const connectionFiltered = members.filter((member) => {
    if (filterType === 'connected') return member.connected;
    if (filterType === 'not-connected') return !member.connected;
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(connectionFiltered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = connectionFiltered.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (type: 'all' | 'connected' | 'not-connected') => {
    setFilterType(type);
    setCurrentPage(1); // Reset page on filter change
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-text mb-2">Global Network</h1>
          <p className="text-text/70 text-sm max-w-2xl">
            Explore the executive network. Connect with fellow industry executives, global strategists, and alumni.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-sm px-4 py-2 text-xs font-bold text-text/60">
          Total Network: <strong className="text-primary">128 Executives</strong>
        </div>
      </div>

      {/* Directory Search & Filters Row */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Search Input */}
        <DirectorySearchBar />

        {/* Toggle Filters */}
        <div className="flex gap-2 bg-gray-50 border border-gray-250 p-1 rounded-sm text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => handleFilterChange('all')}
            className={clsx(
              'px-3 py-1.5 rounded-sm transition-colors focus:outline-none',
              filterType === 'all' ? 'bg-primary text-white' : 'text-text/60 hover:text-text'
            )}
          >
            All Cohort ({members.length})
          </button>
          <button
            onClick={() => handleFilterChange('connected')}
            className={clsx(
              'px-3 py-1.5 rounded-sm transition-colors focus:outline-none',
              filterType === 'connected' ? 'bg-primary text-white' : 'text-text/60 hover:text-text'
            )}
          >
            Connected ({members.filter((m) => m.connected).length})
          </button>
          <button
            onClick={() => handleFilterChange('not-connected')}
            className={clsx(
              'px-3 py-1.5 rounded-sm transition-colors focus:outline-none',
              filterType === 'not-connected' ? 'bg-primary text-white' : 'text-text/60 hover:text-text'
            )}
          >
            Suggestions
          </button>
        </div>
      </div>

      {/* Directory List Container */}
      {paginatedMembers.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col">
          <div className="divide-y divide-gray-100">
            {paginatedMembers.map((member) => (
              <DirectoryListItem
                key={member.id}
                member={member}
                onConnectToggle={toggleConnect}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <span className="text-xs font-semibold text-text/50">
                Showing <strong className="text-text">{startIndex + 1}</strong> to{' '}
                <strong className="text-text">
                  {Math.min(startIndex + itemsPerPage, connectionFiltered.length)}
                </strong>{' '}
                of <strong className="text-text">{connectionFiltered.length}</strong> executives
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 border border-gray-200 rounded-sm text-text/60 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus:outline-none"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={clsx(
                      'w-7 h-7 text-xs font-bold rounded-sm border transition-colors focus:outline-none',
                      currentPage === i + 1
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 text-text/70 hover:bg-gray-100'
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 border border-gray-200 rounded-sm text-text/60 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus:outline-none"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12">
          <EmptyState
            icon={<Users size={48} />}
            title="No connections match the query"
            description="Adjust your search filters or clear the query to find alumni, professors, and managers in the Executive Cohort."
            action={
              (searchQuery || filterType !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterType('all');
                  }}
                  className="bg-primary hover:bg-[#0A365C] text-white px-4 py-2 text-xs font-semibold rounded-sm transition-colors focus:outline-none"
                >
                  Clear All Filters
                </button>
              )
            }
          />
        </div>
      )}
    </div>
  );
};
export default NetworkPage;
