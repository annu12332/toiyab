import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, MapPin, Mail, User, CheckCircle, AlertCircle, MessageSquare, MessageCircle, Phone } from 'lucide-react';
import getApiUrl from '../../config/api';

const Inquire = ({ settings, selectedPackageName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weddingDate: '',
    venue: '',
    packageInterest: 'Wedding Photography & Cinematography',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const whatsappNumber = settings?.whatsappNumber || '+8801700000000';
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  useEffect(() => {
    if (selectedPackageName) {
      setFormData(prev => ({ ...prev, packageInterest: selectedPackageName }));
    }
  }, [selectedPackageName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppChat = () => {
    const textMsg = `Hello Abu Toiab, I am interested in ${formData.packageInterest || 'Wedding Photography'}.${formData.name ? ` My name is ${formData.name}.` : ''}${formData.weddingDate ? ` Event Date: ${formData.weddingDate}.` : ''} ${formData.message ? `Details: ${formData.message}` : ''}`;
    const url = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(textMsg)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    // Prepare WhatsApp message
    const textMsg = `Hello Abu Toiab, I am interested in ${formData.packageInterest || 'Wedding Photography'}.${formData.name ? ` My name is ${formData.name}.` : ''}${formData.weddingDate ? ` Event Date: ${formData.weddingDate}.` : ''}${formData.venue ? ` Venue: ${formData.venue}.` : ''} ${formData.message ? `Details: ${formData.message}` : ''}`;
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(textMsg)}`;

    try {
      // Save inquiry to admin database as backup
      await fetch(getApiUrl('/api/portfolio/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.log('Saved to WhatsApp direct link');
    } finally {
      setLoading(false);
      // Launch WhatsApp chat window immediately
      window.open(whatsappUrl, '_blank');
      setStatusMsg({
        type: 'success',
        text: 'Opening WhatsApp Chat with your pre-filled inquiry details...'
      });
    }
  };

  return (
    <section id="inquire" className="py-16 lg:py-24 bg-brand-black text-brand-cream relative">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
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
            className="text-4xl md:text-6xl font-serif font-light text-brand-cream leading-tight mb-4"
          >
            Let's Capture Your Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-cream/70 font-sans font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-6"
          >
            Dates for 2025/2026 are strictly limited to ensure uncompromising visual quality for each couple.
          </motion.p>

          {/* Quick WhatsApp Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-light shadow-lg hover:border-emerald-400/60 transition-colors cursor-pointer"
            onClick={handleWhatsAppChat}
          >
            <MessageCircle className="w-4 h-4 fill-emerald-500/20 text-emerald-400 animate-pulse" />
            <span>Instant Chat on WhatsApp: <strong className="font-mono font-medium text-emerald-300">{whatsappNumber}</strong></span>
          </motion.div>
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

            {/* Service Interest Selector */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-brand-cream/70 font-light mb-2">
                Service / Coverage Interest
              </label>
              <select
                name="packageInterest"
                value={formData.packageInterest}
                onChange={handleChange}
                className="w-full bg-brand-black/60 border border-brand-gold/20 focus:border-brand-gold text-brand-cream py-3 px-4 text-sm focus:outline-none transition-colors"
              >
                <option value="Wedding Photography & Cinematography">Full Wedding Photography & Cinematography</option>
                <option value="Fine Art Photography">Fine Art Photography Only</option>
                <option value="Cinematic Film Reel">Cinematic Film Reel & 4K Teaser</option>
                <option value="Pre-Wedding & Engagement Session">Pre-Wedding & Couple Portrait Session</option>
                <option value="Custom Destination Event">Destination Wedding / Custom Event</option>
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

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-4 px-8 text-xs tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/60 cursor-pointer rounded-none"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>{loading ? 'Opening WhatsApp...' : 'Send Direct WhatsApp Inquiry'}</span>
              </button>
              <p className="text-[11px] text-brand-cream/50 font-light text-center mt-3">
                Submitting will instantly open WhatsApp with your pre-filled inquiry details ready to send to Abu Toiab.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Inquire;
