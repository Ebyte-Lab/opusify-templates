import { getFromStorage, saveToStorage, delay } from './client';
import { Invoice } from '../../types/billing.types';

export const billingApi = {
  getInvoices: async (): Promise<Invoice[]> => {
    await delay();
    return getFromStorage<Invoice[]>('nexus_invoices');
  },

  getInvoiceById: async (id: string): Promise<Invoice | undefined> => {
    await delay();
    const invoices = getFromStorage<Invoice[]>('nexus_invoices');
    return invoices.find((i) => i.id === id);
  },

  getInvoicesByPatientId: async (patientId: string): Promise<Invoice[]> => {
    await delay();
    const invoices = getFromStorage<Invoice[]>('nexus_invoices');
    return invoices.filter((i) => i.patientId === patientId);
  },

  createInvoice: async (invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'issuedAt' | 'amountPaid' | 'status'>): Promise<Invoice> => {
    await delay();
    const invoices = getFromStorage<Invoice[]>('nexus_invoices');

    const nextIdNum = invoices.length + 1;
    const newInvoice: Invoice = {
      ...invoice,
      id: `INV-2026-${String(nextIdNum).padStart(4, '0')}`,
      invoiceNumber: `INV-2026-${String(nextIdNum).padStart(4, '0')}`,
      amountPaid: 0,
      status: 'pending',
      issuedAt: new Date().toISOString(),
    };

    invoices.push(newInvoice);
    saveToStorage('nexus_invoices', invoices);
    return newInvoice;
  },

  recordPayment: async (id: string, amount: number): Promise<Invoice> => {
    await delay();
    const invoices = getFromStorage<Invoice[]>('nexus_invoices');
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Invoice not found');

    const invoice = invoices[index];
    const newAmountPaid = invoice.amountPaid + amount;
    
    let status: Invoice['status'] = 'partially_paid';
    if (newAmountPaid >= invoice.patientOwed) {
      status = 'paid';
    }

    const updated: Invoice = {
      ...invoice,
      amountPaid: newAmountPaid,
      status,
      paidAt: status === 'paid' ? new Date().toISOString() : undefined,
    };

    invoices[index] = updated;
    saveToStorage('nexus_invoices', invoices);
    return updated;
  },

  cancelInvoice: async (id: string): Promise<Invoice> => {
    await delay();
    const invoices = getFromStorage<Invoice[]>('nexus_invoices');
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Invoice not found');

    const updated: Invoice = {
      ...invoices[index],
      status: 'cancelled',
    };

    invoices[index] = updated;
    saveToStorage('nexus_invoices', invoices);
    return updated;
  },
};
