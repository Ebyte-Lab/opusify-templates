import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CourseProvider } from './context/CourseContext';
import { AppLayout } from './components/layout/AppLayout';
import { SyllabusPage } from './pages/SyllabusPage';
import { LessonPage } from './pages/LessonPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { QuizDetailPage } from './pages/QuizDetailPage';
import { AccountPage } from './pages/AccountPage';

const App: React.FC = () => {
  return (
    <CourseProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/lessons/color-theory" replace />} />
            <Route path="/syllabus" element={<SyllabusPage />} />
            <Route path="/lessons" element={<Navigate to="/lessons/color-theory" replace />} />
            <Route path="/lessons/:lessonSlug" element={<LessonPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quizzes/:quizSlug" element={<QuizDetailPage />} />
            <Route path="/account" element={<AccountPage />} />
            {/* Catch-all route redirecting back to home redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </CourseProvider>
  );
};

export default App;
