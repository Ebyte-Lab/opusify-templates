import React, { useState } from 'react';
import { useClinicStore } from '../../stores/clinicStore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Settings, 
  Building, 
  CreditCard, 
  ShieldCheck, 
  RefreshCw, 
  FileText, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
}

export const SettingsPage: React.FC = () => {
  const { clinic, plan, setClinic, setPlan } = useClinicStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'plan' | 'audit'>('profile');

  // Profile Form state
  const [name, setName] = useState(clinic?.name || '');
  const [address, setAddress] = useState(clinic?.address || '');
  const [phone, setPhone] = useState(clinic?.phone || '');
  const [email, setEmail] = useState(clinic?.email || '');
  const [license, setLicense] = useState(clinic?.licenseNumber || '');
  const [isSaved, setIsSaved] = useState(false);

  // Security HIPAA Audit logs
  const auditLogs: AuditLog[] = [
    { id: 'aud-1', action: 'PATIENT_RECORD_VIEW', user: 'Dr. Michael Vance', resource: 'Patient Chart: Michael Adams (PAT-002)', timestamp: '2026-07-08 10:02:15', ipAddress: '192.168.1.14' },
    { id: 'aud-2', action: 'PRESCRIPTION_CREATE', user: 'Dr. Michael Vance', resource: 'Rx: Lisinopril 10mg written for Sarah Jenkins', timestamp: '2026-07-08 09:44:02', ipAddress: '192.168.1.14' },
    { id: 'aud-3', action: 'PATIENT_RECORD_CREATE', user: 'Sarah Patel (Front Desk)', resource: 'Patient intake chart created: Michael Adams', timestamp: '2026-07-08 09:30:11', ipAddress: '192.168.1.25' },
    { id: 'aud-4', action: 'LAB_RESULTS_POST', user: 'Lab Integration API', resource: 'Lab Test values posted for Patient: Michael Adams', timestamp: '2026-07-08 09:12:00', ipAddress: '10.0.4.150' },
    { id: 'aud-5', action: 'CLINIC_PLAN_UPGRADE', user: 'System Admin Desk', resource: 'Subscription plan upgraded to Enterprise', timestamp: '2026-07-07 14:00:00', ipAddress: '192.168.1.10' }
  ];

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClinic({
      id: clinic?.id || 'CL-001',
      name,
      address,
      phone,
      email,
      specialty: clinic?.specialty || 'General',
      licenseNumber: license,
      timezone: clinic?.timezone || 'America/New_York'
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleUpgradePlan = (newPlan: 'starter' | 'professional' | 'enterprise') => {
    setPlan(newPlan);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Settings Console</h1>
          <p className="text-sm text-brand-600/70">Manage clinic profile identities, active plans, and HIPAA security logs.</p>
        </div>
        <Badge variant="brand">Platform Tier: {plan.toUpperCase()}</Badge>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-surface-border bg-white rounded-lg p-1.5 shadow-sm overflow-x-auto no-scrollbar gap-1 max-w-md">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'profile' ? 'bg-brand-500 text-white shadow-sm' : 'text-brand-700 hover:bg-brand-50/40'
          }`}
        >
          <Building size={14} /> Clinic Profile
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          className={`flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'plan' ? 'bg-brand-500 text-white shadow-sm' : 'text-brand-700 hover:bg-brand-50/40'
          }`}
        >
          <CreditCard size={14} /> Subscription Plan
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'audit' ? 'bg-brand-500 text-white shadow-sm' : 'text-brand-700 hover:bg-brand-50/40'
          }`}
        >
          <ShieldCheck size={14} /> Audit Trail
        </button>
      </div>

      {/* TAB 1: Clinic Profile */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <form onSubmit={handleProfileSubmit}>
            <Card>
              <CardHeader className="border-b border-surface-border/60">
                <CardTitle>Clinic Information</CardTitle>
                <CardDescription>Identity and contact details shown on statements and lab orders.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-brand-700 font-medium mb-1">Clinic Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all font-semibold text-brand-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-brand-700 font-medium mb-1">Residential Practice Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Clinic Telephone *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-brand-700 font-medium mb-1">Clinic Support Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-brand-700 font-medium mb-1">Practice License Number *</label>
                  <input
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface border border-surface-border outline-none focus:bg-white focus:border-brand-500 transition-all font-mono"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-surface-border/40 p-4 bg-slate-50/50 flex justify-between items-center">
                {isSaved ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle size={14} /> Clinic Profile Updated successfully!
                  </span>
                ) : (
                  <span className="text-brand-600/60">Ensure parameters match healthcare license records.</span>
                )}
                <Button type="submit">Save settings</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}

      {/* TAB 2: Subscription Plan */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Starter Plan */}
            <Card className={plan === 'starter' ? 'ring-2 ring-cyan-500' : ''}>
              <CardHeader className="text-center py-5 border-b border-surface-border/40 bg-slate-50/30">
                <h3 className="text-sm font-bold text-brand-950">Starter Tier</h3>
                <p className="text-2xl font-bold mt-2 text-brand-900">$99 <span className="text-[10px] text-brand-650 font-normal">/mo</span></p>
                <CardDescription className="mt-1">For single physician desks</CardDescription>
              </CardHeader>
              <CardContent className="p-5 text-xs space-y-3">
                <p className="flex items-center gap-1.5 text-brand-750">✓ Limit 1 Admin seat</p>
                <p className="flex items-center gap-1.5 text-brand-750">✓ Limit 250 Active Patients</p>
                <p className="flex items-center gap-1.5 text-brand-750">✓ Basic scheduling metrics</p>
                <p className="flex items-center gap-1.5 text-brand-750/50">✗ No secure chat channel</p>
              </CardContent>
              <CardFooter className="p-4 border-t border-surface-border/40 text-center">
                {plan === 'starter' ? (
                  <Button size="sm" className="w-full" disabled>Active Plan</Button>
                ) : (
                  <Button size="sm" variant="outline" className="w-full" onClick={() => handleUpgradePlan('starter')}>
                    Downgrade
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Professional Plan */}
            <Card className={plan === 'professional' ? 'ring-2 ring-cyan-500' : ''}>
              <CardHeader className="text-center py-5 border-b border-surface-border/40 bg-slate-50/30">
                <h3 className="text-sm font-bold text-brand-950">Professional Tier</h3>
                <p className="text-2xl font-bold mt-2 text-brand-900">$299 <span className="text-[10px] text-brand-650 font-normal">/mo</span></p>
                <CardDescription className="mt-1">For mid-size group practices</CardDescription>
              </CardHeader>
              <CardContent className="p-5 text-xs space-y-3">
                <p className="flex items-center gap-1.5 text-brand-750">✓ Limit 5 Staff seats</p>
                <p className="flex items-center gap-1.5 text-brand-750">✓ Limit 1,000 Active Patients</p>
                <p className="flex items-center gap-1.5 text-brand-750">✓ Full scheduling + SOAP notes</p>
                <p className="flex items-center gap-1.5 text-brand-750">✓ Secure staff chat channels</p>
              </CardContent>
              <CardFooter className="p-4 border-t border-surface-border/40 text-center">
                {plan === 'professional' ? (
                  <Button size="sm" className="w-full" disabled>Active Plan</Button>
                ) : (
                  <Button size="sm" variant="outline" className="w-full" onClick={() => handleUpgradePlan('professional')}>
                    {plan === 'enterprise' ? 'Downgrade' : 'Upgrade'}
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Enterprise Plan */}
            <Card className={plan === 'enterprise' ? 'ring-2 ring-cyan-500' : ''}>
              <CardHeader className="text-center py-5 border-b border-surface-border/40 bg-slate-50/30">
                <div className="flex justify-center mb-1"><Badge variant="brand" className="text-[9px] py-0">POPULAR</Badge></div>
                <h3 className="text-sm font-bold text-brand-950">Enterprise Center</h3>
                <p className="text-2xl font-bold mt-1 text-brand-900">$599 <span className="text-[10px] text-brand-650 font-normal">/mo</span></p>
                <CardDescription className="mt-1">For large medical centers</CardDescription>
              </CardHeader>
              <CardContent className="p-5 text-xs space-y-3">
                <p className="flex items-center gap-1.5 text-brand-750">✓ Unlimited seats & Providers</p>
                <p className="flex items-center gap-1.5 text-brand-750">✓ Unlimited patient charts</p>
                <p className="flex items-center gap-1.5 text-brand-750">✓ Full scheduling + SOAP notes</p>
                <p className="flex items-center gap-1.5 text-brand-750">✓ Secure chat + lab panels integration</p>
                <p className="flex items-center gap-1.5 text-brand-750">✓ HIPAA Audit Logs & compliance suite</p>
              </CardContent>
              <CardFooter className="p-4 border-t border-surface-border/40 text-center">
                {plan === 'enterprise' ? (
                  <Button size="sm" className="w-full" disabled>Active Plan</Button>
                ) : (
                  <Button size="sm" className="w-full bg-cyan-600 hover:bg-cyan-700" onClick={() => handleUpgradePlan('enterprise')}>
                    Upgrade
                  </Button>
                )}
              </CardFooter>
            </Card>

          </div>
        </div>
      )}

      {/* TAB 3: Audit Trails */}
      {activeTab === 'audit' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600 animate-pulse" />
              <CardTitle>HIPAA Security Audit Logs</CardTitle>
            </div>
            <CardDescription>
              Under CFR Title 45 Part 164, all access to Protected Health Information (PHI) must be recorded and audited.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto text-[11px] font-sans">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-elevated/40 text-[9px] text-brand-600/70 uppercase tracking-wider font-mono border-b border-surface-border">
                    <th className="px-6 py-3 font-semibold">Audit ID</th>
                    <th className="px-6 py-3 font-semibold">Action type</th>
                    <th className="px-6 py-3 font-semibold">Performed By</th>
                    <th className="px-6 py-3 font-semibold">Target PHI resource</th>
                    <th className="px-6 py-3 font-semibold font-mono">Timestamp</th>
                    <th className="px-6 py-3 font-semibold font-mono">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/50">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3 font-mono font-medium text-brand-600">{log.id}</td>
                      <td className="px-6 py-3">
                        <Badge 
                          variant={
                            log.action.includes('CREATE') ? 'brand' :
                            log.action.includes('VIEW') ? 'stable' : 'warning'
                          }
                          className="font-mono text-[9px] leading-none px-1.5 py-0.5"
                        >
                          {log.action}
                        </Badge>
                      </td>
                      <td className="px-6 py-3 font-semibold text-brand-950">{log.user}</td>
                      <td className="px-6 py-3 text-brand-750">{log.resource}</td>
                      <td className="px-6 py-3 font-mono text-brand-600">{log.timestamp}</td>
                      <td className="px-6 py-3 font-mono text-brand-600">{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
};
