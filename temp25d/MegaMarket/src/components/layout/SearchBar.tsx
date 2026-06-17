import React from 'react';
import { Search } from 'lucide-react';
import { allCategories } from '../../data/departments';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isMobile?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isMobile = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isMobile) {
    return (
      <form
        onSubmit={handleSubmit}
        className="md:hidden px-4 pb-3 flex w-full"
      >
        <div className="flex flex-1 items-center rounded-md overflow-hidden bg-white">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 px-4 py-2 text-text outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-orange-600 px-4 py-2 transition-colors"
            aria-label="Submit Search query"
          >
            <Search size={18} className="text-white" />
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden md:flex flex-1 max-w-3xl items-center rounded-md overflow-hidden bg-white"
    >
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="bg-gray-100 text-gray-700 text-sm px-3 py-2.5 border-r border-gray-300 outline-none hover:bg-gray-200 cursor-pointer"
        aria-label="Select search category"
      >
        {allCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search MEGA MARKET..."
        className="flex-1 px-4 py-2.5 text-text outline-none text-sm"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-orange-600 px-6 py-2.5 transition-colors"
        aria-label="Submit search query"
      >
        <Search size={20} className="text-white font-bold" />
      </button>
    </form>
  );
};
export default SearchBar;
