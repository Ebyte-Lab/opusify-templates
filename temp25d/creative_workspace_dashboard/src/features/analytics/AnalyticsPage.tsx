import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../../lib/api/analytics.api';
import { Card } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { Table, THead, TBody, TR, TH, TD } from '../../components/ui/Table';
import { Progress } from '../../components/ui/Progress';
import { formatFileSize } from '../../components/shared/FileCard';
import {
  TrendingUp,
  FolderGit,
  Users,
  Database,
  BarChart3,
  Eye,
  PieChart as PieIcon
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
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

  const { data: productivity, isLoading: isProductivityLoading } = useQuery({
    queryKey: ['teamProductivity'],
    queryFn: analyticsApi.getTeamProductivity
  });

  const { data: storageUsage, isLoading: isStorageLoading } = useQuery({
    queryKey: ['storageUsage'],
    queryFn: analyticsApi.getStorageUsage
  });

  const { data: topAssets, isLoading: isTopAssetsLoading } = useQuery({
    queryKey: ['topAssets'],
    queryFn: analyticsApi.getTopAssets
  });

  return (
    <div className="space-y-6 sm:space-y-8 select-text">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isSummaryLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))
        ) : (
          <>
            <Card className="p-5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Completed Tasks</span>
                <span className="text-xl font-bold text-white block mt-1.5">{summary?.tasksCompleted}</span>
              </div>
              <div className="p-3 rounded-xl bg-accent-teal/10 border border-accent-teal/20 text-accent-teal">
                <BarChart3 className="w-5 h-5" />
              </div>
            </Card>

            <Card className="p-5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Workspace Logins</span>
                <span className="text-xl font-bold text-white block mt-1.5">{summary?.teamLogins}</span>
              </div>
              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                <Users className="w-5 h-5" />
              </div>
            </Card>

            <Card className="p-5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Active Pipelines</span>
                <span className="text-xl font-bold text-white block mt-1.5">{summary?.activeProjects}</span>
              </div>
              <div className="p-3 rounded-xl bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo">
                <FolderGit className="w-5 h-5" />
              </div>
            </Card>

            <Card className="p-5 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Asset Library Count</span>
                <span className="text-xl font-bold text-white block mt-1.5">{summary?.assetsCreated}</span>
              </div>
              <div className="p-3 rounded-xl bg-accent-amber/10 border border-accent-amber/20 text-accent-amber">
                <Database className="w-5 h-5" />
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaboration DAU */}
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
                      <linearGradient id="analyticsDau" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#4b5563" fontSize={9} tickLine={false} axisLine={false} dy={8} />
                    <YAxis stroke="#4b5563" fontSize={9} tickLine={false} axisLine={false} dx={-8} />
                    <ChartTooltip contentStyle={{ backgroundColor: '#12121e', borderColor: '#222235', borderRadius: '12px', fontSize: '11px', color: '#d1d5db' }} />
                    <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#analyticsDau)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </Card>

        {/* Project Pipeline Breakdown */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-accent-indigo" />
              Pipeline Breakdowns
            </h3>
            <div className="h-56 mt-2 relative flex items-center justify-center">
              {isStatusLoading ? (
                <Skeleton className="w-36 h-36 rounded-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                      {statusData?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip contentStyle={{ backgroundColor: '#12121e', borderColor: '#222235', borderRadius: '12px', fontSize: '11px', color: '#d1d5db' }} />
                    <Legend verticalAlign="bottom" height={36} iconSize={8} iconType="circle" formatter={(value) => <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: Team Productivity and Storage breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Productivity grouped bar chart */}
        <Card className="p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-4">
              Team Productivity Outputs (Weekly)
            </h3>
            <div className="h-64 mt-2">
              {isProductivityLoading ? (
                <Skeleton className="w-full h-full rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productivity}>
                    <XAxis dataKey="name" stroke="#4b5563" fontSize={9} tickLine={false} axisLine={false} dy={8} />
                    <YAxis stroke="#4b5563" fontSize={9} tickLine={false} axisLine={false} dx={-8} />
                    <ChartTooltip contentStyle={{ backgroundColor: '#12121e', borderColor: '#222235', borderRadius: '12px', fontSize: '11px', color: '#d1d5db' }} />
                    <Legend verticalAlign="top" height={36} iconSize={8} iconType="circle" formatter={(value) => <span className="text-[10px] text-gray-400 font-semibold uppercase ml-1">{value}</span>} />
                    <Bar dataKey="Tasks" fill="#a855f7" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Assets" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Syncs" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </Card>

        {/* Detailed Storage Breakdown */}
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
              Storage Allocation Breakdown
            </h3>
            <p className="text-[10px] text-gray-500 font-medium">
              Check what file types consume your workspace storage.
            </p>
          </div>
          <div className="space-y-4 border-t border-surface-border/50 pt-4">
            {isStorageLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 rounded" />
                <Skeleton className="h-8 rounded" />
                <Skeleton className="h-8 rounded" />
              </div>
            ) : (
              storageUsage?.map((item: any) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-gray-400">{formatFileSize(item.usedBytes)}</span>
                  </div>
                  <Progress value={(item.usedBytes / item.totalBytes) * 100} color={item.color} />
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Row 3: Top accessed assets table */}
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
            Most Viewed & Exported Assets
          </h3>
          <p className="text-[10px] text-gray-500 font-medium mt-1">
            Overview of highest interaction levels across active spec sheets and renders.
          </p>
        </div>
        
        {isTopAssetsLoading ? (
          <Skeleton className="h-32 rounded-xl" />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>File Name</TH>
                <TH>Type</TH>
                <TH className="text-right">View Count</TH>
                <TH>Last Accessed</TH>
              </TR>
            </THead>
            <TBody>
              {topAssets?.map((asset: any) => (
                <TR key={asset.id}>
                  <TD className="font-bold text-white">{asset.name}</TD>
                  <TD className="font-semibold text-gray-400 uppercase text-[10px]">{asset.type}</TD>
                  <TD className="text-right font-bold text-brand-400">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-gray-600" />
                      {asset.views}
                    </span>
                  </TD>
                  <TD className="text-gray-400 font-semibold">{asset.lastAccessed}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </Card>
    </div>
  );
};
