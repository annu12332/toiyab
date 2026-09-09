import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Award } from 'lucide-react';
import getApiUrl from '../../config/api';

const Packages = ({ onSelectPackage }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(getApiUrl('/api/portfolio/packages'));
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPackages(data);
          } else {
            setPackages([]);
          }
        } else {
          setPackages([]);
        }
      } catch (err) {
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleSelect = (pkgName) => {
    if (onSelectPackage) {
      onSelectPackage(pkgName);
    }
    const inquireSection = document.getElementById('inquire');
    if (inquireSection) {
      inquireSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="investment" className="py-24 lg:py-36 bg-brand-black text-brand-cream relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-brand-gold font-light mb-3"
          >
            <Crown className="w-3.5 h-3.5" /> Pricing & Experience
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-light text-brand-cream leading-tight mb-6"
          >
            Investment Collections
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-cream/70 font-sans font-light text-base md:text-lg leading-relaxed"
          >
            Tailored visual experiences created to preserve your legacy for generations.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col justify-between p-8 lg:p-10 bg-brand-dark/90 border ${
                pkg.isPopular 
                  ? 'border-brand-gold shadow-2xl scale-105 bg-gradient-to-b from-brand-dark via-brand-dark to-brand-black' 
                  : 'border-brand-gold/20 hover:border-brand-gold/50'
              } transition-all duration-500`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-black px-4 py-1 text-[10px] uppercase tracking-[0.3em] font-medium shadow-lg inline-flex items-center gap-1.5">
                  <Award className="w-3 h-3" /> Most Requested
                </div>
              )}

              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-brand-gold block font-light mb-2">
                  Collection {index + 1}
                </span>
                <h3 className="text-2xl font-serif text-brand-cream mb-2 font-light">
                  {pkg.name}
                </h3>
                <p className="text-xs text-brand-cream/60 font-light mb-6 min-h-[36px]">
                  {pkg.subtitle || 'Custom tailored luxury wedding experience.'}
                </p>

                <div className="mb-8 pb-6 border-b border-brand-gold/15">
                  <span className="text-4xl lg:text-5xl font-serif text-brand-gold font-light">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-brand-cream/50 block mt-1 tracking-wider uppercase font-light">
                    Starting Investment
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-10">
                  {pkg.features && pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-brand-cream/80 font-light leading-relaxed">
                      <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelect(pkg.name)}
                className={`w-full text-center ${
                  pkg.isPopular ? 'btn-solid-gold' : 'btn-gold'
                }`}
              >
                Inquire For Dates
              </button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && packages.length === 0 && (
          <div className="text-center py-16 px-4 bg-brand-dark/40 border border-brand-gold/15 max-w-xl mx-auto mt-6">
            <Crown className="w-8 h-8 text-brand-gold/60 mx-auto mb-3" />
            <p className="text-sm font-serif text-brand-cream/80">Investment collections will be announced soon.</p>
            <p className="text-xs text-brand-cream/50 mt-1">Please inquire directly for bespoke wedding & event packages.</p>
          </div>
        )}

        <div className="mt-16 text-center text-xs uppercase tracking-widest text-brand-cream/50 font-light">
          * Custom destination wedding packages & hourly rates available upon request.
        </div>
      </div>
    </section>
  );
};

export default Packages;
