import { getFromStorage, saveToStorage, delay } from './client';
import { Appointment, SOAPNote } from '../../types/appointment.types';

export const appointmentsApi = {
  getAppointments: async (): Promise<Appointment[]> => {
    await delay();
    return getFromStorage<Appointment[]>('nexus_appointments');
  },

  getAppointmentById: async (id: string): Promise<Appointment | undefined> => {
    await delay();
    const appointments = getFromStorage<Appointment[]>('nexus_appointments');
    return appointments.find((a) => a.id === id);
  },

  createAppointment: async (appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> => {
    await delay();
    const appointments = getFromStorage<Appointment[]>('nexus_appointments');
    
    const newAppointment: Appointment = {
      ...appointment,
      id: `APP-${String(appointments.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);
    saveToStorage('nexus_appointments', appointments);
    return newAppointment;
  },

  updateAppointmentStatus: async (id: string, status: Appointment['status']): Promise<Appointment> => {
    await delay();
    const appointments = getFromStorage<Appointment[]>('nexus_appointments');
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Appointment not found');

    const updated = { ...appointments[index], status };
    appointments[index] = updated;
    saveToStorage('nexus_appointments', appointments);
    return updated;
  },

  updateConsultationNotes: async (id: string, notes: SOAPNote): Promise<Appointment> => {
    await delay();
    const appointments = getFromStorage<Appointment[]>('nexus_appointments');
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Appointment not found');

    const updated = { ...appointments[index], consultationNotes: notes };
    appointments[index] = updated;
    saveToStorage('nexus_appointments', appointments);
    return updated;
  },
};
