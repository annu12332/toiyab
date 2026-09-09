import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Quote, Sparkles, Send, CheckCircle2, Image as ImageIcon, Calendar, MapPin, User, Camera } from 'lucide-react';
import getApiUrl from '../config/api';
import { uploadToCloudinary } from '../config/upload';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [coupleNames, setCoupleNames] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/portfolio/testimonials'));
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.log('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    setUploadProgress(10);
    try {
      const secureUrl = await uploadToCloudinary(file, (percent) => {
        setUploadProgress(percent);
      });
      setPhotoUrl(secureUrl);
    } catch (err) {
      console.error('Photo upload failed:', err);
      alert('Photo upload failed. You can also paste an image URL directly.');
    } finally {
      setUploadingPhoto(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coupleNames.trim() || !message.trim()) {
      setErrorMessage('Please enter your name and review message.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch(getApiUrl('/api/portfolio/testimonials'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coupleNames: coupleNames.trim(),
          message: message.trim(),
          rating: Number(rating) || 5,
          location: location.trim() || undefined,
          weddingDate: weddingDate.trim() || undefined,
          photoUrl: photoUrl.trim() || undefined
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to submit review');
      }

      const newReview = await res.json();
      setReviews([newReview, ...reviews]);
      setSubmitSuccess(true);
      setShowForm(false);

      // Reset form
      setCoupleNames('');
      setRating(5);
      setMessage('');
      setLocation('');
      setWeddingDate('');
      setPhotoUrl('');

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 7000);
    } catch (err) {
      setErrorMessage(err.message || 'Error submitting your review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-cream pt-28 pb-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-brand-gold font-light mb-3"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-brand-gold" /> Client Reflections
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-light text-brand-cream leading-tight mb-4"
          >
            Clients Review
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-6 h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-cream/70 font-sans font-light text-base md:text-lg leading-relaxed mb-8"
          >
            Words from cherished couples who trusted Abu Toiab to immortalize the emotions, intimacy, and grandeur of their celebration.
          </motion.p>

          {/* Action Button to Open Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (!showForm) {
                  setTimeout(() => {
                    document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              }}
              className="btn-solid-gold !py-3.5 !px-8 inline-flex items-center gap-2 shadow-2xl hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{showForm ? 'Close Review Form' : 'Write a Review / Share Your Story'}</span>
            </button>
          </motion.div>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-12 p-5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 flex items-center gap-3 backdrop-blur-md shadow-2xl"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-serif text-base text-emerald-300 font-medium">Thank You For Your Kind Words!</h4>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  Your review has been successfully published to our portfolio.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Submission Form Modal / Accordion */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              id="review-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto mb-20 bg-brand-dark/95 border border-brand-gold/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl"
            >
              <div className="text-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold block font-light mb-1">
                  Share Your Experience
                </span>
                <h3 className="text-2xl font-serif text-brand-cream font-light">
                  We Would Love Your Feedback
                </h3>
                <p className="text-xs text-brand-cream/60 mt-1 font-light">
                  Tell future couples about your experience working with Abu Toiab.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-3.5 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Couple / Client Name */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-cream/80 mb-2 font-light flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-gold" />
                    Your Name(s) / Couple Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={coupleNames}
                    onChange={(e) => setCoupleNames(e.target.value)}
                    placeholder="e.g. Sarah & Farhan"
                    className="w-full bg-brand-black/70 border border-brand-gold/25 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none placeholder:text-brand-cream/30"
                  />
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-cream/80 mb-2 font-light">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                        aria-label={`${star} star rating`}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            (hoverRating || rating) >= star
                              ? 'text-brand-gold fill-brand-gold'
                              : 'text-brand-cream/30'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-brand-gold ml-2">
                      {hoverRating || rating} of 5 Stars
                    </span>
                  </div>
                </div>

                {/* Location & Wedding Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/80 mb-2 font-light flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                      Wedding / Event Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Radisson Blu, Dhaka"
                      className="w-full bg-brand-black/70 border border-brand-gold/25 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none placeholder:text-brand-cream/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/80 mb-2 font-light flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      Event Date / Year
                    </label>
                    <input
                      type="text"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      placeholder="e.g. Winter 2024 / Nov 2024"
                      className="w-full bg-brand-black/70 border border-brand-gold/25 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none placeholder:text-brand-cream/30"
                    />
                  </div>
                </div>

                {/* Photo Upload or URL */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-cream/80 mb-2 font-light flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
                    Couple Photo (Optional)
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-brand-black/80 border border-brand-gold/30 hover:border-brand-gold text-brand-gold text-xs uppercase tracking-wider transition-colors">
                      <ImageIcon className="w-4 h-4" />
                      <span>{uploadingPhoto ? `Uploading (${uploadProgress}%)` : 'Upload From Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingPhoto}
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-brand-cream/40">or paste image URL:</span>
                    <input
                      type="text"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 w-full bg-brand-black/70 border border-brand-gold/25 text-brand-cream p-2.5 text-xs focus:border-brand-gold focus:outline-none placeholder:text-brand-cream/30"
                    />
                  </div>

                  {photoUrl && (
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={photoUrl}
                        alt="Preview"
                        className="w-12 h-12 rounded-full object-cover border border-brand-gold/50"
                      />
                      <span className="text-[11px] text-brand-gold">Photo attached successfully</span>
                      <button
                        type="button"
                        onClick={() => setPhotoUrl('')}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Review Message */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-cream/80 mb-2 font-light flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5 text-brand-gold" />
                    Your Review & Experience *
                  </label>
                  <textarea
                    rows="5"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write about your photography experience, the moments captured, responsiveness, or how comfortable you felt..."
                    className="w-full bg-brand-black/70 border border-brand-gold/25 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none placeholder:text-brand-cream/30 leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || uploadingPhoto}
                  className="btn-solid-gold w-full !py-3.5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em]"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Your Review...' : 'Publish My Review'}</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs uppercase tracking-widest text-brand-cream/50">Loading Client Reviews...</p>
          </div>
        )}

        {/* Reviews Grid */}
        {!loading && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((item, index) => {
              const stars = Number(item.rating) || 5;
              return (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
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
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="text-center py-20 px-6 bg-brand-dark/40 border border-brand-gold/15 max-w-xl mx-auto">
            <Heart className="w-10 h-10 text-brand-gold/60 mx-auto mb-4" />
            <h3 className="text-lg font-serif text-brand-cream mb-2">Be the First to Share Your Story</h3>
            <p className="text-xs text-brand-cream/60 max-w-md mx-auto mb-6 leading-relaxed">
              We take deep pride in every story we capture. Share your experience with Abu Toiab and inspire future couples.
            </p>
            <button
              onClick={() => {
                setShowForm(true);
                setTimeout(() => {
                  document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="btn-solid-gold !py-2.5 !px-6 text-xs"
            >
              Write First Review
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Reviews;
