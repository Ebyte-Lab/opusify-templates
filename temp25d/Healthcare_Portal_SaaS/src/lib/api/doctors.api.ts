import { getFromStorage, delay } from './client';
import { Doctor } from '../../types/doctor.types';

export const doctorsApi = {
  getDoctors: async (): Promise<Doctor[]> => {
    await delay();
    return getFromStorage<Doctor[]>('nexus_doctors');
  },

  getDoctorById: async (id: string): Promise<Doctor | undefined> => {
    await delay();
    const doctors = getFromStorage<Doctor[]>('nexus_doctors');
    return doctors.find((d) => d.id === id);
  },
};
