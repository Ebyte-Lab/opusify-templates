import { getFromStorage, saveToStorage, delay } from './client';
import { Patient } from '../../types/patient.types';

export const patientsApi = {
  getPatients: async (): Promise<Patient[]> => {
    await delay();
    return getFromStorage<Patient[]>('nexus_patients');
  },

  getPatientById: async (id: string): Promise<Patient | undefined> => {
    await delay();
    const patients = getFromStorage<Patient[]>('nexus_patients');
    return patients.find((p) => p.id === id);
  },

  createPatient: async (patient: Omit<Patient, 'id' | 'mrn' | 'createdAt'>): Promise<Patient> => {
    await delay();
    const patients = getFromStorage<Patient[]>('nexus_patients');
    
    // Generate new MRN and ID
    const nextIdNum = patients.length + 1;
    const newPatient: Patient = {
      ...patient,
      id: `PAT-${String(nextIdNum).padStart(3, '0')}`,
      mrn: `MRN-${20000 + nextIdNum}`,
      createdAt: new Date().toISOString(),
    };

    patients.push(newPatient);
    saveToStorage('nexus_patients', patients);
    return newPatient;
  },

  updatePatient: async (id: string, updatedFields: Partial<Patient>): Promise<Patient> => {
    await delay();
    const patients = getFromStorage<Patient[]>('nexus_patients');
    const index = patients.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Patient not found');

    const updatedPatient = { ...patients[index], ...updatedFields };
    patients[index] = updatedPatient;
    saveToStorage('nexus_patients', patients);
    return updatedPatient;
  },
};
