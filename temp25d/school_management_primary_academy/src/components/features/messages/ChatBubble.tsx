import React from 'react';
import { ChatMessage } from '../../../types/messages';

interface ChatBubbleProps {
  message: ChatMessage;
  teacherAvatarUrl?: string;
  teacherName?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  teacherAvatarUrl,
  teacherName,
}) => {
  const isMe = message.sender === 'parent';

  return (
    <div
      className={`flex items-start gap-2.5 max-w-[85%] ${
        isMe ? 'self-end justify-end' : 'self-start'
      }`}
    >
      {!isMe && (
        <img
          src={teacherAvatarUrl || 'https://picsum.photos/seed/teacher1/100/100'}
          alt={teacherName || 'Teacher'}
          className="w-8 h-8 rounded-full object-cover border border-white shadow-sm shrink-0 mt-0.5"
        />
      )}
      <div className="flex flex-col">
        <div
          className={`p-3.5 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${
            isMe
              ? 'bg-primary/20 border-2 border-primary/30 text-text rounded-tr-sm'
              : 'bg-white border-2 border-gray-200 text-text rounded-tl-sm'
          }`}
        >
          {message.text}
        </div>
        <span className="text-[10px] text-gray-400 font-bold mt-1 self-end">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};
export default ChatBubble;
