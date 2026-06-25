import React, { useState } from 'react';
import { IncidentStack } from '../components/incidents/IncidentStack';
import { SeverityBadge } from '../components/ui/SeverityBadge';
import { mockAlertHistory, defaultAlertRules } from '../data/alerts';
import { AlertRule, AlertSeverity } from '../types';

export const AlertsPage: React.FC = () => {
  const [rules, setRules] = useState<AlertRule[]>(defaultAlertRules);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleCondition, setNewRuleCondition] = useState('');
  const [newRuleSeverity, setNewRuleSeverity] = useState<AlertSeverity>('MEDIUM');

  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((rule) => {
        if (rule.id === id) {
          return { ...rule, enabled: !rule.enabled };
        }
        return rule;
      })
    );
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim() || !newRuleCondition.trim()) return;

    const newRule: AlertRule = {
      id: `rule-${Date.now()}`,
      name: newRuleName.trim(),
      condition: newRuleCondition.trim(),
      severity: newRuleSeverity,
      enabled: true
    };

    setRules((prev) => [...prev, newRule]);
    setNewRuleName('');
    setNewRuleCondition('');
    setNewRuleSeverity('MEDIUM');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-heading font-extrabold uppercase tracking-tight text-white select-none">
          Alert Management Center
        </h1>
        <p className="text-[10px] text-zinc-500 font-mono mt-0.5 select-none">
          &gt;_ Incident response operations and alert rule orchestration
        </p>
      </div>

      {/* Active Incidents (Spans full width grid) */}
      <div className="bg-secondary/20 border border-zinc-800 rounded p-4">
        <IncidentStack gridClass="grid grid-cols-1 md:grid-cols-2 gap-4" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Left Column: Alert History (2/3 width on large screens) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="border-b border-zinc-800 pb-2 mb-2 select-none">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
              Alert Incident History
            </h3>
            <p className="text-[9px] text-zinc-500 font-mono mt-0.5">
              Logs of past resolved anomalies and cluster incidents
            </p>
          </div>

          <div className="bg-secondary/20 border border-zinc-800 rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase select-none">
                    <th className="px-6 py-3 font-semibold">Priority</th>
                    <th className="px-6 py-3 font-semibold">Alert Signature</th>
                    <th className="px-6 py-3 font-semibold">Description</th>
                    <th className="px-6 py-3 font-semibold">Triggered At</th>
                    <th className="px-6 py-3 font-semibold">Duration</th>
                    <th className="px-6 py-3 font-semibold">Resolved By</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAlertHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-zinc-800/60 hover:bg-zinc-900/10 transition-colors font-mono text-[11px]"
                    >
                      <td className="px-6 py-4">
                        <SeverityBadge severity={item.severity} />
                      </td>
                      <td className="px-6 py-4 text-white font-semibold font-heading text-xs">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-zinc-400 max-w-xs truncate" title={item.description}>
                        {item.description}
                      </td>
                      <td className="px-6 py-4 text-zinc-500">{item.triggeredAt}</td>
                      <td className="px-6 py-4 text-zinc-400">{item.duration}</td>
                      <td className="px-6 py-4 text-emerald-500 font-semibold">{item.resolvedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Alert Rules (1/3 width on large screens) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2 select-none">
            <div>
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
                Configured Alert Rules
              </h3>
              <p className="text-[9px] text-zinc-500 font-mono mt-0.5">
                Evaluation thresholds for cluster alerts
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white px-2 py-1 rounded text-[9px] font-mono uppercase font-bold transition-all"
            >
              {showAddForm ? 'Cancel' : '+ Add Rule'}
            </button>
          </div>

          {/* Add Rule Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddRule}
              className="bg-secondary/40 border border-zinc-800 rounded p-4 space-y-3 font-mono text-[10px] animate-[slideIn_0.2s_ease]"
            >
              <div className="flex flex-col gap-1">
                <label className="text-zinc-500 uppercase font-bold">Rule Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HIGH_MEMORY_SWARM"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded px-2.5 py-1.5 outline-none focus:border-zinc-700 font-mono text-[11px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-zinc-500 uppercase font-bold">Condition String</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RAM > 95% for 3min"
                  value={newRuleCondition}
                  onChange={(e) => setNewRuleCondition(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded px-2.5 py-1.5 outline-none focus:border-zinc-700 font-mono text-[11px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-zinc-500 uppercase font-bold">Severity</label>
                <select
                  value={newRuleSeverity}
                  onChange={(e) => setNewRuleSeverity(e.target.value as AlertSeverity)}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded px-2.5 py-1.5 outline-none focus:border-zinc-700 font-mono text-[11px]"
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-transparent text-black hover:text-primary border border-primary py-1.5 rounded uppercase font-bold transition-all text-[9px]"
              >
                Save Alarm Rule
              </button>
            </form>
          )}

          {/* Rules List */}
          <div className="space-y-3 font-mono text-[11px] select-none">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-3 bg-secondary/40 border border-zinc-800/80 rounded flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-white text-xs">{rule.name}</span>
                    <SeverityBadge severity={rule.severity} />
                  </div>
                  <div className="text-[9px] text-zinc-500">
                    cond: <span className="text-zinc-400">{rule.condition}</span>
                  </div>
                </div>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => handleToggleRule(rule.id)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                    rule.enabled ? 'bg-primary' : 'bg-zinc-800'
                  }`}
                  aria-label="Toggle rule status"
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-zinc-950 shadow-md transform transition-transform ${
                      rule.enabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
