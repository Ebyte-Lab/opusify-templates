import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TelemetryProvider } from './context/TelemetryContext';
import { AlertsProvider } from './context/AlertsContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileHeader } from './components/layout/MobileHeader';
import { OverviewPage } from './pages/OverviewPage';
import { ServersPage } from './pages/ServersPage';
import { DeploymentsPage } from './pages/DeploymentsPage';
import { LogsPage } from './pages/LogsPage';
import { AlertsPage } from './pages/AlertsPage';

export const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AlertsProvider>
      <TelemetryProvider>
        <Router>
          <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-bg text-white select-none">
            {/* Sidebar Navigation */}
            <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

            {/* Main Application Interface */}
            <div className="flex-grow flex flex-col h-full overflow-hidden">
              {/* Mobile View Header */}
              <MobileHeader onToggle={() => setMobileOpen(!mobileOpen)} />

              {/* Cluster Wide Top Bar */}
              <TopBar />

              {/* Scrollable Viewport */}
              <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-bg/40 scrollbar-thin scrollbar-thumb-zinc-800">
                <Routes>
                  <Route path="/" element={<OverviewPage />} />
                  <Route path="/servers" element={<ServersPage />} />
                  <Route path="/deployments" element={<DeploymentsPage />} />
                  <Route path="/logs" element={<LogsPage />} />
                  <Route path="/alerts" element={<AlertsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </TelemetryProvider>
    </AlertsProvider>
  );
};

export default App;
