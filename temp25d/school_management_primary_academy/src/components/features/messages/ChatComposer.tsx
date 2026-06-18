import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatComposerProps {
  onSendMessage: (text: string) => void;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t-2 border-gray-100 flex gap-3 items-center">
      <button
        type="button"
        aria-label="Attach file"
        className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <Paperclip size={20} strokeWidth={2.5} />
      </button>
      
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 font-medium text-text text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
      />
      
      <button
        onClick={handleSend}
        aria-label="Send message"
        className="w-12 h-12 rounded-2xl bg-primary text-text flex items-center justify-center hover:bg-yellow-400 shadow-chunky btn-chunky shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <Send size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
};
export default ChatComposer;
