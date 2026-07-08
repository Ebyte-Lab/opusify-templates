import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { billingApi } from '../../lib/api/billing.api';
import { patientsApi } from '../../lib/api/patients.api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  CreditCard, 
  Plus, 
  Search, 
  DollarSign, 
  FileText, 
  AlertCircle,
  Receipt,
  Printer,
  Ban
} from 'lucide-react';

export const BillingPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const patientIdParam = searchParams.get('patientId') || '';
  const invoiceIdParam = searchParams.get('invoice') || '';

  // Modals state
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(!!patientIdParam);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(!!invoiceIdParam);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoiceIdParam);

  // Search/Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New Invoice Form state
  const [billPatientId, setBillPatientId] = useState(patientIdParam);
  const [billSubtotal, setBillSubtotal] = useState(250);
  const [billInsurancePaid, setBillInsurancePaid] = useState(150);
  const [billPatientOwed, setBillPatientOwed] = useState(100);
  const [billDueDate, setBillDueDate] = useState('2026-08-08');

  // Payment Form state
  const [payAmount, setPayAmount] = useState(0);

  // Queries
  const { data: invoices = [], isLoading: billingLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: billingApi.getInvoices,
  });

  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: patientsApi.getPatients,
  });

  // Sync details if param opens receipt
  React.useEffect(() => {
    if (invoiceIdParam) {
      setSelectedInvoiceId(invoiceIdParam);
      setIsReceiptModalOpen(true);
    }
  }, [invoiceIdParam]);

  // Pre-select patient
  React.useEffect(() => {
    if (patients.length > 0 && !billPatientId) setBillPatientId(patients[0].id);
  }, [patients, billPatientId]);

  // Mutations
  const createInvoiceMutation = useMutation({
    mutationFn: billingApi.createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['summaryStats'] });
      setIsInvoiceModalOpen(false);
      setSearchParams({});
    },
  });

  const payInvoiceMutation = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) => 
      billingApi.recordPayment(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['summaryStats'] });
      setIsPaymentModalOpen(false);
      setPayAmount(0);
    },
  });

  const cancelInvoiceMutation = useMutation({
    mutationFn: billingApi.cancelInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['summaryStats'] });
    },
  });

  const getPatientName = (patientId: string) => {
    const p = patients.find((pat) => pat.id === patientId);
    return p ? `${p.firstName} ${p.lastName}` : 'Unknown Patient';
  };

  const getPatientObj = (patientId: string) => {
    return patients.find((pat) => pat.id === patientId);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  // Submit handlers
  const handleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInvoiceMutation.mutate({
      patientId: billPatientId,
      subtotal: Number(billSubtotal),
      insuranceCovered: Number(billInsurancePaid),
      patientOwed: Number(billPatientOwed),
      dueAt: `${billDueDate}T00:00:00Z`,
      lineItems: [], // Default to empty array as required by Invoice
    });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    payInvoiceMutation.mutate({
      id: selectedInvoiceId,
      amount: Number(payAmount),
    });
  };

  const handleOpenPayment = (id: string, maxOwed: number) => {
    setSelectedInvoiceId(id);
    setPayAmount(maxOwed);
    setIsPaymentModalOpen(true);
  };

  const handleOpenReceipt = (id: string) => {
    setSelectedInvoiceId(id);
    setIsReceiptModalOpen(true);
    setSearchParams({ invoice: id });
  };

  const handleCloseReceipt = () => {
    setIsReceiptModalOpen(false);
    setSearchParams({});
  };

  // Active receipt details
  const receiptInvoice = invoices.find(i => i.id === selectedInvoiceId);
  const receiptPatient = receiptInvoice ? getPatientObj(receiptInvoice.patientId) : null;

  // Filters logic
  const filteredInvoices = invoices.filter((inv) => {
    const num = inv.invoiceNumber.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = num.includes(query) || getPatientName(inv.patientId).toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing & Claims Desk</h1>
          <p className="text-sm text-brand-600/70">Review patient responsibility statements and record collection details.</p>
        </div>
        <Button size="sm" onClick={() => setIsInvoiceModalOpen(true)}>
          <Plus size={16} className="mr-2" /> Issue Statement
        </Button>
      </div>

      {/* Filters Card */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by invoice number or patient name..."
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white focus:border-brand-500/60 transition-all font-body"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white transition-all font-body cursor-pointer font-medium"
            >
              <option value="all">All Invoices</option>
              <option value="paid">Paid</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-elevated/40 text-[10px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                  <th className="px-6 py-3 font-semibold font-mono">Invoice Number</th>
                  <th className="px-6 py-3 font-semibold">Patient</th>
                  <th className="px-6 py-3 font-semibold">Subtotal</th>
                  <th className="px-6 py-3 font-semibold">Patient responsibility</th>
                  <th className="px-6 py-3 font-semibold">Amount Paid</th>
                  <th className="px-6 py-3 font-semibold">Due Date</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50">
                {billingLoading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-brand-600/70">
                      Loading claims registry...
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-brand-600/70 font-medium">
                      No invoices logged.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => {
                    const maxOwed = inv.patientOwed - inv.amountPaid;
                    return (
                      <tr key={inv.id} className="hover:bg-surface/30 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-brand-700">
                          <button
                            onClick={() => handleOpenReceipt(inv.id)}
                            className="hover:underline text-cyan-600 font-semibold"
                          >
                            {inv.invoiceNumber}
                          </button>
                        </td>
                        <td className="px-6 py-4 font-medium text-brand-900 hover:underline">
                          <Link to={`/patients/${inv.patientId}`}>{getPatientName(inv.patientId)}</Link>
                        </td>
                        <td className="px-6 py-4 font-mono">{formatCurrency(inv.subtotal)}</td>
                        <td className="px-6 py-4 font-mono font-bold text-brand-950">{formatCurrency(inv.patientOwed)}</td>
                        <td className="px-6 py-4 font-mono text-emerald-600 font-medium">{formatCurrency(inv.amountPaid)}</td>
                        <td className="px-6 py-4 text-brand-600/80">{inv.dueAt.split('T')[0]}</td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant={
                              inv.status === 'paid' ? 'stable' : 
                              inv.status === 'partially_paid' ? 'warning' :
                              inv.status === 'overdue' ? 'critical' : 'inactive'
                            }
                            dot={inv.status === 'pending' || inv.status === 'partially_paid'}
                          >
                            {inv.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {inv.status !== 'paid' && inv.status !== 'cancelled' && (
                              <>
                                <Button
                                  size="sm"
                                  className="h-7 text-[10px] px-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                                  onClick={() => handleOpenPayment(inv.id, maxOwed)}
                                >
                                  Collect
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-[10px] px-2 text-red-500 border-red-500/10 hover:bg-red-50"
                                  onClick={() => cancelInvoiceMutation.mutate(inv.id)}
                                >
                                  <Ban size={10} />
                                </Button>
                              </>
                            )}
                            {inv.status === 'paid' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-[10px] px-2"
                                onClick={() => handleOpenReceipt(inv.id)}
                              >
                                Receipt
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Issue Statement */}
      <Modal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} title="Issue Patient Responsibility Statement">
        <form onSubmit={handleInvoiceSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-brand-700 font-medium mb-1">Select Patient *</label>
            <select
              value={billPatientId}
              onChange={(e) => setBillPatientId(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-medium"
              required
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName} ({p.mrn})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-brand-700 font-medium mb-1">Total Subtotal ($) *</label>
              <input
                type="number"
                value={billSubtotal}
                onChange={(e) => setBillSubtotal(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-brand-700 font-medium mb-1">Insurance Paid ($)</label>
              <input
                type="number"
                value={billInsurancePaid}
                onChange={(e) => {
                  setBillInsurancePaid(Number(e.target.value));
                  // Deduct remaining
                  setBillPatientOwed(billSubtotal - Number(e.target.value));
                }}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-brand-700 font-medium mb-1">Patient Owed ($) *</label>
              <input
                type="number"
                value={billPatientOwed}
                onChange={(e) => setBillPatientOwed(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-mono"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-brand-700 font-medium mb-1">Due Date *</label>
            <input
              type="date"
              value={billDueDate}
              onChange={(e) => setBillDueDate(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none"
              required
            />
          </div>
          <div className="pt-3 border-t border-surface-border/40 flex justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsInvoiceModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm" isLoading={createInvoiceMutation.isPending}>Generate Invoice</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Collect Payment */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title="Record Cash / Card Collection">
        <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-brand-700 font-medium mb-1">Payment Amount ($) *</label>
            <input
              type="number"
              step="0.01"
              value={payAmount}
              onChange={(e) => setPayAmount(Number(e.target.value))}
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-mono text-base font-bold text-emerald-600"
              required
            />
          </div>
          <div className="pt-3 border-t border-surface-border/40 flex justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsPaymentModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm" isLoading={payInvoiceMutation.isPending}>Record Payment</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Receipt View */}
      <Modal isOpen={isReceiptModalOpen} onClose={handleCloseReceipt} title="Financial Statement Receipt">
        {receiptInvoice && receiptPatient ? (
          <div className="space-y-6 text-xs font-sans">
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-surface-border/60 pb-4">
              <div>
                <h3 className="text-base font-bold text-brand-950 font-display">NEXUS_MED CLINIC Center</h3>
                <p className="text-[10px] text-brand-650 mt-1">425 Medical Plaza Suite 100, New York</p>
                <p className="text-[10px] text-brand-650">Phone: 555-010-8800</p>
              </div>
              <div className="text-right">
                <Badge variant={receiptInvoice.status === 'paid' ? 'stable' : 'warning'}>
                  {receiptInvoice.status.toUpperCase()}
                </Badge>
                <p className="text-[10px] text-brand-600 font-mono mt-2 font-bold">{receiptInvoice.invoiceNumber}</p>
                <p className="text-[9px] text-brand-600/60 font-mono mt-0.5">Issued: {receiptInvoice.issuedAt.split('T')[0]}</p>
              </div>
            </div>

            {/* Patient details */}
            <div>
              <h4 className="font-semibold text-[10px] tracking-wider uppercase text-brand-650 border-b border-surface-border/40 pb-1">
                Billed Patient
              </h4>
              <p className="font-bold text-brand-900 mt-1.5">{receiptPatient.firstName} {receiptPatient.lastName}</p>
              <p className="text-[10px] text-brand-600/80 mt-0.5">MRN: {receiptPatient.mrn} • DOB: {receiptPatient.dateOfBirth}</p>
              <p className="text-[10px] text-brand-600/80">Policy: {receiptPatient.insuranceProvider || 'Self-Pay'} ({receiptPatient.insurancePolicyNumber || 'N/A'})</p>
            </div>

            {/* Calculations table */}
            <div className="bg-surface rounded-xl p-4 space-y-2.5 font-mono border border-surface-border/60">
              <div className="flex justify-between">
                <span>Subtotal Charged:</span>
                <span>{formatCurrency(receiptInvoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-600/80">
                <span>Insurance Paid:</span>
                <span>-{formatCurrency(receiptInvoice.insuranceCovered)}</span>
              </div>
              <hr className="border-surface-border/60" />
              <div className="flex justify-between font-bold text-brand-950">
                <span>Patient Responsibility:</span>
                <span>{formatCurrency(receiptInvoice.patientOwed)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Amount Paid:</span>
                <span>-{formatCurrency(receiptInvoice.amountPaid)}</span>
              </div>
              <hr className="border-surface-border/60 border-double" />
              <div className="flex justify-between font-bold text-red-600">
                <span>Balance Due:</span>
                <span>{formatCurrency(receiptInvoice.patientOwed - receiptInvoice.amountPaid)}</span>
              </div>
            </div>

            {/* Print action */}
            <div className="pt-3 border-t border-surface-border/40 flex justify-end gap-2">
              <Button size="sm" variant="secondary" onClick={() => window.print()}>
                <Printer size={12} className="mr-1.5" /> Print Statement
              </Button>
              <Button size="sm" onClick={handleCloseReceipt}>Close</Button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-brand-600">Selecting statement record...</div>
        )}
      </Modal>

    </div>
  );
};
