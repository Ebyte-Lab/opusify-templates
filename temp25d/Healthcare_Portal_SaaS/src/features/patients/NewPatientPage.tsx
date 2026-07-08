import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { patientsApi } from '../../lib/api/patients.api';
import { doctorsApi } from '../../lib/api/doctors.api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, UserPlus, HeartPulse } from 'lucide-react';

export const NewPatientPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'non-binary' | 'prefer_not_to_say'>('male');
  const [address, setAddress] = useState('');
  const [bloodType, setBloodType] = useState<any>('O+');
  const [primaryDoctorId, setPrimaryDoctorId] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('');
  const [allergiesText, setAllergiesText] = useState('');

  // Fetch doctors for selector
  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorsApi.getDoctors,
  });

  // Pre-select first doctor if available
  React.useEffect(() => {
    if (doctors.length > 0 && !primaryDoctorId) {
      setPrimaryDoctorId(doctors[0].id);
    }
  }, [doctors, primaryDoctorId]);

  // Mutation
  const registerMutation = useMutation({
    mutationFn: patientsApi.createPatient,
    onSuccess: (newPatient) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['summaryStats'] });
      navigate(`/patients/${newPatient.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse allergies list
    const allergies = allergiesText
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    registerMutation.mutate({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      bloodType,
      primaryDoctorId,
      allergies,
      insuranceProvider: insuranceProvider || undefined,
      insurancePolicyNumber: insurancePolicyNumber || undefined,
      status: 'active',
      conditions: [],
    });
  };

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <Link to="/patients" className="inline-flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-900 font-medium">
          <ArrowLeft size={14} /> Back to Patients
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="border-b border-surface-border/60">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-500">
                  <UserPlus size={20} />
                </div>
                <div>
                  <CardTitle>Register Intake Form</CardTitle>
                  <CardDescription>Enter demographic, clinical contact, and insurance records.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6 text-xs">
              
              {/* Demographics Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-brand-900 border-b border-surface-border pb-1 text-[11px] tracking-wider uppercase text-brand-600/70">
                  Demographic Identity
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Gender *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all cursor-pointer font-medium"
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-Binary</option>
                      <option value="prefer_not_to_say">Prefer Not To Say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Blood Type *</label>
                    <select
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value as any)}
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all cursor-pointer font-medium"
                      required
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 555-010-8822"
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-brand-700 font-medium mb-1">Residential Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, City, State, ZIP"
                    className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Insurance Details */}
              <div className="space-y-4 pt-2">
                <h3 className="font-semibold text-brand-900 border-b border-surface-border pb-1 text-[11px] tracking-wider uppercase text-brand-600/70">
                  Insurance Coverage (Self Pay if blank)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Insurance Carrier</label>
                    <input
                      type="text"
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      placeholder="e.g. Blue Cross Blue Shield"
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Policy / Member ID</label>
                    <input
                      type="text"
                      value={insurancePolicyNumber}
                      onChange={(e) => setInsurancePolicyNumber(e.target.value)}
                      placeholder="e.g. BC-9023019"
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Clinical Management */}
              <div className="space-y-4 pt-2">
                <h3 className="font-semibold text-brand-900 border-b border-surface-border pb-1 text-[11px] tracking-wider uppercase text-brand-600/70">
                  Clinical Assignments & Allergies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Primary Managing Doctor *</label>
                    <select
                      value={primaryDoctorId}
                      onChange={(e) => setPrimaryDoctorId(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all cursor-pointer font-medium"
                      required
                    >
                      {doctors.map((d) => (
                        <option key={d.id} value={d.id}>
                          Dr. {d.firstName} {d.lastName} ({d.specialty})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Known Allergies (Comma-separated)</label>
                    <input
                      type="text"
                      value={allergiesText}
                      onChange={(e) => setAllergiesText(e.target.value)}
                      placeholder="e.g. Penicillin, Peanuts, Latex"
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all"
                    />
                  </div>
                </div>
              </div>

            </CardContent>
            <CardFooter className="border-t border-surface-border/40 p-4 bg-slate-50/50 flex justify-between">
              <Link to="/patients">
                <Button type="button" variant="secondary">Cancel</Button>
              </Link>
              <Button type="submit" isLoading={registerMutation.isPending}>
                <HeartPulse size={14} className="mr-2 animate-pulse" /> Finalize Registration
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};
