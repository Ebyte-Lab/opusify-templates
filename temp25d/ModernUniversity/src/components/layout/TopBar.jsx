import React from 'react';
import PropTypes from 'prop-types';
import { Search, Bell } from 'lucide-react';

export const TopBar = ({ title }) => {
  return (
    <div className="hidden md:flex bg-white px-8 py-4 border-b border-gray-200 items-center justify-between sticky top-0 z-30 shadow-sm">
      <h1 className="font-heading text-2xl font-bold text-text transition-all duration-300">
        {title}
      </h1>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses, resources..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64 bg-gray-50 text-text transition-all duration-200"
          />
        </div>
        <button
          className="relative text-gray-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 p-1.5 rounded-full"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  title: PropTypes.string.isRequired
};
