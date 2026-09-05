import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, ArrowRight } from 'lucide-react';
import getApiUrl from '../../config/api';

const DEFAULT_GALLERY = [
  {
    _id: 'g1',
    title: 'The Eternal Vows',
    category: 'Weddings',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    aspect: 'aspect-[4/5]'
  },
  {
    _id: 'g2',
    title: 'Golden Sunset Romance',
    category: 'Pre-Wedding',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200',
    aspect: 'aspect-[3/4]'
  },
  {
    _id: 'g3',
    title: 'Royalty in Emerald',
    category: 'Portraits',
    url: 'https://images.unsplash.com/photo-1544168190-79c15427015f?q=80&w=1200',
    aspect: 'aspect-[4/5]'
  },
  {
    _id: 'g4',
    title: 'Whispering Promises',
    category: 'Ceremony',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200',
    aspect: 'aspect-[16/10]'
  },
  {
    _id: 'g5',
    title: 'The First Waltz',
    category: 'Weddings',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200',
    aspect: 'aspect-[4/5]'
  },
  {
    _id: 'g6',
    title: 'Heirloom Jewels & Ring',
    category: 'Ceremony',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200',
    aspect: 'aspect-[1/1]'
  },
  {
    _id: 'g7',
    title: 'Serenade at Dusk',
    category: 'Pre-Wedding',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200',
    aspect: 'aspect-[4/5]'
  },
  {
    _id: 'g8',
    title: 'Bridal Grace',
    category: 'Portraits',
    url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200',
    aspect: 'aspect-[3/4]'
  }
];

const CATEGORIES = ['All', 'Weddings', 'Pre-Wedding', 'Ceremony', 'Portraits'];

const Gallery = ({ showViewAll = true }) => {
  const [items, setItems] = useState(DEFAULT_GALLERY);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(getApiUrl('/api/portfolio/images'));
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setItems(data);
          }
        }
      } catch (err) {
        console.log('Using default gallery visuals');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => (item.category || 'Weddings').toLowerCase() === activeCategory.toLowerCase());

  const displayItems = showViewAll ? filteredItems.slice(0, 4) : filteredItems;

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
    }),
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-brand-black text-brand-cream relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-brand-gold font-light mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" /> Selected Works
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-light text-brand-cream leading-tight mb-4"
          >
            The Photography Portfolio
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
            A curated portfolio of emotional storytelling, heirloom portraits, and authentic wedding moments.
          </motion.p>

          {/* Category Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.25em] transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-gold text-brand-black font-medium shadow-lg shadow-brand-gold/20'
                    : 'bg-brand-dark/80 text-brand-cream/70 border border-brand-gold/20 hover:border-brand-gold/60 hover:text-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Gallery Grid - 2 Columns on Mobile, 4 Columns on Desktop */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <AnimatePresence>
            {displayItems.map((item, index) => (
              <motion.div
                key={item._id || index}
                layout
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
                onClick={() => setSelectedImageIndex(index)}
                className="group relative overflow-hidden bg-brand-dark cursor-pointer border border-brand-gold/10 hover:border-brand-gold/50 transition-colors duration-500 shadow-xl hover:shadow-[0_12px_40px_-8px_rgba(212,175,55,0.3)] rounded-sm"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Subtle Hover & Mobile Gradient Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-3 sm:p-6">
                  <div className="self-end hidden sm:block">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-black/60 backdrop-blur-md border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                      <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-brand-gold block mb-0.5 sm:mb-1">
                      {item.category || 'Weddings'}
                    </span>
                    <h3 className="text-sm sm:text-xl font-serif text-brand-cream font-light line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Gold shimmer scan line on hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm">
                  <div className="absolute -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-brand-gold/8 to-transparent group-hover:translate-y-[200%] transition-transform duration-1000 ease-in-out" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/images"
              className="btn-gold inline-flex items-center gap-3 !py-3.5 !px-8 text-xs uppercase tracking-[0.25em] shadow-xl group relative overflow-hidden"
            >
              <span className="relative z-10">View All Photos ({items.length})</span>
              <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform relative z-10" />
              {/* Button shimmer glint */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 text-brand-cream/80 hover:text-brand-gold p-3 bg-brand-dark/80 rounded-full border border-brand-gold/30 transition-colors z-50"
              aria-label="Close Preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-brand-cream/80 hover:text-brand-gold p-3 bg-brand-dark/80 rounded-full border border-brand-gold/30 transition-colors z-50"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-brand-cream/80 hover:text-brand-gold p-3 bg-brand-dark/80 rounded-full border border-brand-gold/30 transition-colors z-50"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Modal Image Container */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              <img
                src={filteredItems[selectedImageIndex].url}
                alt={filteredItems[selectedImageIndex].title}
                className="max-w-full max-h-[75vh] object-contain border border-brand-gold/20 shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-brand-gold block mb-1">
                  {filteredItems[selectedImageIndex].category || 'Weddings'}
                </span>
                <h3 className="text-2xl font-serif text-brand-cream">
                  {filteredItems[selectedImageIndex].title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
