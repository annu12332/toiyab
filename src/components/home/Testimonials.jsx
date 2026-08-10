import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';

const DEFAULT_TESTIMONIALS = [
  {
    _id: 't1',
    coupleNames: 'Sarah & Farhan',
    message: 'Toiyab didn’t just photograph our wedding; he captured the soul of our day. Looking through our album feels like reliving every single emotion all over again. He is a true master of fine art imagery.',
    weddingDate: 'December 2024',
    location: 'Radisson Blu Water Garden, Dhaka',
    photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400'
  },
  {
    _id: 't2',
    coupleNames: 'Nabila & Rahat',
    message: 'Working with Toiyab was effortlessly natural. We aren’t usually comfortable in front of the camera, but his quiet, warm presence put us at complete ease. The results blew our families away!',
    weddingDate: 'November 2024',
    location: 'Grand Sultan Tea Resort, Sylhet',
    photoUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400'
  },
  {
    _id: 't3',
    coupleNames: 'Anika & Shahriar',
    message: 'The cinematic film Toiyab produced for us brought tears to everyone’s eyes. The lighting, color grading, and soundtrack selection were unmatched in quality. Worth every single penny!',
    weddingDate: 'January 2025',
    location: 'InterContinental Dhaka',
    photoUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=400'
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/portfolio/testimonials');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch (err) {
        console.log('Using default love stories');
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-24 lg:py-36 bg-brand-dark text-brand-cream relative border-t border-brand-gold/10">
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
          {testimonials.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-brand-black border border-brand-gold/15 p-8 flex flex-col justify-between hover:border-brand-gold/40 transition-all duration-500 relative"
            >
              <Quote className="w-10 h-10 text-brand-gold/20 mb-6" />

              <p className="text-sm font-sans font-light text-brand-cream/80 italic leading-relaxed mb-8">
                "{item.message}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-brand-gold/10">
                {item.photoUrl && (
                  <img
                    src={item.photoUrl}
                    alt={item.coupleNames}
                    className="w-12 h-12 rounded-full object-cover border border-brand-gold/40"
                  />
                )}
                <div>
                  <h4 className="text-lg font-serif text-brand-cream font-light">
                    {item.coupleNames}
                  </h4>
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold block">
                    {item.location || item.weddingDate || 'Wedding Story'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
