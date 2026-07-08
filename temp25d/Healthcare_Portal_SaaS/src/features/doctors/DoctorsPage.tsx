import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { doctorsApi } from '../../lib/api/doctors.api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Mail, Shield, CheckCircle, Clock } from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorsApi.getDoctors,
  });

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-brand-600">Retrieving physician credentials...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Care Providers Registry</h1>
        <p className="text-sm text-brand-600/70">Review licensing credentials and medical specialty assignments of staff.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <Card key={doc.id} hoverEffect>
            <CardHeader className="bg-slate-50/50 pb-4 border-b border-surface-border/40 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={doc.avatarUrl}
                  alt={doc.firstName}
                  className="h-12 w-12 rounded-full border border-surface-border shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${doc.firstName}+${doc.lastName}&background=ecfeff&color=0891b2`;
                  }}
                />
                <div>
                  <h3 className="text-sm font-bold text-brand-950">
                    Dr. {doc.firstName} {doc.lastName}
                  </h3>
                  <p className="text-[10px] text-cyan-600 font-semibold font-mono tracking-wider uppercase mt-0.5">
                    {doc.specialty}
                  </p>
                </div>
              </div>
              <Badge variant="stable" dot>
                Active
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-xs">
              <div className="flex items-center gap-2 text-brand-600/80">
                <Shield size={14} className="text-brand-500/60" />
                <span>
                  License: <span className="font-mono font-medium text-brand-900">{doc.licenseNumber}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-brand-600/80">
                <Mail size={14} className="text-brand-500/60" />
                <span className="truncate">{doc.email}</span>
              </div>
              <div className="flex items-center gap-2 text-brand-600/80">
                <Clock size={14} className="text-brand-500/60" />
                <span>Full-Time Clinical Duty</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
