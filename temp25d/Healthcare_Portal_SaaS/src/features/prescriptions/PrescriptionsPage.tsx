import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prescriptionsApi } from '../../lib/api/prescriptions.api';
import { patientsApi } from '../../lib/api/patients.api';
import { doctorsApi } from '../../lib/api/doctors.api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  Pill, 
  Plus, 
  Search, 
  AlertCircle, 
  CheckCircle, 
  Ban,
  User, 
  FileText 
} from 'lucide-react';

export const PrescriptionsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const patientIdParam = searchParams.get('patientId') || '';

  // Modals state
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(!!patientIdParam);

  // Search/Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Form state
  const [rxPatientId, setRxPatientId] = useState(patientIdParam);
  const [rxDoctorId, setRxDoctorId] = useState('');
  const [rxDrugName, setRxDrugName] = useState('Lisinopril');
  const [rxDosage, setRxDosage] = useState('10mg');
  const [rxFrequency, setRxFrequency] = useState('Once daily');
  const [rxRefills, setRxRefills] = useState(3);
  const [rxDurationWeeks, setRxDurationWeeks] = useState(12);
  const [rxInstructions, setRxInstructions] = useState('');

  // Queries
  const { data: prescriptions = [], isLoading: rxLoading } = useQuery({
    queryKey: ['prescriptions'],
    queryFn: prescriptionsApi.getPrescriptions,
  });

  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: patientsApi.getPatients,
  });

  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorsApi.getDoctors,
  });

  // Pre-select first options
  React.useEffect(() => {
    if (patients.length > 0 && !rxPatientId) setRxPatientId(patients[0].id);
    if (doctors.length > 0 && !rxDoctorId) setRxDoctorId(doctors[0].id);
  }, [patients, doctors]);

  // Mutations
  const createRxMutation = useMutation({
    mutationFn: prescriptionsApi.createPrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      setIsWriteModalOpen(false);
      setRxInstructions('');
      setSearchParams({});
    },
  });

  const cancelRxMutation = useMutation({
    mutationFn: prescriptionsApi.cancelPrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
    },
  });

  const getPatientName = (patientId: string) => {
    const p = patients.find((pat) => pat.id === patientId);
    return p ? `${p.firstName} ${p.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const d = doctors.find((doc) => doc.id === doctorId);
    return d ? `Dr. ${d.firstName} ${d.lastName}` : 'Unknown Provider';
  };

  // Submit handlers
  const handleWriteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expiresAtObj = new Date();
    expiresAtObj.setDate(expiresAtObj.getDate() + (rxDurationWeeks * 7));
    const expiresAt = expiresAtObj.toISOString();

    createRxMutation.mutate({
      patientId: rxPatientId,
      prescribedByDoctorId: rxDoctorId,
      drugName: rxDrugName,
      dosage: rxDosage,
      frequency: rxFrequency,
      refillsRemaining: rxRefills,
      durationDays: rxDurationWeeks * 7,
      expiresAt,
      instructions: rxInstructions || undefined,
    });
  };

  // Filters logic
  const filteredRx = prescriptions.filter((rx) => {
    const drug = rx.drugName.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = drug.includes(query) || getPatientName(rx.patientId).toLowerCase().includes(query) || rx.id.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'all' || rx.status === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => b.prescribedAt.localeCompare(a.prescribedAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Prescriptions Console</h1>
          <p className="text-sm text-brand-600/70">Formulate active pharmacotherapy courses and verify fill history.</p>
        </div>
        <Button size="sm" onClick={() => setIsWriteModalOpen(true)}>
          <Plus size={16} className="mr-2" /> Write Prescription
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
              placeholder="Search by drug name, patient name, or Rx ID..."
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white focus:border-brand-500/60 transition-all font-body"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white transition-all font-body cursor-pointer font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
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
                  <th className="px-6 py-3 font-semibold">Rx ID</th>
                  <th className="px-6 py-3 font-semibold">Medication</th>
                  <th className="px-6 py-3 font-semibold">Patient</th>
                  <th className="px-6 py-3 font-semibold">Prescribed By</th>
                  <th className="px-6 py-3 font-semibold font-mono">Refills</th>
                  <th className="px-6 py-3 font-semibold">Expires</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50">
                {rxLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-brand-600/70">
                      Loading prescriptions board...
                    </td>
                  </tr>
                ) : filteredRx.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-brand-600/70 font-medium">
                      No prescriptions written.
                    </td>
                  </tr>
                ) : (
                  filteredRx.map((rx) => (
                    <tr key={rx.id} className="hover:bg-surface/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-brand-700">{rx.id}</td>
                      <td className="px-6 py-4 font-semibold text-brand-950">
                        {rx.drugName} <span className="text-[10px] text-brand-600/80 font-normal">({rx.dosage})</span>
                        {rx.instructions && (
                          <p className="text-[10px] text-brand-650 font-sans font-normal mt-0.5 italic">
                            "{rx.instructions}"
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-brand-900 hover:underline">
                        <Link to={`/patients/${rx.patientId}`}>{getPatientName(rx.patientId)}</Link>
                      </td>
                      <td className="px-6 py-4 text-brand-600/80">{getDoctorName(rx.prescribedByDoctorId)}</td>
                      <td className="px-6 py-4 font-mono font-semibold">{rx.refillsRemaining} remaining</td>
                      <td className="px-6 py-4 text-brand-600/80">{rx.expiresAt.split('T')[0]}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Badge 
                            variant={
                              rx.status === 'active' ? 'stable' : 
                              rx.status === 'expired' ? 'inactive' : 'critical'
                            }
                            dot={rx.status === 'active'}
                          >
                            {rx.status}
                          </Badge>
                          {rx.status === 'active' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-[10px] px-2 text-red-500 border-red-500/20 hover:bg-red-50"
                              onClick={() => cancelRxMutation.mutate(rx.id)}
                            >
                              <Ban size={10} className="mr-1" /> Discontinue
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Write Prescription */}
      <Modal isOpen={isWriteModalOpen} onClose={() => setIsWriteModalOpen(false)} title="Formulate Pharmacotherapy course">
        <form onSubmit={handleWriteSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-brand-700 font-medium mb-1">Select Patient *</label>
            <select
              value={rxPatientId}
              onChange={(e) => setRxPatientId(e.target.value)}
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
          <div>
            <label className="block text-brand-700 font-medium mb-1">Prescribing Doctor *</label>
            <select
              value={rxDoctorId}
              onChange={(e) => setRxDoctorId(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-medium"
              required
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  Dr. {d.firstName} {d.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-700 font-medium mb-1">Medication Drug *</label>
              <select
                value={rxDrugName}
                onChange={(e) => setRxDrugName(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none cursor-pointer font-medium"
                required
              >
                <option value="Lisinopril">Lisinopril (Blood Pressure)</option>
                <option value="Metformin">Metformin (Diabetes)</option>
                <option value="Atorvastatin">Atorvastatin (Cholesterol)</option>
                <option value="Amoxicillin">Amoxicillin (Antibiotic)</option>
                <option value="Levothyroxine">Levothyroxine (Thyroid)</option>
                <option value="Albuterol Inhaler">Albuterol Inhaler (Asthma)</option>
              </select>
            </div>
            <div>
              <label className="block text-brand-700 font-medium mb-1">Dosage strength *</label>
              <input
                type="text"
                value={rxDosage}
                onChange={(e) => setRxDosage(e.target.value)}
                placeholder="e.g. 10mg or 500mg"
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-brand-700 font-medium mb-1">Frequency *</label>
              <input
                type="text"
                value={rxFrequency}
                onChange={(e) => setRxFrequency(e.target.value)}
                placeholder="e.g. Once daily or twice daily with food"
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-brand-700 font-medium mb-1">Refills *</label>
              <select
                value={rxRefills}
                onChange={(e) => setRxRefills(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none cursor-pointer font-medium"
                required
              >
                <option value={0}>0 refills</option>
                <option value={1}>1 refill</option>
                <option value={2}>2 refills</option>
                <option value={3}>3 refills</option>
                <option value={5}>5 refills</option>
                <option value={6}>6 refills</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-brand-700 font-medium mb-1">Duration course (weeks)</label>
            <input
              type="number"
              value={rxDurationWeeks}
              onChange={(e) => setRxDurationWeeks(Number(e.target.value))}
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-brand-700 font-medium mb-1">Special Pharmacy Instructions</label>
            <input
              type="text"
              value={rxInstructions}
              onChange={(e) => setRxInstructions(e.target.value)}
              placeholder="e.g. Avoid grapefruits while taking this medication"
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none"
            />
          </div>
          <div className="pt-3 border-t border-surface-border/40 flex justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsWriteModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm" isLoading={createRxMutation.isPending}>Issue Prescription</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
