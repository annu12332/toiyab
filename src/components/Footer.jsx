import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Facebook, Mail } from 'lucide-react';
import getApiUrl from '../config/api';

const Footer = () => {
  const [settings, setSettings] = useState({
    whatsappNumber: '+8801700000000',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(getApiUrl('/api/portfolio/settings'));
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => ({
            ...prev,
            whatsappNumber: data.whatsappNumber || prev.whatsappNumber,
            facebookUrl: data.facebookUrl || prev.facebookUrl,
            instagramUrl: data.instagramUrl || prev.instagramUrl,
          }));
        }
      } catch (_) {}
    };
    fetchSettings();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waLink = `https://wa.me/${settings.whatsappNumber.replace(/[\s\-()]/g, '')}`;

  return (
    <footer className="bg-brand-black text-brand-cream border-t border-brand-gold/20 pt-20 pb-12 relative overflow-hidden">
      {/* Decorative Hairline Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-brand-gold/15 items-start">

          {/* Brand Identity */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link to="/" className="flex flex-col items-start group mb-4">
              <span className="font-serif text-3xl text-brand-cream tracking-[0.2em] font-light group-hover:text-brand-gold transition-colors">
                ABU TOIAB
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-light -mt-1">
                Photographer &amp; Cinematographer
              </span>
            </Link>
            <p className="text-xs font-sans text-brand-cream/60 font-light leading-relaxed max-w-sm">
              Preserving timeless emotional stories with editorial sophistication, authentic aesthetics, and unparalleled cinematic excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.3em] text-brand-gold font-light mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs tracking-widest uppercase font-light text-brand-cream/70">
              <li><a href="#about" className="hover:text-brand-gold transition-colors">About Story</a></li>
              <li><a href="#portfolio" className="hover:text-brand-gold transition-colors">Photo Gallery</a></li>
              <li><a href="#films" className="hover:text-brand-gold transition-colors">Films Reel</a></li>
              <li><a href="#inquire" className="hover:text-brand-gold transition-colors">Inquire Dates</a></li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-brand-gold font-light mb-4">
              Connect With Us
            </h4>
            <div className="flex gap-4 mb-6 flex-wrap items-center">

              {/* Facebook */}
              <motion.a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-10 h-10 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#1877F2]/30"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-10 h-10 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:text-white transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>

              {/* WhatsApp — animated double pulse ring */}
              <a href={waLink} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="relative flex items-center justify-center">
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#25D366]/30"
                  animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#25D366]/20"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
                />
                <motion.div
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative z-10 w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30"
                >
                  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </motion.div>
              </a>
            </div>
            <p className="text-xs text-brand-cream/60 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>inquire@abutoiab.com</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-cream/50 font-light">
          <p>© {new Date().getFullYear()} ABU TOIAB. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="hover:text-brand-gold transition-colors">Admin Portal</Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-brand-gold hover:text-brand-cream transition-colors text-[10px] uppercase tracking-widest"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


