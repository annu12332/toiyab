import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote, Heart, Star, ArrowRight, PenLine, CheckCircle2, MapPin, Calendar, Camera, Sparkles } from 'lucide-react';
import getApiUrl from '../../config/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(getApiUrl('/api/portfolio/testimonials'));
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTestimonials(data);
          } else {
            setTestimonials([]);
          }
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-brand-dark text-brand-cream relative border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-brand-gold font-light mb-3"
          >
            <Heart className="w-3.5 h-3.5 fill-current" /> Kind Words
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-light text-brand-cream leading-tight mb-6"
          >
            Clients Review
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-cream/70 font-sans font-light text-base md:text-lg leading-relaxed"
          >
            Reflections from the wonderful couples who trusted us with their unforgettable moments.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((item, index) => {
            const stars = Number(item.rating) || 5;
            return (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between rounded-lg bg-gradient-to-b from-[#161410]/95 via-[#0e0d0b]/95 to-[#080807]/95 border border-brand-gold/20 hover:border-brand-gold/60 p-7 sm:p-8 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(201,162,75,0.22)] overflow-hidden"
              >
                {/* Top ambient gold glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-gold/20 group-hover:scale-125 transition-all duration-700" />
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent group-hover:via-brand-gold transition-all duration-700" />

                {/* Luxury Corner Viewfinder Brackets */}
                <span className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-brand-gold/40 pointer-events-none group-hover:border-brand-gold/80 transition-colors" />
                <span className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-brand-gold/40 pointer-events-none group-hover:border-brand-gold/80 transition-colors" />

                {/* Background decorative watermark quote mark */}
                <span className="absolute top-4 right-6 font-serif text-7xl text-brand-gold/[0.07] group-hover:text-brand-gold/[0.16] select-none pointer-events-none transition-colors duration-500 font-bold leading-none">
                  “
                </span>

                <div>
                  {/* Top Bar: Stars + Rating pill + Verified Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                    <div className="flex items-center gap-1.5 bg-brand-black/70 px-3 py-1.5 rounded-full border border-brand-gold/25 backdrop-blur-md">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <Star
                            key={sIdx}
                            className={`w-3.5 h-3.5 ${
                              sIdx < stars
                                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.65)]'
                                : 'text-brand-cream/20'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-medium text-brand-gold ml-1">
                        {stars.toFixed(1)}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] text-emerald-400/90 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Verified Story</span>
                    </div>
                  </div>

                  {/* Review Body */}
                  <div className="relative z-10 mb-8">
                    <p className="font-serif text-[15px] sm:text-[16px] text-brand-cream/90 font-light italic leading-relaxed tracking-wide group-hover:text-brand-cream transition-colors duration-300 pl-3 border-l-2 border-brand-gold/30 group-hover:border-brand-gold/70">
                      "{item.message}"
                    </p>
                  </div>
                </div>

                {/* Reviewer Details (Author Section) */}
                <div className="relative z-10 pt-5 border-t border-brand-gold/15 flex items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    {item.photoUrl ? (
                      <div className="relative shrink-0">
                        <img
                          src={item.photoUrl}
                          alt={item.coupleNames}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-gold/50 ring-offset-2 ring-offset-[#0d0c0a] shadow-md group-hover:ring-brand-gold transition-all duration-300"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-brand-gold rounded-full border-2 border-[#0d0c0a] flex items-center justify-center">
                          <Camera className="w-2 h-2 text-brand-black" />
                        </span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold/30 via-brand-dark to-brand-black border border-brand-gold/50 flex items-center justify-center text-brand-gold font-serif text-base font-medium shrink-0 shadow-md">
                        {item.coupleNames?.charAt(0) || 'C'}
                      </div>
                    )}

                    <div className="overflow-hidden">
                      <h4 className="text-base font-serif text-brand-cream font-light tracking-wide group-hover:text-brand-gold transition-colors duration-300 truncate">
                        {item.coupleNames}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-brand-cream/60 font-light mt-0.5">
                        {(item.location || item.weddingDate) ? (
                          <>
                            {item.location && (
                              <span className="inline-flex items-center gap-1 text-brand-gold/80 uppercase tracking-widest truncate">
                                <MapPin className="w-2.5 h-2.5 shrink-0 text-brand-gold" />
                                {item.location}
                              </span>
                            )}
                            {item.location && item.weddingDate && <span>•</span>}
                            {item.weddingDate && (
                              <span className="inline-flex items-center gap-1 text-brand-cream/50 tracking-wider truncate">
                                <Calendar className="w-2.5 h-2.5 shrink-0 text-brand-gold/60" />
                                {item.weddingDate}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-brand-gold/70 uppercase tracking-widest text-[9px]">
                            Wedding Client
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subtle decorative sparkles icon */}
                  <div className="shrink-0 w-8 h-8 rounded-full border border-brand-gold/20 bg-brand-gold/5 flex items-center justify-center text-brand-gold/60 group-hover:border-brand-gold/50 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-300">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {!loading && testimonials.length === 0 && (
          <div className="text-center py-16 px-4 bg-brand-black/40 border border-brand-gold/15 max-w-xl mx-auto mt-6">
            <Heart className="w-8 h-8 text-brand-gold/60 mx-auto mb-3" />
            <p className="text-sm font-serif text-brand-cream/80">No stories or reviews published yet.</p>
            <p className="text-xs text-brand-cream/50 mt-1 mb-6">Be the first to share your experience with Abu Toiab.</p>
            <Link
              to="/reviews"
              className="btn-solid-gold !py-2.5 !px-6 text-xs inline-flex items-center gap-2"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Leave a Review</span>
            </Link>
          </div>
        )}

        {/* Action Buttons */}
        {!loading && testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/reviews"
              className="btn-solid-gold inline-flex items-center gap-2 !py-3 !px-7 text-xs uppercase tracking-[0.2em]"
            >
              <PenLine className="w-4 h-4" />
              <span>Write a Review</span>
            </Link>

            <Link
              to="/reviews"
              className="btn-gold inline-flex items-center gap-2 !py-3 !px-7 text-xs uppercase tracking-[0.2em]"
            >
              <span>View All Client Stories ({testimonials.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
