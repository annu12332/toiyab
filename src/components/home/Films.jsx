import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film, ArrowRight } from 'lucide-react';
import getApiUrl from '../../config/api';

const Films = ({ showViewAll = true }) => {
  const [films, setFilms] = useState([]);
  const [activeFilm, setActiveFilm] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(getApiUrl('/api/portfolio/videos'));
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setFilms(data);
          } else {
            setFilms([]);
          }
        }
      } catch (err) {
        console.log('Error fetching video reels');
        setFilms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    setVideoError(false);
  }, [activeFilm]);

  const displayFilms = showViewAll ? films.slice(0, 4) : films;

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const cleanUrl = url.trim();

    // YouTube Shorts
    if (cleanUrl.includes('youtube.com/shorts/')) {
      const id = cleanUrl.split('shorts/')[1]?.split('?')[0]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    // YouTube Watch
    if (cleanUrl.includes('youtube.com/watch')) {
      const match = cleanUrl.match(/[?&]v=([^&]+)/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
      }
    }
    // YouTube Shortlink (youtu.be)
    if (cleanUrl.includes('youtu.be/')) {
      const id = cleanUrl.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    // YouTube Embed
    if (cleanUrl.includes('youtube.com/embed/')) {
      return cleanUrl.includes('autoplay=1') ? cleanUrl : `${cleanUrl}?autoplay=1`;
    }
    // Vimeo
    if (cleanUrl.includes('vimeo.com/')) {
      const id = cleanUrl.split('vimeo.com/')[1]?.split('?')[0]?.split('&')[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    // Google Drive
    if (cleanUrl.includes('drive.google.com/file/d/')) {
      const id = cleanUrl.split('/d/')[1]?.split('/')[0];
      return `https://drive.google.com/file/d/${id}/preview`;
    }
    return null;
  };

  return (
    <section id="films" className="py-16 lg:py-24 bg-brand-dark text-brand-cream relative border-t border-brand-gold/10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-brand-gold/4 rounded-full blur-3xl pointer-events-none" />

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
            className="text-4xl md:text-6xl font-serif font-light text-brand-cream leading-tight mb-4"
          >
            Cinematic Wedding Reels
          </motion.h2>

          {/* Animated gold accent underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'center' }}
            className="mx-auto mb-6 h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
          />

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

        {/* Video Cards Grid - 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {displayFilms.map((film, index) => (
            <motion.div
              key={film._id || index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
              onClick={() => setActiveFilm(film)}
              className="group relative bg-brand-black border border-brand-gold/15 overflow-hidden cursor-pointer hover:border-brand-gold/50 transition-colors duration-500 shadow-2xl hover:shadow-[0_12px_40px_-8px_rgba(212,175,55,0.3)] flex flex-col rounded-sm"
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
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-brand-black/70 border border-brand-gold/50 backdrop-blur-md flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500 shadow-2xl"
                  >
                    <Play className="w-4 h-4 sm:w-6 sm:h-6 fill-current ml-0.5 sm:ml-1" />
                  </motion.div>
                </div>

                {/* Duration Badge */}
                {film.duration && (
                  <span className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-brand-black/80 text-brand-cream/90 border border-brand-gold/30 text-[8px] sm:text-[10px] tracking-widest px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-sm backdrop-blur-md">
                    {film.duration}
                  </span>
                )}

                {/* Gold shimmer scan line */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-brand-gold/8 to-transparent group-hover:translate-y-[200%] transition-transform duration-1000 ease-in-out" />
                </div>
              </div>

              {/* Card Meta Text */}
              <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-brand-gold block mb-1 font-light">
                    {film.location || 'Wedding Cinema'}
                  </span>
                  <h3 className="text-sm sm:text-xl font-serif text-brand-cream group-hover:text-brand-gold transition-colors font-light line-clamp-1">
                    {film.title}
                  </h3>
                </div>

                <div className="mt-3 sm:mt-4 pt-2 sm:pt-4 border-t border-brand-gold/10 flex justify-between items-center text-[10px] sm:text-xs text-brand-cream/60">
                  <span className="uppercase tracking-widest text-[8px] sm:text-[10px]">Watch Reel</span>
                  <span className="text-brand-gold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && films.length === 0 && (
          <div className="text-center py-16 px-4 bg-brand-black/40 border border-brand-gold/15 max-w-xl mx-auto mt-8">
            <Film className="w-8 h-8 text-brand-gold/60 mx-auto mb-3" />
            <p className="text-sm font-serif text-brand-cream/80">No cinematic video reels added yet.</p>
            <p className="text-xs text-brand-cream/50 mt-1">Publish wedding film reels from the Admin Dashboard.</p>
          </div>
        )}

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/videos"
              className="btn-gold inline-flex items-center gap-3 !py-3.5 !px-8 text-xs uppercase tracking-[0.25em] shadow-xl group relative overflow-hidden"
            >
              <span className="relative z-10">View All Cinematic Video Reels ({films.length})</span>
              <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform relative z-10" />
              {/* Button shimmer glint */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
            </Link>
          </motion.div>
        )}
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
              className="relative w-full max-w-5xl aspect-video bg-black border border-brand-gold/30 shadow-2xl overflow-hidden rounded-sm flex items-center justify-center"
            >
              {getEmbedUrl(activeFilm.videoUrl) ? (
                <iframe
                  src={getEmbedUrl(activeFilm.videoUrl)}
                  title={activeFilm.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : videoError || !activeFilm.videoUrl ? (
                <div className="p-8 text-center flex flex-col items-center justify-center gap-4 text-brand-cream">
                  <div className="w-16 h-16 rounded-full bg-brand-dark/90 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                    <Film className="w-8 h-8 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif text-brand-gold mb-1">Video Stream Unavailable</h4>
                    <p className="text-xs text-brand-cream/70 max-w-md mx-auto">
                      This video link is expired or invalid. Please update this video item in Admin Dashboard with a valid YouTube link or MP4 URL.
                    </p>
                  </div>
                  {activeFilm.videoUrl && (
                    <a
                      href={activeFilm.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold !py-2 !px-4 !text-xs mt-2"
                    >
                      Open Video Link Directly
                    </a>
                  )}
                </div>
              ) : (
                <video
                  src={activeFilm.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Films;
