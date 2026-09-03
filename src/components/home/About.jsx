import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const DEFAULT_PORTRAIT = "https://images.unsplash.com/photo-1544168190-79c15427015f?q=80&w=800";

// Animated count-up number, triggers once when in view
const Counter = ({ to, suffix = "", duration = 1.8 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-serif text-brand-gold block mb-1 tabular-nums">
      {value}{suffix}
    </span>
  );
};

const About = ({ settings }) => {
  const portraitUrl = settings?.aboutPhotoUrl || DEFAULT_PORTRAIT;
  const storyText = settings?.aboutText || "I believe that wedding photography is an art form of quiet observation. It's about capturing the unscripted poetry of your day — the subtle glances, the raw emotion, and the timeless elegance that makes your story singularly yours.";
  const yearsExp = settings?.yearsExperience || 8;
  const weddingsCount = settings?.weddingsShot || 150;

  return (
    <section id="about" className="py-16 lg:py-24 bg-brand-black text-brand-cream relative overflow-hidden">
      {/* Decorative Subtle Hairline Background Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent" />

      {/* Faint film-grain / sprocket strip along far left, desktop only */}
      <div className="hidden lg:flex absolute left-0 top-0 h-full w-6 flex-col items-center justify-evenly opacity-20 pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="w-2 h-3 border border-brand-gold/50 rounded-[1px]" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Editorial Portrait Frame — Camera Viewfinder Theme */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Accent Gold Border Offset */}
            <div className="absolute -inset-4 border border-brand-gold/20 rounded-none pointer-events-none hidden sm:block" />

            {/* Viewfinder corner brackets */}
            <span className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-brand-gold/70 z-20" />
            <span className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-brand-gold/70 z-20" />
            <span className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-brand-gold/70 z-20" />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-brand-gold/70 z-20" />

            {/* EXIF-style overlay tag, top-left */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-brand-black/60 backdrop-blur-md border border-brand-gold/30"
            >
              <span className="w-1 h-1 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[9px] tracking-widest text-brand-cream/70 font-light">
                f/1.8 · 1/250s · ISO 200
              </span>
            </motion.div>
            
            <div className="relative aspect-[4/5] overflow-hidden bg-brand-dark group">
              {/* Shutter-reveal animation */}
              <motion.div
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                style={{ transformOrigin: "right" }}
                className="absolute inset-0 bg-brand-black z-10"
              />
              <img
                src={portraitUrl}
                alt={`${settings?.photographerName || 'Abu Toiab'} Portrait`}
                className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-60" />

              {/* Focus ring pulse on hover, center of frame */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 border border-brand-gold/70 rounded-full animate-ping" />
                <div className="absolute w-16 h-16 border border-brand-gold/50 rounded-full" />
              </div>
            </div>

            {/* Signature Overlay Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-6 -right-4 sm:right-6 bg-brand-dark border border-brand-gold/30 p-4 shadow-2xl backdrop-blur-md"
            >
              <span className="font-serif italic text-xl text-brand-gold block">{settings?.photographerName || "Abu Toiab"}</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-cream/60 block">Lead Artist</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Story & Philosophy */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs uppercase tracking-[0.4em] text-brand-gold font-light mb-4 flex items-center gap-3"
            >
              <span className="w-6 h-[1px] bg-brand-gold/60 inline-block" />
              The Philosophy
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-brand-cream mb-8"
            >
              Crafting Heirloom Visuals For The Discerning Couple.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.55 }}
              className="text-base md:text-lg text-brand-cream/80 font-sans font-light leading-relaxed mb-10 tracking-wide"
            >
              {storyText}
            </motion.p>

            {/* Divider Hairline — animated draw-in */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="w-full h-[1px] bg-brand-gold/20 mb-10"
            />

            {/* Stat Counters Grid — count-up animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-8"
            >
              <div>
                <Counter to={yearsExp} suffix="+" />
                <span className="text-xs uppercase tracking-widest text-brand-cream/60 font-light block">
                  Years Experience
                </span>
              </div>

              <div>
                <Counter to={weddingsCount} suffix="+" />
                <span className="text-xs uppercase tracking-widest text-brand-cream/60 font-light block">
                  Weddings Documented
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="text-4xl md:text-5xl font-serif text-brand-gold block mb-1">
                  Worldwide
                </span>
                <span className="text-xs uppercase tracking-widest text-brand-cream/60 font-light block">
                  Destination Available
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <a href="#inquire" className="btn-solid-gold !py-3 !px-6 text-xs inline-flex items-center gap-2">
                <span>Hire Abu Toiab</span>
                <span>→</span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;