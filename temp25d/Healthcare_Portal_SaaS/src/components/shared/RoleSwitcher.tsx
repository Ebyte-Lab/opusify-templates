import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { UserCheck, Shield, Stethoscope, ClipboardList, RefreshCw } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole } = useAuthStore();

  const roles = [
    { value: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'text-brand-500 bg-brand-50 border-brand-200' },
    { value: 'nurse', label: 'Nurse', icon: ClipboardList, color: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
    { value: 'admin', label: 'Admin', icon: Shield, color: 'text-red-500 bg-red-50 border-red-200' },
    { value: 'receptionist', label: 'Front Desk', icon: UserCheck, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      <div className="hidden lg:flex items-center gap-1.5 bg-surface-elevated/75 border border-surface-border p-1 rounded-lg">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = role === r.value;
          return (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white text-brand-900 shadow-sm border border-surface-border'
                  : 'text-brand-600 hover:text-brand-900 hover:bg-white/40'
              }`}
            >
              <Icon size={12} className={isActive ? 'text-brand-500' : 'text-brand-500/60'} />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Mobile/Tablet Select Dropdown */}
      <div className="lg:hidden relative flex items-center bg-surface-elevated border border-surface-border px-2.5 py-1.5 rounded-lg text-xs font-medium text-brand-700">
        <RefreshCw size={12} className="mr-2 text-brand-500 animate-spin-slow" />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="bg-transparent border-none outline-none pr-6 cursor-pointer font-display text-brand-900 font-medium"
        >
          <option value="doctor">Role: Doctor</option>
          <option value="nurse">Role: Nurse</option>
          <option value="admin">Role: Admin</option>
          <option value="receptionist">Role: Front Desk</option>
        </select>
      </div>
    </div>
  );
};
