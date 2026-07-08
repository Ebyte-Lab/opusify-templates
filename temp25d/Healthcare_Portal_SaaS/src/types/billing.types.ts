export interface Invoice {
  id: string
  invoiceNumber: string
  patientId: string
  appointmentId?: string
  lineItems: InvoiceLineItem[]
  subtotal: number
  insuranceCovered: number
  patientOwed: number
  amountPaid: number
  status: 'pending' | 'paid' | 'partially_paid' | 'overdue' | 'cancelled'
  issuedAt: string
  dueAt: string
  paidAt?: string
}

export interface InvoiceLineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}
