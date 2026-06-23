import React, { useState } from 'react';
import { mockCampaigns } from '../data/campaigns';
import type { Campaign } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form states for new campaign placeholder
  const [newName, setNewName] = useState('');
  const [newStatus, setNewStatus] = useState<'Sent' | 'Scheduled' | 'Draft'>('Draft');
  const [newRecipients, setNewRecipients] = useState('');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCampaign: Campaign = {
      id: `camp-${Date.now()}`,
      name: newName.trim(),
      status: newStatus,
      recipients: parseInt(newRecipients) || 0,
      openRate: newStatus === 'Sent' ? 45.2 : 0,
      clickRate: newStatus === 'Sent' ? 12.8 : 0,
      sentDate: newStatus === 'Sent' ? new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Not Sent'
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setNewName('');
    setNewStatus('Draft');
    setNewRecipients('');
    setIsNewModalOpen(false);
  };

  const getStatusVariant = (status: Campaign['status']) => {
    switch (status) {
      case 'Sent':
        return 'green';
      case 'Scheduled':
        return 'amber';
      case 'Draft':
        return 'slate';
      default:
        return 'slate';
    }
  };

  return (
    <div className="space-y-6 font-body">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-text tracking-tight">
            Campaigns
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Monitor email marketing and outreach metrics
          </p>
        </div>
        <Button
          onClick={() => setIsNewModalOpen(true)}
          variant="primary"
          className="sm:w-auto self-start"
        >
          New Campaign
        </Button>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-secondary border border-slate-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Total Recipients Sent
          </span>
          <h3 className="text-2xl font-extrabold text-text font-heading mt-1">12,880</h3>
          <p className="text-xs text-slate-400 font-semibold mt-1">Across 4 completed campaigns</p>
        </div>
        <div className="bg-secondary border border-slate-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
            Avg Open Rate
          </span>
          <h3 className="text-2xl font-extrabold text-text font-heading mt-1">48.4%</h3>
          <p className="text-xs text-green-500 font-semibold mt-1 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            +1.4% vs industry avg
          </p>
        </div>
        <div className="bg-secondary border border-slate-200/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500">
            Avg Click Rate
          </span>
          <h3 className="text-2xl font-extrabold text-text font-heading mt-1">18.5%</h3>
          <p className="text-xs text-green-500 font-semibold mt-1 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            +0.8% vs last quarter
          </p>
        </div>
      </div>

      {/* Campaigns list Table */}
      <div className="bg-secondary border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Campaign Name
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Recipients
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Open Rate
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Click Rate
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Sent Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map(camp => (
                <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Name */}
                  <td className="py-4 px-6 font-semibold text-text text-sm">
                    {camp.name}
                  </td>
                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <Badge label={camp.status} variant={getStatusVariant(camp.status)} />
                  </td>
                  {/* Recipients */}
                  <td className="py-4 px-6 font-mono font-bold text-xs text-slate-500">
                    {camp.recipients.toLocaleString()}
                  </td>
                  {/* Open Rate with progress bar */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <span className="text-xs font-mono font-bold text-slate-600 w-8">
                        {camp.openRate}%
                      </span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${camp.openRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  {/* Click Rate with progress bar */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <span className="text-xs font-mono font-bold text-slate-600 w-8">
                        {camp.clickRate}%
                      </span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${camp.clickRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  {/* Sent Date */}
                  <td className="py-4 px-6 font-medium text-slate-400 text-xs">
                    {camp.sentDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Campaign Modal (placeholder form) */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Launch New Marketing Campaign"
      >
        <form onSubmit={handleCreateCampaign} className="space-y-4 font-body">
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
              Campaign Name
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="E.g. Q3 Cloud Upgrade Newsletter"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
                Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all cursor-pointer"
              >
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Sent">Sent Immediately</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
                Target Recipients
              </label>
              <input
                type="number"
                value={newRecipients}
                onChange={(e) => setNewRecipients(e.target.value)}
                placeholder="E.g. 2400"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsNewModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Create Campaign
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
