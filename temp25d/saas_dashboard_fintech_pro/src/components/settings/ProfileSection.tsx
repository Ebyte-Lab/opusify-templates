import React, { useState } from 'react';
import { User } from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const [username, setUsername] = useState('DESK_ALPHA_TRADER');
  const [email, setEmail] = useState('desk_alpha@fintechpro.net');
  const [notifications, setNotifications] = useState({
    ledgerAlerts: true,
    marginCalls: true,
    authLogs: false,
  });
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact');

  const handleToggleNotify = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Fintech profile parameters updated successfully.');
  };

  return (
    <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md">
      <div className="mb-6 border-b border-gray-800 pb-4">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Trader Identity Settings
        </h3>
        <p className="text-xs text-text/45 mt-0.5">Configure institutional profile preferences and security credentials</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest text-text/45 mb-2">
              Trader Username
            </label>
            <div className="flex border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden focus-within:border-primary/45 transition-colors">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent px-4 py-3 outline-none text-white font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest text-text/45 mb-2">
              Corporate Desk Email
            </label>
            <div className="flex border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden focus-within:border-primary/45 transition-colors">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-4 py-3 outline-none text-white font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Dense / Comfortable Layout Toggle */}
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-widest text-text/45 mb-2">
            Interface Density Mode
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              type="button"
              onClick={() => setDensity('compact')}
              className={`py-2 px-3 text-xs font-mono font-bold rounded-lg border transition-all ${
                density === 'compact' 
                  ? 'bg-primary/10 border-primary/40 text-primary' 
                  : 'bg-gray-900/40 border-gray-800 text-text/50 hover:text-white'
              }`}
            >
              Compact Layout
            </button>
            <button
              type="button"
              onClick={() => setDensity('comfortable')}
              className={`py-2 px-3 text-xs font-mono font-bold rounded-lg border transition-all ${
                density === 'comfortable' 
                  ? 'bg-primary/10 border-primary/40 text-primary' 
                  : 'bg-gray-900/40 border-gray-800 text-text/50 hover:text-white'
              }`}
            >
              Comfortable Layout
            </button>
          </div>
        </div>

        {/* System Notification preferences */}
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-widest text-text/45 mb-3">
            Websocket Alert Parameters
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={notifications.ledgerAlerts}
                onChange={() => handleToggleNotify('ledgerAlerts')}
                className="rounded border-gray-800 bg-gray-900/50 text-primary focus:ring-primary focus:ring-offset-gray-950 w-4 h-4 cursor-pointer accent-primary"
              />
              <div className="text-xs">
                <p className="font-semibold text-white">Faceted Ledger Settlements</p>
                <p className="text-[10px] text-text/40 font-mono">Notify on instant 0x hash clearance confirmations</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={notifications.marginCalls}
                onChange={() => handleToggleNotify('marginCalls')}
                className="rounded border-gray-800 bg-gray-900/50 text-primary focus:ring-primary focus:ring-offset-gray-950 w-4 h-4 cursor-pointer accent-primary"
              />
              <div className="text-xs">
                <p className="font-semibold text-white">Liquid Reserve Warnings</p>
                <p className="text-[10px] text-text/40 font-mono">Trigger signals if Active Margin level falls below 300%</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={notifications.authLogs}
                onChange={() => handleToggleNotify('authLogs')}
                className="rounded border-gray-800 bg-gray-900/50 text-primary focus:ring-primary focus:ring-offset-gray-950 w-4 h-4 cursor-pointer accent-primary"
              />
              <div className="text-xs">
                <p className="font-semibold text-white">External Terminal Access Logs</p>
                <p className="text-[10px] text-text/40 font-mono">Alert email when new IP gains API execution authorizations</p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary text-black font-semibold px-6 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Save Trader Configuration
        </button>

      </form>
    </div>
  );
};
