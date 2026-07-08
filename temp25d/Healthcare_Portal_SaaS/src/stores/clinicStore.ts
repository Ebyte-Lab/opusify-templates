import { create } from 'zustand';
import { Clinic } from '../types/common.types';

interface ClinicState {
  clinic: Clinic | null;
  plan: 'starter' | 'professional' | 'enterprise';
  setClinic: (clinic: Clinic) => void;
  setPlan: (plan: 'starter' | 'professional' | 'enterprise') => void;
}

export const useClinicStore = create<ClinicState>((set) => ({
  clinic: {
    id: 'CL-001',
    name: 'NEXUS_MED Central',
    address: '425 Medical Plaza Suite 100, New York, NY 10016',
    phone: '555-010-8800',
    email: 'info@nexusmed.com',
    specialty: 'Multispecialty Group Practice',
    licenseNumber: 'LIC-MED-88301',
    timezone: 'America/New_York',
  },
  plan: 'enterprise',
  setClinic: (clinic) => set({ clinic }),
  setPlan: (plan) => set({ plan }),
}));
