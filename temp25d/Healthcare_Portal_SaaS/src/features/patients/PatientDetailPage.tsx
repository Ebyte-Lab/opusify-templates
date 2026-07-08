import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientsApi } from '../../lib/api/patients.api';
import { doctorsApi } from '../../lib/api/doctors.api';
import { labApi } from '../../lib/api/lab.api';
import { prescriptionsApi } from '../../lib/api/prescriptions.api';
import { billingApi } from '../../lib/api/billing.api';
import { getPatientVitals } from '../../lib/mock/patients.mock';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Scale, 
  Stethoscope, 
  Pill, 
  FlaskConical, 
  CreditCard, 
  AlertCircle, 
  Plus, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  User
} from 'lucide-react';

export const PatientDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'chart' | 'conditions' | 'vitals' | 'prescriptions' | 'labs' | 'billing'>('chart');
  
  // Modals state
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);

  // Vitals form state
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [heartRate, setHeartRate] = useState(72);
  const [temperature, setTemperature] = useState(98.6);
  const [weight, setWeight] = useState(75);
  const [oxygen, setOxygen] = useState(98);

  // Condition form state
  const [conditionName, setConditionName] = useState('');
  const [icdCode, setIcdCode] = useState('');
  const [conditionStatus, setConditionStatus] = useState<'active' | 'resolved' | 'chronic'>('active');

  // Queries
  const { data: patient, isLoading: patientLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => patientsApi.getPatientById(id),
    enabled: !!id,
  });

  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorsApi.getDoctors,
  });

  const { data: labs = [], isLoading: labsLoading } = useQuery({
    queryKey: ['patientLabs', id],
    queryFn: () => labApi.getLabOrdersByPatientId(id),
    enabled: !!id,
  });

  const { data: prescriptions = [], isLoading: rxLoading } = useQuery({
    queryKey: ['patientRx', id],
    queryFn: () => prescriptionsApi.getPrescriptionsByPatientId(id),
    enabled: !!id,
  });

  const { data: invoices = [], isLoading: billingLoading } = useQuery({
    queryKey: ['patientInvoices', id],
    queryFn: () => billingApi.getInvoicesByPatientId(id),
    enabled: !!id,
  });

  // Local vitals query / mock state
  const patientVitals = getPatientVitals(id);

  // Mutations
  const addConditionMutation = useMutation({
    mutationFn: (newConditions: any) => patientsApi.updatePatient(id, { conditions: newConditions }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', id] });
      setIsConditionModalOpen(false);
      setConditionName('');
      setIcdCode('');
    },
  });

  const formatVitalsDataForChart = () => {
    return patientVitals.map(v => {
      const date = new Date(v.recordedAt);
      return {
        date: date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        Systolic: v.systolicBP,
        Diastolic: v.diastolicBP,
        'Heart Rate': v.heartRate,
        Weight: v.weightKg,
      };
    });
  };

  const getDoctorName = (doctorId: string) => {
    const d = doctors.find((doc) => doc.id === doctorId);
    return d ? `Dr. ${d.firstName} ${d.lastName}` : 'Unassigned';
  };

  const handleAddCondition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !conditionName || !icdCode) return;
    const newCondition = {
      name: conditionName,
      icdCode,
      onsetDate: new Date().toISOString().split('T')[0],
      status: conditionStatus,
    };
    const updatedConditions = [...patient.conditions, newCondition];
    addConditionMutation.mutate(updatedConditions);
  };

  const handleAddVitals = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate vital signs push to storage
    const newVital = {
      recordedAt: new Date().toISOString(),
      systolicBP: systolic,
      diastolicBP: diastolic,
      heartRate,
      temperature,
      weightKg: weight,
      oxygenSaturation: oxygen,
      recordedBy: 'DOC-002',
    };
    
    // For local mock purposes, we push to local records array directly
    patientVitals.push(newVital);
    queryClient.invalidateQueries({ queryKey: ['patient', id] });
    setIsVitalsModalOpen(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  if (patientLoading) {
    return <div className="p-8 text-center text-xs text-brand-600">Retrieving patient medical chart...</div>;
  }

  if (!patient) {
    return (
      <div className="p-8 text-center space-y-4">
        <AlertCircle className="mx-auto text-red-500" size={48} />
        <h2 className="text-lg font-bold">Chart Access Restricted</h2>
        <p className="text-sm text-brand-600/70">Medical record MRN not found or is currently archived.</p>
        <Link to="/patients">
          <Button variant="secondary">Back to Registry</Button>
        </Link>
      </div>
    );
  }

  // Calculate age
  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
  const latestVitals = patientVitals[patientVitals.length - 1];

  return (
    <div className="space-y-6">
      {/* Breadcrumb back */}
      <div className="flex items-center justify-between">
        <Link to="/patients" className="inline-flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-900 font-medium">
          <ArrowLeft size={14} /> Back to Directory
        </Link>
        <Badge variant="stable" dot>🔒 HIPAA Encrypted Profile</Badge>
      </div>

      {/* Grid: Patient Details Panel (Left) & Clinical Tabs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Demographics & Profiles Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="bg-slate-50 border-b border-surface-border flex flex-col items-center py-6">
            <div className="h-16 w-16 bg-cyan-100/60 rounded-full flex items-center justify-center text-cyan-600 border border-cyan-200">
              <User size={32} />
            </div>
            <h2 className="text-lg font-bold text-brand-950 mt-3">{patient.firstName} {patient.lastName}</h2>
            <p className="text-xs text-brand-500 font-mono mt-1 font-semibold">{patient.mrn}</p>
            <div className="flex items-center gap-1.5 mt-3">
              <Badge variant={patient.status === 'active' ? 'stable' : 'inactive'}>{patient.status}</Badge>
              <Badge variant="brand">Blood: {patient.bloodType}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-xs divide-y divide-surface-border/40">
            {/* Demographic Info */}
            <div className="space-y-2.5 pt-1">
              <h4 className="font-semibold text-brand-900 uppercase text-[10px] tracking-wider text-brand-600/70">Demographics</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-brand-600/60">DOB</span>
                  <p className="font-medium text-brand-900">{patient.dateOfBirth} ({age} yrs)</p>
                </div>
                <div>
                  <span className="text-[10px] text-brand-600/60">Gender</span>
                  <p className="font-medium text-brand-900 capitalize">{patient.gender.replace('_', ' ')}</p>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-brand-600/60">Home Address</span>
                <p className="font-medium text-brand-900">{patient.address}</p>
              </div>
            </div>

            {/* Contacts */}
            <div className="space-y-2.5 pt-3">
              <h4 className="font-semibold text-brand-900 uppercase text-[10px] tracking-wider text-brand-600/70">Contacts</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-brand-600/60">Phone</span>
                  <p className="font-medium text-brand-900">{patient.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] text-brand-600/60">Email</span>
                  <p className="font-medium text-brand-900 break-all">{patient.email}</p>
                </div>
              </div>
            </div>

            {/* Insurance details */}
            <div className="space-y-2.5 pt-3">
              <h4 className="font-semibold text-brand-900 uppercase text-[10px] tracking-wider text-brand-600/70">Insurance Provider</h4>
              <div>
                <span className="text-[10px] text-brand-600/60">Carrier</span>
                <p className="font-medium text-brand-900">{patient.insuranceProvider || 'Self Pay'}</p>
              </div>
              {patient.insurancePolicyNumber && (
                <div>
                  <span className="text-[10px] text-brand-600/60">Policy Number</span>
                  <p className="font-medium text-brand-900 font-mono">{patient.insurancePolicyNumber}</p>
                </div>
              )}
            </div>

            {/* Clinical assign */}
            <div className="space-y-2.5 pt-3">
              <h4 className="font-semibold text-brand-900 uppercase text-[10px] tracking-wider text-brand-600/70">Clinical Management</h4>
              <div>
                <span className="text-[10px] text-brand-600/60">Primary Provider</span>
                <p className="font-medium text-brand-900">{getDoctorName(patient.primaryDoctorId)}</p>
              </div>
            </div>

            {/* Allergies panel */}
            <div className="space-y-2 pt-3">
              <h4 className="font-semibold text-brand-900 uppercase text-[10px] tracking-wider text-brand-600/70">Allergies</h4>
              <div className="flex flex-wrap gap-1">
                {patient.allergies.length === 0 ? (
                  <Badge variant="inactive">No Known Allergies (NKDA)</Badge>
                ) : (
                  patient.allergies.map((allergy, idx) => (
                    <Badge key={idx} variant="critical" dot>{allergy}</Badge>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Dynamic Tabs and medical logs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tab Navigation header */}
          <div className="flex border-b border-surface-border bg-white rounded-lg p-1.5 shadow-sm overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setActiveTab('chart')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'chart' ? 'bg-brand-500 text-white shadow-sm' : 'text-brand-700 hover:bg-brand-50/40'
              }`}
            >
              <Activity size={14} /> Clinical Chart
            </button>
            <button
              onClick={() => setActiveTab('conditions')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'conditions' ? 'bg-brand-500 text-white shadow-sm' : 'text-brand-700 hover:bg-brand-50/40'
              }`}
            >
              <Stethoscope size={14} /> Conditions ({patient.conditions.length})
            </button>
            <button
              onClick={() => setActiveTab('vitals')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'vitals' ? 'bg-brand-500 text-white shadow-sm' : 'text-brand-700 hover:bg-brand-50/40'
              }`}
            >
              <Heart size={14} /> Vitals History
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'prescriptions' ? 'bg-brand-500 text-white shadow-sm' : 'text-brand-700 hover:bg-brand-50/40'
              }`}
            >
              <Pill size={14} /> Prescriptions ({prescriptions.length})
            </button>
            <button
              onClick={() => setActiveTab('labs')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'labs' ? 'bg-brand-500 text-white shadow-sm' : 'text-brand-700 hover:bg-brand-50/40'
              }`}
            >
              <FlaskConical size={14} /> Labs ({labs.length})
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'billing' ? 'bg-brand-500 text-white shadow-sm' : 'text-brand-700 hover:bg-brand-50/40'
              }`}
            >
              <CreditCard size={14} /> Billing ({invoices.length})
            </button>
          </div>

          {/* TAB 1: Clinical Chart overview */}
          {activeTab === 'chart' && (
            <div className="space-y-6">
              {/* Latest Vital signs summary banner */}
              {latestVitals && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-9 w-9 bg-red-100 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                        <Heart size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-600/70 font-medium">Blood Pressure</span>
                        <p className="text-sm font-bold text-brand-900 mt-0.5">{latestVitals.systolicBP}/{latestVitals.diastolicBP} <span className="text-[10px] text-brand-600 font-normal">mmHg</span></p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-9 w-9 bg-indigo-100 text-indigo-500 rounded-lg flex items-center justify-center shrink-0">
                        <Activity size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-600/70 font-medium">Pulse</span>
                        <p className="text-sm font-bold text-brand-900 mt-0.5">{latestVitals.heartRate} <span className="text-[10px] text-brand-600 font-normal">bpm</span></p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-9 w-9 bg-amber-100 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                        <Thermometer size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-600/70 font-medium">Temperature</span>
                        <p className="text-sm font-bold text-brand-900 mt-0.5">{latestVitals.temperature} <span className="text-[10px] text-brand-600 font-normal">°F</span></p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-9 w-9 bg-emerald-100 text-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                        <Scale size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-600/70 font-medium">Weight</span>
                        <p className="text-sm font-bold text-brand-900 mt-0.5">{latestVitals.weightKg} <span className="text-[10px] text-brand-600 font-normal">kg</span></p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Conditions & Prescriptions mini grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Conditions Summary */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between py-3 border-b border-surface-border/40">
                    <CardTitle className="text-xs">Diagnoses & Conditions</CardTitle>
                    <button onClick={() => setActiveTab('conditions')} className="text-[10px] font-medium text-brand-500 hover:underline flex items-center">
                      Manage <ChevronRight size={12} />
                    </button>
                  </CardHeader>
                  <CardContent className="p-0 text-xs">
                    {patient.conditions.length === 0 ? (
                      <p className="p-4 text-brand-600/70">No documented diagnoses.</p>
                    ) : (
                      <div className="divide-y divide-surface-border/40">
                        {patient.conditions.map((c, idx) => (
                          <div key={idx} className="p-3 flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-brand-950">{c.name}</p>
                              <p className="text-[10px] text-brand-600/60 font-mono">ICD: {c.icdCode}</p>
                            </div>
                            <Badge variant={c.status === 'resolved' ? 'stable' : 'warning'}>{c.status}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Prescriptions Summary */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between py-3 border-b border-surface-border/40">
                    <CardTitle className="text-xs">Active Medications</CardTitle>
                    <button onClick={() => setActiveTab('prescriptions')} className="text-[10px] font-medium text-brand-500 hover:underline flex items-center">
                      Manage <ChevronRight size={12} />
                    </button>
                  </CardHeader>
                  <CardContent className="p-0 text-xs">
                    {rxLoading ? (
                      <p className="p-4 text-brand-600/70">Loading medications...</p>
                    ) : prescriptions.filter(p => p.status === 'active').length === 0 ? (
                      <p className="p-4 text-brand-600/70">No active prescriptions.</p>
                    ) : (
                      <div className="divide-y divide-surface-border/40">
                        {prescriptions.filter(p => p.status === 'active').slice(0, 3).map((p) => (
                          <div key={p.id} className="p-3 flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-brand-950">{p.drugName} {p.dosage}</p>
                              <p className="text-[10px] text-brand-600/70 mt-0.5">{p.frequency}</p>
                            </div>
                            <Badge variant="brand">Rx ID: {p.id}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Lab Results summary */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-3 border-b border-surface-border/40">
                  <CardTitle className="text-xs">Laboratory Reports</CardTitle>
                  <button onClick={() => setActiveTab('labs')} className="text-[10px] font-medium text-brand-500 hover:underline flex items-center">
                    Manage <ChevronRight size={12} />
                  </button>
                </CardHeader>
                <CardContent className="p-0 text-xs">
                  {labsLoading ? (
                    <p className="p-4 text-brand-600/70">Loading laboratory records...</p>
                  ) : labs.length === 0 ? (
                    <p className="p-4 text-brand-600/70">No laboratory test orders recorded.</p>
                  ) : (
                    <div className="divide-y divide-surface-border/40">
                      {labs.slice(0, 3).map((l) => (
                        <div key={l.id} className="p-3 flex items-center justify-between hover:bg-surface/10">
                          <div>
                            <p className="font-semibold text-brand-950">{l.testName}</p>
                            <p className="text-[10px] text-brand-600/60 font-mono">ID: {l.id} • Priority: <span className="capitalize">{l.priority}</span></p>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={
                                l.status === 'completed' && l.result?.interpretation === 'critical' ? 'critical' :
                                l.status === 'completed' && l.result?.interpretation === 'abnormal' ? 'warning' :
                                l.status === 'completed' ? 'stable' : 'pending'
                              }
                              dot={l.status === 'pending'}
                            >
                              {l.status === 'completed' && l.result ? l.result.interpretation : l.status}
                            </Badge>
                            {l.status === 'completed' && l.result && (
                              <p className="font-mono font-bold text-brand-900 mt-1">{l.result.value} {l.result.unit}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 2: Conditions Tab */}
          {activeTab === 'conditions' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-surface-border/40">
                <div>
                  <CardTitle>Medical Diagnoses</CardTitle>
                  <CardDescription>ICD-10 coded patient health issues</CardDescription>
                </div>
                <Button size="sm" onClick={() => setIsConditionModalOpen(true)}>
                  <Plus size={14} className="mr-1" /> Add Diagnosis
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-elevated/40 text-[10px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                      <th className="px-6 py-3 font-semibold">Diagnosis</th>
                      <th className="px-6 py-3 font-semibold font-mono">ICD-10 Code</th>
                      <th className="px-6 py-3 font-semibold">Onset Date</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {patient.conditions.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-brand-600/70">No documented diagnoses.</td>
                      </tr>
                    ) : (
                      patient.conditions.map((c, idx) => (
                        <tr key={idx} className="hover:bg-surface/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-brand-950">{c.name}</td>
                          <td className="px-6 py-4 font-mono font-medium text-brand-700">{c.icdCode}</td>
                          <td className="px-6 py-4 text-brand-600/80">{c.onsetDate}</td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={
                                c.status === 'chronic' ? 'warning' :
                                c.status === 'resolved' ? 'stable' : 'pending'
                              }
                              dot
                            >
                              {c.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* TAB 3: Vitals Tab */}
          {activeTab === 'vitals' && (
            <div className="space-y-6">
              {/* Line Chart */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b border-surface-border/40">
                  <div>
                    <CardTitle>Vital Signs Tracker</CardTitle>
                    <CardDescription>Historical trend line of cardiovascular vitals</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setIsVitalsModalOpen(true)}>
                    <Plus size={14} className="mr-1" /> Log Vitals
                  </Button>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatVitalsDataForChart()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <Tooltip />
                      <Legend iconSize={10} verticalAlign="top" height={36} wrapperStyle={{ fontSize: 11 }} />
                      <Line type="monotone" dataKey="Systolic" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 6 }} name="Systolic BP (mmHg)" />
                      <Line type="monotone" dataKey="Diastolic" stroke="#3b82f6" strokeWidth={2} name="Diastolic BP (mmHg)" />
                      <Line type="monotone" dataKey="Heart Rate" stroke="#10b981" strokeWidth={2} name="Heart Rate (bpm)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Vitals History Table */}
              <Card>
                <CardContent className="p-0">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-surface-elevated/40 text-[10px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                        <th className="px-6 py-3 font-semibold">Date/Time</th>
                        <th className="px-6 py-3 font-semibold">BP (mmHg)</th>
                        <th className="px-6 py-3 font-semibold">Heart Rate</th>
                        <th className="px-6 py-3 font-semibold">Temp (°F)</th>
                        <th className="px-6 py-3 font-semibold">O2 Sat</th>
                        <th className="px-6 py-3 font-semibold">Weight</th>
                        <th className="px-6 py-3 font-semibold">Logged By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border/50 font-mono">
                      {patientVitals.map((v, idx) => {
                        const dateStr = new Date(v.recordedAt).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        });
                        return (
                          <tr key={idx} className="hover:bg-surface/20 transition-colors">
                            <td className="px-6 py-3 text-brand-900 font-sans font-medium">{dateStr}</td>
                            <td className="px-6 py-3 text-brand-950 font-bold">{v.systolicBP}/{v.diastolicBP}</td>
                            <td className="px-6 py-3 text-emerald-600 font-bold">{v.heartRate} bpm</td>
                            <td className="px-6 py-3 text-brand-700">{v.temperature} °F</td>
                            <td className="px-6 py-3 text-brand-700">{v.oxygenSaturation}%</td>
                            <td className="px-6 py-3 text-brand-700">{v.weightKg} kg</td>
                            <td className="px-6 py-3 font-sans text-brand-600">{getDoctorName(v.recordedBy)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 4: Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-surface-border/40">
                <div>
                  <CardTitle>Prescription Manager</CardTitle>
                  <CardDescription>Track active and expired pharmacotherapy regimens</CardDescription>
                </div>
                <Link to={`/prescriptions?patientId=${patient.id}`}>
                  <Button size="sm">
                    <Plus size={14} className="mr-1" /> New Prescription
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-elevated/40 text-[10px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                      <th className="px-6 py-3 font-semibold">Medication</th>
                      <th className="px-6 py-3 font-semibold">Dosage / Freq</th>
                      <th className="px-6 py-3 font-semibold">Remaining Refills</th>
                      <th className="px-6 py-3 font-semibold">Start / Expire</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {rxLoading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-brand-600/70">Loading medication list...</td>
                      </tr>
                    ) : prescriptions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-brand-600/70">No prescriptions written.</td>
                      </tr>
                    ) : (
                      prescriptions.map((rx) => (
                        <tr key={rx.id} className="hover:bg-surface/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-brand-950">
                            {rx.drugName}
                            {rx.instructions && <p className="text-[10px] text-brand-600/60 font-normal mt-0.5">{rx.instructions}</p>}
                          </td>
                          <td className="px-6 py-4 font-medium text-brand-800">
                            {rx.dosage} / {rx.frequency}
                          </td>
                          <td className="px-6 py-4 font-mono font-medium">{rx.refillsRemaining} refills</td>
                          <td className="px-6 py-4 space-y-0.5 text-brand-600/70">
                            <p>S: {rx.prescribedAt.split('T')[0]}</p>
                            <p>E: {rx.expiresAt.split('T')[0]}</p>
                          </td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={
                                rx.status === 'active' ? 'stable' :
                                rx.status === 'expired' ? 'inactive' : 'critical'
                              }
                              dot
                            >
                              {rx.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* TAB 5: Labs Tab */}
          {activeTab === 'labs' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-surface-border/40">
                <div>
                  <CardTitle>Lab Diagnostics</CardTitle>
                  <CardDescription>Check statuses and analytical results of laboratory orders</CardDescription>
                </div>
                <Link to={`/lab?patientId=${patient.id}`}>
                  <Button size="sm">
                    <Plus size={14} className="mr-1" /> Order Lab Test
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-elevated/40 text-[10px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                      <th className="px-6 py-3 font-semibold">Test Name</th>
                      <th className="px-6 py-3 font-semibold font-mono">Test ID</th>
                      <th className="px-6 py-3 font-semibold">Priority</th>
                      <th className="px-6 py-3 font-semibold">Status / Value</th>
                      <th className="px-6 py-3 font-semibold">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {labsLoading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-brand-600/70">Loading laboratory panel...</td>
                      </tr>
                    ) : labs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-brand-600/70">No lab tests logged.</td>
                      </tr>
                    ) : (
                      labs.map((lab) => (
                        <tr key={lab.id} className="hover:bg-surface/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-brand-950">
                            {lab.testName}
                            {lab.result?.notes && <p className="text-[10px] text-brand-600/60 font-normal mt-0.5">{lab.result.notes}</p>}
                          </td>
                          <td className="px-6 py-4 font-mono text-brand-700">{lab.id}</td>
                          <td className="px-6 py-4 capitalize">{lab.priority}</td>
                          <td className="px-6 py-4">
                            {lab.status === 'completed' && lab.result ? (
                              <div>
                                <p className="font-mono font-bold text-brand-950">{lab.result.value} {lab.result.unit}</p>
                                <p className="text-[9px] text-brand-600/60 font-mono">Range: {lab.result.referenceRange}</p>
                              </div>
                            ) : (
                              <Badge variant="pending">{lab.status}</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {lab.status === 'completed' && lab.result ? (
                              <Badge
                                variant={
                                  lab.result.interpretation === 'critical' ? 'critical' :
                                  lab.result.interpretation === 'abnormal' ? 'warning' : 'stable'
                                }
                                dot={lab.result.interpretation === 'critical'}
                              >
                                {lab.result.interpretation}
                              </Badge>
                            ) : (
                              <span className="text-brand-500/60">—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* TAB 6: Billing Tab */}
          {activeTab === 'billing' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b border-surface-border/40">
                <div>
                  <CardTitle>Invoices & Payments</CardTitle>
                  <CardDescription>Track outstanding balances and financial history</CardDescription>
                </div>
                <Link to={`/billing?patientId=${patient.id}`}>
                  <Button size="sm">
                    <Plus size={14} className="mr-1" /> New Invoice
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-elevated/40 text-[10px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                      <th className="px-6 py-3 font-semibold font-mono">Invoice #</th>
                      <th className="px-6 py-3 font-semibold">Subtotal</th>
                      <th className="px-6 py-3 font-semibold">Patient Responsibility</th>
                      <th className="px-6 py-3 font-semibold">Amount Paid</th>
                      <th className="px-6 py-3 font-semibold">Due Date</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {billingLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-brand-600/70">Loading invoices...</td>
                      </tr>
                    ) : invoices.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-brand-600/70">No billing statements written.</td>
                      </tr>
                    ) : (
                      invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-surface/20 transition-colors">
                          <td className="px-6 py-4 font-mono font-medium text-brand-700">
                            <Link to={`/billing?invoice=${inv.id}`} className="hover:underline text-brand-500 font-semibold">{inv.invoiceNumber}</Link>
                          </td>
                          <td className="px-6 py-4 font-mono">{formatCurrency(inv.subtotal)}</td>
                          <td className="px-6 py-4 font-mono font-semibold text-brand-900">{formatCurrency(inv.patientOwed)}</td>
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
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

        </div>
      </div>

      {/* Modal: Log Vitals */}
      <Modal isOpen={isVitalsModalOpen} onClose={() => setIsVitalsModalOpen(false)} title="Record Vital Signs">
        <form onSubmit={handleAddVitals} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-600/80 font-medium mb-1">Systolic BP (mmHg)</label>
              <input 
                type="number" 
                value={systolic} 
                onChange={(e) => setSystolic(Number(e.target.value))} 
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:border-brand-500 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-brand-600/80 font-medium mb-1">Diastolic BP (mmHg)</label>
              <input 
                type="number" 
                value={diastolic} 
                onChange={(e) => setDiastolic(Number(e.target.value))} 
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:border-brand-500 font-mono"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-600/80 font-medium mb-1">Heart Rate (bpm)</label>
              <input 
                type="number" 
                value={heartRate} 
                onChange={(e) => setHeartRate(Number(e.target.value))} 
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:border-brand-500 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-brand-600/80 font-medium mb-1">Temperature (°F)</label>
              <input 
                type="number" 
                step="0.1"
                value={temperature} 
                onChange={(e) => setTemperature(Number(e.target.value))} 
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:border-brand-500 font-mono"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-600/80 font-medium mb-1">Oxygen Saturation (%)</label>
              <input 
                type="number" 
                value={oxygen} 
                onChange={(e) => setOxygen(Number(e.target.value))} 
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:border-brand-500 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-brand-600/80 font-medium mb-1">Weight (kg)</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))} 
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:border-brand-500 font-mono"
                required
              />
            </div>
          </div>
          <div className="pt-3 border-t border-surface-border/40 flex justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsVitalsModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm">Save Vitals</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Add Diagnosis */}
      <Modal isOpen={isConditionModalOpen} onClose={() => setIsConditionModalOpen(false)} title="Document Medical Diagnosis">
        <form onSubmit={handleAddCondition} className="space-y-4 text-xs">
          <div>
            <label className="block text-brand-600/80 font-medium mb-1">Condition/Diagnosis Name</label>
            <input 
              type="text" 
              value={conditionName} 
              onChange={(e) => setConditionName(e.target.value)} 
              placeholder="e.g. Type 2 Diabetes Mellitus"
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:border-brand-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-600/80 font-medium mb-1">ICD-10 Code</label>
              <input 
                type="text" 
                value={icdCode} 
                onChange={(e) => setIcdCode(e.target.value)} 
                placeholder="e.g. E11.9"
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:border-brand-500 font-mono uppercase"
                required
              />
            </div>
            <div>
              <label className="block text-brand-600/80 font-medium mb-1">Condition Status</label>
              <select
                value={conditionStatus}
                onChange={(e) => setConditionStatus(e.target.value as any)}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:border-brand-500 cursor-pointer font-medium"
              >
                <option value="active">Active</option>
                <option value="chronic">Chronic</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
          <div className="pt-3 border-t border-surface-border/40 flex justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsConditionModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm" isLoading={addConditionMutation.isPending}>Add Diagnosis</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
