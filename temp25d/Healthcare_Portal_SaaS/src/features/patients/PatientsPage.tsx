import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { patientsApi } from '../../lib/api/patients.api';
import { doctorsApi } from '../../lib/api/doctors.api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Plus, Search, Filter, Eye, Phone, Mail } from 'lucide-react';

export const PatientsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamQuery = searchParams.get('search') || '';

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(searchParamQuery);
  const [statusFilter, setStatusFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');

  // Sync state if url param changes
  React.useEffect(() => {
    setSearchQuery(searchParamQuery);
  }, [searchParamQuery]);

  // Fetch lists
  const { data: patients = [], isLoading: patientsLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: patientsApi.getPatients,
  });

  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorsApi.getDoctors,
  });

  const getProviderName = (doctorId: string) => {
    const d = doctors.find((doc) => doc.id === doctorId);
    return d ? `Dr. ${d.firstName} ${d.lastName}` : 'Unassigned';
  };

  // Filter patients
  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = 
      fullName.includes(query) || 
      patient.mrn.toLowerCase().includes(query) || 
      patient.phone.includes(query) ||
      patient.email.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesProvider = providerFilter === 'all' || patient.primaryDoctorId === providerFilter;

    return matchesSearch && matchesStatus && matchesProvider;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patients Directory</h1>
          <p className="text-sm text-brand-600/70">Manage active patient profiles and medical records.</p>
        </div>
        <Link to="/patients/new">
          <Button size="sm">
            <Plus size={16} className="mr-2" /> Register New Patient
          </Button>
        </Link>
      </div>

      {/* Filters Toolbar */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchParams({ search: e.target.value });
              }}
              placeholder="Search by name, MRN, email, or phone..."
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/10 transition-all font-body"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-brand-500/60" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white focus:border-brand-500/60 transition-all font-body cursor-pointer font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="discharged">Discharged</option>
            </select>
          </div>

          {/* Doctor Filter */}
          <div className="flex items-center gap-2">
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="h-10 px-3 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white focus:border-brand-500/60 transition-all font-body cursor-pointer font-medium"
            >
              <option value="all">All Primary Providers</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  Dr. {d.firstName} {d.lastName} ({d.specialty})
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Directory Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-elevated/40 text-[10px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                  <th className="px-6 py-3 font-semibold">MRN</th>
                  <th className="px-6 py-3 font-semibold">Patient Name</th>
                  <th className="px-6 py-3 font-semibold">DOB / Age</th>
                  <th className="px-6 py-3 font-semibold">Contact Info</th>
                  <th className="px-6 py-3 font-semibold">Primary Doctor</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50 text-xs">
                {patientsLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-brand-600/70">
                      Loading patients directory...
                    </td>
                  </tr>
                ) : filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-brand-600/70 font-medium">
                      No patients found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => {
                    const dob = new Date(patient.dateOfBirth);
                    const age = new Date().getFullYear() - dob.getFullYear();
                    
                    return (
                      <tr key={patient.id} className="hover:bg-surface/30 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-brand-900">{patient.mrn}</td>
                        <td className="px-6 py-4">
                          <Link to={`/patients/${patient.id}`} className="font-semibold text-brand-950 hover:underline">
                            {patient.firstName} {patient.lastName}
                          </Link>
                          <p className="text-[10px] text-brand-600/60 capitalize">{patient.gender}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-brand-900">{patient.dateOfBirth}</p>
                          <p className="text-[10px] text-brand-600/60">{age} years old</p>
                        </td>
                        <td className="px-6 py-4 space-y-0.5">
                          <p className="flex items-center gap-1 text-brand-700">
                            <Phone size={10} className="text-brand-500/60" /> {patient.phone}
                          </p>
                          <p className="flex items-center gap-1 text-brand-600/70">
                            <Mail size={10} className="text-brand-500/60" /> {patient.email}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-brand-600/90 font-medium">
                          {getProviderName(patient.primaryDoctorId)}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              patient.status === 'active' ? 'stable' :
                              patient.status === 'inactive' ? 'inactive' : 'pending'
                            }
                            dot
                          >
                            {patient.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link to={`/patients/${patient.id}`}>
                            <Button variant="outline" size="sm" className="h-8">
                              <Eye size={12} className="mr-1" /> View Chart
                            </Button>
                          </Link>
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
  );
};
