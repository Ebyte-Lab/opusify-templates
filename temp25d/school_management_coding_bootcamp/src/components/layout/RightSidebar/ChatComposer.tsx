import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatComposerProps {
  onSendMessage: (text: string) => void;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-secondary bg-secondary/10 shrink-0">
      <div className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message #cohort-42..."
          className="w-full bg-secondary border border-white/10 rounded-md py-2.5 pl-3 pr-10 text-xs text-white placeholder:text-text/40 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-2 text-text/50 hover:text-primary transition-colors p-1 disabled:opacity-35 disabled:hover:text-text/50"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
