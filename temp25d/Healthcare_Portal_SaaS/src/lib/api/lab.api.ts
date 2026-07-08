import { getFromStorage, saveToStorage, delay } from './client';
import { LabOrder, LabResult } from '../../types/lab.types';

export const labApi = {
  getLabOrders: async (): Promise<LabOrder[]> => {
    await delay();
    return getFromStorage<LabOrder[]>('nexus_labs');
  },

  getLabOrdersByPatientId: async (patientId: string): Promise<LabOrder[]> => {
    await delay();
    const labs = getFromStorage<LabOrder[]>('nexus_labs');
    return labs.filter((l) => l.patientId === patientId);
  },

  createLabOrder: async (labOrder: Omit<LabOrder, 'id' | 'status' | 'orderedAt'>): Promise<LabOrder> => {
    await delay();
    const labs = getFromStorage<LabOrder[]>('nexus_labs');

    const newOrder: LabOrder = {
      ...labOrder,
      id: `LAB-${String(labs.length + 1).padStart(3, '0')}`,
      status: 'pending',
      orderedAt: new Date().toISOString(),
    };

    labs.push(newOrder);
    saveToStorage('nexus_labs', labs);
    return newOrder;
  },

  updateLabResult: async (id: string, result: LabResult): Promise<LabOrder> => {
    await delay();
    const labs = getFromStorage<LabOrder[]>('nexus_labs');
    const index = labs.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Lab order not found');

    const updated: LabOrder = {
      ...labs[index],
      status: 'completed',
      completedAt: new Date().toISOString(),
      result,
    };

    labs[index] = updated;
    saveToStorage('nexus_labs', labs);
    return updated;
  },
};
