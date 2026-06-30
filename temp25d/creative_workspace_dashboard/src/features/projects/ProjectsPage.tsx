import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '../../lib/api/projects.api';
import { teamApi } from '../../lib/api/team.api';
import { ProjectCard } from '../../components/shared/ProjectCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { TagInput } from '../../components/shared/TagInput';
import { Project } from '../../types/project.types';
import { Search, FolderGit, Plus, Check } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Project['status']>('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form States
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<Project['status']>('active');
  const [formCoverColor, setFormCoverColor] = useState('from-purple-500 to-indigo-500');
  const [formTags, setFormTags] = useState<string[]>([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  // Cover gradient choices
  const gradients = [
    { name: 'Purple Sunset', value: 'from-purple-500 to-indigo-500' },
    { name: 'Fuchsia Glow', value: 'from-fuchsia-500 to-pink-500' },
    { name: 'Amber Fire', value: 'from-amber-500 to-orange-500' },
    { name: 'Emerald Wave', value: 'from-emerald-500 to-teal-500' },
    { name: 'Sky Sparkle', value: 'from-sky-500 to-blue-500' },
    { name: 'Rose Petal', value: 'from-rose-500 to-red-500' }
  ];

  // Queries
  const { data: projects = [], isLoading: isProjectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll
  });

  const { data: team = [] } = useQuery({
    queryKey: ['team'],
    queryFn: teamApi.getAll
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Project> }) =>
      projectsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: projectsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  // Modal open triggers
  const openCreateModal = () => {
    setEditingProject(null);
    setFormTitle('');
    setFormDescription('');
    setFormStatus('active');
    setFormCoverColor('from-purple-500 to-indigo-500');
    setFormTags([]);
    setSelectedMemberIds([]);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormTitle(project.title);
    setFormDescription(project.description);
    setFormStatus(project.status);
    setFormCoverColor(project.coverColor);
    setFormTags(project.tags);
    setSelectedMemberIds(project.members.map(m => m.id));
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const matchedMembers = team.filter(m => selectedMemberIds.includes(m.id));

    const payload = {
      title: formTitle,
      description: formDescription,
      status: formStatus,
      coverColor: formCoverColor,
      tags: formTags,
      members: matchedMembers,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // default deadline in 14 days
    };

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (project: Project) => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      deleteMutation.mutate(project.id);
    }
  };

  // Filter project entries
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 select-text">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search & filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-grow max-w-xl">
          <Input
            placeholder="Search projects by name, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftElement={<Search className="w-4 h-4 text-gray-500" />}
            className="w-full"
          />

          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs font-semibold text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={openCreateModal}
          className="shrink-0"
        >
          Create Project
        </Button>
      </div>

      {/* Projects Grid view */}
      {isProjectsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-76 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Try updating your filters or search keywords, or initialize a new project design pipeline."
          icon={FolderGit}
          action={
            <Button variant="primary" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={openCreateModal}>
              Create Project
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal - Create/Edit Project */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeForm}
        title={editingProject ? 'Edit Project Canvas' : 'Create New Project'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Project Title"
            placeholder="e.g. Kinetic Typography Frames"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            required
          />

          <Textarea
            label="Description"
            placeholder="Summarize the project parameters, software preferences, and key outputs..."
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            rows={3}
          />

          {/* Grid fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Pipeline Status
              </label>
              <select
                value={formStatus}
                onChange={(e: any) => setFormStatus(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <TagInput
              label="Keywords & Tags"
              placeholder="Type tag and press Enter"
              tags={formTags}
              onChange={setFormTags}
            />
          </div>

          {/* Cover Gradient Choice */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Cover Color Palette
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
              {gradients.map((grad) => (
                <button
                  type="button"
                  key={grad.value}
                  onClick={() => setFormCoverColor(grad.value)}
                  className={`h-10 rounded-xl bg-gradient-to-r ${grad.value} relative border transition-all duration-150 flex items-center justify-center ${
                    formCoverColor === grad.value
                      ? 'border-white scale-[1.03] ring-1 ring-white/20 shadow-md'
                      : 'border-transparent hover:scale-[1.01]'
                  }`}
                  title={grad.name}
                >
                  {formCoverColor === grad.value && (
                    <div className="p-0.5 rounded-full bg-white text-gray-900 shadow">
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Members Checklist */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Assign Team Members
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto border border-surface-border bg-surface-card p-3.5 rounded-xl">
              {team.map((member) => (
                <label
                  key={member.id}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedMemberIds.includes(member.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMemberIds([...selectedMemberIds, member.id]);
                      } else {
                        setSelectedMemberIds(selectedMemberIds.filter(id => id !== member.id));
                      }
                    }}
                    className="rounded text-brand-500 bg-surface-card border-surface-border focus:ring-brand-500"
                  />
                  <span>{member.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2.5 border-t border-surface-border/50 pt-4 mt-2">
            <Button type="button" variant="outline" size="sm" onClick={closeForm}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={createMutation.isPending || updateMutation.isPending}
            >
              {editingProject ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
