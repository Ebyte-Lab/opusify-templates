import React, { useState, useMemo } from 'react';
import type { Task } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Follow up with Tyrell Corp regarding Brokerage Gateway',
    dueDate: 'Jun 25, 2026',
    priority: 'High',
    done: false,
    assignee: 'Sarah Jenkins'
  },
  {
    id: 'task-2',
    title: 'Send SaaS Licensing proposal to Acme Inc',
    dueDate: 'Jun 24, 2026',
    priority: 'High',
    done: false,
    assignee: 'Sarah Jenkins'
  },
  {
    id: 'task-3',
    title: 'Schedule Platform Redesign demo with Globex Ltd',
    dueDate: 'Jun 26, 2026',
    priority: 'Medium',
    done: false,
    assignee: 'Sarah Jenkins'
  },
  {
    id: 'task-4',
    title: 'Review Cloud Infrastructure Audit requirements with Dave',
    dueDate: 'Jun 28, 2026',
    priority: 'Medium',
    done: false,
    assignee: 'Sarah Jenkins'
  },
  {
    id: 'task-5',
    title: 'Draft weekly coordinator sales report',
    dueDate: 'Jun 29, 2026',
    priority: 'Low',
    done: false,
    assignee: 'Sarah Jenkins'
  },
  {
    id: 'task-6',
    title: 'Call City Govt municipal portal coordinator',
    dueDate: 'Jun 23, 2026',
    priority: 'High',
    done: true,
    assignee: 'Sarah Jenkins'
  },
  {
    id: 'task-7',
    title: 'Prepare onboarding documents for Wayne Enterprises',
    dueDate: 'Jul 02, 2026',
    priority: 'Low',
    done: false,
    assignee: 'Sarah Jenkins'
  },
  {
    id: 'task-8',
    title: 'Update sales pipeline conversion metrics',
    dueDate: 'Jun 24, 2026',
    priority: 'Medium',
    done: true,
    assignee: 'Sarah Jenkins'
  }
];

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<Task['priority']>('Medium');
  const [newDate, setNewDate] = useState('');
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(true);

  // Group active tasks
  const activeTasks = useMemo(() => tasks.filter(t => !t.done), [tasks]);
  const completedTasks = useMemo(() => tasks.filter(t => t.done), [tasks]);

  const tasksByPriority = useMemo(() => {
    const grouped = {
      High: activeTasks.filter(t => t.priority === 'High'),
      Medium: activeTasks.filter(t => t.priority === 'Medium'),
      Low: activeTasks.filter(t => t.priority === 'Low')
    };
    return grouped;
  }, [activeTasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Format Date nicely
    let formattedDate = 'No date';
    if (newDate) {
      const parsedDate = new Date(newDate);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = parsedDate.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        });
      }
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      dueDate: formattedDate,
      priority: newPriority,
      done: false,
      assignee: 'Sarah Jenkins'
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
    setNewPriority('Medium');
    setNewDate('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const getPriorityBadgeVariant = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'pink';
      case 'Medium':
        return 'blue';
      case 'Low':
        return 'slate';
      default:
        return 'slate';
    }
  };

  const renderTaskRow = (task: Task) => {
    return (
      <div
        key={task.id}
        className="flex items-center justify-between p-4 bg-secondary border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow gap-4"
      >
        <div className="flex items-center gap-3 min-w-0">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task.id)}
            className="w-4 h-4 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary focus:ring-2 cursor-pointer shrink-0"
          />
          <span
            className={`text-sm font-semibold text-text truncate ${
              task.done ? 'line-through text-slate-400 font-medium' : ''
            }`}
          >
            {task.title}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] text-slate-400 font-mono font-semibold">
            Due: {task.dueDate}
          </span>
          <Badge
            label={task.priority}
            variant={task.done ? 'slate' : getPriorityBadgeVariant(task.priority)}
            size="xs"
          />
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
            title="Delete Task"
          >
            <svg
              width="14" height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 font-body max-w-4xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-text tracking-tight">
          My Tasks
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Track follow-ups and action items
        </p>
      </div>

      {/* Add Task Form */}
      <div className="bg-secondary p-5 rounded-3xl border border-slate-200/60 shadow-sm">
        <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 font-heading">
              New Action Item
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="E.g. Follow up with Tyrell Corp..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
            />
          </div>

          <div className="w-full md:w-36 space-y-2">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 font-heading">
              Priority
            </label>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as Task['priority'])}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-primary/50 text-xs font-semibold text-slate-600 transition-all cursor-pointer"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="w-full md:w-44 space-y-2">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 font-heading">
              Due Date
            </label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-primary/50 text-xs font-semibold text-slate-600 transition-all cursor-pointer"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full md:w-auto shrink-0 py-2.5 px-6">
            Add Task
          </Button>
        </form>
      </div>

      {/* Task Checklist Grouped by Priority */}
      <div className="space-y-6">
        {/* High Priority Group */}
        {tasksByPriority.High.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-heading font-extrabold text-sm text-pink-500 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              High Priority ({tasksByPriority.High.length})
            </h3>
            <div className="space-y-2">
              {tasksByPriority.High.map(renderTaskRow)}
            </div>
          </div>
        )}

        {/* Medium Priority Group */}
        {tasksByPriority.Medium.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-heading font-extrabold text-sm text-blue-500 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Medium Priority ({tasksByPriority.Medium.length})
            </h3>
            <div className="space-y-2">
              {tasksByPriority.Medium.map(renderTaskRow)}
            </div>
          </div>
        )}

        {/* Low Priority Group */}
        {tasksByPriority.Low.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-heading font-extrabold text-sm text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Low Priority ({tasksByPriority.Low.length})
            </h3>
            <div className="space-y-2">
              {tasksByPriority.Low.map(renderTaskRow)}
            </div>
          </div>
        )}

        {activeTasks.length === 0 && (
          <div className="bg-secondary border border-slate-200/60 rounded-3xl p-12 text-center text-slate-400 text-sm font-medium">
            All tasks are done! Clear checklists represent a happy pipeline.
          </div>
        )}

        {/* Completed Section (Collapsible) */}
        {completedTasks.length > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={() => setIsCompletedCollapsed(prev => !prev)}
              className="flex items-center justify-between w-full font-heading font-bold text-sm text-slate-500 hover:text-text focus:outline-none transition-colors"
            >
              <span>Completed Tasks ({completedTasks.length})</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transform transition-transform ${
                  isCompletedCollapsed ? '' : 'rotate-180'
                }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {!isCompletedCollapsed && (
              <div className="space-y-2 mt-4 animate-fadeIn">
                {completedTasks.map(renderTaskRow)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
