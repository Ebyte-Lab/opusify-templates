import React, { useState } from 'react';
import type { DealStage } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (deal: { title: string; company: string; value: number; stage: DealStage }) => void;
}

export const NewDealModal: React.FC<NewDealModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [value, setValue] = useState('');
  const [stage, setStage] = useState<DealStage>('contacted');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;

    onSubmit({
      title: title.trim(),
      company: company.trim(),
      value: parseFloat(value) || 0,
      stage
    });

    // Reset fields
    setTitle('');
    setCompany('');
    setValue('');
    setStage('contacted');
    onClose();
  };

  const isFormInvalid = !title.trim() || !company.trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Deal Entry">
      <form onSubmit={handleSubmit} className="space-y-4 font-body">
        {/* Deal Title */}
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
            Deal Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g. API Licensing Pack"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
            Company / Client
          </label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="E.g. Wayne Enterprises"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
          />
        </div>

        {/* Value and Stage */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
              Deal Value ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                $
              </span>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="E.g. 15000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 font-heading">
              Initial Pipeline Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as DealStage)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm font-medium transition-all"
            >
              <option value="contacted">Contacted</option>
              <option value="proposal">Proposal Sent</option>
              <option value="negotiation">Negotiation</option>
              <option value="won">Closed Won</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isFormInvalid}
            className="flex-1"
          >
            Save Entry
          </Button>
        </div>
      </form>
    </Modal>
  );
};
