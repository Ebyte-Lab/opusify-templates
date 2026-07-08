import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentsApi } from '../../lib/api/appointments.api';
import { patientsApi } from '../../lib/api/patients.api';
import { doctorsApi } from '../../lib/api/doctors.api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  FileText, 
  ChevronRight, 
  Plus, 
  UserCheck, 
  Activity, 
  Clipboard,
  AlertCircle,
  FileSignature
} from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeConsultId = searchParams.get('consult');

  // Modals state
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [filterDocId, setFilterDocId] = useState('all');

  // Book Form state
  const [bookPatientId, setBookPatientId] = useState('');
  const [bookDocId, setBookDocId] = useState('');
  const [bookDate, setBookDate] = useState('2026-07-08');
  const [bookTime, setBookTime] = useState('10:00');
  const [bookType, setBookType] = useState<'new_patient' | 'follow_up' | 'urgent' | 'procedure' | 'telehealth'>('new_patient');
  const [bookReason, setBookReason] = useState('');

  // SOAP Form state
  const [soapSubjective, setSoapSubjective] = useState('');
  const [soapObjective, setSoapObjective] = useState('');
  const [soapAssessment, setSoapAssessment] = useState('');
  const [soapPlan, setSoapPlan] = useState('');

  // Queries
  const { data: appointments = [], isLoading: appLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentsApi.getAppointments,
  });

  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: patientsApi.getPatients,
  });

  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorsApi.getDoctors,
  });

  // Pre-select fields in booking form
  React.useEffect(() => {
    if (patients.length > 0 && !bookPatientId) setBookPatientId(patients[0].id);
    if (doctors.length > 0 && !bookDocId) setBookDocId(doctors[0].id);
  }, [patients, doctors]);

  // Load active SOAP notes if editing
  const activeConsult = appointments.find(a => a.id === activeConsultId);
  React.useEffect(() => {
    if (activeConsult) {
      setSoapSubjective(activeConsult.consultationNotes?.subjective || '');
      setSoapObjective(activeConsult.consultationNotes?.objective || '');
      setSoapAssessment(activeConsult.consultationNotes?.assessment || '');
      setSoapPlan(activeConsult.consultationNotes?.plan || '');
    }
  }, [activeConsultId, activeConsult]);

  // Mutations
  const bookMutation = useMutation({
    mutationFn: appointmentsApi.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['summaryStats'] });
      setIsBookModalOpen(false);
      setBookReason('');
    },
  });

  const saveSoapMutation = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: any }) => {
      await appointmentsApi.updateConsultationNotes(id, notes);
      await appointmentsApi.updateAppointmentStatus(id, 'completed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['summaryStats'] });
      setSearchParams({}); // Clear query param
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

  // Submit appointment
  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scheduledAt = `${bookDate}T${bookTime}:00Z`;
    bookMutation.mutate({
      patientId: bookPatientId,
      doctorId: bookDocId,
      scheduledAt,
      type: bookType as any,
      notes: bookReason,
      status: 'scheduled',
      durationMinutes: 30,
    });
  };

  // Submit SOAP notes
  const handleSoapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConsultId) return;
    saveSoapMutation.mutate({
      id: activeConsultId,
      notes: {
        subjective: soapSubjective,
        objective: soapObjective,
        assessment: soapAssessment,
        plan: soapPlan,
      },
    });
  };

  // Filter schedules
  const filteredApps = appointments.filter((app) => {
    return filterDocId === 'all' || app.doctorId === filterDocId;
  }).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Schedules & Encounters</h1>
          <p className="text-sm text-brand-600/70">Coordinate outpatient check-ins and physician consultations.</p>
        </div>
        <div className="flex items-center gap-2">
          {activeConsultId && (
            <Button size="sm" variant="outline" onClick={() => setSearchParams({})}>
              Cancel SOAP Note
            </Button>
          )}
          <Button size="sm" onClick={() => setIsBookModalOpen(true)}>
            <Plus size={16} className="mr-2" /> Book Appointment
          </Button>
        </div>
      </div>

      {/* RENDER SOAP NOTE PANEL IF CONSULT IN PROGRESS */}
      {activeConsultId && activeConsult ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Card & Reason */}
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardHeader className="bg-slate-50 border-b border-surface-border">
                <CardTitle className="text-xs uppercase tracking-wider text-brand-600/70">Encounter Patient</CardTitle>
                <h3 className="text-base font-bold text-brand-950 mt-2">{getPatientName(activeConsult.patientId)}</h3>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                <div>
                  <span className="text-[10px] text-brand-600/60 block">Consultation Doctor</span>
                  <p className="font-semibold text-brand-900 mt-0.5">{getDoctorName(activeConsult.doctorId)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-brand-600/60 block">Scheduled Time</span>
                  <p className="font-medium text-brand-900 mt-0.5">
                    {new Date(activeConsult.scheduledAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-brand-600/60 block">Chief Complaint / Booking Reason</span>
                  <p className="p-3 bg-surface rounded-lg text-brand-900 border border-surface-border font-medium italic mt-1">
                    "{activeConsult.notes || 'No notes specified'}"
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t border-surface-border/40 text-[10px] text-brand-600/60 flex items-center justify-center gap-1.5 font-medium">
                <AlertCircle size={12} className="text-brand-500" /> Entering clinical records (HIPAA Locked)
              </CardFooter>
            </Card>
          </div>

          {/* SOAP form */}
          <Card className="lg:col-span-2">
            <form onSubmit={handleSoapSubmit}>
              <CardHeader className="border-b border-surface-border/60">
                <div className="flex items-center gap-2">
                  <FileSignature size={18} className="text-brand-500" />
                  <CardTitle>Clinical SOAP Consultation Sheet</CardTitle>
                </div>
                <CardDescription>Review demographics, complete physical vitals check, formulate assessment, and plan medication.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-5 text-xs">
                
                {/* Subjective */}
                <div>
                  <label className="block font-semibold text-brand-900 mb-1.5 uppercase text-[10px] tracking-wider text-brand-600/70">
                    Subjective (Patient narrative, history, symptoms) *
                  </label>
                  <textarea
                    value={soapSubjective}
                    onChange={(e) => setSoapSubjective(e.target.value)}
                    rows={3}
                    placeholder="Describe patient symptoms, pain scale, onset detail, and family history..."
                    className="w-full p-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 font-sans"
                    required
                  />
                </div>

                {/* Objective */}
                <div>
                  <label className="block font-semibold text-brand-900 mb-1.5 uppercase text-[10px] tracking-wider text-brand-600/70">
                    Objective (Physical findings, labs, current vitals check) *
                  </label>
                  <textarea
                    value={soapObjective}
                    onChange={(e) => setSoapObjective(e.target.value)}
                    rows={3}
                    placeholder="Record physical examinations, cardiopulmonary auscultations, and raw lab summaries..."
                    className="w-full p-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 font-sans"
                    required
                  />
                </div>

                {/* Assessment */}
                <div>
                  <label className="block font-semibold text-brand-900 mb-1.5 uppercase text-[10px] tracking-wider text-brand-600/70">
                    Assessment (Clinical diagnoses, ICD-10 formulas, differentials) *
                  </label>
                  <textarea
                    value={soapAssessment}
                    onChange={(e) => setSoapAssessment(e.target.value)}
                    rows={3}
                    placeholder="Enter clinical assessment, diagnostic formulas, or differential diagnoses..."
                    className="w-full p-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 font-sans"
                    required
                  />
                </div>

                {/* Plan */}
                <div>
                  <label className="block font-semibold text-brand-900 mb-1.5 uppercase text-[10px] tracking-wider text-brand-600/70">
                    Plan (Therapies prescribed, diagnostics ordered, follow-ups) *
                  </label>
                  <textarea
                    value={soapPlan}
                    onChange={(e) => setSoapPlan(e.target.value)}
                    rows={3}
                    placeholder="Outline medication prescriptions, specialist referrals, lab panels ordered, and follow-up weeks..."
                    className="w-full p-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 font-sans"
                    required
                  />
                </div>

              </CardContent>
              <CardFooter className="border-t border-surface-border/40 p-4 bg-slate-50/50">
                <div className="w-full flex items-center justify-between">
                  <span className="text-[10px] text-brand-600/60 font-mono">Signer: useAuthStore Active Doctor</span>
                  <div className="flex gap-2">
                    <Button type="button" variant="secondary" size="sm" onClick={() => setSearchParams({})}>Cancel</Button>
                    <Button type="submit" size="sm" isLoading={saveSoapMutation.isPending}>
                      Sign & Finalize SOAP note
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      ) : (
        /* STANDARD CALENDAR / LIST VIEW */
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
          {/* Filter Sidebar */}
          <Card className="xl:col-span-1">
            <CardHeader className="py-4 border-b border-surface-border/50">
              <CardTitle className="text-xs">Schedule Filters</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div>
                <label className="block text-brand-700 font-medium mb-1">Filter by Physician</label>
                <select
                  value={filterDocId}
                  onChange={(e) => setFilterDocId(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none cursor-pointer font-medium"
                >
                  <option value="all">All Physicians</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      Dr. {d.firstName} {d.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status breakdown legend */}
              <div className="space-y-2 pt-2">
                <span className="font-semibold text-brand-900 uppercase text-[9px] tracking-wider text-brand-600/70">Status Key</span>
                <div className="space-y-1.5 font-sans">
                  <div className="flex items-center gap-2"><Badge variant="pending" dot>Scheduled</Badge></div>
                  <div className="flex items-center gap-2"><Badge variant="warning" dot>Checked In</Badge></div>
                  <div className="flex items-center gap-2"><Badge variant="brand" dot>In Progress</Badge></div>
                  <div className="flex items-center gap-2"><Badge variant="stable" dot>Completed</Badge></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* List panel */}
          <Card className="xl:col-span-3">
            <CardHeader>
              <CardTitle>Schedule Board</CardTitle>
              <CardDescription>Daily appointments logged for active clinical departments.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-elevated/40 text-[10px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                      <th className="px-6 py-3 font-semibold">Time</th>
                      <th className="px-6 py-3 font-semibold">Patient</th>
                      <th className="px-6 py-3 font-semibold">Visit Type</th>
                      <th className="px-6 py-3 font-semibold">Assigned Doctor</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold text-right">Consult Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {appLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-brand-600/70">
                          Retrieving calendar events...
                        </td>
                      </tr>
                    ) : filteredApps.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-brand-600/70 font-medium">
                          No schedules booked matching filters.
                        </td>
                      </tr>
                    ) : (
                      filteredApps.map((app) => {
                        const dateStr = new Date(app.scheduledAt).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        });
                        return (
                          <tr key={app.id} className="hover:bg-surface/30 transition-colors">
                            <td className="px-6 py-4 font-mono font-medium text-brand-900">{dateStr}</td>
                            <td className="px-6 py-4 font-semibold text-brand-950 hover:underline">
                              <Link to={`/patients/${app.patientId}`}>{getPatientName(app.patientId)}</Link>
                            </td>
                            <td className="px-6 py-4 capitalize">{app.type.replace('_', ' ')}</td>
                            <td className="px-6 py-4 text-brand-600/80">{getDoctorName(app.doctorId)}</td>
                            <td className="px-6 py-4">
                              <Badge 
                                variant={
                                  app.status === 'completed' ? 'stable' : 
                                  app.status === 'in_progress' ? 'brand' : 
                                  app.status === 'checked_in' ? 'warning' : 'pending'
                                }
                                dot={app.status !== 'completed'}
                              >
                                {app.status.replace('_', ' ')}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {app.status === 'completed' ? (
                                <div className="flex justify-end items-center gap-1.5 text-brand-600/60 font-semibold text-[10px]">
                                  <FileText size={12} /> Notes Signed
                                </div>
                              ) : (
                                <Button 
                                  size="sm" 
                                  className="h-7 text-[10px] px-2.5"
                                  onClick={() => setSearchParams({ consult: app.id })}
                                >
                                  Open Encounter
                                </Button>
                              )}
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
        </div>
      )}

      {/* Modal: Book Appointment */}
      <Modal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} title="Schedule Medical Encounter">
        <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-brand-700 font-medium mb-1">Select Patient *</label>
            <select
              value={bookPatientId}
              onChange={(e) => setBookPatientId(e.target.value)}
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
            <label className="block text-brand-700 font-medium mb-1">Select Physician *</label>
            <select
              value={bookDocId}
              onChange={(e) => setBookDocId(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none font-medium"
              required
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  Dr. {d.firstName} {d.lastName} ({d.specialty})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-700 font-medium mb-1">Date *</label>
              <input
                type="date"
                value={bookDate}
                onChange={(e) => setBookDate(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-brand-700 font-medium mb-1">Time *</label>
              <input
                type="time"
                value={bookTime}
                onChange={(e) => setBookTime(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-brand-700 font-medium mb-1">Encounter Type *</label>
            <select
              value={bookType}
              onChange={(e) => setBookType(e.target.value as any)}
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none cursor-pointer font-medium"
              required
            >
              <option value="new_patient">Consultation</option>
              <option value="follow_up">Follow Up</option>
              <option value="procedure">Clinical Procedure</option>
              <option value="telehealth">Routine Wellness check</option>
            </select>
          </div>
          <div>
            <label className="block text-brand-700 font-medium mb-1">Chief Complaint *</label>
            <input
              type="text"
              value={bookReason}
              onChange={(e) => setBookReason(e.target.value)}
              placeholder="e.g. Migraine headache, persistent cough for 4 days"
              className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none"
              required
            />
          </div>
          <div className="pt-3 border-t border-surface-border/40 flex justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsBookModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm" isLoading={bookMutation.isPending}>Book Session</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
