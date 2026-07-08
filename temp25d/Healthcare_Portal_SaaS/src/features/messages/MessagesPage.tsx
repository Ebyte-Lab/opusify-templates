import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Send, 
  MessageSquare, 
  Hash, 
  Lock, 
  User, 
  Search, 
  ShieldAlert 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isSelf?: boolean;
}

export const MessagesPage: React.FC = () => {
  const { user } = useAuthStore();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Channels state
  const channels = [
    { id: 'ch-general', name: 'general-clinic', type: 'channel', unread: 2 },
    { id: 'ch-nursing', name: 'triage-nursing', type: 'channel', unread: 0 },
    { id: 'ch-billing', name: 'billing-claims', type: 'channel', unread: 0 },
  ];

  const directMessages = [
    { id: 'dm-adams', name: 'Nurse Clara Adams', avatar: 'https://picsum.photos/seed/adams/100/100', role: 'Nurse', status: 'online' },
    { id: 'dm-receptionist', name: 'Sarah Patel', avatar: 'https://picsum.photos/seed/sarah/100/100', role: 'Front Desk', status: 'online' },
    { id: 'dm-admin', name: 'Administrator Desk', avatar: 'https://picsum.photos/seed/admin/100/100', role: 'Admin', status: 'offline' },
  ];

  const [activeChat, setActiveChat] = useState<string>('ch-general');
  const [typedMessage, setTypedMessage] = useState('');

  // Initial message logs
  const [messageLogs, setMessageLogs] = useState<Record<string, ChatMessage[]>>({
    'ch-general': [
      { id: 'm1', senderName: 'Clara Adams', senderRole: 'Nurse', senderAvatar: 'https://picsum.photos/seed/adams/100/100', content: 'STAT: Room 4 patient BP is 158/98. Dr. Vance, can you consult?', timestamp: '09:30 AM' },
      { id: 'm2', senderName: 'Sarah Patel', senderRole: 'Front Desk', senderAvatar: 'https://picsum.photos/seed/sarah/100/100', content: 'Checking patient in now. Vitals logged in chart.', timestamp: '09:32 AM' },
      { id: 'm3', senderName: 'Michael Vance', senderRole: 'Doctor', senderAvatar: 'https://picsum.photos/seed/doctor-vance/100/100', content: 'Acknowledged. Will complete SOAP check within 10 minutes.', timestamp: '09:34 AM', isSelf: true },
    ],
    'ch-nursing': [
      { id: 'n1', senderName: 'Clara Adams', senderRole: 'Nurse', senderAvatar: 'https://picsum.photos/seed/adams/100/100', content: 'All vaccination doses for the clinic are fully stocked.', timestamp: '08:15 AM' },
    ],
    'ch-billing': [
      { id: 'b1', senderName: 'Sarah Patel', senderRole: 'Front Desk', senderAvatar: 'https://picsum.photos/seed/sarah/100/100', content: 'Insurance authorization claim processed for PAT-002.', timestamp: '09:02 AM' },
    ],
    'dm-adams': [
      { id: 'da1', senderName: 'Clara Adams', senderRole: 'Nurse', senderAvatar: 'https://picsum.photos/seed/adams/100/100', content: 'Hello Dr. Vance, did you review the lab values for PAT-001?', timestamp: '09:15 AM' },
    ]
  });

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageLogs, activeChat]);

  const activeMessages = messageLogs[activeChat] || [];
  const activeTitle = channels.find(c => c.id === activeChat)?.name || directMessages.find(d => d.id === activeChat)?.name || 'General';
  const isActiveChannel = activeChat.startsWith('ch-');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !user) return;

    const newMsg: ChatMessage = {
      id: `m-custom-${Date.now()}`,
      senderName: `${user.firstName} ${user.lastName}`,
      senderRole: user.role.toUpperCase(),
      senderAvatar: user.avatarUrl,
      content: typedMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };

    setMessageLogs(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));
    setTypedMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Secure Messaging Center</h1>
          <p className="text-sm text-brand-600/70">Communicate securely under HIPAA guidelines. Logs are encrypted at rest.</p>
        </div>
        <Badge variant="stable" dot>🔒 end-to-end encrypted</Badge>
      </div>

      {/* Main chat layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[72vh] items-stretch">
        
        {/* Left Side: channels and direct messages */}
        <Card className="md:col-span-1 flex flex-col h-full overflow-hidden">
          <CardHeader className="p-4 border-b border-surface-border bg-slate-50/50">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-500/60" />
              <input
                type="text"
                placeholder="Search channels..."
                className="w-full h-8 pl-8 pr-3 rounded-lg bg-surface text-xs border border-surface-border outline-none"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-2 space-y-4 no-scrollbar text-xs">
            {/* Channels list */}
            <div>
              <p className="px-2 text-[10px] font-semibold uppercase text-brand-600/65 tracking-wider mb-1.5">Channels</p>
              <div className="space-y-0.5">
                {channels.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChat(ch.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg font-medium transition-colors ${
                      activeChat === ch.id 
                        ? 'bg-brand-50 text-brand-900 font-semibold border-l-2 border-brand-500' 
                        : 'text-brand-700 hover:bg-surface/50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Hash size={14} className="text-brand-500/60" />
                      <span className="truncate">{ch.name}</span>
                    </div>
                    {ch.unread > 0 && (
                      <span className="bg-cyan-500 text-white rounded-full text-[9px] px-1.5 py-0.5 font-bold font-mono">
                        {ch.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct messages list */}
            <div>
              <p className="px-2 text-[10px] font-semibold uppercase text-brand-600/65 tracking-wider mb-1.5">Direct Messages</p>
              <div className="space-y-0.5">
                {directMessages.map(dm => (
                  <button
                    key={dm.id}
                    onClick={() => setActiveChat(dm.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg font-medium transition-colors ${
                      activeChat === dm.id 
                        ? 'bg-brand-50 text-brand-900 font-semibold border-l-2 border-brand-500' 
                        : 'text-brand-700 hover:bg-surface/50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img src={dm.avatar} alt="avatar" className="h-6 w-6 rounded-full border border-surface-border" />
                      <span className={`absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full ring-1 ring-white ${
                        dm.status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`} />
                    </div>
                    <div className="text-left truncate">
                      <p className="truncate font-semibold">{dm.name}</p>
                      <p className="text-[9px] text-brand-600/60 leading-none">{dm.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Message bubble stream */}
        <Card className="md:col-span-3 flex flex-col h-full overflow-hidden">
          {/* Chat active header */}
          <div className="px-6 py-3 border-b border-surface-border bg-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              {isActiveChannel ? (
                <Hash size={18} className="text-brand-500" />
              ) : (
                <User size={18} className="text-brand-500" />
              )}
              <div>
                <h2 className="text-sm font-bold text-brand-950">
                  {isActiveChannel ? activeTitle : activeTitle}
                </h2>
                <p className="text-[10px] text-brand-600/60 flex items-center gap-1">
                  <Lock size={10} className="text-emerald-500" /> Authorized clinical access only
                </p>
              </div>
            </div>
          </div>

          {/* Messages stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-slate-50/30 text-xs">
            {activeMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-brand-600/60 gap-2">
                <MessageSquare size={36} className="text-brand-500/30" />
                <p className="font-medium">No previous messages in this channel.</p>
              </div>
            ) : (
              activeMessages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
                  <img
                    src={msg.senderAvatar}
                    alt="avatar"
                    className="h-8 w-8 rounded-full border border-surface-border shrink-0 mt-0.5"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${msg.senderName}&background=ecfeff&color=0891b2`;
                    }}
                  />
                  <div className={`space-y-1 max-w-[70%] ${msg.isSelf ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-1.5 justify-start text-[10px] text-brand-600/60 font-semibold">
                      <span className="text-brand-950 font-bold">{msg.senderName}</span>
                      <span className="bg-slate-100 text-slate-650 px-1 py-0.5 rounded text-[8px] font-medium leading-none">{msg.senderRole}</span>
                      <span className="font-mono text-[9px] font-normal">{msg.timestamp}</span>
                    </div>
                    <div className={`p-3 rounded-xl border text-left leading-relaxed ${
                      msg.isSelf 
                        ? 'bg-cyan-500 text-white border-cyan-500' 
                        : 'bg-white text-brand-900 border-surface-border'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Message form input */}
          <div className="p-4 border-t border-surface-border bg-white shrink-0">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder={`Send secure message to ${isActiveChannel ? '#' : ''}${activeTitle}...`}
                className="flex-1 h-10 px-4 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white focus:border-brand-500/60 transition-all font-body"
                required
              />
              <Button type="submit" className="h-10 px-4 shrink-0">
                <Send size={14} className="mr-1.5" /> Send
              </Button>
            </form>
          </div>

        </Card>
      </div>
    </div>
  );
};
