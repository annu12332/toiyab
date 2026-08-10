import React from 'react';
import { motion } from 'framer-motion';

const DEFAULT_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-with-a-camera-42847-large.mp4";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920";

const Hero = ({ settings }) => {
  const videoUrl = settings?.heroVideoUrl || DEFAULT_VIDEO;
  const imageUrl = settings?.heroImageUrl || DEFAULT_IMAGE;
  const profileUrl = settings?.profileImageUrl;
  const title = settings?.heroTitle || "Timeless Love,\nCaptured Beautifully.";
  const subtitle = settings?.heroSubtitle || "Exclusive wedding photography & cinematography preserving your story in fine art.";
  const photographerName = settings?.photographerName || "Abu Toiab";

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={imageUrl}
            src={videoUrl}
            className="w-full h-full object-cover opacity-45 scale-105"
          />
        ) : (
          <img
            src={imageUrl}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-45 scale-105"
          />
        )}
        {/* Editorial Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/40 to-brand-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-black/40 to-brand-black/90" />
      </div>

      {/* Faint corner frame lines — editorial magazine touch */}
      <div className="absolute top-8 left-6 md:top-10 md:left-10 w-10 h-10 border-t border-l border-brand-gold/30 z-10" />
      <div className="absolute bottom-8 right-6 md:bottom-10 md:right-10 w-10 h-10 border-b border-r border-brand-gold/30 z-10" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl px-6 mx-auto text-center flex flex-col items-center pt-16">

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
              {photographerName} — Fine Art Photography
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
          <a href="#portfolio" className="btn-solid-gold w-full sm:w-auto text-center">
            Explore Portfolio
          </a>
          <a href="#inquire" className="btn-gold w-full sm:w-auto text-center">
            Inquire Now
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