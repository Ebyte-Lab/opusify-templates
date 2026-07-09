import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';

// Layout
import { Header } from './components/layout/Header';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Footer } from './components/layout/Footer';
import { ToastViewport } from './components/layout/ToastViewport';
import { ReadingProgressBar } from './components/layout/ReadingProgressBar';

// Pages
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { StylePage } from './pages/StylePage';
import { StyleDetailPage } from './pages/StyleDetailPage';
import { WellnessPage } from './pages/WellnessPage';
import { WellnessDetailPage } from './pages/WellnessDetailPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary/20 selection:text-text">
      {/* Reading Progress Indicator */}
      <ReadingProgressBar />

      {/* Header */}
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
        <Route path="/style" element={<StylePage />} />
        <Route path="/style/:slug" element={<StyleDetailPage />} />
        <Route path="/wellness" element={<WellnessPage />} />
        <Route path="/wellness/:slug" element={<WellnessDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Toast Notification Container */}
      <ToastViewport />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </Router>
  );
}
