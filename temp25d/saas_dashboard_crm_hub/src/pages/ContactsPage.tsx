import React, { useState, useMemo } from 'react';
import { mockContacts } from '../data/contacts';
import type { Contact } from '../types';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Prospect' | 'Inactive'>('All');
  
  // Modals placeholder state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Form states for placeholder
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newStatus, setNewStatus] = useState<'Active' | 'Prospect' | 'Inactive'>('Active');

  // Filter contacts list
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || contact.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchQuery, statusFilter]);

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      company: newCompany.trim() || 'Freelance',
      status: newStatus,
      lastContact: 'Just now',
      avatarSeed: newName.trim().replace(/\s+/g, '').toLowerCase()
    };

    setContacts(prev => [newContact, ...prev]);
    setNewName('');
    setNewEmail('');
    setNewCompany('');
    setNewStatus('Active');
    setIsAddModalOpen(false);
  };

  const getStatusVariant = (status: Contact['status']) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Prospect':
        return 'amber';
      case 'Inactive':
        return 'slate';
      default:
        return 'slate';
    }
  };

  const openEditModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6 font-body">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-text tracking-tight">
          Contacts
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Manage your leads and customer relationships
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-secondary p-4 rounded-2xl border border-slate-200/50 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:border-primary/50 text-sm bg-slate-50 font-medium transition-all"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Status Dropdown and Add Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-primary/50 text-xs font-semibold text-slate-600 transition-all cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Prospect">Prospect</option>
            <option value="Inactive">Inactive</option>
          </select>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="ghost"
            className="py-2.5 px-4 font-heading border-slate-200 font-bold text-xs shrink-0"
          >
            Add Contact
          </Button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-secondary border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Name / Client
                </th>
                <th className="hidden md:table-cell py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Email
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Company
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="hidden lg:table-cell py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                  Last Contact
                </th>
                <th className="py-4 px-6 font-heading font-bold text-xs uppercase tracking-wider text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map(contact => (
                <tr
                  key={contact.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  {/* Name column */}
                  <td className="py-4 px-6 flex items-center gap-3">
                    <Avatar
                      src={`https://picsum.photos/seed/${contact.avatarSeed}/100/100`}
                      size="sm"
                      ringColor="ring-primary/20"
                    />
                    <div className="truncate">
                      <p className="text-sm font-bold text-text truncate">
                        {contact.name}
                      </p>
                      <p className="md:hidden text-xs text-slate-400 truncate mt-0.5">
                        {contact.email}
                      </p>
                    </div>
                  </td>
                  {/* Email column */}
                  <td className="hidden md:table-cell py-4 px-6 text-sm font-medium text-slate-500">
                    {contact.email}
                  </td>
                  {/* Company column */}
                  <td className="py-4 px-6 text-sm font-semibold text-text">
                    {contact.company}
                  </td>
                  {/* Status Badge column */}
                  <td className="py-4 px-6">
                    <Badge
                      label={contact.status}
                      variant={getStatusVariant(contact.status)}
                    />
                  </td>
                  {/* Last contact column */}
                  <td className="hidden lg:table-cell py-4 px-6 text-sm font-medium text-slate-400">
                    {contact.lastContact}
                  </td>
                  {/* Actions column */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => openEditModal(contact)}
                      className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-all focus:outline-none"
                      title="Edit Contact"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    No contacts found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Contact Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Contact"
      >
        <form onSubmit={handleAddContactSubmit} className="space-y-4 font-body">
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
              Full Name
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="E.g. Bruce Wayne"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
              Email Address
            </label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="E.g. bruce@waynecorp.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
              Company
            </label>
            <input
              type="text"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="E.g. Wayne Enterprises"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
              Relationship Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
            >
              <option value="Active">Active</option>
              <option value="Prospect">Prospect</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Add Member
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Contact Modal (Placeholder modal) */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedContact(null);
        }}
        title="Edit Contact details"
      >
        {selectedContact && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Avatar
                src={`https://picsum.photos/seed/${selectedContact.avatarSeed}/100/100`}
                size="md"
              />
              <div>
                <h4 className="font-heading font-bold text-slate-800">
                  {selectedContact.name}
                </h4>
                <p className="text-xs text-slate-400 font-medium">
                  {selectedContact.email}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              This contact is linked to <strong className="text-text">{selectedContact.company}</strong> in stage <strong className="text-primary">{selectedContact.status}</strong>. Editing fields is currently a demonstration component.
            </p>
            <div className="pt-4 flex gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedContact(null);
                }}
                className="w-full"
              >
                Close View
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
