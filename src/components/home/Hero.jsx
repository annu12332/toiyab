import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Aperture, Focus } from 'lucide-react';

const DEFAULT_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-with-a-camera-42847-large.mp4";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920";

const Hero = ({ settings }) => {
  const customVideo = settings?.heroVideoUrl && settings.heroVideoUrl.trim();
  const customImage = settings?.heroImageUrl && settings.heroImageUrl.trim();
  
  // Use custom video if provided; otherwise fallback to default video if no custom image is set
  const videoUrl = customVideo ? customVideo : (customImage ? '' : DEFAULT_VIDEO);
  const imageUrl = customImage || DEFAULT_IMAGE;
  const profileUrl = settings?.profileImageUrl;
  const title = settings?.heroTitle || "Timeless Love,\nCaptured Beautifully.";
  const subtitle = settings?.heroSubtitle || "Exclusive wedding photography & cinematography preserving your story with timeless elegance.";
  const photographerName = settings?.photographerName || "Abu Toiab";

  // Simulated camera shutter flash effect (every 14s)
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, 14000);
    return () => clearInterval(flashInterval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Shutter flash effect */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 z-40 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Background Media */}
      <div className="absolute inset-0 z-0 bg-brand-black">
        {/* Base Background Image - Always available as solid fallback */}
        <img
          src={imageUrl}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50 scale-105"
        />

        {/* Video Overlay - Played over image if videoUrl exists */}
        {videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={videoUrl}
            onError={(e) => { e.target.style.display = 'none'; }}
            className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
          />
        ) : null}

        {/* Editorial Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/40 to-brand-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-black/40 to-brand-black/90" />
      </div>

      {/* Camera Viewfinder OSD HUD Elements (Professional Photography Overlay) */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
        {/* Top bar HUD */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-brand-gold/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-semibold tracking-wider">REC</span>
            <span className="text-brand-cream/40 hidden sm:inline">| 4K UHD 60FPS</span>
          </div>
          <div className="flex items-center gap-4 text-brand-cream/60">
            <span>ISO 100</span>
            <span>ƒ/1.4</span>
            <span>1/250s</span>
          </div>
        </div>

        {/* Viewfinder Center Crosshair Focus Points */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-brand-gold/15 rounded-full pointer-events-none flex items-center justify-center">
          <div className="w-24 h-24 border border-dashed border-brand-gold/25 rounded-full animate-[spin_35s_linear_infinite]" />
          <span className="absolute w-3 h-[1px] bg-brand-gold/40" />
          <span className="absolute h-3 w-[1px] bg-brand-gold/40" />
        </div>

        {/* Bottom bar HUD */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-brand-cream/40">
          <div className="hidden sm:flex items-center gap-2 text-brand-gold/60">
            <Focus className="w-3 h-3" />
            <span>CONTINUOUS AF-C</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span>RAW + LOG</span>
            <span className="text-brand-gold/80">BAT 98%</span>
          </div>
        </div>
      </div>

      {/* Faint corner frame lines — editorial viewfinder brackets */}
      <div className="absolute top-8 left-6 md:top-10 md:left-10 w-10 h-10 border-t-2 border-l-2 border-brand-gold/40 z-10" />
      <div className="absolute top-8 right-6 md:top-10 md:right-10 w-10 h-10 border-t-2 border-r-2 border-brand-gold/40 z-10" />
      <div className="absolute bottom-8 left-6 md:bottom-10 md:left-10 w-10 h-10 border-b-2 border-l-2 border-brand-gold/40 z-10" />
      <div className="absolute bottom-8 right-6 md:bottom-10 md:right-10 w-10 h-10 border-b-2 border-r-2 border-brand-gold/40 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl px-6 mx-auto text-center flex flex-col items-center pt-16">

        {/* Profile Portrait + Signature Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="flex flex-col items-center mb-7"
        >
          {/* Prominent & Responsive Profile Container (rendered when profileUrl exists from API) */}
          {profileUrl ? (
            <div className="relative mb-5 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 flex items-center justify-center">
              {/* Outer aperture ring with blade tick marks */}
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full animate-[spin_28s_linear_infinite]"
              >
                <circle cx="60" cy="60" r="57" fill="none" stroke="rgba(201,162,75,0.3)" strokeWidth="1.2" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 60 + 51 * Math.cos(angle);
                  const y1 = 60 + 51 * Math.sin(angle);
                  const x2 = 60 + 57 * Math.cos(angle);
                  const y2 = 60 + 57 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(201,162,75,0.6)"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>

              {/* Inner static lens ring */}
              <div className="absolute inset-[12px] sm:inset-[14px] md:inset-[16px] rounded-full border border-brand-gold/50" />

              {/* Responsive Profile Portrait — lens glass */}
              <img
                src={profileUrl}
                alt={photographerName}
                className="relative w-28 h-28 sm:w-34 sm:h-34 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full object-cover ring-2 ring-brand-gold/60 shadow-[0_0_35px_-5px_rgba(201,162,75,0.65)] hover:scale-105 transition-transform duration-500"
              />

              {/* Viewfinder corner brackets */}
              <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-brand-gold/80" />
              <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-brand-gold/80" />
              <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-brand-gold/80" />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-brand-gold/80" />

              {/* Camera aperture indicator dot, bottom-right */}
              <span className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_8px_2px_rgba(201,162,75,0.9)]" />
            </div>
          ) : null}
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-brand-gold/40 rounded-full bg-brand-black/60 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-brand-gold font-light">
              {photographerName} — Cinematographer
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-cream font-serif font-light leading-[1.08] mb-6 whitespace-pre-line tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-brand-cream/80 font-sans font-light max-w-2xl mx-auto mb-10 tracking-wide leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Dual CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto"
        >
          <a href="#inquire" className="btn-solid-gold w-full sm:w-auto text-center !py-3.5 !px-8">
            Hire Me
          </a>
          <a href="#portfolio" className="btn-gold w-full sm:w-auto text-center !py-3.5 !px-8">
            Explore Portfolio
          </a>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/60">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-brand-gold via-brand-gold/50 to-transparent animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;