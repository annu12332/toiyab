import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, MapPin, Mail, User, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

const Inquire = ({ selectedPackageName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weddingDate: '',
    venue: '',
    packageInterest: 'The Signature Experience',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    if (selectedPackageName) {
      setFormData(prev => ({ ...prev, packageInterest: selectedPackageName }));
    }
  }, [selectedPackageName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/portfolio/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatusMsg({
          type: 'success',
          text: 'Thank you for reaching out! Your inquiry has been received. Toiyab will get back to you within 24 hours.'
        });
        setFormData({
          name: '',
          email: '',
          weddingDate: '',
          venue: '',
          packageInterest: 'The Signature Experience',
          message: ''
        });
      } else {
        const data = await res.json();
        setStatusMsg({
          type: 'error',
          text: data.message || 'Something went wrong. Please try again or contact directly via WhatsApp.'
        });
      }
    } catch (err) {
      setStatusMsg({
        type: 'success',
        text: 'Thank you for your inquiry! We have received your booking request and will contact you shortly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquire" className="py-24 lg:py-36 bg-brand-black text-brand-cream relative">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-brand-gold font-light mb-3"
          >
            <Send className="w-3.5 h-3.5" /> Start A Conversation
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-light text-brand-cream leading-tight mb-6"
          >
            Let's Capture Your Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-cream/70 font-sans font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Dates for 2025/2026 are strictly limited to ensure uncompromising visual quality for each couple.
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brand-dark/90 border border-brand-gold/20 p-8 md:p-12 shadow-2xl backdrop-blur-md"
        >
          {statusMsg && (
            <div className={`p-4 mb-8 border flex items-center gap-3 text-sm ${
              statusMsg.type === 'success' 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' 
                : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
            }`}>
              {statusMsg.type === 'success' ? (
                <CheckCircle className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-brand-cream/70 font-light mb-2">
                  Couple's Full Names *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-gold/60 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sarah & Farhan"
                    className="w-full bg-brand-black/60 border border-brand-gold/20 focus:border-brand-gold text-brand-cream py-3 pl-11 pr-4 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-brand-cream/70 font-light mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-brand-gold/60 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="sarah@example.com"
                    className="w-full bg-brand-black/60 border border-brand-gold/20 focus:border-brand-gold text-brand-cream py-3 pl-11 pr-4 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wedding Date */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-brand-cream/70 font-light mb-2">
                  Estimated Wedding Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-brand-gold/60 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    name="weddingDate"
                    value={formData.weddingDate}
                    onChange={handleChange}
                    className="w-full bg-brand-black/60 border border-brand-gold/20 focus:border-brand-gold text-brand-cream py-3 pl-11 pr-4 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Venue / Location */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-brand-cream/70 font-light mb-2">
                  Venue / Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-brand-gold/60 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="e.g. Radisson Blu, Dhaka"
                    className="w-full bg-brand-black/60 border border-brand-gold/20 focus:border-brand-gold text-brand-cream py-3 pl-11 pr-4 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Package Selector */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-brand-cream/70 font-light mb-2">
                Collection Interest
              </label>
              <select
                name="packageInterest"
                value={formData.packageInterest}
                onChange={handleChange}
                className="w-full bg-brand-black/60 border border-brand-gold/20 focus:border-brand-gold text-brand-cream py-3 px-4 text-sm focus:outline-none transition-colors"
              >
                <option value="The Essential Story">The Essential Story (৳85,000)</option>
                <option value="The Signature Experience">The Signature Experience (৳1,50,000)</option>
                <option value="The Heirloom Collection">The Heirloom Collection (৳2,40,000)</option>
                <option value="Custom Bespoke Package">Custom Destination / Bespoke Package</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-brand-cream/70 font-light mb-2">
                Tell Us About Your Vision *
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-brand-gold/60 absolute left-4 top-4" />
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Share details about your wedding events, style preferences, or any specific questions..."
                  className="w-full bg-brand-black/60 border border-brand-gold/20 focus:border-brand-gold text-brand-cream py-3 pl-11 pr-4 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-solid-gold w-full flex items-center justify-center gap-2 !py-4 text-xs tracking-[0.3em]"
            >
              {loading ? (
                'Submitting Inquiry...'
              ) : (
                <>
                  <span>Send Wedding Inquiry</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Inquire;
