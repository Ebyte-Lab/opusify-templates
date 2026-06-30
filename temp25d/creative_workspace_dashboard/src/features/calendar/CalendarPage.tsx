import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarApi } from '../../lib/api/calendar.api';
import { teamApi } from '../../lib/api/team.api';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { CalendarEvent } from '../../types/common.types';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Trash2,
  AlertCircle,
  Video,
  Milestone,
  Flag
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0] // default selected day is today
  );

  // Modal / Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDateTime, setFormDateTime] = useState('');
  const [formType, setFormType] = useState<CalendarEvent['type']>('meeting');
  const [formNotes, setFormNotes] = useState('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  // Queries
  const { data: events = [], isLoading: isEventsLoading } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: calendarApi.getAll
  });

  const { data: team = [] } = useQuery({
    queryKey: ['team'],
    queryFn: teamApi.getAll
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: calendarApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
      closeForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: calendarApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
    }
  });

  const openCreateModal = () => {
    setFormTitle('');
    setFormDateTime(`${selectedDate}T10:00`);
    setFormType('meeting');
    setFormNotes('');
    setSelectedMemberIds([]);
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const matchedAssignees = team.filter(m => selectedMemberIds.includes(m.id));

    createMutation.mutate({
      title: formTitle,
      dateTime: new Date(formDateTime).toISOString(),
      type: formType,
      notes: formNotes,
      assignees: matchedAssignees
    });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this event?')) {
      deleteMutation.mutate(id);
    }
  };

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting':
        return <Video className="w-4 h-4 text-accent-indigo" />;
      case 'deadline':
        return <AlertCircle className="w-4 h-4 text-accent-rose" />;
      case 'milestone':
      default:
        return <Milestone className="w-4 h-4 text-accent-teal" />;
    }
  };

  const getTypeVariant = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting':
        return 'info';
      case 'deadline':
        return 'error';
      case 'milestone':
      default:
        return 'success';
    }
  };

  // Sort calendar events chronological
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-text">
      {/* Calendar Timeline List View */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Workspace Event Timelines
            </h3>
            <p className="text-[10px] text-gray-500 font-medium mt-1">
              Synchronized meeting syncs, key milestones and final deadline dates.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={openCreateModal}
          >
            Add Event
          </Button>
        </div>

        {isEventsLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </div>
        ) : sortedEvents.length === 0 ? (
          <EmptyState
            title="No scheduled events"
            description="Your team schedule is currently empty. Add scheduled tasks or meetings."
            icon={CalendarIcon}
          />
        ) : (
          <div className="space-y-4">
            {sortedEvents.map((event) => {
              const dateObj = new Date(event.dateTime);
              return (
                <Card
                  key={event.id}
                  className="p-5 flex flex-col sm:flex-row items-start justify-between gap-4 border-surface-border hover:border-brand-500/10 group relative"
                >
                  <div className="flex gap-4 min-w-0">
                    {/* Event Type Icon badge */}
                    <div className="p-3 rounded-xl bg-surface-elevated border border-surface-border/50 shrink-0 self-start">
                      {getEventIcon(event.type)}
                    </div>
                    
                    <div className="space-y-2 min-w-0 select-text">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={getTypeVariant(event.type)} size="sm">
                          {event.type}
                        </Badge>
                        <h4 className="text-xs font-bold text-white truncate max-w-[280px]">
                          {event.title}
                        </h4>
                      </div>

                      {event.notes && (
                        <p className="text-[11px] text-gray-500 leading-relaxed pr-6 select-text">
                          {event.notes}
                        </p>
                      )}

                      {/* Time and Assignees */}
                      <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-600" />
                          {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        
                        <div className="flex -space-x-1 overflow-hidden">
                          {event.assignees.map(m => (
                            <Avatar key={m.id} name={m.name} src={m.avatarUrl} size="sm" className="ring-1 ring-surface-card" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date Badge & Delete buttons */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-surface-border/40 pt-3 sm:pt-0">
                    <span className="text-[11px] font-bold text-brand-400 bg-brand-500/5 border border-brand-500/10 px-3 py-1 rounded-lg">
                      {dateObj.toLocaleDateString([], { month: 'short', day: '2-digit' })}
                    </span>
                    <button
                      onClick={(e) => handleDelete(event.id, e)}
                      className="p-1.5 rounded-lg hover:bg-accent-rose/10 text-gray-600 hover:text-accent-rose transition-colors"
                      title="Remove Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Sidebar calendar grid selector widget */}
      <div className="space-y-4">
        <Card className="p-5">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
            Timeline Quick Selection
          </h4>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 text-[10px] font-bold uppercase tracking-wider"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={openCreateModal}
          >
            Create Event for Date
          </Button>
        </Card>

        {/* Integration reminder */}
        <Card className="p-5 space-y-3 bg-surface-elevated/20">
          <div className="flex items-center gap-2 text-brand-400 font-bold text-xs">
            <Flag className="w-4 h-4" />
            <span>Plan Target Deadlines</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            Events registered in the calendar sync across projects. Deadlines are automatically marked with red priority warning states in card boards.
          </p>
        </Card>
      </div>

      {/* Modal - Create Event */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeForm}
        title="Schedule Team Event"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Event Name"
            placeholder="e.g. Sprint Planning Sync"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="datetime-local"
              label="Date & Time"
              value={formDateTime}
              onChange={(e) => setFormDateTime(e.target.value)}
              required
            />

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Event Classification
              </label>
              <select
                value={formType}
                onChange={(e: any) => setFormType(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              >
                <option value="meeting">Meeting Sync (Video Call)</option>
                <option value="deadline">Project Deadline (Task Expiry)</option>
                <option value="milestone">Key Sign-off (Milestone Completion)</option>
              </select>
            </div>
          </div>

          <Textarea
            label="Agenda & Notes"
            placeholder="Add relevant meeting URLs, key topics, or review files links..."
            value={formNotes}
            onChange={(e) => setFormNotes(e.target.value)}
            rows={2}
          />

          {/* Members Assignee checkboxes */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Required Attendees
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto border border-surface-border bg-surface-card p-3 rounded-xl">
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

          <div className="flex justify-end gap-2 border-t border-surface-border/50 pt-4 mt-2">
            <Button type="button" variant="outline" size="sm" onClick={closeForm}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={createMutation.isPending}>
              Schedule Event
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
