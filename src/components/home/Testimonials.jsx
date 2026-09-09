import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote, Heart, Star, ArrowRight, PenLine } from 'lucide-react';
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
            Love Stories & Kind Words
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-brand-black border border-brand-gold/15 p-8 flex flex-col justify-between hover:border-brand-gold/40 transition-all duration-500 relative group shadow-xl hover:shadow-[0_12px_40px_-8px_rgba(212,175,55,0.15)]"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className={`w-3.5 h-3.5 ${
                            sIdx < stars ? 'text-brand-gold fill-brand-gold' : 'text-brand-cream/20'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors" />
                  </div>

                  <p className="text-sm font-sans font-light text-brand-cream/80 italic leading-relaxed mb-8">
                    "{item.message}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-brand-gold/10">
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.coupleNames}
                      className="w-12 h-12 rounded-full object-cover border border-brand-gold/40 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-brand-dark border border-brand-gold/30 flex items-center justify-center text-brand-gold font-serif text-sm font-light shrink-0">
                      {item.coupleNames?.charAt(0) || 'C'}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <h4 className="text-base font-serif text-brand-cream font-light truncate">
                      {item.coupleNames}
                    </h4>
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold block truncate">
                      {item.location || item.weddingDate || 'Wedding Story'}
                    </span>
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
