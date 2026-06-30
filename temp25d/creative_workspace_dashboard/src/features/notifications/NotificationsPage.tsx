import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../../lib/api/notifications.api';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { Notification } from '../../types/common.types';
import {
  Bell,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  Trash2,
  Check,
  Eye
} from 'lucide-react';
import { clsx } from 'clsx';

export const NotificationsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | Notification['type']>('all');

  // Queries
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.getAll
  });

  // Mutations
  const markAllReadMutation = useMutation({
    mutationFn: notificationsApi.markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const dismissMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.dismiss(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'mention':
        return <MessageSquare className="w-4 h-4 text-brand-400" />;
      case 'project':
        return <CheckCircle className="w-4 h-4 text-accent-teal" />;
      case 'team':
        return <UserPlus className="w-4 h-4 text-accent-indigo" />;
      case 'system':
      default:
        return <AlertTriangle className="w-4 h-4 text-accent-amber" />;
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 select-text">
      {/* Header and Bulk Operations */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
            Workspace Inbox Notifications
          </h3>
          <p className="text-[10px] text-gray-500 font-medium mt-1">
            You have {unreadCount} unread system notifications and mention comments.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Check className="w-3.5 h-3.5" />}
            onClick={() => markAllReadMutation.mutate()}
            className="shrink-0 text-[10px] font-bold uppercase tracking-wider"
          >
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-surface-border select-none">
        {(['all', 'mention', 'project', 'team', 'system'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={clsx(
              'px-4 py-3 border-b-2 text-xs font-semibold uppercase tracking-wider transition-colors -mb-[2px]',
              filter === tab
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            )}
          >
            {tab}s
          </button>
        ))}
      </div>

      {/* List Feed */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
        </div>
      ) : filteredNotifications.length === 0 ? (
        <EmptyState
          title="Inbox is clear"
          description="You are fully caught up with the active workspace guidelines and pipeline milestones."
          icon={Bell}
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              onClick={() => !notif.isRead && markReadMutation.mutate(notif.id)}
              className={clsx(
                'p-4.5 flex items-start gap-4 transition-colors border-surface-border',
                !notif.isRead ? 'bg-surface-elevated/20 border-brand-500/20' : 'bg-surface-card/60'
              )}
            >
              {/* Type Icon indicator */}
              <div className="p-2.5 rounded-xl bg-surface-elevated border border-surface-border/50 shrink-0">
                {getIcon(notif.type)}
              </div>

              {/* Description */}
              <div className="flex-grow min-w-0 select-text">
                <p className="text-xs text-gray-300 leading-relaxed select-text">
                  {notif.boldActor && (
                    <span className="font-bold text-white mr-1">{notif.boldActor}</span>
                  )}
                  {notif.description}
                  {notif.boldObject && (
                    <span className="font-bold text-white ml-1">{notif.boldObject}</span>
                  )}
                </p>
                <span className="block text-[10px] text-gray-500 font-semibold uppercase mt-1.5">
                  {notif.timestamp}
                </span>
              </div>

              {/* Item actions */}
              <div className="flex items-center gap-2 shrink-0 self-center">
                {!notif.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markReadMutation.mutate(notif.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-surface-elevated text-gray-500 hover:text-white transition-colors"
                    title="Mark Read"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissMutation.mutate(notif.id);
                  }}
                  className="p-1.5 rounded-lg hover:bg-accent-rose/10 text-gray-600 hover:text-accent-rose transition-colors"
                  title="Dismiss Notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
