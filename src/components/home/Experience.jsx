import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, Sparkles } from 'lucide-react';
import getApiUrl from '../../config/api';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch(getApiUrl('/api/portfolio/experiences'));
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setExperiences(data);
          } else {
            setExperiences([]);
          }
        } else {
          setExperiences([]);
        }
      } catch (err) {
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-16 lg:py-20 bg-brand-black text-brand-cream relative overflow-hidden">
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 border border-brand-gold/30 rounded-full bg-brand-dark/50 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-light">
              Career & Industry Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-brand-cream tracking-tight"
          >
            Professional Experience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.35 }}
            className="text-sm sm:text-base text-brand-cream/70 font-sans font-light mt-4 max-w-xl mx-auto"
          >
            Over 8+ years collaborating with leading wedding media studios, creative agencies, and fine-art productions worldwide.
          </motion.p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((item, index) => {
            const logo = item.companyLogo || item.logoUrl || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=200';
            
            return (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group relative bg-brand-dark/80 border border-brand-gold/20 hover:border-brand-gold/60 p-8 transition-all duration-500 hover:-translate-y-1.5 shadow-xl backdrop-blur-sm flex flex-col justify-between"
              >
                {/* Viewfinder corner ticks on card */}
                <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-brand-gold/40 group-hover:border-brand-gold transition-colors" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-brand-gold/40 group-hover:border-brand-gold transition-colors" />
                <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-brand-gold/40 group-hover:border-brand-gold transition-colors" />
                <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-brand-gold/40 group-hover:border-brand-gold transition-colors" />

                <div>
                  {/* Top Bar: Company Logo & Duration Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Logo Ring Frame */}
                    <div className="relative w-14 h-14 rounded-full border border-brand-gold/40 p-1 group-hover:scale-105 transition-transform duration-300 bg-brand-black shrink-0">
                      <img
                        src={logo}
                        alt={item.companyName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>

                    {/* Duration Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-light tracking-wide rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.duration || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold/80 font-light mb-1">
                    <Building2 className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{item.companyName}</span>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-xl font-serif font-normal text-brand-cream mb-4 group-hover:text-brand-gold transition-colors">
                    {item.role}
                  </h3>

                  {/* Short Details */}
                  {item.shortDetails && (
                    <p className="text-sm font-sans text-brand-cream/70 font-light leading-relaxed mb-6">
                      {item.shortDetails}
                    </p>
                  )}
                </div>

                {/* Bottom Decorative Line */}
                <div className="w-full h-[1px] bg-gradient-to-r from-brand-gold/40 via-brand-gold/10 to-transparent pt-2" />
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {!loading && experiences.length === 0 && (
          <div className="text-center py-16 px-4 bg-brand-dark/40 border border-brand-gold/15 max-w-xl mx-auto mt-4">
            <Briefcase className="w-8 h-8 text-brand-gold/60 mx-auto mb-3" />
            <p className="text-sm font-serif text-brand-cream/80">No experience items added yet.</p>
            <p className="text-xs text-brand-cream/50 mt-1">Manage career journey from the Admin Dashboard.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;
