import React, { useEffect, useRef } from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatComposer } from './ChatComposer';
import { MessageThread } from '../../../types/messages';
import { Avatar } from '../../ui/Avatar';

interface ChatWindowProps {
  thread: MessageThread;
  onSendMessage: (text: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ thread, onSendMessage }) => {
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages list changes
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [thread.messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-3 shrink-0">
        <Avatar src={thread.avatarUrl} alt={thread.teacherName} size="md" />
        <div className="min-w-0">
          <h3 className="font-heading font-bold text-base text-text leading-tight">{thread.teacherName}</h3>
          <p className="text-xs font-semibold text-gray-400 truncate">{thread.teacherRole}</p>
        </div>
      </div>

      {/* Messages List */}
      <div
        ref={chatHistoryRef}
        className="flex-grow p-4 md:p-6 overflow-y-auto flex flex-col gap-4"
      >
        <div className="flex justify-center mb-2">
          <span className="text-[10px] font-bold text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 uppercase tracking-wider">
            Today
          </span>
        </div>

        {thread.messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            teacherAvatarUrl={thread.avatarUrl}
            teacherName={thread.teacherName}
          />
        ))}
      </div>

      {/* Composer */}
      <ChatComposer onSendMessage={onSendMessage} />
    </div>
  );
};
export default ChatWindow;
