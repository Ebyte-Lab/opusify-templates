import React, { useState } from 'react';
import {
  Package,
  RefreshCw,
  ShieldCheck,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How do I return a purchased item?',
    answer:
      'Go to "Your Orders" and click the "Return item" button next to your product. Select your return reason, print the pre-paid shipping label, and drop off the package at your nearest shipping center.',
  },
  {
    question: 'Can I track my shipping in real-time?',
    answer:
      'Yes! Once your order ships, we send a tracking link to your confirmation email. You can also view shipping updates directly from the "Your Orders" page in your Account.',
  },
  {
    question: 'What payment options are accepted?',
    answer:
      'We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), MegaMarket gift cards, and secure online payment options.',
  },
  {
    question: 'How do I sign up for MEGAPRIME?',
    answer:
      'Click the MEGAPRIME badge or visit your Account panel to start your 30-day free trial. Prime members receive free tomorrow-delivery, exclusive deals, and access to Prime video.',
  },
];

export const CustomerServicePage: React.FC = () => {
  const [faqSearch, setFaqSearch] = useState('');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('order-issue');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-8 space-y-12">
      {/* Page Header & FAQ Search */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text">
          Hello. How can we help you?
        </h2>
        <div className="relative max-w-lg mx-auto bg-white rounded-md border border-gray-300 shadow-sm flex items-center">
          <span className="pl-3 text-gray-400">
            <Search size={20} />
          </span>
          <input
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder="Search FAQs, return policies, and orders..."
            className="w-full px-3 py-3 outline-none text-text text-sm rounded-md"
            aria-label="Search help topics"
          />
        </div>
      </div>

      {/* Support Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <button className="bg-secondary hover:bg-gray-50 border border-gray-200 p-6 rounded-md shadow-sm transition-colors text-left flex gap-4 items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <div className="text-primary mt-1">
            <Package size={28} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text mb-1">Your Orders</h4>
            <p className="text-xs text-gray-500 leading-normal">
              Track, return, or buy items again. View receipts.
            </p>
          </div>
        </button>

        <button className="bg-secondary hover:bg-gray-50 border border-gray-200 p-6 rounded-md shadow-sm transition-colors text-left flex gap-4 items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <div className="text-primary mt-1">
            <RefreshCw size={28} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text mb-1">Returns & Refunds</h4>
            <p className="text-xs text-gray-500 leading-normal">
              Return items, print labels, or view return status.
            </p>
          </div>
        </button>

        <button className="bg-secondary hover:bg-gray-50 border border-gray-200 p-6 rounded-md shadow-sm transition-colors text-left flex gap-4 items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <div className="text-primary mt-1">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text mb-1">Manage MEGAPRIME</h4>
            <p className="text-xs text-gray-500 leading-normal">
              View prime rewards, renew plan, or check benefits.
            </p>
          </div>
        </button>

        <button className="bg-secondary hover:bg-gray-50 border border-gray-200 p-6 rounded-md shadow-sm transition-colors text-left flex gap-4 items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <div className="text-primary mt-1">
            <CreditCard size={28} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text mb-1">Payment Settings</h4>
            <p className="text-xs text-gray-500 leading-normal">
              Add credit cards, update invoice settings, or load gift card.
            </p>
          </div>
        </button>
      </div>

      {/* Accordion FAQ & Contact Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
        {/* FAQs Accordion */}
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-bold text-text mb-6">
            Frequently Asked Questions
          </h3>
          {filteredFaqs.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No matching FAQs found.</p>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isActive = activeFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-md bg-secondary overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-text hover:bg-gray-50 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-expanded={isActive}
                    >
                      <span>{faq.question}</span>
                      {isActive ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {isActive && (
                      <div className="px-5 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Contact Support Form */}
        <div className="bg-secondary border border-gray-200 p-6 rounded-md shadow-sm flex flex-col justify-center">
          <h3 className="font-heading text-xl font-bold text-text mb-4">
            Contact Customer Support
          </h3>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 p-6 rounded-md text-center space-y-3">
              <div className="inline-flex text-green-600 justify-center">
                <CheckCircle size={40} />
              </div>
              <h4 className="font-bold text-green-800 text-sm">Message Sent Successfully!</h4>
              <p className="text-xs text-green-700 leading-relaxed">
                Thank you for contacting us. Our customer support agents will respond to your query at your email address within 24 hours.
              </p>
              <Button
                variant="secondary"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs border border-green-300"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary transition-colors"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary transition-colors bg-white cursor-pointer"
                >
                  <option value="order-issue">Order Status & Tracking</option>
                  <option value="refund-request">Refunds & Returns</option>
                  <option value="prime-billing">Prime Membership & Payments</option>
                  <option value="general-question">Other General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Describe your issue or question here..."
                />
              </div>

              <Button type="submit" variant="cta" fullWidth className="rounded-md py-2.5 shadow-sm font-bold text-sm">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerServicePage;
