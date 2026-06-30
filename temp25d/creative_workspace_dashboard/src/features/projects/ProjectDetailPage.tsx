import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '../../lib/api/projects.api';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Progress } from '../../components/ui/Progress';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { TagInput } from '../../components/shared/TagInput';
import { Task } from '../../types/project.types';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  ArrowLeft,
  Plus,
  Calendar,
  AlertCircle,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Modal / Form states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState<Task['status']>('backlog');
  const [taskPriority, setTaskPriority] = useState<Task['priority']>('medium');
  const [taskAssigneeId, setTaskAssigneeId] = useState('');
  const [taskLabels, setTaskLabels] = useState<string[]>([]);

  // Queries
  const { data: project, isLoading: isProjectLoading, error: projectError } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.getById(id),
    enabled: !!id
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ['projectTasks', id],
    queryFn: () => projectsApi.getTasks(id),
    enabled: !!id
  });

  // Mutations
  const createTaskMutation = useMutation({
    mutationFn: (task: Omit<Task, 'id'>) => projectsApi.createTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['projectTasks', id] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeTaskForm();
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, payload }: { taskId: string; payload: Partial<Task> }) =>
      projectsApi.updateTask(id, taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['projectTasks', id] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeTaskForm();
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => projectsApi.deleteTask(id, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['projectTasks', id] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const openCreateTaskModal = (status: Task['status'] = 'backlog') => {
    setEditingTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskStatus(status);
    setTaskPriority('medium');
    setTaskAssigneeId(project?.members[0]?.id || '');
    setTaskLabels([]);
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description || '');
    setTaskStatus(task.status);
    setTaskPriority(task.priority);
    setTaskAssigneeId(task.assignee?.id || '');
    setTaskLabels(task.labels || []);
    setIsTaskModalOpen(true);
  };

  const closeTaskForm = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const matchedAssignee = project?.members.find(m => m.id === taskAssigneeId);

    const payload = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      priority: taskPriority,
      assignee: matchedAssignee,
      labels: taskLabels
    };

    if (editingTask) {
      updateTaskMutation.mutate({ taskId: editingTask.id, payload });
    } else {
      createTaskMutation.mutate(payload);
    }
  };

  const handleMoveStatus = (task: Task, direction: 'left' | 'right') => {
    const statuses: Task['status'][] = ['backlog', 'in_progress', 'review', 'done'];
    const currentIdx = statuses.indexOf(task.status);
    let nextIdx = currentIdx;

    if (direction === 'left' && currentIdx > 0) nextIdx -= 1;
    if (direction === 'right' && currentIdx < statuses.length - 1) nextIdx += 1;

    if (nextIdx !== currentIdx) {
      updateTaskMutation.mutate({
        taskId: task.id,
        payload: { status: statuses[nextIdx] }
      });
    }
  };

  const handleTaskDelete = (task: Task) => {
    if (confirm(`Delete task "${task.title}"?`)) {
      deleteTaskMutation.mutate(task.id);
    }
  };

  // Group tasks by status columns
  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(t => t.status === status);
  };

  const columns: { id: Task['status']; name: string; color: string }[] = [
    { id: 'backlog', name: 'Backlog', color: 'border-t-gray-500 bg-gray-500/5' },
    { id: 'in_progress', name: 'In Progress', color: 'border-t-brand-500 bg-brand-500/5' },
    { id: 'review', name: 'In Review', color: 'border-t-accent-indigo bg-accent-indigo/5' },
    { id: 'done', name: 'Completed', color: 'border-t-accent-teal bg-accent-teal/5' }
  ];

  if (isProjectLoading) {
    return <div className="space-y-4 animate-pulse"><Card className="h-48 rounded-2xl" /><div className="grid grid-cols-4 gap-4 h-96" /></div>;
  }

  if (projectError || !project) {
    return (
      <EmptyState
        title="Project not found"
        description="The project you are looking for does not exist or has been removed."
        icon={AlertCircle}
        action={<Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/projects')}>Back to Projects</Button>}
      />
    );
  }

  return (
    <div className="space-y-6 select-text">
      {/* Back button & top specs */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/projects')}>
          Back to Projects
        </Button>
      </div>

      {/* Project Overview Banner */}
      <Card className="p-6 relative overflow-hidden flex flex-col justify-between md:h-44 border-brand-500/10">
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.coverColor}`} />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div>
            <h2 className="text-lg font-bold font-heading text-white">{project.title}</h2>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-surface-elevated/50 px-3 py-1.5 rounded-xl border border-surface-border">
              <Calendar className="w-3.5 h-3.5 text-gray-600" />
              <span>Deadline: {project.deadline}</span>
            </div>
            
            <div className="flex -space-x-1.5 overflow-hidden">
              {project.members.map(m => (
                <Avatar key={m.id} name={m.name} src={m.avatarUrl} size="sm" className="ring-2 ring-surface-card" />
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar info */}
        <div className="border-t border-surface-border/40 pt-4 mt-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider shrink-0">
            <span>Overall Pipeline Completion</span>
            <span className="text-gray-200">{project.progress}%</span>
          </div>
          <Progress value={project.progress} color={project.status === 'completed' ? 'bg-accent-teal' : 'bg-brand-500'} className="max-w-md flex-grow" />
        </div>
      </Card>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start select-none">
        {columns.map((col) => {
          const colTasks = getTasksByStatus(col.id);
          return (
            <div key={col.id} className={`rounded-xl border border-surface-border flex flex-col max-h-[70vh] border-t-2 ${col.color}`}>
              {/* Column Header */}
              <div className="flex justify-between items-center px-4 py-3 bg-surface-card/65 border-b border-surface-border/50 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">{col.name}</span>
                  <span className="text-[10px] font-bold text-gray-500 bg-surface-elevated px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => openCreateTaskModal(col.id)}
                  className="p-1 rounded-lg hover:bg-surface-elevated text-gray-500 hover:text-white transition-colors focus-ring"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Task Items List */}
              <div className="p-3 overflow-y-auto space-y-3 flex-grow min-h-[150px] scrollbar-thin">
                {colTasks.map((task) => (
                  <Card key={task.id} className="p-4 bg-surface-card border-surface-border hover:border-brand-500/20 shadow-sm cursor-pointer select-text" onClick={() => openEditTaskModal(task)}>
                    <div className="space-y-3">
                      {/* Priority and Actions bar */}
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'gray'
                          }
                          size="sm"
                        >
                          {task.priority}
                        </Badge>
                        
                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => handleMoveStatus(task, 'left')}
                            disabled={col.id === 'backlog'}
                            className="p-1 rounded text-gray-600 hover:text-white hover:bg-surface-elevated disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveStatus(task, 'right')}
                            disabled={col.id === 'done'}
                            className="p-1 rounded text-gray-600 hover:text-white hover:bg-surface-elevated disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleTaskDelete(task)}
                            className="p-1 rounded text-gray-600 hover:text-accent-rose hover:bg-accent-rose/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Details */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-200 line-clamp-2 leading-snug">{task.title}</h4>
                        {task.description && (
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-normal">
                            {task.description}
                          </p>
                        )}
                      </div>

                      {/* Labels and assignee */}
                      <div className="flex items-center justify-between gap-2 border-t border-surface-border/40 pt-3">
                        <div className="flex flex-wrap gap-1 max-w-[70%]">
                          {task.labels?.slice(0, 2).map(label => (
                            <span key={label} className="text-[9px] font-bold text-brand-400 bg-brand-500/5 border border-brand-500/10 px-1.5 py-0.5 rounded">
                              {label}
                            </span>
                          ))}
                        </div>
                        {task.assignee && (
                          <Avatar name={task.assignee.name} src={task.assignee.avatarUrl} size="sm" className="ring-1 ring-surface-border" />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}

                {colTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-surface-border/50 rounded-xl bg-surface-card/10 text-gray-600 text-[10px] font-semibold py-8 uppercase tracking-wider">
                    No Tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Creation / Editing Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={closeTaskForm}
        title={editingTask ? 'Edit Kanban Task' : 'Add Kanban Task'}
      >
        <form onSubmit={handleTaskSubmit} className="space-y-4">
          <Input
            label="Task Name"
            placeholder="e.g. Design button components"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />

          <Textarea
            label="Description"
            placeholder="Describe the task parameters..."
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows={2}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Assignee
              </label>
              <select
                value={taskAssigneeId}
                onChange={(e) => setTaskAssigneeId(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              >
                <option value="">Unassigned</option>
                {project.members.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Priority
              </label>
              <select
                value={taskPriority}
                onChange={(e: any) => setTaskPriority(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Kanban Status
              </label>
              <select
                value={taskStatus}
                onChange={(e: any) => setTaskStatus(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              >
                <option value="backlog">Backlog</option>
                <option value="in_progress">In Progress</option>
                <option value="review">In Review</option>
                <option value="done">Completed</option>
              </select>
            </div>

            <TagInput
              label="Labels"
              placeholder="Add label and press Enter"
              tags={taskLabels}
              onChange={setTaskLabels}
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-surface-border/50 pt-4 mt-2">
            <Button type="button" variant="outline" size="sm" onClick={closeTaskForm}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
            >
              {editingTask ? 'Save Task' : 'Add Task'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
