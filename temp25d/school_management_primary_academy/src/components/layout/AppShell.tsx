import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileNavDrawer } from './MobileNavDrawer';
import { Modal } from '../ui/Modal';
import { Send, Inbox } from 'lucide-react';
import { useMessages } from '../../hooks/useMessages';
import { useDisclosure } from '../../hooks/useDisclosure';

export const AppShell: React.FC = () => {
  const navigate = useNavigate();
  const { threads, sendMessage } = useMessages();
  const { isOpen: isMobileNavOpen, open: openMobileNav, close: closeMobileNav } = useDisclosure(false);
  const { isOpen: isQuickMsgOpen, open: openQuickMsg, close: closeQuickMsg } = useDisclosure(false);
  const [inputText, setInputText] = useState('');

  // Find Mr. Davis thread for quick peek modal
  const davisThread = threads.find((t) => t.id === 'thread-davis') || threads[0];

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(davisThread.id, inputText.trim());
    setInputText('');
    
    // Auto-scroll chat history in modal
    setTimeout(() => {
      const scrollArea = document.getElementById('quick-chat-history');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }, 50);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const navigateToFullMessages = () => {
    closeQuickMsg();
    navigate('/messages');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <Header onOpenMobileNav={openMobileNav} onOpenQuickMessages={openQuickMsg} />

      {/* Main content body */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8 flex flex-col gap-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile drawer Navigation */}
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
        onOpenQuickMessages={openQuickMsg}
      />

      {/* Quick Peek Message Modal */}
      <Modal
        isOpen={isQuickMsgOpen}
        onClose={closeQuickMsg}
        title={davisThread ? davisThread.teacherName : 'Quick Chat'}
        className="border-secondary"
      >
        {davisThread && (
          <div className="flex flex-col h-[420px] bg-gray-50">
            {/* Teacher role indicator */}
            <div className="bg-white px-5 py-2 border-b border-gray-100 flex justify-between items-center text-xs font-semibold text-gray-500">
              <span>{davisThread.teacherRole}</span>
              <button
                onClick={navigateToFullMessages}
                className="text-primary hover:text-amber-500 flex items-center gap-1 transition-colors focus:outline-none"
              >
                <Inbox size={14} /> View full Inbox
              </button>
            </div>

            {/* Chat Messages */}
            <div
              id="quick-chat-history"
              className="flex-grow p-5 overflow-y-auto flex flex-col gap-4"
            >
              <div className="flex justify-center">
                <span className="text-[10px] font-bold text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 uppercase tracking-wider">
                  Today
                </span>
              </div>

              {davisThread.messages.map((msg) => {
                const isMe = msg.sender === 'parent';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isMe ? 'self-end justify-end' : 'self-start'
                    }`}
                  >
                    {!isMe && (
                      <img
                        src={davisThread.avatarUrl}
                        alt={davisThread.teacherName}
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
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold mt-1 self-end">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Composer */}
            <div className="p-4 bg-white border-t-2 border-gray-100 flex gap-2.5 items-center">
              <input
                type="text"
                placeholder="Type a quick reply..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-grow bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 font-medium text-text text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 rounded-2xl bg-primary text-text flex items-center justify-center hover:bg-yellow-400 shadow-chunky btn-chunky shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default AppShell;
