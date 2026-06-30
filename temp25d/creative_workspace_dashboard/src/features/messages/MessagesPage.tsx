import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi } from '../../lib/api/messages.api';
import { useUserStore } from '../../stores/userStore';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { formatFileSize } from '../../components/shared/FileCard';
import {
  Hash,
  Send,
  Loader2,
  Paperclip,
  Search,
  MessageSquare,
  FileIcon
} from 'lucide-react';
import { clsx } from 'clsx';

export const MessagesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [typedMessage, setTypedMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Queries
  const { data: conversations = [], isLoading: isConvsLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: messagesApi.getConversations
  });

  const { data: threadMessages = [], isLoading: isMessagesLoading } = useQuery({
    queryKey: ['messagesThread', activeConvId],
    queryFn: () => messagesApi.getMessages(activeConvId),
    enabled: !!activeConvId
  });

  // Mutations
  const sendMutation = useMutation({
    mutationFn: (text: string) => {
      if (!user) throw new Error('Not logged in');
      const sender = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: 'admin' as const,
        lastActive: 'Active now',
        projectCount: 0
      };
      return messagesApi.sendMessage(activeConvId, text, sender);
    },
    onSuccess: () => {
      setTypedMessage('');
      queryClient.invalidateQueries({ queryKey: ['messagesThread', activeConvId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    }
  });

  // Auto scroll to bottom of chat thread
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threadMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || sendMutation.isPending) return;
    sendMutation.mutate(typedMessage);
  };

  const activeConv = conversations.find(c => c.id === activeConvId);
  const channels = conversations.filter(c => c.type === 'channel');
  const dms = conversations.filter(c => c.type === 'dm');

  return (
    <Card className="h-[calc(100vh-160px)] flex overflow-hidden border-surface-border bg-surface-card select-text">
      {/* Left sidebar: Channel & DM list */}
      <div className="w-80 border-r border-surface-border flex flex-col h-full bg-surface-elevated/15 select-none shrink-0">
        {/* Search header */}
        <div className="p-4 border-b border-surface-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search chat or channel..."
              className="w-full rounded-lg border border-surface-border bg-surface-card pl-9 pr-4 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Group lists scroll */}
        <div className="flex-grow overflow-y-auto p-3 space-y-5 scrollbar-thin">
          {/* Channels Section */}
          <div className="space-y-1">
            <span className="block px-3 text-[9px] font-bold uppercase tracking-wider text-gray-600">
              Sync Channels
            </span>
            {isConvsLoading ? (
              <div className="space-y-2 p-2">
                <Skeleton className="h-8 rounded" />
                <Skeleton className="h-8 rounded" />
              </div>
            ) : (
              channels.map((chan) => (
                <button
                  key={chan.id}
                  onClick={() => setActiveConvId(chan.id)}
                  className={clsx(
                    'flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-colors',
                    chan.id === activeConvId
                      ? 'bg-brand-500/10 text-brand-400'
                      : 'text-gray-400 hover:bg-surface-elevated/40 hover:text-white'
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <Hash className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="truncate">{chan.name}</span>
                  </span>
                  {chan.unreads > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-brand-500 text-white text-[9px] font-bold">
                      {chan.unreads}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>

          {/* DMs Section */}
          <div className="space-y-1">
            <span className="block px-3 text-[9px] font-bold uppercase tracking-wider text-gray-600">
              Direct Conversations
            </span>
            {isConvsLoading ? (
              <div className="space-y-2 p-2">
                <Skeleton className="h-8 rounded" />
                <Skeleton className="h-8 rounded" />
              </div>
            ) : (
              dms.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => setActiveConvId(dm.id)}
                  className={clsx(
                    'flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-colors',
                    dm.id === activeConvId
                      ? 'bg-brand-500/10 text-brand-400'
                      : 'text-gray-400 hover:bg-surface-elevated/40 hover:text-white'
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <Avatar
                      name={dm.name}
                      src={dm.avatarUrl}
                      isOnline={dm.isOnline}
                      size="sm"
                    />
                    <span className="truncate">{dm.name}</span>
                  </span>
                  {dm.unreads > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-brand-500 text-white text-[9px] font-bold">
                      {dm.unreads}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right: Message thread area */}
      <div className="flex-grow flex flex-col h-full min-w-0 bg-surface-card">
        {/* Header bar */}
        {activeConv && (
          <div className="px-6 py-4.5 border-b border-surface-border/50 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-3">
              {activeConv.type === 'channel' ? (
                <div className="p-2 rounded-xl bg-surface-elevated border border-surface-border text-gray-400">
                  <Hash className="w-4 h-4" />
                </div>
              ) : (
                <Avatar
                  name={activeConv.name}
                  src={activeConv.avatarUrl}
                  isOnline={activeConv.isOnline}
                  size="md"
                />
              )}
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">
                  {activeConv.type === 'channel' ? `#${activeConv.name}` : activeConv.name}
                </h4>
                <span className="text-[10px] text-gray-500 font-semibold uppercase mt-0.5 block">
                  {activeConv.type === 'channel' ? 'Public Sync Channel' : 'Active Discussion'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Message Bubble Feed */}
        <div className="flex-grow p-6 overflow-y-auto space-y-5 scrollbar-thin select-text">
          {isMessagesLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-2/3 rounded-xl" />
              <Skeleton className="h-10 w-1/3 rounded-xl ml-auto" />
              <Skeleton className="h-12 w-1/2 rounded-xl" />
            </div>
          ) : threadMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 uppercase text-[10px] font-bold tracking-wider gap-2">
              <MessageSquare className="w-8 h-8 text-gray-600" />
              <span>No Messages in discussion thread</span>
            </div>
          ) : (
            threadMessages.map((msg) => {
              const isSender = msg.sender.id === user?.id;
              return (
                <div
                  key={msg.id}
                  className={clsx('flex gap-3 text-xs max-w-[80%]', isSender && 'ml-auto flex-row-reverse')}
                >
                  <Avatar name={msg.sender.name} src={msg.sender.avatarUrl} size="sm" className="mt-1" />
                  
                  <div className="space-y-1.5 select-text">
                    <div className={clsx('flex items-center gap-2', isSender && 'flex-row-reverse')}>
                      <span className="font-bold text-white text-[10px]">{msg.sender.name}</span>
                      <span className="text-[9px] text-gray-500 font-medium">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div
                      className={clsx(
                        'p-3.5 rounded-2xl border leading-relaxed select-text',
                        isSender
                          ? 'bg-brand-500 border-brand-600 text-white rounded-tr-none'
                          : 'bg-surface-elevated/40 border-surface-border text-gray-200 rounded-tl-none'
                      )}
                    >
                      <p className="select-text">{msg.text}</p>

                      {/* Attachments inline */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-3.5 space-y-2 border-t border-white/10 pt-3">
                          {msg.attachments.map((att, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 p-2 rounded-lg bg-surface/40 border border-surface-border/20 text-xs text-gray-300 font-semibold cursor-pointer hover:bg-surface/60 transition-colors"
                              onClick={() => window.open(att.url, '_blank')}
                            >
                              <FileIcon className="w-4 h-4 text-brand-400 shrink-0" />
                              <div className="min-w-0 flex-grow">
                                <span className="block truncate text-[11px] text-white">{att.name}</span>
                                <span className="block text-[9px] text-gray-500 font-bold uppercase mt-0.5">
                                  {formatFileSize(att.sizeBytes)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Reactions display */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className={clsx('flex gap-1 pt-1', isSender && 'justify-end')}>
                        {msg.reactions.map((react, rIdx) => (
                          <button
                            key={rIdx}
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-surface-elevated border border-surface-border text-[10px] text-gray-400 font-bold hover:text-white transition-colors"
                          >
                            <span>{react.emoji}</span>
                            <span>{react.count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-surface-border bg-surface-elevated/20 flex items-center gap-3.5 shrink-0"
        >
          <button
            type="button"
            className="p-2 rounded-xl bg-surface-card border border-surface-border text-gray-500 hover:text-white transition-colors"
            title="Attach Spec File"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Type your message and press Enter..."
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            className="flex-grow rounded-xl border border-surface-border bg-surface-card px-4 py-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />

          <button
            type="submit"
            disabled={!typedMessage.trim() || sendMutation.isPending}
            className="p-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white disabled:opacity-50 transition-colors flex items-center justify-center"
          >
            {sendMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </Card>
  );
};
