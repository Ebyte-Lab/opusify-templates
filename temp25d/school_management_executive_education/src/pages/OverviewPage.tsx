import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Users, Search, X } from 'lucide-react';
import { WelcomeBanner } from '@/components/overview/WelcomeBanner';
import { KpiCard } from '@/components/common/KpiCard';
import { SectionCard } from '@/components/common/SectionCard';
import { CertificationTrackList } from '@/components/overview/CertificationTrackList';
import { WebinarGrid } from '@/components/overview/WebinarGrid';
import { DirectoryPreviewList } from '@/components/overview/DirectoryPreviewList';
import { webinarsMockData } from '@/data/webinars';
import { useDirectorySearch } from '@/hooks/useDirectorySearch';

export const OverviewPage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useDirectorySearch();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchToggle = () => {
    if (showSearch) {
      setSearchQuery('');
    }
    setShowSearch(!showSearch);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          icon={<Clock size={24} />}
          value="42 / 60"
          label="CPD Credits Earned"
        />
        <KpiCard
          icon={<BookOpen size={24} />}
          value="3"
          label="Active Courses"
        />
        <KpiCard
          icon={<Users size={24} />}
          value="128"
          label="Cohort Connections"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (Certifications & Webinars) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Certification Tracks */}
          <SectionCard
            title="Certification Tracks"
            action={
              <Link to="/certificates" className="text-xs font-semibold text-primary hover:underline focus:outline-none">
                View All Programs
              </Link>
            }
          >
            <div className="p-6">
              <CertificationTrackList />
            </div>
          </SectionCard>

          {/* Upcoming Seminars */}
          <div>
            <h2 className="font-heading font-bold text-lg text-text mb-4">Upcoming Executive Seminars</h2>
            <WebinarGrid webinars={webinarsMockData.slice(0, 2)} />
          </div>
        </div>

        {/* Right Column (Networking Directory) */}
        <div className="lg:col-span-1">
          <SectionCard
            title="Cohort Directory"
            className="h-full flex flex-col"
            action={
              <button
                onClick={handleSearchToggle}
                className="text-text/40 hover:text-primary transition-colors focus:outline-none"
                title="Search connections"
              >
                {showSearch ? <X size={18} /> : <Search size={18} />}
              </button>
            }
            footer={
              <div className="text-center">
                <Link to="/network" className="text-sm font-semibold text-primary hover:underline">
                  Browse full directory (128)
                </Link>
              </div>
            }
          >
            {showSearch && (
              <div className="px-4 pt-3 pb-1 border-b border-gray-100">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter directory..."
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text/40"
                  autoFocus
                />
              </div>
            )}
            
            <div className="overflow-y-auto max-h-[385px] no-scrollbar">
              <DirectoryPreviewList />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};
export default OverviewPage;
