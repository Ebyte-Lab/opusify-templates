import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { useUIStore } from '../../stores/uiStore';

export const AppShell: React.FC = () => {
  const { collabSimulationActive } = useUIStore();
  const [cursor1, setCursor1] = useState({ x: 300, y: 200 });
  const [cursor2, setCursor2] = useState({ x: 500, y: 400 });

  useEffect(() => {
    if (!collabSimulationActive) return;

    const interval = setInterval(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      setCursor1({
        x: Math.floor(Math.random() * (w - 250)) + 100,
        y: Math.floor(Math.random() * (h - 200)) + 80
      });
      
      setCursor2({
        x: Math.floor(Math.random() * (w - 250)) + 100,
        y: Math.floor(Math.random() * (h - 200)) + 80
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [collabSimulationActive]);

  return (
    <div className="flex bg-surface text-gray-200 min-h-screen overflow-x-hidden select-none">
      {/* Collaborator Cursor 1 */}
      {collabSimulationActive && (
        <div
          className="fixed pointer-events-none z-[100] flex flex-col gap-1 items-start transition-all duration-[1200ms] ease-out"
          style={{ left: cursor1.x, top: cursor1.y }}
        >
          <div className="flex items-center gap-1.5 bg-[#8B5CF6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
            <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
            <span>Sarah J. (UI/UX)</span>
          </div>
          <svg className="text-[#8B5CF6] h-4.5 w-4.5 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 2l16 11-7.5.5-4 7.5z" />
          </svg>
        </div>
      )}

      {/* Collaborator Cursor 2 */}
      {collabSimulationActive && (
        <div
          className="fixed pointer-events-none z-[100] flex flex-col gap-1 items-start transition-all duration-[1200ms] ease-out"
          style={{ left: cursor2.x, top: cursor2.y }}
        >
          <div className="flex items-center gap-1.5 bg-[#10B981] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
            <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
            <span>Devon K. (3D Lead)</span>
          </div>
          <svg className="text-[#10B981] h-4.5 w-4.5 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 2l16 11-7.5.5-4 7.5z" />
          </svg>
        </div>
      )}

      {/* Sidebar Layout */}
      <Sidebar />

      {/* Main Panel Viewport */}
      <div className="flex-grow flex flex-col min-w-0 min-h-screen">
        <Topbar />

        <main className="flex-grow p-4 sm:p-8 overflow-y-auto pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Bottom Nav Bar on Mobile */}
      <MobileNav />
    </div>
  );
};
