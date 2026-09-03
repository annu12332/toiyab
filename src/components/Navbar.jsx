import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: isHome ? '#about' : '/#about' },
    { label: 'Experience', href: isHome ? '#experience' : '/#experience' },
    { label: 'Portfolio', href: isHome ? '#portfolio' : '/#portfolio' },
    { label: 'Films', href: isHome ? '#films' : '/#films' },
    { label: 'Stories', href: isHome ? '#testimonials' : '/#testimonials' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-black/90 backdrop-blur-md border-b border-brand-gold/20 py-3.5 shadow-2xl' 
          : 'bg-gradient-to-b from-brand-black/80 via-brand-black/30 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex flex-col items-start group">
          <span className="font-serif text-2xl lg:text-3xl text-brand-cream tracking-[0.15em] font-light group-hover:text-brand-gold transition-colors duration-300">
            ABU TOIAB
          </span>
          
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.25em] text-brand-cream/80 hover:text-brand-gold transition-colors duration-300 font-light"
            >
              {link.label}
            </a>
          ))}

          <Link
            to="/images"
            className="text-[11px] uppercase tracking-[0.25em] text-brand-cream/80 hover:text-brand-gold transition-colors duration-300 font-light"
          >
            Gallery
          </Link>

          <Link
            to="/videos"
            className="text-[11px] uppercase tracking-[0.25em] text-brand-cream/80 hover:text-brand-gold transition-colors duration-300 font-light"
          >
            Reels
          </Link>

          <a 
            href={isHome ? '#inquire' : '/#inquire'} 
            className="btn-solid-gold !py-2 !px-5 !text-[11px] font-medium transition-transform hover:scale-105"
          >
            Hire Me
          </a>

          
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-brand-cream focus:outline-none p-2"
          aria-label="Toggle Navigation"
        >
          <div className="w-6 flex flex-col gap-1.5 items-end">
            <span className={`h-[1px] bg-brand-gold transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
            <span className={`h-[1px] bg-brand-gold transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
            <span className={`h-[1px] bg-brand-gold transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-brand-black/95 border-b border-brand-gold/20 py-8 px-6 backdrop-blur-xl flex flex-col gap-6 items-center shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.3em] text-brand-cream/90 hover:text-brand-gold"
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/images"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.3em] text-brand-cream/90 hover:text-brand-gold"
            >
              Full Gallery
            </Link>

            <Link
              to="/videos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.3em] text-brand-cream/90 hover:text-brand-gold"
            >
              Video Reels
            </Link>

            <a 
              href={isHome ? '#inquire' : '/#inquire'} 
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold text-center w-full max-w-xs mt-2"
            >
              Inquire Now
            </a>


          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
