import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Instagram, Youtube, Video, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                Photographer & Cinematographer
              </span>
            </Link>
            <p className="text-xs font-sans text-brand-cream/60 font-light leading-relaxed max-w-sm">
              Preserving timeless emotional stories with editorial sophistication, fine art aesthetics, and unparalleled cinematic excellence.
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
            <div className="flex gap-4 mb-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://vimeo.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all"
                aria-label="Vimeo"
              >
                <Video className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
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
          <p>© {new Date().getFullYear()} ABU TOIAB Fine Art Weddings. All rights reserved.</p>
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
