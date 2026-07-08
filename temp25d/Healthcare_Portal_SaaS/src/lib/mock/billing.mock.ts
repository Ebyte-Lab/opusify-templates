import { Invoice } from '../../types/billing.types';

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-2026-0001',
    invoiceNumber: 'INV-2026-0001',
    patientId: 'PAT-001',
    appointmentId: 'APP-011',
    lineItems: [
      { id: 'LI-001', description: 'Internal Med Consultation', quantity: 1, unitPrice: 150.00, total: 150.00 },
      { id: 'LI-002', description: 'Lipid Panel Blood Draw', quantity: 1, unitPrice: 45.00, total: 45.00 }
    ],
    subtotal: 195.00,
    insuranceCovered: 150.00,
    patientOwed: 45.00,
    amountPaid: 45.00,
    status: 'paid',
    issuedAt: '2026-06-15T15:00:00Z',
    dueAt: '2026-07-15T15:00:00Z',
    paidAt: '2026-06-16T10:00:00Z'
  },
  {
    id: 'INV-2026-0002',
    invoiceNumber: 'INV-2026-0002',
    patientId: 'PAT-002',
    appointmentId: 'APP-001',
    lineItems: [
      { id: 'LI-003', description: 'New Patient Assessment', quantity: 1, unitPrice: 200.00, total: 200.00 },
      { id: 'LI-004', description: 'HbA1c Screening Test', quantity: 1, unitPrice: 60.00, total: 60.00 }
    ],
    subtotal: 260.00,
    insuranceCovered: 180.00,
    patientOwed: 80.00,
    amountPaid: 0.00,
    status: 'pending',
    issuedAt: '2026-07-08T10:00:00Z',
    dueAt: '2026-08-08T10:00:00Z'
  },
  {
    id: 'INV-2026-0003',
    invoiceNumber: 'INV-2026-0003',
    patientId: 'PAT-003',
    appointmentId: 'APP-002',
    lineItems: [
      { id: 'LI-005', description: 'Cardiology Follow-up', quantity: 1, unitPrice: 175.00, total: 175.00 },
      { id: 'LI-006', description: 'Electrocardiogram (ECG)', quantity: 1, unitPrice: 120.00, total: 120.00 }
    ],
    subtotal: 295.00,
    insuranceCovered: 220.00,
    patientOwed: 75.00,
    amountPaid: 75.00,
    status: 'paid',
    issuedAt: '2026-07-08T12:00:00Z',
    dueAt: '2026-08-08T12:00:00Z',
    paidAt: '2026-07-08T13:30:00Z'
  },
  {
    id: 'INV-2026-0004',
    invoiceNumber: 'INV-2026-0004',
    patientId: 'PAT-004',
    appointmentId: 'APP-003',
    lineItems: [
      { id: 'LI-007', description: 'Orthopedic Special Consult', quantity: 1, unitPrice: 225.00, total: 225.00 },
      { id: 'LI-008', description: 'Knee Joint X-Ray (2 Views)', quantity: 1, unitPrice: 150.00, total: 150.00 }
    ],
    subtotal: 375.00,
    insuranceCovered: 300.00,
    patientOwed: 75.00,
    amountPaid: 0.00,
    status: 'pending',
    issuedAt: '2026-07-08T15:00:00Z',
    dueAt: '2026-08-08T15:00:00Z'
  },
  {
    id: 'INV-2026-0005',
    invoiceNumber: 'INV-2026-0005',
    patientId: 'PAT-005',
    appointmentId: 'APP-005',
    lineItems: [
      { id: 'LI-009', description: 'Pediatrics Consult', quantity: 1, unitPrice: 120.00, total: 120.00 },
      { id: 'LI-010', description: 'Spirometry Lung Test', quantity: 1, unitPrice: 95.00, total: 95.00 }
    ],
    subtotal: 215.00,
    insuranceCovered: 180.00,
    patientOwed: 35.00,
    amountPaid: 35.00,
    status: 'paid',
    issuedAt: '2026-07-07T11:00:00Z',
    dueAt: '2026-08-07T11:00:00Z',
    paidAt: '2026-07-07T11:15:00Z'
  },
  {
    id: 'INV-2026-0006',
    invoiceNumber: 'INV-2026-0006',
    patientId: 'PAT-006',
    appointmentId: 'APP-009',
    lineItems: [
      { id: 'LI-011', description: 'Specialist Consultation', quantity: 1, unitPrice: 200.00, total: 200.00 }
    ],
    subtotal: 200.00,
    insuranceCovered: 0.00,
    patientOwed: 200.00,
    amountPaid: 0.00,
    status: 'overdue',
    issuedAt: '2026-05-10T10:00:00Z',
    dueAt: '2026-06-10T10:00:00Z'
  },
  {
    id: 'INV-2026-0007',
    invoiceNumber: 'INV-2026-0007',
    patientId: 'PAT-007',
    appointmentId: 'APP-006',
    lineItems: [
      { id: 'LI-012', description: 'Consultation Visit', quantity: 1, unitPrice: 150.00, total: 150.00 }
    ],
    subtotal: 150.00,
    insuranceCovered: 120.00,
    patientOwed: 30.00,
    amountPaid: 15.00,
    status: 'partially_paid',
    issuedAt: '2026-07-06T15:00:00Z',
    dueAt: '2026-08-06T15:00:00Z'
  },
  {
    id: 'INV-2026-0008',
    invoiceNumber: 'INV-2026-0008',
    patientId: 'PAT-008',
    appointmentId: 'APP-009',
    lineItems: [
      { id: 'LI-013', description: 'Nerve Conduction Velocity Test', quantity: 1, unitPrice: 450.00, total: 450.00 }
    ],
    subtotal: 450.00,
    insuranceCovered: 350.00,
    patientOwed: 100.00,
    amountPaid: 0.00,
    status: 'cancelled',
    issuedAt: '2026-07-07T15:00:00Z',
    dueAt: '2026-08-07T15:00:00Z'
  },
  {
    id: 'INV-2026-0009',
    invoiceNumber: 'INV-2026-0009',
    patientId: 'PAT-009',
    appointmentId: 'APP-007',
    lineItems: [
      { id: 'LI-014', description: 'Psychiatric Consult', quantity: 1, unitPrice: 250.00, total: 250.00 }
    ],
    subtotal: 250.00,
    insuranceCovered: 200.00,
    patientOwed: 50.00,
    amountPaid: 50.00,
    status: 'paid',
    issuedAt: '2026-07-05T16:00:00Z',
    dueAt: '2026-08-05T16:00:00Z',
    paidAt: '2026-07-05T16:15:00Z'
  },
  {
    id: 'INV-2026-0010',
    invoiceNumber: 'INV-2026-0010',
    patientId: 'PAT-010',
    appointmentId: 'APP-010',
    lineItems: [
      { id: 'LI-015', description: 'Thyroid Specialist Review', quantity: 1, unitPrice: 180.00, total: 180.00 }
    ],
    subtotal: 180.00,
    insuranceCovered: 140.00,
    patientOwed: 40.00,
    amountPaid: 0.00,
    status: 'pending',
    issuedAt: '2026-07-07T10:00:00Z',
    dueAt: '2026-08-07T10:00:00Z'
  },
  {
    id: 'INV-2026-0011',
    invoiceNumber: 'INV-2026-0011',
    patientId: 'PAT-012',
    appointmentId: 'APP-008',
    lineItems: [
      { id: 'LI-016', description: 'Endocrinology Consult', quantity: 1, unitPrice: 190.00, total: 190.00 },
      { id: 'LI-017', description: 'Potassium Stat blood Draw', quantity: 1, unitPrice: 50.00, total: 50.00 }
    ],
    subtotal: 240.00,
    insuranceCovered: 180.00,
    patientOwed: 60.00,
    amountPaid: 60.00,
    status: 'paid',
    issuedAt: '2026-07-06T11:30:00Z',
    dueAt: '2026-08-06T11:30:00Z',
    paidAt: '2026-07-06T12:00:00Z'
  },
  {
    id: 'INV-2026-0012',
    invoiceNumber: 'INV-2026-0012',
    patientId: 'PAT-011',
    appointmentId: 'APP-016',
    lineItems: [
      { id: 'LI-018', description: 'Allergy Evaluation & Skin test', quantity: 1, unitPrice: 320.00, total: 320.00 }
    ],
    subtotal: 320.00,
    insuranceCovered: 250.00,
    patientOwed: 70.00,
    amountPaid: 0.00,
    status: 'overdue',
    issuedAt: '2025-06-12T15:00:00Z',
    dueAt: '2025-07-12T15:00:00Z'
  },
  {
    id: 'INV-2026-0013',
    invoiceNumber: 'INV-2026-0013',
    patientId: 'PAT-002',
    lineItems: [
      { id: 'LI-019', description: 'Urgent Clinic Care Facility Charge', quantity: 1, unitPrice: 350.00, total: 350.00 }
    ],
    subtotal: 350.00,
    insuranceCovered: 280.00,
    patientOwed: 70.00,
    amountPaid: 35.00,
    status: 'partially_paid',
    issuedAt: '2026-06-20T10:00:00Z',
    dueAt: '2026-07-20T10:00:00Z'
  },
  {
    id: 'INV-2026-0014',
    invoiceNumber: 'INV-2026-0014',
    patientId: 'PAT-005',
    lineItems: [
      { id: 'LI-020', description: 'Nebulizer Inhalation treatment', quantity: 1, unitPrice: 85.00, total: 85.00 }
    ],
    subtotal: 85.00,
    insuranceCovered: 60.00,
    patientOwed: 25.00,
    amountPaid: 0.00,
    status: 'pending',
    issuedAt: '2026-07-02T10:00:00Z',
    dueAt: '2026-08-02T10:00:00Z'
  }
];
