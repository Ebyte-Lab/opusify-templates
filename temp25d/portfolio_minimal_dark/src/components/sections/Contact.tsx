// src/components/sections/Contact.tsx
import React, { useState } from 'react';
import TerminalWindow from '../ui/TerminalWindow';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    // Simulate sending email
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status back to idle after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="w-full scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center mb-10 select-none">
        <h2 className="font-heading text-2xl font-bold">Contact_Me</h2>
        <div className="h-px bg-secondary flex-grow ml-6"></div>
      </div>

      <TerminalWindow title="guest@local: ~/contact">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex select-none">
            <span className="text-primary mr-2">guest@local:~/contact$</span>
            <span className="text-text">mail -s "Get In Touch"</span>
          </div>

          <div className="pl-3 border-l border-secondary/50 ml-2 space-y-4">
            {/* Name Input */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="name" className="text-text/70 min-w-[150px] font-body select-none">
                [?] Enter Name:
              </label>
              <div className="flex-grow flex items-center border-b border-secondary hover:border-primary focus-within:border-primary transition-colors py-1">
                <span className="text-primary mr-2 select-none">&gt;</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  placeholder="e.g. Linus Torvalds"
                  className="bg-transparent border-none outline-none text-text w-full placeholder:text-text/25 focus:ring-0 p-0 text-sm font-body"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="email" className="text-text/70 min-w-[150px] font-body select-none">
                [?] Enter Email:
              </label>
              <div className="flex-grow flex items-center border-b border-secondary hover:border-primary focus-within:border-primary transition-colors py-1">
                <span className="text-primary mr-2 select-none">&gt;</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  placeholder="e.g. linus@linuxfoundation.org"
                  className="bg-transparent border-none outline-none text-text w-full placeholder:text-text/25 focus:ring-0 p-0 text-sm font-body"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <label htmlFor="message" className="text-text/70 min-w-[150px] font-body pt-1 select-none">
                [?] Enter Message:
              </label>
              <div className="flex-grow flex items-start border-b border-secondary hover:border-primary focus-within:border-primary transition-colors py-1">
                <span className="text-primary mr-2 pt-0.5 select-none">&gt;</span>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  placeholder="e.g. Hello, let's collaborate on a kernel module!"
                  className="bg-transparent border-none outline-none text-text w-full placeholder:text-text/25 focus:ring-0 p-0 text-sm font-body resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-4 py-2 border border-secondary bg-secondary/15 hover:border-primary hover:bg-primary/10 text-text hover:text-primary transition-all duration-300 font-heading text-sm rounded cursor-pointer disabled:opacity-50 select-none"
            >
              Execute mail --send
            </button>
            {status !== 'idle' && (
              <div className="text-xs font-mono">
                {status === 'sending' && (
                  <span className="text-text/60 animate-pulse">
                    [ ] Connecting to SMTP server... transmitting payload...
                  </span>
                )}
                {status === 'success' && (
                  <span className="text-primary animate-fade-in">
                    [+] Success: Message transmitted! HTTP/1.1 200 OK.
                  </span>
                )}
              </div>
            )}
          </div>
        </form>
      </TerminalWindow>
    </section>
  );
};

export default Contact;
