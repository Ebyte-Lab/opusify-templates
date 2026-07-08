import { getFromStorage, saveToStorage, delay } from './client';
import { Prescription } from '../../types/prescription.types';

export const prescriptionsApi = {
  getPrescriptions: async (): Promise<Prescription[]> => {
    await delay();
    return getFromStorage<Prescription[]>('nexus_prescriptions');
  },

  getPrescriptionsByPatientId: async (patientId: string): Promise<Prescription[]> => {
    await delay();
    const prescriptions = getFromStorage<Prescription[]>('nexus_prescriptions');
    return prescriptions.filter((p) => p.patientId === patientId);
  },

  createPrescription: async (prescription: Omit<Prescription, 'id' | 'status' | 'prescribedAt'>): Promise<Prescription> => {
    await delay();
    const prescriptions = getFromStorage<Prescription[]>('nexus_prescriptions');

    const newPrescription: Prescription = {
      ...prescription,
      id: `RX-${String(prescriptions.length + 1).padStart(3, '0')}`,
      status: 'active',
      prescribedAt: new Date().toISOString(),
    };

    prescriptions.push(newPrescription);
    saveToStorage('nexus_prescriptions', prescriptions);
    return newPrescription;
  },

  cancelPrescription: async (id: string): Promise<Prescription> => {
    await delay();
    const prescriptions = getFromStorage<Prescription[]>('nexus_prescriptions');
    const index = prescriptions.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Prescription not found');

    const updated: Prescription = {
      ...prescriptions[index],
      status: 'cancelled',
    };

    prescriptions[index] = updated;
    saveToStorage('nexus_prescriptions', prescriptions);
    return updated;
  },
};
