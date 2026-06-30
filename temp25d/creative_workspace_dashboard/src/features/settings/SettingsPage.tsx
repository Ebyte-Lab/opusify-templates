import React, { useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, setUser } = useUserStore();
  const { workspace, plan, setWorkspace, setPlan } = useWorkspaceStore();

  // Profile Form States
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileBio, setProfileBio] = useState(user?.bio || '');
  const [profileTimezone, setProfileTimezone] = useState(user?.timezone || '');
  const [profileLanguage, setProfileLanguage] = useState(user?.language || '');
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  // Workspace Form States
  const [wsName, setWsName] = useState(workspace?.name || '');
  const [wsSlug, setWsSlug] = useState(workspace?.slug || '');
  const [wsDefaultRole, setWsDefaultRole] = useState(workspace?.defaultRole || 'editor');
  const [isWsSaved, setIsWsSaved] = useState(false);

  const plans = [
    {
      id: 'free' as const,
      name: 'Starter Canvas',
      price: '$0 / mo',
      desc: 'Perfect for individual creative portfolios and drafts.',
      features: ['1 Workspace', '3 Active Projects', '1 GB Storage Limit', 'Static spec sharing']
    },
    {
      id: 'pro' as const,
      name: 'Creative Pro',
      price: '$15 / mo',
      desc: 'For professional designers and collaborative syncs.',
      features: ['3 Workspaces', 'Unlimited Projects', '10 GB Storage Limit', 'Real-time team presence cursor simulation']
    },
    {
      id: 'team' as const,
      name: 'Studio Sync',
      price: '$45 / mo',
      desc: 'Ideal for agency design teams and multi-stage pipelines.',
      features: ['Unlimited Workspaces', 'Unlimited Projects', '100 GB Storage Limit', 'Live comment boards', 'Custom theme presets']
    }
  ];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setUser({
      ...user,
      name: profileName,
      bio: profileBio,
      timezone: profileTimezone,
      language: profileLanguage
    });
    setIsProfileSaved(true);
    setTimeout(() => setIsProfileSaved(false), 3000);
  };

  const handleWorkspaceSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspace) return;
    setWorkspace({
      ...workspace,
      name: wsName,
      slug: wsSlug,
      defaultRole: wsDefaultRole as 'admin' | 'editor' | 'viewer'
    });
    setIsWsSaved(true);
    setTimeout(() => setIsWsSaved(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 select-text">
      {/* Forms column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Workspace Info Card */}
        <Card className="p-6 space-y-5">
          <div>
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Workspace Blueprint
            </h3>
            <p className="text-[10px] text-gray-500 font-medium mt-1">
              Configure parameters, vanity URLs, and defaults for the active design seat.
            </p>
          </div>

          <form onSubmit={handleWorkspaceSave} className="space-y-4 border-t border-surface-border/50 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Workspace Display Name"
                value={wsName}
                onChange={(e) => setWsName(e.target.value)}
                required
              />
              <Input
                label="Workspace Slug URL"
                value={wsSlug}
                onChange={(e) => setWsSlug(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Default Member Invite Role
              </label>
              <select
                value={wsDefaultRole}
                onChange={(e) => setWsDefaultRole(e.target.value as 'admin' | 'editor' | 'viewer')}
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              >
                <option value="viewer">Viewer (Read-only reviews)</option>
                <option value="editor">Editor (Create, upload assets)</option>
                <option value="admin">Admin (All actions)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 justify-end pt-2">
              {isWsSaved && (
                <span className="text-[10px] font-bold text-accent-teal uppercase tracking-wider">
                  Workspace saved!
                </span>
              )}
              <Button type="submit" variant="primary" size="sm">
                Save Blueprint
              </Button>
            </div>
          </form>
        </Card>

        {/* User profile details form */}
        <Card className="p-6 space-y-5">
          <div>
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              My Profile Settings
            </h3>
            <p className="text-[10px] text-gray-500 font-medium mt-1">
              Personalize bio and timezone options for synchronizing review dates.
            </p>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4 border-t border-surface-border/50 pt-4">
            <Input
              label="Full Name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              required
            />

            <Textarea
              label="Bio & Specialties"
              placeholder="Tell other co-workers what specs you review..."
              value={profileBio}
              onChange={(e) => setProfileBio(e.target.value)}
              rows={3}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Preferred Timezone"
                value={profileTimezone}
                onChange={(e) => setProfileTimezone(e.target.value)}
              />
              <Input
                label="Preferred Language"
                value={profileLanguage}
                onChange={(e) => setProfileLanguage(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 justify-end pt-2">
              {isProfileSaved && (
                <span className="text-[10px] font-bold text-accent-teal uppercase tracking-wider">
                  Profile updated!
                </span>
              )}
              <Button type="submit" variant="primary" size="sm">
                Save Profile
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Subscription Column */}
      <div className="space-y-6">
        <Card className="p-5 space-y-4">
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Subscription Plan Tiers
            </h4>
            <p className="text-[10px] text-gray-500 font-semibold uppercase mt-1">
              Current Plan: <Badge variant="purple" size="sm" className="ml-1">{plan}</Badge>
            </p>
          </div>

          <div className="space-y-4 border-t border-surface-border/50 pt-4">
            {plans.map((p) => {
              const isCurrent = p.id === plan;
              return (
                <div
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-44 ${
                    isCurrent
                      ? 'bg-brand-500/5 border-brand-500 shadow shadow-brand-500/10'
                      : 'bg-surface-elevated/20 border-surface-border/60 hover:border-brand-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">{p.name}</span>
                      <span className="text-[9px] text-gray-500 block uppercase font-bold mt-0.5">{p.price}</span>
                    </div>
                    {isCurrent && (
                      <span className="p-1 rounded-full bg-brand-500 text-white shadow">
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[10px] text-gray-400 leading-normal mt-2 select-text">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {p.features.slice(0, 2).map((feat, fIdx) => (
                      <span key={fIdx} className="text-[8px] font-bold text-gray-500 bg-surface-card border border-surface-border px-1 rounded-md lowercase">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
