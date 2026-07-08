import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Bell, 
  CheckCheck, 
  AlertTriangle, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react';

interface SystemNotification {
  id: string;
  type: 'clinical' | 'appointment' | 'billing' | 'chat' | 'system';
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  priority: 'info' | 'warning' | 'critical';
}

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: 'nt-1',
      type: 'clinical',
      title: 'Critical Lab Results Posted',
      body: 'Patient Michael Adams (MRN-20002) Lipid Panel returned a critical cholesterol reading of 285 mg/dL.',
      timestamp: '10 minutes ago',
      isRead: false,
      priority: 'critical'
    },
    {
      id: 'nt-2',
      type: 'appointment',
      title: 'New Appointment Scheduled',
      body: 'Patient Sarah Jenkins (MRN-20001) booked a follow-up consultation with Dr. Michael Vance on July 8 at 10:30 AM.',
      timestamp: '45 minutes ago',
      isRead: false,
      priority: 'info'
    },
    {
      id: 'nt-3',
      type: 'billing',
      title: 'Patient Responsibility Paid',
      body: 'Sarah Jenkins (INV-2026-0001) recorded a credit card collection payment of $120.00.',
      timestamp: '1 hour ago',
      isRead: true,
      priority: 'info'
    },
    {
      id: 'nt-4',
      type: 'chat',
      title: 'Secure Message from Triage Desk',
      body: 'Nurse Clara Adams sent a patient warning alert: Room 4 patient BP is 158/98.',
      timestamp: '2 hours ago',
      isRead: true,
      priority: 'warning'
    },
    {
      id: 'nt-5',
      type: 'system',
      title: 'Platform Maintenance Notice',
      body: 'NEXUS_PORTAL will undergo standard database optimizations on July 10 at 12:00 AM EST. Access will be offline for 30 minutes.',
      timestamp: '1 day ago',
      isRead: true,
      priority: 'info'
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const getIcon = (type: SystemNotification['type'], priority: SystemNotification['priority']) => {
    if (priority === 'critical') return <AlertTriangle className="text-red-500 shrink-0" size={16} />;
    switch (type) {
      case 'appointment': return <Calendar className="text-indigo-500 shrink-0" size={16} />;
      case 'billing': return <CreditCard className="text-emerald-500 shrink-0" size={16} />;
      case 'chat': return <MessageSquare className="text-cyan-500 shrink-0" size={16} />;
      default: return <Bell className="text-brand-500 shrink-0" size={16} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notification Center</h1>
          <p className="text-sm text-brand-600/70">Review clinical reports, scheduling updates, and system alerts.</p>
        </div>
        {unreadCount > 0 && (
          <Button size="sm" onClick={handleMarkAllRead}>
            <CheckCheck size={14} className="mr-2" /> Mark All as Read
          </Button>
        )}
      </div>

      {/* Main notifications container */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-surface-border/40 py-4">
          <div>
            <CardTitle>Platform Notifications</CardTitle>
            <CardDescription>Real-time audit trails of clinical operations</CardDescription>
          </div>
          <Badge variant={unreadCount > 0 ? 'warning' : 'stable'} dot={unreadCount > 0}>
            {unreadCount} Unread Alerts
          </Badge>
        </CardHeader>
        <CardContent className="p-0 text-xs font-sans">
          <div className="divide-y divide-surface-border/40">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                className={`p-5 flex items-start gap-4 transition-all duration-200 ${
                  n.isRead ? 'bg-white hover:bg-slate-50/40' : 'bg-cyan-500/5 hover:bg-cyan-500/10'
                }`}
              >
                {/* Icon wrapper */}
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                  n.priority === 'critical' ? 'bg-red-50 text-red-500 pulse-critical' :
                  n.type === 'appointment' ? 'bg-indigo-50' :
                  n.type === 'billing' ? 'bg-emerald-50' : 'bg-brand-50'
                }`}>
                  {getIcon(n.type, n.priority)}
                </div>

                {/* Body details */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-brand-950">{n.title}</h4>
                    {n.priority === 'critical' && (
                      <Badge variant="critical" className="text-[8px] leading-none px-1 py-0.5">CRITICAL</Badge>
                    )}
                    {!n.isRead && (
                      <Badge variant="brand" className="text-[8px] leading-none px-1 py-0.5">NEW</Badge>
                    )}
                  </div>
                  <p className="text-brand-650 leading-relaxed max-w-4xl">{n.body}</p>
                  <p className="text-[10px] text-brand-600/50 font-mono">{n.timestamp}</p>
                </div>

                {/* Actions check */}
                <button
                  onClick={() => handleToggleRead(n.id)}
                  className={`text-[10px] font-semibold transition-colors px-2.5 py-1.5 rounded-lg border ${
                    n.isRead 
                      ? 'border-surface-border text-brand-600 hover:bg-surface-elevated' 
                      : 'border-brand-500/20 text-brand-600 bg-brand-50/50 hover:bg-brand-50'
                  }`}
                >
                  {n.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>

              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
