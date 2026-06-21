import React, { useState } from 'react';
import { mockApiKeys, ApiKey } from '../../data/apiKeys';
import { Key, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import clsx from 'clsx';

export const ApiKeyTable: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>(mockApiKeys);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const toggleShow = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRevoke = (id: string) => {
    setKeys((prev) => 
      prev.map((k) => k.id === id ? { ...k, status: 'REVOKED' as const } : k)
    );
  };

  const handleCreate = () => {
    const newId = `API-${Math.floor(100 + Math.random() * 900)}`;
    const randomHex = Math.random().toString(16).substring(2, 8) + Math.random().toString(16).substring(2, 8);
    const newKey: ApiKey = {
      id: newId,
      label: `System Dev Token (${newId})`,
      keyPreview: `pk_live_${randomHex.substring(0, 7)}...${randomHex.substring(7, 11)}`,
      createdOn: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'ACTIVE'
    };
    setKeys((prev) => [...prev, newKey]);
  };

  return (
    <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-primary" />
            API Key Credentials
          </h3>
          <p className="text-xs text-text/45 mt-0.5">Manage token credentials to fetch live websocket feed balances</p>
        </div>
        <button
          onClick={handleCreate}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black font-semibold text-xs rounded-lg hover:bg-emerald-600 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Create API Token
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase font-bold tracking-wider text-text/45 border-b border-gray-800/60 pb-3">
              <th scope="col" className="py-3 px-4">Label</th>
              <th scope="col" className="py-3 px-4">Key Token</th>
              <th scope="col" className="py-3 px-4">Created Date</th>
              <th scope="col" className="py-3 px-4">Status</th>
              <th scope="col" className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-gray-800/40 font-mono">
            {keys.map((k) => {
              const isVisible = showKeys[k.id];
              return (
                <tr key={k.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">{k.label}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-text/75 font-mono">
                        {isVisible ? k.keyPreview.replace('...', '_full_token_') : k.keyPreview}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => toggleShow(k.id)} 
                        className="text-text/40 hover:text-white"
                        aria-label="Toggle visible key content"
                      >
                        {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-text/60">{k.createdOn}</td>
                  <td className="py-4 px-4">
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase",
                      k.status === 'ACTIVE' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'bg-gray-800 text-text/40 border border-gray-700'
                    )}>
                      {k.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {k.status === 'ACTIVE' ? (
                      <button
                        onClick={() => handleRevoke(k.id)}
                        className="text-red-400 hover:text-red-300 font-semibold text-xs flex items-center justify-center gap-1.5 mx-auto py-1 px-2 rounded hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Revoke
                      </button>
                    ) : (
                      <span className="text-text/30 cursor-not-allowed">Disabled</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
