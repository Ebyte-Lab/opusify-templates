import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../../lib/api/analytics.api';
import { notificationsApi } from '../../lib/api/notifications.api';
import { StatCard } from '../../components/shared/StatCard';
import { ActivityFeed } from '../../components/shared/ActivityFeed';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { formatFileSize } from '../../components/shared/FileCard';
import {
  FolderGit,
  FileText,
  Database,
  Users,
  Plus,
  Upload,
  UserPlus,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Queries
  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ['analyticsSummary'],
    queryFn: analyticsApi.getSummary
  });

  const { data: dau, isLoading: isDauLoading } = useQuery({
    queryKey: ['dauData'],
    queryFn: analyticsApi.getDAU
  });

  const { data: statusData, isLoading: isStatusLoading } = useQuery({
    queryKey: ['projectStatusData'],
    queryFn: analyticsApi.getProjectStatus
  });

  const { data: activities, isLoading: isActivitiesLoading } = useQuery({
    queryKey: ['activitiesData'],
    queryFn: notificationsApi.getAll
  });

  return (
    <div className="space-y-6 sm:space-y-8 select-text">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600/20 via-purple-600/10 to-transparent border border-brand-500/15 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
            Welcome back to Creative/Flow <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl leading-relaxed">
            Your design pipeline is fully active. Try toggling the "Simulate Team Collaboration" button in the topbar to see real-time cursor presence interactions.
          </p>
        </div>
        
        {/* Quick action triggers */}
        <div className="flex gap-2.5 shrink-0">
          <Button variant="outline" size="sm" leftIcon={<Upload className="w-3.5 h-3.5" />} onClick={() => navigate('/assets')}>
            Upload
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={() => navigate('/projects')}>
            New Project
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isSummaryLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))
        ) : (
          <>
            <StatCard
              label="Active Projects"
              value={summary?.activeProjects || 0}
              trend={summary?.periodChange.activeProjects || 0}
              icon={FolderGit}
              accentColor="text-brand-400"
            />
            <StatCard
              label="Assets Created"
              value={summary?.assetsCreated || 0}
              trend={summary?.periodChange.assetsCreated || 0}
              icon={FileText}
              accentColor="text-accent-teal"
            />
            <StatCard
              label="Storage Used"
              value={formatFileSize(summary?.storageUsedBytes || 0)}
              trend={summary?.periodChange.storageUsedBytes || 0}
              icon={Database}
              accentColor="text-accent-amber"
            />
            <StatCard
              label="Team Logins"
              value={summary?.teamLogins || 0}
              trend={summary?.periodChange.teamLogins || 0}
              icon={Users}
              accentColor="text-accent-indigo"
            />
          </>
        )}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Active Users Area Chart */}
        <Card className="p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-brand-400" />
              Daily Active Collaboration (DAU)
            </h3>
            <div className="h-64 mt-2">
              {isDauLoading ? (
                <Skeleton className="w-full h-full rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dau}>
                    <defs>
                      <linearGradient id="dauColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      stroke="#4b5563"
                      fontSize={9}
                      tickLine={false}
                      axisLine={false}
                      dy={8}
                    />
                    <YAxis
                      stroke="#4b5563"
                      fontSize={9}
                      tickLine={false}
                      axisLine={false}
                      dx={-8}
                    />
                    <ChartTooltip
                      contentStyle={{
                        backgroundColor: '#12121e',
                        borderColor: '#222235',
                        borderRadius: '12px',
                        fontSize: '11px',
                        color: '#d1d5db'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#a855f7"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#dauColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </Card>

        {/* Project Status Pie/Donut Chart */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-4">
              Project Status Distribution
            </h3>
            <div className="h-56 mt-2 relative flex items-center justify-center">
              {isStatusLoading ? (
                <Skeleton className="w-36 h-36 rounded-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {statusData?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      contentStyle={{
                        backgroundColor: '#12121e',
                        borderColor: '#222235',
                        borderRadius: '12px',
                        fontSize: '11px',
                        color: '#d1d5db'
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconSize={8}
                      iconType="circle"
                      formatter={(value) => (
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent updates timeline */}
        <Card className="p-6 lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
              Recent Activity Feed
            </h3>
            <p className="text-[10px] text-gray-500 font-medium">
              Real-time notifications and team collaborations logs.
            </p>
          </div>
          <div className="border-t border-surface-border/50 pt-4">
            {isActivitiesLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 rounded-xl" />
                <Skeleton className="h-10 rounded-xl" />
                <Skeleton className="h-10 rounded-xl" />
              </div>
            ) : (
              <ActivityFeed activities={activities?.slice(0, 4) || []} />
            )}
          </div>
          <div className="pt-2">
            <Link
              to="/notifications"
              className="text-[10px] font-bold text-brand-400 hover:text-brand-300 uppercase tracking-wider flex items-center gap-1 hover:underline"
            >
              View Full Inbox
            </Link>
          </div>
        </Card>

        {/* Quick Actions / Integration Card */}
        <Card className="p-6 flex flex-col justify-between bg-surface-elevated/20">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Shortcut Console
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Quickly manage permissions, check calendar timelines, or open team sync chat links.
            </p>
            <div className="space-y-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start text-[11px] font-bold uppercase"
                leftIcon={<UserPlus className="w-3.5 h-3.5 text-brand-400" />}
                onClick={() => navigate('/team')}
              >
                Invite New Collaborator
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start text-[11px] font-bold uppercase"
                leftIcon={<Plus className="w-3.5 h-3.5 text-accent-teal" />}
                onClick={() => navigate('/calendar')}
              >
                Schedule Team Meeting
              </Button>
            </div>
          </div>
          
          <div className="border-t border-surface-border/50 pt-4 mt-6 text-[10px] text-gray-500 font-semibold uppercase leading-relaxed">
            Workspace: <span className="text-gray-400">Pro Plan Seat</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
