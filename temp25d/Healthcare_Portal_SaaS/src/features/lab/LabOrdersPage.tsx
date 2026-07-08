import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { labApi } from '../../lib/api/lab.api';
import { patientsApi } from '../../lib/api/patients.api';
import { doctorsApi } from '../../lib/api/doctors.api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  FlaskConical, 
  Plus, 
  Search, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  User, 
  Clock 
} from 'lucide-react';

export const LabOrdersPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const patientIdParam = searchParams.get('patientId') || '';

  // Modals state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(!!patientIdParam);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [selectedLabId, setSelectedLabId] = useState('');

  // Search/Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // New Order Form state
  const [orderPatientId, setOrderPatientId] = useState(patientIdParam);
  const [orderDoctorId, setOrderDoctorId] = useState('');
  const [orderTestName, setOrderTestName] = useState('Complete Blood Count (CBC)');
  const [orderPriority, setOrderPriority] = useState<'routine' | 'urgent' | 'stat'>('routine');
  const [orderReason, setOrderReason] = useState('');

  // Result Input Form state
  const [resultValue, setResultValue] = useState('');
  const [resultUnit, setResultUnit] = useState('');
  const [resultRange, setResultRange] = useState('');
  const [resultInterpretation, setResultInterpretation] = useState<'normal' | 'abnormal' | 'critical'>('normal');
  const [resultNotes, setResultNotes] = useState('');

  // Queries
  const { data: labOrders = [], isLoading: labsLoading } = useQuery({
    queryKey: ['labOrders'],
    queryFn: labApi.getLabOrders,
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
    if (patients.length > 0 && !orderPatientId) setOrderPatientId(patients[0].id);
    if (doctors.length > 0 && !orderDoctorId) setOrderDoctorId(doctors[0].id);
  }, [patients, doctors]);

  // Mutations
  const createOrderMutation = useMutation({
    mutationFn: labApi.createLabOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labOrders'] });
      queryClient.invalidateQueries({ queryKey: ['summaryStats'] });
      setIsOrderModalOpen(false);
      setOrderReason('');
      setSearchParams({});
    },
  });

  const inputResultMutation = useMutation({
    mutationFn: ({ id, result }: { id: string; result: any }) => 
      labApi.updateLabResult(id, result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labOrders'] });
      queryClient.invalidateQueries({ queryKey: ['summaryStats'] });
      setIsResultModalOpen(false);
      setResultValue('');
      setResultUnit('');
      setResultRange('');
      setResultNotes('');
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
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrderMutation.mutate({
      patientId: orderPatientId,
      orderedByDoctorId: orderDoctorId,
      testName: orderTestName,
      priority: orderPriority,
      testCode: 'L-100',
    });
  };

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inputResultMutation.mutate({
      id: selectedLabId,
      result: {
        value: resultValue,
        unit: resultUnit,
        referenceRange: resultRange,
        interpretation: resultInterpretation,
        notes: resultNotes || undefined,
      },
    });
  };

  const handleOpenResultModal = (id: string, testName: string) => {
    setSelectedLabId(id);
    // Autofill units/ranges if matches known tests
    if (testName.includes('CBC') || testName.includes('Hemoglobin')) {
      setResultUnit('g/dL');
      setResultRange('12.0 - 16.0 g/dL');
    } else if (testName.includes('BMP') || testName.includes('Glucose')) {
      setResultUnit('mg/dL');
      setResultRange('70 - 100 mg/dL');
    } else if (testName.includes('Lipid') || testName.includes('Cholesterol')) {
      setResultUnit('mg/dL');
      setResultRange('< 200 mg/dL');
    } else if (testName.includes('TSH')) {
      setResultUnit('uIU/mL');
      setResultRange('0.4 - 4.0 uIU/mL');
    } else {
      setResultUnit('');
      setResultRange('');
    }
    setIsResultModalOpen(true);
  };

  // Filters logic
  const filteredLabs = labOrders.filter((lab) => {
    const test = lab.testName.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = test.includes(query) || getPatientName(lab.patientId).toLowerCase().includes(query) || lab.id.toLowerCase().includes(query);
    const matchesPriority = priorityFilter === 'all' || lab.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  }).sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lab Diagnostics Portal</h1>
          <p className="text-sm text-brand-600/70">Order clinical testing panels and compile analytical results.</p>
        </div>
        <Button size="sm" onClick={() => setIsOrderModalOpen(true)}>
          <Plus size={16} className="mr-2" /> Order Lab Panel
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
              placeholder="Search by test panel, patient name, or Lab ID..."
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white focus:border-brand-500/60 transition-all font-body"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-10 px-3 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white transition-all font-body cursor-pointer font-medium"
            >
              <option value="all">All Priorities</option>
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="stat">STAT</option>
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
                  <th className="px-6 py-3 font-semibold">Lab ID</th>
                  <th className="px-6 py-3 font-semibold">Test panel</th>
                  <th className="px-6 py-3 font-semibold">Patient</th>
                  <th className="px-6 py-3 font-semibold">Ordered By</th>
                  <th className="px-6 py-3 font-semibold">Priority</th>
                  <th className="px-6 py-3 font-semibold">Status / Value</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50">
                {labsLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-brand-600/70">
                      Loading laboratory listings...
                    </td>
                  </tr>
                ) : filteredLabs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-brand-600/70 font-medium">
                      No laboratory panels logged.
                    </td>
                  </tr>
                ) : (
                  filteredLabs.map((lab) => (
                    <tr key={lab.id} className="hover:bg-surface/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-brand-700">{lab.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-brand-950">{lab.testName}</p>
                        <p className="text-[10px] text-brand-600/50 font-mono">Date: {lab.orderedAt.split('T')[0]}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-brand-900 hover:underline">
                        <Link to={`/patients/${lab.patientId}`}>{getPatientName(lab.patientId)}</Link>
                      </td>
                      <td className="px-6 py-4 text-brand-600/80">{getDoctorName(lab.orderedByDoctorId)}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant={
                            lab.priority === 'stat' ? 'critical' : 
                            lab.priority === 'urgent' ? 'warning' : 'brand'
                          }
                          dot={lab.priority === 'stat'}
                        >
                          {lab.priority.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {lab.status === 'completed' && lab.result ? (
                          <div>
                            <p className="font-mono font-bold text-brand-950">{lab.result.value} {lab.result.unit}</p>
                            <Badge
                              variant={
                                lab.result.interpretation === 'critical' ? 'critical' :
                                lab.result.interpretation === 'abnormal' ? 'warning' : 'stable'
                              }
                              className="text-[9px] px-1 py-0 mt-1"
                            >
                              {lab.result.interpretation.toUpperCase()}
                            </Badge>
                          </div>
                        ) : (
                          <Badge variant="pending" dot>Pending Results</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {lab.status === 'pending' ? (
                          <Button
                            size="sm"
                            className="h-8 bg-cyan-600 hover:bg-cyan-700 text-white"
                            onClick={() => handleOpenResultModal(lab.id, lab.testName)}
                          >
                            Input Results
                          </Button>
                        ) : (
                          <div className="flex justify-end items-center gap-1.5 text-brand-600/60 font-semibold text-[10px]">
                            <CheckCircle size={12} className="text-emerald-500" /> Completed
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Order Lab Panel */}
      <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} title="Request Diagnostic Testing Panel">
        <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-brand-700 font-medium mb-1">Select Patient *</label>
            <select
              value={orderPatientId}
              onChange={(e) => setOrderPatientId(e.target.value)}
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
            <label className="block text-brand-700 font-medium mb-1">Requesting Doctor *</label>
            <select
              value={orderDoctorId}
              onChange={(e) => setOrderDoctorId(e.target.value)}
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
              <label className="block text-brand-700 font-medium mb-1">Lab Testing Panel *</label>
              <select
                value={orderTestName}
                onChange={(e) => setOrderTestName(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none cursor-pointer font-medium"
                required
              >
                <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                <option value="Basic Metabolic Panel (BMP)">Basic Metabolic Panel (BMP)</option>
                <option value="Lipid Testing Panel">Lipid Testing Panel (Cholesterol)</option>
                <option value="Thyroid Stimulating Hormone (TSH)">Thyroid Stimulating Hormone (TSH)</option>
                <option value="Urinalysis panel">Urinalysis Panel</option>
              </select>
            </div>
            <div>
              <label className="block text-brand-700 font-medium mb-1">Priority *</label>
              <select
                value={orderPriority}
                onChange={(e) => setOrderPriority(e.target.value as any)}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none cursor-pointer font-medium"
                required
              >
                <option value="routine">Routine</option>
                <option value="urgent">Urgent</option>
                <option value="stat">STAT (Critical)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-brand-700 font-medium mb-1">Clinical Reasons / Notes</label>
            <input
              type="text"
              value={orderReason}
              onChange={(e) => setOrderReason(e.target.value)}
              placeholder="e.g. Annual screening, checking lipid controls"
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none"
            />
          </div>
          <div className="pt-3 border-t border-surface-border/40 flex justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsOrderModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm" isLoading={createOrderMutation.isPending}>Submit Order</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Input Results */}
      <Modal isOpen={isResultModalOpen} onClose={() => setIsResultModalOpen(false)} title="Record Laboratory Analysis Results">
        <form onSubmit={handleResultSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-brand-700 font-medium mb-1">Measurement Value *</label>
              <input
                type="text"
                value={resultValue}
                onChange={(e) => setResultValue(e.target.value)}
                placeholder="e.g. 14.2 or 185"
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-brand-700 font-medium mb-1">Unit *</label>
              <input
                type="text"
                value={resultUnit}
                onChange={(e) => setResultUnit(e.target.value)}
                placeholder="e.g. g/dL"
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-mono"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-700 font-medium mb-1">Reference Range *</label>
              <input
                type="text"
                value={resultRange}
                onChange={(e) => setResultRange(e.target.value)}
                placeholder="e.g. 12.0 - 16.0 g/dL"
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-brand-700 font-medium mb-1">Interpretation *</label>
              <select
                value={resultInterpretation}
                onChange={(e) => setResultInterpretation(e.target.value as any)}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none cursor-pointer font-medium"
                required
              >
                <option value="normal">Normal (Stable)</option>
                <option value="abnormal">Abnormal (Warning)</option>
                <option value="critical">Critical (STAT Alert)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-brand-700 font-medium mb-1">Analytical Notes</label>
            <input
              type="text"
              value={resultNotes}
              onChange={(e) => setResultNotes(e.target.value)}
              placeholder="e.g. Values confirmed by duplicate testing"
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none"
            />
          </div>
          <div className="pt-3 border-t border-surface-border/40 flex justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsResultModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm" isLoading={inputResultMutation.isPending}>Verify & Post Results</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
