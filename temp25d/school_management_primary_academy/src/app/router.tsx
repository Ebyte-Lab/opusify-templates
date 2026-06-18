import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { HomePage } from '../pages/HomePage';
import { ClassesPage } from '../pages/ClassesPage';
import { GradesPage } from '../pages/GradesPage';
import { AttendancePage } from '../pages/AttendancePage';
import { MessagesPage } from '../pages/MessagesPage';
import { CalendarPage } from '../pages/CalendarPage';
import { LunchMenuPage } from '../pages/LunchMenuPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'classes',
        element: <ClassesPage />,
      },
      {
        path: 'grades',
        element: <GradesPage />,
      },
      {
        path: 'attendance',
        element: <AttendancePage />,
      },
      {
        path: 'messages',
        element: <MessagesPage />,
      },
      {
        path: 'calendar',
        element: <CalendarPage />,
      },
      {
        path: 'lunch',
        element: <LunchMenuPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
export default router;
