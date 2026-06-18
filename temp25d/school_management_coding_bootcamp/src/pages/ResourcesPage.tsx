import React, { useState } from 'react';
import { mockResources } from '../data/mockResources';
import { useFetchMock } from '../hooks/useFetchMock';
import { ResourceCard } from '../components/features/resources/ResourceCard';
import { Loader2 } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { data: resources, loading } = useFetchMock(mockResources, 300);
  const [filter, setFilter] = useState<'ALL' | 'documentation' | 'video' | 'repos' | 'cheatsheets'>('ALL');

  const getFilteredResources = () => {
    if (!resources) return [];
    if (filter === 'ALL') return resources;
    if (filter === 'repos') return resources.filter((r) => r.type === 'repo');
    if (filter === 'video') return resources.filter((r) => r.type === 'video');
    if (filter === 'documentation') return resources.filter((r) => r.type === 'doc');
    if (filter === 'cheatsheets') return resources.filter((r) => r.type === 'cheatsheet');
    return resources;
  };

  const categories = [
    { label: 'All Resources', value: 'ALL' },
    { label: 'Guides & Docs', value: 'documentation' },
    { label: 'Video Tutorials', value: 'video' },
    { label: 'Starter Repos', value: 'repos' },
    { label: 'Cheatsheets', value: 'cheatsheets' },
  ] as const;

  const filteredList = getFilteredResources();

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      <div className="border-b border-secondary pb-6">
        <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1 select-none">
          Cohort Repository
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
          Syllabus Resources
        </h1>
        <p className="text-sm text-text/70 mt-2 max-w-2xl">
          Quickly access reference guides, walkthrough screencasts, starter repositories, boilerplate zip files, and helper scripts approved by your instructors.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-secondary/50 select-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all border shrink-0 ${
              filter === cat.value
                ? 'bg-primary/10 text-primary border-primary/20'
                : 'bg-transparent text-text hover:bg-secondary border-transparent hover:border-secondary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredList.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};
