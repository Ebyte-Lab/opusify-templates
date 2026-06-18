import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ModulesPage } from './pages/ModulesPage';
import { AssignmentsPage } from './pages/AssignmentsPage';
import { AssignmentDetailPage } from './pages/AssignmentDetailPage';
import { GradesPage } from './pages/GradesPage';
import { DiscussionsPage } from './pages/DiscussionsPage';
import { DiscussionDetailPage } from './pages/DiscussionDetailPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Main App Layout shell */}
        <Route path="/" element={<AppShell />}>
          {/* Redirect index path to modules */}
          <Route index element={<Navigate to="/modules" replace />} />
          
          {/* Main Pages */}
          <Route path="modules" element={<ModulesPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="assignments/:id" element={<AssignmentDetailPage />} />
          <Route path="grades" element={<GradesPage />} />
          <Route path="discussions" element={<DiscussionsPage />} />
          <Route path="discussions/:id" element={<DiscussionDetailPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          
          {/* Fallback 404 Route nested inside AppShell */}
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
