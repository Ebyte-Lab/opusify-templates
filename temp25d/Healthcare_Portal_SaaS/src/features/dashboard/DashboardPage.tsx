import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { reportsApi } from '../../lib/api/reports.api';
import { appointmentsApi } from '../../lib/api/appointments.api';
import { patientsApi } from '../../lib/api/patients.api';
import { doctorsApi } from '../../lib/api/doctors.api';
import { labApi } from '../../lib/api/lab.api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  Activity, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Queries
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['summaryStats'],
    queryFn: reportsApi.getSummaryStats,
  });

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['monthlyRevenue'],
    queryFn: reportsApi.getMonthlyRevenue,
  });

  const { data: specialtyData, isLoading: specialtyLoading } = useQuery({
    queryKey: ['specialtyVolume'],
    queryFn: reportsApi.getSpecialtyVolume,
  });

  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
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

  const { data: labs = [] } = useQuery({
    queryKey: ['labs'],
    queryFn: labApi.getLabOrders,
  });

  // Mutation to quickly check-in patient or update status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) => 
      appointmentsApi.updateAppointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['summaryStats'] });
    },
  });

  // Filter today's appointments (seed date is 2026-07-08)
  const todayStr = '2026-07-08';
  const todayAppointments = appointments
    .filter((a) => a.scheduledAt.startsWith(todayStr))
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

  // Critical alerts (labs with interpretation critical and status completed)
  const criticalLabs = labs.filter(
    (l) => l.status === 'completed' && l.result?.interpretation === 'critical'
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const getPatientName = (patientId: string) => {
    const p = patients.find((pat) => pat.id === patientId);
    return p ? `${p.firstName} ${p.lastName}` : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const d = doctors.find((doc) => doc.id === doctorId);
    return d ? `${d.firstName} ${d.lastName}` : 'Unknown Provider';
  };

  const isLoading = statsLoading || revenueLoading || specialtyLoading || appointmentsLoading;

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <svg className="animate-spin h-8 w-8 text-brand-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-xs text-brand-600 font-medium">Gathering clinical records...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header welcome message */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clinical Operations Overview</h1>
          <p className="text-sm text-brand-600/70">Welcome back, Dr. Vance. Here's your workspace summary for July 8, 2026.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate('/appointments')}>
            <Calendar size={14} className="mr-2" /> Schedule Grid
          </Button>
          <Link to="/patients/new">
            <Button size="sm">
              <Users size={14} className="mr-2" /> Register Patient
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-brand-600/70 font-medium">Active Admitted Patients</span>
              <p className="text-2xl font-bold text-brand-900">{stats?.activePatients}</p>
            </div>
            <div className="h-10 w-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-500">
              <Users size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-brand-600/70 font-medium">Today's Appointments</span>
              <p className="text-2xl font-bold text-brand-900">{stats?.todayAppointments}</p>
            </div>
            <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500">
              <Clock size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-brand-600/70 font-medium">Revenue Collected</span>
              <p className="text-2xl font-bold text-brand-900">{formatCurrency(stats?.revenueCollected || 0)}</p>
            </div>
            <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
              <DollarSign size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className={stats?.criticalAlertsCount && stats.criticalAlertsCount > 0 ? 'ring-2 ring-red-500/30' : ''}>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-brand-600/70 font-medium">Critical Lab Alerts</span>
              <p className="text-2xl font-bold text-brand-900">{stats?.criticalAlertsCount}</p>
            </div>
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
              stats?.criticalAlertsCount && stats.criticalAlertsCount > 0 
                ? 'bg-red-50 text-red-500 pulse-critical' 
                : 'bg-slate-50 text-slate-400'
            }`}>
              <AlertTriangle size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical alerts banner if any */}
      {criticalLabs.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-semibold text-red-900">Immediate Action Required: Critical Lab Results</h4>
              <p className="text-xs text-red-700/80 mt-0.5">
                {criticalLabs.length} patient test(s) returned values outside safe clinical limits. Review immediately.
              </p>
            </div>
          </div>
          <Link to="/lab">
            <Button variant="outline" size="sm" className="bg-white border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300">
              View Labs <ChevronRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>Billed vs collected Patient Responsibility</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend iconSize={10} verticalAlign="top" height={36} wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="Billed" stroke="#6366f1" fillOpacity={1} fill="url(#colorBilled)" strokeWidth={2} name="Total Billed" />
                <Area type="monotone" dataKey="Collected" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCollected)" strokeWidth={2} name="Total Collected" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Specialty Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Clinical Volumes</CardTitle>
            <CardDescription>Patient distribution by medical specialty department</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialtyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="specialty" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Legend iconSize={10} verticalAlign="top" height={36} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="appointments" fill="#0891b2" radius={[4, 4, 0, 0]} name="Completed Visits" maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Today's Appointments & Vitals Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Appointments List */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Schedules</CardTitle>
              <CardDescription>Appointments booked for July 8, 2026</CardDescription>
            </div>
            <Badge variant="brand">{todayAppointments.length} Booked</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-elevated/40 text-[10px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                    <th className="px-6 py-3 font-semibold">Time</th>
                    <th className="px-6 py-3 font-semibold">Patient</th>
                    <th className="px-6 py-3 font-semibold">Type</th>
                    <th className="px-6 py-3 font-semibold">Provider</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/50 text-xs">
                  {todayAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-brand-600/70">
                        No appointments scheduled for today.
                      </td>
                    </tr>
                  ) : (
                    todayAppointments.map((app) => {
                      const appTime = new Date(app.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                      return (
                        <tr key={app.id} className="hover:bg-surface/30 transition-colors">
                          <td className="px-6 py-4 font-mono font-medium text-brand-900">{appTime}</td>
                          <td className="px-6 py-4 font-medium text-brand-950 hover:underline">
                            <Link to={`/patients/${app.patientId}`}>{getPatientName(app.patientId)}</Link>
                          </td>
                          <td className="px-6 py-4 capitalize">{app.type.replace('_', ' ')}</td>
                          <td className="px-6 py-4 text-brand-600/80">{getDoctorName(app.doctorId)}</td>
                          <td className="px-6 py-4">
                            <Badge 
                              variant={
                                app.status === 'completed' ? 'stable' : 
                                app.status === 'in_progress' ? 'pending' : 
                                app.status === 'checked_in' ? 'warning' : 'inactive'
                              }
                              dot={app.status === 'in_progress' || app.status === 'checked_in'}
                            >
                              {app.status.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1.5">
                              {app.status === 'scheduled' || app.status === 'confirmed' ? (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-7 text-[10px] px-2"
                                  onClick={() => updateStatusMutation.mutate({ id: app.id, status: 'checked_in' })}
                                >
                                  Check In
                                </Button>
                              ) : app.status === 'checked_in' ? (
                                <Button 
                                  size="sm" 
                                  className="h-7 text-[10px] px-2 bg-indigo-500 hover:bg-indigo-600"
                                  onClick={() => updateStatusMutation.mutate({ id: app.id, status: 'in_progress' })}
                                >
                                  Start Visit
                                </Button>
                              ) : app.status === 'in_progress' ? (
                                <Link to={`/appointments?consult=${app.id}`}>
                                  <Button 
                                    size="sm" 
                                    className="h-7 text-[10px] px-2 bg-emerald-500 hover:bg-emerald-600"
                                  >
                                    SOAP Note
                                  </Button>
                                </Link>
                              ) : (
                                <CheckCircle2 size={16} className="text-emerald-500 mr-2" />
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

        {/* Lab Results Sidebar Alert Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Lab Submissions</CardTitle>
            <CardDescription>Track status of tests ordered</CardDescription>
          </CardHeader>
          <CardContent className="px-0 py-2">
            <div className="divide-y divide-surface-border/50">
              {labs.slice(0, 5).map((lab) => (
                <div key={lab.id} className="p-4 hover:bg-surface/30 transition-colors flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="font-semibold text-brand-950">{lab.testName}</p>
                    <p className="text-[10px] text-brand-600/70">
                      Patient: <span className="font-medium">{getPatientName(lab.patientId)}</span>
                    </p>
                    <p className="text-[10px] text-brand-600/50 font-mono">Ordered: {lab.orderedAt.split('T')[0]}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge 
                      variant={
                        lab.status === 'completed' && lab.result?.interpretation === 'critical' ? 'critical' : 
                        lab.status === 'completed' && lab.result?.interpretation === 'abnormal' ? 'warning' :
                        lab.status === 'completed' ? 'stable' : 'pending'
                      }
                      dot={lab.status === 'pending'}
                    >
                      {lab.status === 'completed' && lab.result ? lab.result.interpretation : lab.status}
                    </Badge>
                    {lab.status === 'completed' && lab.result && (
                      <p className="text-xs font-mono font-bold text-brand-900 mt-1">
                        {lab.result.value} <span className="text-[10px] font-normal text-brand-600/60">{lab.result.unit}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 pt-2 text-center border-t border-surface-border/40">
              <Link to="/lab" className="text-xs font-medium text-brand-500 hover:text-brand-600 flex items-center justify-center gap-1">
                Open Lab Portal <ChevronRight size={14} />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
