import React from 'react';
import type { ChatMessage } from '../../../types/chat';
import { Avatar } from '../../ui/Avatar';
import { Badge } from '../../ui/Badge';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isInstructor = message.role === 'instructor';

  const parseMessageText = (text: string) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="bg-secondary px-1 text-primary rounded font-mono text-[11px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`flex gap-3 p-2 rounded-lg transition-colors ${
        isInstructor
          ? 'bg-primary/5 border border-primary/10'
          : 'hover:bg-secondary/20'
      }`}
    >
      <Avatar
        src={message.avatarUrl}
        alt={message.author}
        size="sm"
        border={isInstructor}
        className="mt-1"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className={`text-xs font-bold ${
              isInstructor ? 'text-primary' : 'text-white'
            }`}
          >
            {message.author}
          </span>
          {isInstructor && <Badge variant="staff">Staff</Badge>}
          <span className="text-[9px] text-text/40">{message.timestamp}</span>
        </div>
        <p className="text-xs text-text/80 mt-1 leading-relaxed break-words">
          {parseMessageText(message.text)}
        </p>
      </div>
    </div>
  );
};
