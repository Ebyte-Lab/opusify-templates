import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { ReadingProgressBar } from './ReadingProgressBar';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ReadingProgressBar />
      <AppHeader />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
    </div>
  );
};
