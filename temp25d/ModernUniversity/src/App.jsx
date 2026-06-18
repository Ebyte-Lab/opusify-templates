import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileHeader } from './components/layout/MobileHeader';
import { MobileOverlay } from './components/layout/MobileOverlay';
import { PageFooter } from './components/layout/PageFooter';
import { usePageTitle } from './hooks/usePageTitle';
import DashboardPage from './pages/DashboardPage';
import AcademicsPage from './pages/AcademicsPage';
import FinancialsPage from './pages/FinancialsPage';
import CampusLifePage from './pages/CampusLifePage';
import LibraryPage from './pages/LibraryPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const pageTitle = usePageTitle();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        window.dispatchEvent(new CustomEvent('close-all-modals'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg">
      {/* Mobile Header */}
      <MobileHeader />

      {/* Mobile Overlay backdrop */}
      <MobileOverlay />

      {/* Sidebar drawer */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Desktop Header */}
        <TopBar title={pageTitle} />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/financials" element={<FinancialsPage />} />
            <Route path="/campus-life" element={<CampusLifePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        {/* Common Page Footer */}
        <PageFooter />
      </div>
    </div>
  );
}

export default App;
