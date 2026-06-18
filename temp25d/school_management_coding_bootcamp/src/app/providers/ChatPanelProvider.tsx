import React, { createContext, useState, useCallback } from 'react';
import type { ChatMessage } from '../../types/chat';
import { mockChatMessages } from '../../data/mockChatMessages';

export interface ChatContextType {
  messages: ChatMessage[];
  onlineCount: number;
  hasUnread: boolean;
  sendMessage: (text: string) => void;
  markRead: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [onlineCount] = useState(24);

  const sendMessage = useCallback((text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      author: 'Alex.dev',
      role: 'student',
      avatarUrl: 'https://picsum.photos/seed/dev1/100/100',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  // Since we also want to toggle the animate-pulse dot in the header, we can track if it is read
  const [isRead, setIsRead] = useState(false);
  const triggerMarkRead = useCallback(() => {
    setIsRead(true);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        onlineCount,
        hasUnread: !isRead,
        sendMessage,
        markRead: triggerMarkRead
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
