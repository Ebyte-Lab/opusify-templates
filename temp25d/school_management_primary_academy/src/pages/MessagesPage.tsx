import React, { useState, useEffect } from 'react';
import { ThreadList } from '../components/features/messages/ThreadList';
import { ChatWindow } from '../components/features/messages/ChatWindow';
import { EmptyState } from '../components/ui/EmptyState';
import { Card } from '../components/ui/Card';
import { useMessages } from '../hooks/useMessages';
import { useFetchMock } from '../hooks/useFetchMock';
import { MessageSquare, MailWarning } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { threads, sendMessage, markAsRead } = useMessages();
  const [activeThreadId, setActiveThreadId] = useState<string | null>('thread-davis');

  // Simulated fetch of threads
  const { isLoading } = useFetchMock(threads, 400);

  // Auto-mark the default active thread as read on mount
  useEffect(() => {
    if (activeThreadId) {
      markAsRead(activeThreadId);
    }
  }, [activeThreadId]);

  const activeThread = threads.find((t) => t.id === activeThreadId) || null;

  const handleSelectThread = (id: string) => {
    setActiveThreadId(id);
    markAsRead(id);
  };

  const handleSendMessage = (text: string) => {
    if (activeThreadId) {
      sendMessage(activeThreadId, text);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg" />
        <Card className="grid grid-cols-1 md:grid-cols-3 p-0 min-h-[500px] border-2 border-gray-100 overflow-hidden">
          <div className="md:col-span-1 border-r-2 border-gray-100 p-4 flex flex-col gap-4">
            <div className="h-16 bg-gray-200 rounded-2xl" />
            <div className="h-16 bg-gray-200 rounded-2xl" />
            <div className="h-16 bg-gray-200 rounded-2xl" />
          </div>
          <div className="md:col-span-2 bg-gray-50 p-4 flex flex-col justify-between">
            <div className="h-12 bg-white rounded-xl mb-4" />
            <div className="flex-grow flex flex-col gap-4 justify-end">
              <div className="h-14 w-2/3 bg-white rounded-2xl self-start" />
              <div className="h-14 w-2/3 bg-gray-200 rounded-2xl self-end" />
            </div>
            <div className="h-14 bg-white rounded-2xl mt-4" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center">
          <MessageSquare size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-heading text-3xl text-text leading-tight">Messages Inbox</h1>
          <p className="text-sm font-semibold text-gray-400">
            Communicate directly with {threads.length} teachers and academy staff
          </p>
        </div>
      </div>

      {/* Messages Layout Card */}
      <Card className="grid grid-cols-1 md:grid-cols-3 p-0 min-h-[520px] max-h-[580px] border-2 border-gray-100 overflow-hidden">
        {/* Left Column - Thread List */}
        <div className="md:col-span-1 border-r-2 border-gray-100 flex flex-col h-full bg-white overflow-hidden">
          <div className="p-4 bg-gray-50 border-b-2 border-gray-100 shrink-0">
            <span className="font-heading font-bold text-sm text-text">Conversations</span>
          </div>
          
          <div className="flex-grow overflow-y-auto">
            <ThreadList
              threads={threads}
              activeThreadId={activeThreadId}
              onSelectThread={handleSelectThread}
            />
          </div>
        </div>

        {/* Right Column - Active Chat Window */}
        <div className="md:col-span-2 h-full flex flex-col overflow-hidden bg-gray-50">
          {activeThread ? (
            <ChatWindow thread={activeThread} onSendMessage={handleSendMessage} />
          ) : (
            <div className="flex-grow flex items-center justify-center p-8 bg-gray-50">
              <EmptyState
                title="Select a Conversation"
                description="Choose a teacher from the left sidebar to start chatting."
                icon={<MailWarning size={24} className="text-gray-300" />}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
export default MessagesPage;
