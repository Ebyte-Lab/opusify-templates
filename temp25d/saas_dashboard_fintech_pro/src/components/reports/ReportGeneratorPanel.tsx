import React, { useState } from 'react';
import { FilePlus } from 'lucide-react';

interface ReportGeneratorPanelProps {
  onGenerate: (type: 'P&L Statement' | 'Tax Summary' | 'Custody Statement', start: string, end: string) => void;
}

export const ReportGeneratorPanel: React.FC<ReportGeneratorPanelProps> = ({ onGenerate }) => {
  const [reportType, setReportType] = useState<'P&L Statement' | 'Tax Summary' | 'Custody Statement'>('P&L Statement');
  const [startDate, setStartDate] = useState('2026-06-01');
  const [endDate, setEndDate] = useState('2026-06-30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(reportType, startDate, endDate);
  };

  return (
    <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-white">Generate Asset Reports</h3>
        <p className="text-xs text-text/45">Configure filters to generate signed custody and transaction declarations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Report Type */}
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-widest text-text/45 mb-2">
            Report Statement Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as any)}
            className="w-full bg-gray-900/40 border border-gray-800 rounded-xl px-4 py-3 outline-none text-white font-mono text-sm focus:border-primary/45 transition-colors cursor-pointer"
          >
            <option value="P&L Statement">Profit & Loss Statement (P&L)</option>
            <option value="Tax Summary">Annual Tax Summary Declarations</option>
            <option value="Custody Statement">Clearing & Custody Settlement Record</option>
          </select>
        </div>

        {/* Date Ranges */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest text-text/45 mb-2">
              Start Audit Date
            </label>
            <div className="flex border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden focus-within:border-primary/45 transition-colors">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-transparent px-4 py-3 outline-none text-white font-mono text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest text-text/45 mb-2">
              End Audit Date
            </label>
            <div className="flex border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden focus-within:border-primary/45 transition-colors">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-transparent px-4 py-3 outline-none text-white font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 mt-4 bg-primary text-black font-semibold py-3 rounded-xl hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
        >
          <FilePlus className="w-4 h-4" />
          Compile & Generate Report
        </button>
      </form>
    </div>
  );
};
