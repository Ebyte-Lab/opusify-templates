import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  label,
  placeholder = 'Add tag and press Enter...'
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim().replace(/,/g, '');
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="space-y-1.5 text-left w-full">
      {label && (
        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
          {label}
        </label>
      )}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-surface-border bg-surface-card p-2 min-h-[42px] focus-within:border-brand-500 transition-colors">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="purple"
            size="sm"
            className="flex items-center gap-1 normal-case font-semibold pr-1 py-0.5 text-xs text-gray-200"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="p-0.5 rounded-full hover:bg-brand-500/20 text-brand-400 hover:text-white transition-colors focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        
        <div className="flex items-center flex-grow min-w-[120px]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="w-full bg-transparent border-none text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-0 p-1"
          />
          {inputValue.trim() && (
            <button
              type="button"
              onClick={addTag}
              className="p-1 text-brand-400 hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
