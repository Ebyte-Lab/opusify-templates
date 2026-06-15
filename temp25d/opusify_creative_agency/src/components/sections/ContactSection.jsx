import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: '$10k - $30k',
  });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle | connecting | transmitting | sent

  const budgetOptions = ['< $10k', '$10k - $30k', '$30k - $50k', '$50k+'];

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate connection and transmitting states
    setFormStatus('connecting');
    setTimeout(() => {
      setFormStatus('transmitting');
      setTimeout(() => {
        setFormStatus('sent');
        // Reset form data after successful submission simulation
        setFormData({ name: '', email: '', message: '', budget: '$10k - $30k' });
      }, 1500);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <section id="contact" className="container mx-auto px-6 md:px-10 lg:px-20 py-24 border-t-2 border-text/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left column - Prompt details */}
        <div className="lg:col-span-5 space-y-8 pr-4">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block font-body">
            Get in touch
          </span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-5xl xl:text-6xl uppercase leading-[0.9] tracking-tight select-none">
            TELL US <br />
            ABOUT <br />
            YOUR <br />
            PROJECT.
          </h2>
          <p className="font-body text-text/70 text-lg md:text-xl max-w-sm leading-relaxed">
            Have an idea that needs to be loud? Drop us a line and let's craft something unforgettable.
          </p>

          <div className="pt-8 space-y-4 border-t border-text/10 font-body">
            <div>
              <span className="text-text/40 text-xs font-semibold uppercase tracking-wider block">
                Direct Email
              </span>
              <a
                href="mailto:hello@opusify.dev"
                className="text-lg md:text-xl font-bold hover:text-primary transition-colors"
              >
                hello@opusify.dev
              </a>
            </div>
            <div>
              <span className="text-text/40 text-xs font-semibold uppercase tracking-wider block">
                Office Location
              </span>
              <p className="text-lg font-bold text-text">
                Kigali Heights, Kigali, Rwanda
              </p>
            </div>
          </div>
        </div>

        {/* Right column - Interactive Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {formStatus === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-secondary text-bg p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[500px]"
              >
                <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center mb-6 animate-bounce">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-3xl md:text-5xl uppercase mb-4 tracking-tight">
                  TRANSMISSION COMPLETE
                </h3>
                <p className="font-body text-bg/80 text-md md:text-lg max-w-md mb-8">
                  Your project coordinates have been successfully logged. We will establish communication within 24 hours.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="bg-primary hover:bg-bg hover:text-text font-heading text-sm font-bold tracking-widest uppercase py-4 px-8 transition-colors duration-300"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Name */}
                <div className="relative group">
                  <label className="font-heading text-xs font-bold uppercase tracking-widest text-text/50 block mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formStatus !== 'idle'}
                    placeholder="e.g. John Doe"
                    className="w-full bg-transparent border-b-2 border-text/20 focus:border-secondary py-3 text-lg md:text-xl font-medium focus:outline-none transition-colors disabled:opacity-50"
                  />
                  {errors.name && (
                    <span className="text-primary font-body text-sm mt-1 block font-semibold">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="font-heading text-xs font-bold uppercase tracking-widest text-text/50 block mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formStatus !== 'idle'}
                    placeholder="e.g. john@domain.com"
                    className="w-full bg-transparent border-b-2 border-text/20 focus:border-secondary py-3 text-lg md:text-xl font-medium focus:outline-none transition-colors disabled:opacity-50"
                  />
                  {errors.email && (
                    <span className="text-primary font-body text-sm mt-1 block font-semibold">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Budget Pickers */}
                <div className="space-y-3">
                  <label className="font-heading text-xs font-bold uppercase tracking-widest text-text/50 block">
                    PROJECT BUDGET RANGE
                  </label>
                  <div className="flex flex-wrap gap-3 font-body">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          formStatus === 'idle' &&
                          setFormData((prev) => ({ ...prev, budget: opt }))
                        }
                        disabled={formStatus !== 'idle'}
                        className={`py-3 px-5 text-sm font-semibold tracking-wider border-2 uppercase transition-all duration-300 ${
                          formData.budget === opt
                            ? 'bg-text border-text text-bg'
                            : 'border-text/20 hover:border-text text-text bg-transparent'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="relative group">
                  <label className="font-heading text-xs font-bold uppercase tracking-widest text-text/50 block mb-2">
                    PROJECT SUMMARY *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formStatus !== 'idle'}
                    placeholder="Describe your project, goals, and timeline..."
                    className="w-full bg-transparent border-b-2 border-text/20 focus:border-secondary py-3 text-lg md:text-xl font-medium focus:outline-none resize-none transition-colors disabled:opacity-50"
                  />
                  {errors.message && (
                    <span className="text-primary font-body text-sm mt-1 block font-semibold">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button with animated statuses */}
                <div>
                  <button
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    className={`w-full py-5 text-sm font-heading font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                      formStatus === 'idle'
                        ? 'bg-text hover:bg-primary text-bg'
                        : 'bg-secondary text-bg cursor-not-allowed'
                    }`}
                  >
                    {formStatus === 'idle' && 'SEND TRANSMISSION'}
                    {formStatus === 'connecting' && 'ESTABLISHING CONNECTION...'}
                    {formStatus === 'transmitting' && 'TRANSMITTING ENCRYPTED PACKETS...'}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
