import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi } from '../../lib/api/team.api';
import { UserCard } from '../../components/shared/UserCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { TeamMember } from '../../types/team.types';
import { Search, Users, UserPlus } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  // Modal States
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'editor' | 'viewer'>('editor');

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingRole, setEditingRole] = useState<'admin' | 'editor' | 'viewer'>('editor');

  // Queries
  const { data: team = [], isLoading: isTeamLoading } = useQuery({
    queryKey: ['team'],
    queryFn: teamApi.getAll
  });

  // Mutations
  const inviteMutation = useMutation({
    mutationFn: teamApi.invite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      setIsInviteOpen(false);
      setInviteEmail('');
      setInviteRole('editor');
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: 'admin' | 'editor' | 'viewer' }) =>
      teamApi.updateRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      setEditingMember(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: teamApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
    }
  });

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    inviteMutation.mutate({ email: inviteEmail, role: inviteRole });
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    updateRoleMutation.mutate({ id: editingMember.id, role: editingRole });
  };

  const handleEditRoleOpen = (member: TeamMember) => {
    setEditingMember(member);
    setEditingRole(member.role);
  };

  const handleRemove = (member: TeamMember) => {
    if (confirm(`Are you sure you want to remove ${member.name} from the workspace?`)) {
      deleteMutation.mutate(member.id);
    }
  };

  // Filter members list
  const filteredTeam = team.filter((member) => {
    const query = search.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 select-text">
      {/* Search and invite row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-grow max-w-md">
          <Input
            placeholder="Search team members by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftElement={<Search className="w-4 h-4 text-gray-500" />}
          />
        </div>

        <Button
          variant="primary"
          leftIcon={<UserPlus className="w-4 h-4" />}
          onClick={() => setIsInviteOpen(true)}
          className="shrink-0"
        >
          Invite Member
        </Button>
      </div>

      {/* Team grid */}
      {isTeamLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-48 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredTeam.length === 0 ? (
        <EmptyState
          title="No team members found"
          description="Try updating your search query or invite a new collaborator to join your workspace."
          icon={Users}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeam.map((member) => (
            <UserCard
              key={member.id}
              member={member}
              onEditRole={handleEditRoleOpen}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}

      {/* Modal - Invite member */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite New Collaborator"
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="colleague@creativeflow.co"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Workspace Role
            </label>
            <select
              value={inviteRole}
              onChange={(e: any) => setInviteRole(e.target.value)}
              className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              <option value="viewer">Viewer (Read-only reviews)</option>
              <option value="editor">Editor (Create, comment, upload assets)</option>
              <option value="admin">Admin (Full administrative adjustments)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 border-t border-surface-border/50 pt-4 mt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={inviteMutation.isPending}>
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal - Change role */}
      <Modal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        title={`Change Role: ${editingMember?.name}`}
      >
        <form onSubmit={handleSaveRole} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Select Role
            </label>
            <select
              value={editingRole}
              onChange={(e: any) => setEditingRole(e.target.value)}
              className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 border-t border-surface-border/50 pt-4 mt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setEditingMember(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={updateRoleMutation.isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
