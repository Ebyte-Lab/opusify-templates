import React, { createContext, useContext, useState } from 'react';
import { MessageThread, ChatMessage } from '../../types/messages';
import { mockMessageThreads } from '../../data/mockMessages';

interface MessagesContextType {
  threads: MessageThread[];
  sendMessage: (threadId: string, text: string) => void;
  markAsRead: (threadId: string) => void;
  totalUnreadCount: number;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threads, setThreads] = useState<MessageThread[]>(mockMessageThreads);

  const sendMessage = (threadId: string, text: string) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'parent',
      text,
      timestamp: timeString,
    };

    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === threadId) {
          const updatedMessages = [...thread.messages, newMsg];
          return {
            ...thread,
            messages: updatedMessages,
            lastMessagePreview: text,
            unreadCount: 0, // Sending a message reads the thread
          };
        }
        return thread;
      })
    );

    // Simulate teacher reply after 2 seconds
    setTimeout(() => {
      const responses: Record<string, string> = {
        'thread-davis': "Thank you for letting me know, Sarah! We'll make sure he has fun in Art today.",
        'thread-gable': "You're very welcome! Leo is a pleasure to have in class. I will work with him tomorrow.",
        'thread-rose': "Thank you! I will keep you posted on Mia's projects this week.",
      };

      const replyText = responses[threadId] || "Got it! Thanks for the message.";
      const replyMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'teacher',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setThreads((prevThreads) =>
        prevThreads.map((thread) => {
          if (thread.id === threadId) {
            return {
              ...thread,
              messages: [...thread.messages, replyMsg],
              lastMessagePreview: replyText,
            };
          }
          return thread;
        })
      );
    }, 2000);
  };

  const markAsRead = (threadId: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === threadId) {
          return { ...thread, unreadCount: 0 };
        }
        return thread;
      })
    );
  };

  const totalUnreadCount = threads.reduce((acc, t) => acc + t.unreadCount, 0);

  return (
    <MessagesContext.Provider value={{ threads, sendMessage, markAsRead, totalUnreadCount }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};
