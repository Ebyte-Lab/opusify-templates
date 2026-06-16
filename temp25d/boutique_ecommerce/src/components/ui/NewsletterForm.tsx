import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmail('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex border-b border-text/30 group hover:border-text transition-colors pb-2"
    >
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-transparent outline-none flex-1 text-xs tracking-wider placeholder:text-text/30 font-light"
        required
      />
      <button
        type="submit"
        className="text-xs uppercase tracking-widest font-medium text-text/50 group-hover:text-primary transition-colors focus:outline-none"
      >
        Join
      </button>
    </form>
  );
}
