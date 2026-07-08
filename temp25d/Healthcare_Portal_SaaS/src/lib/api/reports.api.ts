import { getFromStorage, delay } from './client';
import { Appointment } from '../../types/appointment.types';
import { Invoice } from '../../types/billing.types';
import { LabOrder } from '../../types/lab.types';
import { Patient } from '../../types/patient.types';

export const reportsApi = {
  getSummaryStats: async () => {
    await delay();
    const appointments = getFromStorage<Appointment[]>('nexus_appointments');
    const invoices = getFromStorage<Invoice[]>('nexus_invoices');
    const labs = getFromStorage<LabOrder[]>('nexus_labs');
    const patients = getFromStorage<Patient[]>('nexus_patients');

    const totalPatients = patients.filter(p => p.status === 'active').length;
    
    // Fictional local timezone check for today's date
    const todayStr = '2026-07-08'; 
    const todayAppointments = appointments.filter(a => {
      const scheduledDate = a.scheduledAt.split('T')[0];
      return scheduledDate === todayStr && a.status !== 'cancelled';
    });

    const activeInvoices = invoices.filter(i => i.status !== 'cancelled');
    const totalBilled = activeInvoices.reduce((acc, curr) => acc + curr.patientOwed, 0);
    const totalCollected = activeInvoices.reduce((acc, curr) => acc + curr.amountPaid, 0);
    const outstanding = totalBilled - totalCollected;

    const criticalLabs = labs.filter(l => l.result?.interpretation === 'critical').length;

    return {
      activePatients: totalPatients,
      todayAppointments: todayAppointments.length,
      revenueCollected: totalCollected,
      outstandingBalance: outstanding,
      criticalAlertsCount: criticalLabs
    };
  },

  getMonthlyRevenue: async () => {
    await delay();
    const invoices = getFromStorage<Invoice[]>('nexus_invoices');
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueMap: Record<string, { billed: number; collected: number }> = {};
    
    months.forEach(m => {
      revenueMap[m] = { billed: 0, collected: 0 };
    });

    invoices.forEach(inv => {
      if (inv.status === 'cancelled') return;
      const date = new Date(inv.issuedAt);
      const monthLabel = months[date.getMonth()];
      revenueMap[monthLabel].billed += inv.patientOwed;
      revenueMap[monthLabel].collected += inv.amountPaid;
    });

    // Return May, Jun, Jul, Aug range for dashboard focus
    return [
      { month: 'May', Billed: revenueMap['May'].billed, Collected: revenueMap['May'].collected },
      { month: 'Jun', Billed: revenueMap['Jun'].billed, Collected: revenueMap['Jun'].collected },
      { month: 'Jul', Billed: revenueMap['Jul'].billed, Collected: revenueMap['Jul'].collected },
      { month: 'Aug', Billed: revenueMap['Aug'].billed, Collected: revenueMap['Aug'].collected },
    ];
  },

  getSpecialtyVolume: async () => {
    await delay();
    const appointments = getFromStorage<Appointment[]>('nexus_appointments');
    const doctors = getFromStorage<any[]>('nexus_doctors');

    const volumeMap: Record<string, number> = {};

    appointments.forEach(app => {
      if (app.status === 'cancelled') return;
      const doc = doctors.find(d => d.id === app.doctorId);
      const specialty = doc ? doc.specialty : 'General';
      volumeMap[specialty] = (volumeMap[specialty] || 0) + 1;
    });

    return Object.keys(volumeMap).map(specialty => ({
      specialty,
      appointments: volumeMap[specialty],
    }));
  }
};
