import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TickerRibbon } from './components/layout/TickerRibbon';
import { MobileHeader } from './components/layout/MobileHeader';
import { TraceModal } from './components/ledger/TraceModal';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { PortfoliosPage } from './pages/PortfoliosPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-x-hidden">
      {/* Mobile Navigation Header */}
      <MobileHeader />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Layout Container */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Sticky Ticker Header */}
        <TickerRibbon />

        {/* Dynamic Page Views */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/portfolios" element={<PortfoliosPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Fallback to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>

      {/* Unified Global Trace Modal */}
      <TraceModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
};

export default App;
