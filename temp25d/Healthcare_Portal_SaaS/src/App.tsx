import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from './components/layout/AppShell';

// Import features
import { DashboardPage } from './features/dashboard/DashboardPage';
import { PatientsPage } from './features/patients/PatientsPage';
import { PatientDetailPage } from './features/patients/PatientDetailPage';
import { NewPatientPage } from './features/patients/NewPatientPage';
import { AppointmentsPage } from './features/appointments/AppointmentsPage';
import { DoctorsPage } from './features/doctors/DoctorsPage';
import { LabOrdersPage } from './features/lab/LabOrdersPage';
import { PrescriptionsPage } from './features/prescriptions/PrescriptionsPage';
import { BillingPage } from './features/billing/BillingPage';
import { ReportsPage } from './features/reports/ReportsPage';
import { MessagesPage } from './features/messages/MessagesPage';
import { NotificationsPage } from './features/notifications/NotificationsPage';
import { SettingsPage } from './features/settings/SettingsPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Main App Layout containing nested routes */}
          <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="patients/new" element={<NewPatientPage />} />
            <Route path="patients/:id" element={<PatientDetailPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="lab" element={<LabOrdersPage />} />
            <Route path="prescriptions" element={<PrescriptionsPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
