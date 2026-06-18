import React, { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { useChatPanel } from '../../../hooks/useChatPanel';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatComposer } from './ChatComposer';
import type { ChatMessage } from '../../../types/chat';

interface CohortChatPanelProps {
  isOpen: boolean;
}

export const CohortChatPanel: React.FC<CohortChatPanelProps> = ({ isOpen }) => {
  const { messages, onlineCount, sendMessage, markRead } = useChatPanel();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Clear unread badge when chat is active
  useEffect(() => {
    if (isOpen) {
      markRead();
    }
  }, [isOpen, markRead]);

  // Scroll chat to bottom on load/new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <aside
      className={`fixed inset-y-0 right-0 w-72 bg-bg border-l border-secondary z-50 transform md:translate-x-0 md:relative transition-transform duration-300 flex flex-col shrink-0 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b border-secondary flex justify-between items-center bg-secondary/10 shrink-0 h-[73px]">
        <h3 className="font-heading font-bold text-white flex items-center gap-2 text-sm select-none">
          <MessageSquare className="w-[18px] h-[18px] text-primary" />
          Cohort Chat
        </h3>
        <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded font-bold">
          {onlineCount} Online
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        <div className="text-[10px] text-center text-text/40 uppercase tracking-widest my-2 select-none">
          Today
        </div>

        {messages.map((msg: ChatMessage) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <ChatComposer onSendMessage={sendMessage} />
    </aside>
  );
};
