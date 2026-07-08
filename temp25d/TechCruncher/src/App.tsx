import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import TickerBar from './components/layout/TickerBar';
import Navbar from './components/layout/Navbar';
import MobileDrawer from './components/layout/MobileDrawer';
import Footer from './components/layout/Footer';
import ToastViewport from './components/layout/ToastViewport';

// Pages
import HomePage from './pages/HomePage';
import NewsListingPage from './pages/NewsListingPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ReviewsPage from './pages/ReviewsPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import PodcastsPage from './pages/PodcastsPage';
import EventsPage from './pages/EventsPage';
import SubscribePage from './pages/SubscribePage';
import NotFoundPage from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <ToastProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-300">
            {/* Top Trending Ticker Bar */}
            <TickerBar />

            {/* Sticky Navigation Bar */}
            <Navbar onMobileMenuOpen={openMobileMenu} />

            {/* Mobile Navigation Menu Drawer */}
            <MobileDrawer isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

            {/* Main Container */}
            <main className="flex-grow max-w-[1400px] mx-auto w-full px-6 md:px-12 py-8 space-y-12">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<NewsListingPage />} />
                <Route path="/news/:slug" element={<ArticleDetailPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/reviews/:slug" element={<ReviewDetailPage />} />
                <Route path="/podcasts" element={<PodcastsPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/subscribe" element={<SubscribePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Global Non-Disruptive Toast Notification wrapper */}
            <ToastViewport />
          </div>
        </Router>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default App;
