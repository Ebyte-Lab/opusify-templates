import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastViewport } from './components/layout/ToastViewport';
import { ReadingProgressBar } from './components/layout/ReadingProgressBar';

// Pages
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { SnippetsPage } from './pages/SnippetsPage';
import { SnippetDetailPage } from './pages/SnippetDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { RssPage } from './pages/RssPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ReadingProgressBar />
        <div className="min-h-screen flex flex-col relative overflow-x-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route path="/snippets" element={<SnippetsPage />} />
            <Route path="/snippets/:slug" element={<SnippetDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/rss" element={<RssPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <ToastViewport />
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}
