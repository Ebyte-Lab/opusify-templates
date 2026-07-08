// Fictional local-storage backed mock state manager
import { mockPatients } from '../mock/patients.mock';
import { mockAppointments } from '../mock/appointments.mock';
import { mockDoctors } from '../mock/doctors.mock';
import { mockLabOrders } from '../mock/lab.mock';
import { mockPrescriptions } from '../mock/prescriptions.mock';
import { mockInvoices } from '../mock/billing.mock';

export const initStorage = () => {
  if (!localStorage.getItem('nexus_patients')) {
    localStorage.setItem('nexus_patients', JSON.stringify(mockPatients));
  }
  if (!localStorage.getItem('nexus_appointments')) {
    localStorage.setItem('nexus_appointments', JSON.stringify(mockAppointments));
  }
  if (!localStorage.getItem('nexus_doctors')) {
    localStorage.setItem('nexus_doctors', JSON.stringify(mockDoctors));
  }
  if (!localStorage.getItem('nexus_labs')) {
    localStorage.setItem('nexus_labs', JSON.stringify(mockLabOrders));
  }
  if (!localStorage.getItem('nexus_prescriptions')) {
    localStorage.setItem('nexus_prescriptions', JSON.stringify(mockPrescriptions));
  }
  if (!localStorage.getItem('nexus_invoices')) {
    localStorage.setItem('nexus_invoices', JSON.stringify(mockInvoices));
  }
};

export const getFromStorage = <T>(key: string): T => {
  initStorage();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [] as unknown as T;
};

export const saveToStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const delay = (ms: number = 200) => new Promise((resolve) => setTimeout(resolve, ms));
