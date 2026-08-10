import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film } from 'lucide-react';

const DEFAULT_FILMS = [
  {
    _id: 'f1',
    title: 'A Forest Tale - Ryan & Sophia',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-kissing-in-a-forest-34354-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
    duration: '03:45',
    location: 'Sylhet Tea Estate'
  },
  {
    _id: 'f2',
    title: 'Echoes of Joy - Tanvir & Ayesha',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-and-walking-in-the-park-34351-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000',
    duration: '04:12',
    location: 'Dhaka Club'
  },
  {
    _id: 'f3',
    title: 'Golden Sunset Vows - Zarif & Maya',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-the-bride-and-groom-holding-each-other-34353-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000',
    duration: '02:50',
    location: 'Cox’s Bazar Beach'
  }
];

const Films = () => {
  const [films, setFilms] = useState(DEFAULT_FILMS);
  const [activeFilm, setActiveFilm] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/portfolio/videos');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setFilms(data);
          }
        }
      } catch (err) {
        console.log('Using default cinematic film reels');
      }
    };
    fetchVideos();
  }, []);

  return (
    <section id="films" className="py-24 lg:py-36 bg-brand-dark text-brand-cream relative border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-brand-gold font-light mb-3"
          >
            <Film className="w-3.5 h-3.5" /> Motion Pictures
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-light text-brand-cream leading-tight mb-6"
          >
            Cinematic Wedding Reels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-cream/70 font-sans font-light text-base md:text-lg leading-relaxed"
          >
            4K high-definition films woven with original soundscapes and emotional narratives.
          </motion.p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {films.map((film, index) => (
            <motion.div
              key={film._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveFilm(film)}
              className="group relative bg-brand-black border border-brand-gold/15 overflow-hidden cursor-pointer hover:border-brand-gold/50 transition-all duration-500 shadow-2xl flex flex-col"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={film.posterUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800'}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-95"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand-black/70 border border-brand-gold/50 backdrop-blur-md flex items-center justify-center text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500 shadow-2xl">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                {film.duration && (
                  <span className="absolute top-4 right-4 bg-brand-black/80 text-brand-cream/90 border border-brand-gold/30 text-[10px] tracking-widest px-2.5 py-1 rounded-sm backdrop-blur-md">
                    {film.duration}
                  </span>
                )}
              </div>

              {/* Card Meta Text */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold block mb-2 font-light">
                    {film.location || 'Wedding Cinema'}
                  </span>
                  <h3 className="text-xl font-serif text-brand-cream group-hover:text-brand-gold transition-colors font-light">
                    {film.title}
                  </h3>
                </div>

                <div className="mt-4 pt-4 border-t border-brand-gold/10 flex justify-between items-center text-xs text-brand-cream/60">
                  <span className="uppercase tracking-widest text-[10px]">Watch Trailer</span>
                  <span className="text-brand-gold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveFilm(null)}
            className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
          >
            {/* Close Modal */}
            <button
              onClick={() => setActiveFilm(null)}
              className="absolute top-6 right-6 text-brand-cream hover:text-brand-gold p-3 bg-brand-dark/80 rounded-full border border-brand-gold/30 transition-colors z-50"
              aria-label="Close Video"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-5xl aspect-video bg-black border border-brand-gold/30 shadow-2xl overflow-hidden rounded-sm"
            >
              <video
                src={activeFilm.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Films;
