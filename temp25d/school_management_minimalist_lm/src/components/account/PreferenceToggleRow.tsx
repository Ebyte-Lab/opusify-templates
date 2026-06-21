import React from 'react';

interface PreferenceToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PreferenceToggleRow: React.FC<PreferenceToggleRowProps> = ({
  label,
  description,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-secondary last:border-0">
      <div className="flex flex-col gap-0.5 text-left pr-4">
        <span className="font-heading font-semibold text-sm text-[#0f172a]">{label}</span>
        <span className="text-xs text-text/50 font-body">{description}</span>
      </div>
      
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          checked ? 'bg-primary' : 'bg-slate-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};
