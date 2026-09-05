import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sliders, Image as ImageIcon, Video as VideoIcon, Heart, Inbox, LogOut, Plus, Trash2, CheckCircle, Clock, Sparkles, Briefcase, Building2, Edit, Film, Play } from 'lucide-react';
import getApiUrl from '../config/api';
import MediaUploadInput from '../components/common/MediaUploadInput';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('settings'); // 'settings', 'gallery', 'films', 'stories', 'experience', 'inquiries'

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroVideoUrl: '',
    heroImageUrl: '',
    profileImageUrl: '',
    photographerName: '',
    whatsappNumber: '',
    facebookUrl: '',
    instagramUrl: '',
    aboutText: '',
    aboutPhotoUrl: '',
    yearsExperience: 8,
    weddingsShot: 150
  });
  const [settingsMsg, setSettingsMsg] = useState('');

  // Experience Form State
  const [expForm, setExpForm] = useState({
    companyName: '',
    companyLogo: '',
    role: '',
    duration: '',
    shortDetails: ''
  });
  const [expMsg, setExpMsg] = useState('');

  // Photo Form State (for Gallery)
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Weddings');
  const [photoMsg, setPhotoMsg] = useState('');

  // Film / Video Reel Form State
  const [filmForm, setFilmForm] = useState({
    title: '',
    videoUrl: '',
    posterUrl: '',
    duration: '',
    location: ''
  });
  const [filmMsg, setFilmMsg] = useState('');

  // Story / Testimonial Form State
  const [storyForm, setStoryForm] = useState({
    coupleNames: '',
    message: '',
    weddingDate: '',
    location: '',
    photoUrl: ''
  });
  const [storyMsg, setStoryMsg] = useState('');

  // Data Collections State
  const [experiences, setExperiences] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const info = localStorage.getItem('adminInfo');
    if (!info) {
      navigate('/admin');
    } else {
      setAdminInfo(JSON.parse(info));
      fetchAllData();
    }
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Settings
      const setRes = await fetch(getApiUrl('/api/portfolio/settings'));
      if (setRes.ok) {
        const setObj = await setRes.json();
        setSettingsForm({
          heroTitle: setObj.heroTitle || 'Timeless Love,\nCaptured Beautifully.',
          heroSubtitle: setObj.heroSubtitle || 'Exclusive wedding photography & cinematography preserving your story with timeless elegance.',
          heroVideoUrl: setObj.heroVideoUrl || '',
          heroImageUrl: setObj.heroImageUrl || '',
          profileImageUrl: setObj.profileImageUrl || '',
          photographerName: setObj.photographerName || 'Abu Toiab',
          whatsappNumber: setObj.whatsappNumber || '+8801700000000',
          facebookUrl: setObj.facebookUrl || 'https://facebook.com',
          instagramUrl: setObj.instagramUrl || 'https://instagram.com',
          aboutText: setObj.aboutText || '',
          aboutPhotoUrl: setObj.aboutPhotoUrl || '',
          yearsExperience: setObj.yearsExperience || 8,
          weddingsShot: setObj.weddingsShot || 150
        });
      }

      // Experiences
      const expRes = await fetch(getApiUrl('/api/portfolio/experiences'));
      if (expRes.ok) {
        const expData = await expRes.json();
        setExperiences(expData);
      }

      // Images
      const imgRes = await fetch(getApiUrl('/api/portfolio/images'));
      if (imgRes.ok) {
        const imgData = await imgRes.json();
        setImages(imgData);
      }

      // Videos / Films
      const vidRes = await fetch(getApiUrl('/api/portfolio/videos'));
      if (vidRes.ok) {
        const vidData = await vidRes.json();
        setVideos(vidData);
      }

      // Testimonials / Stories
      const testRes = await fetch(getApiUrl('/api/portfolio/testimonials'));
      if (testRes.ok) {
        const testData = await testRes.json();
        setTestimonials(testData);
      }

      // Inquiries
      const inqRes = await fetch(getApiUrl('/api/portfolio/inquiries'), {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('adminInfo'))?.token}` }
      });
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData);
      }
    } catch (err) {
      console.log('Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setSettingsMsg('');
    try {
      const res = await fetch(getApiUrl('/api/portfolio/settings'), {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        setSettingsMsg('Site settings updated successfully!');
      } else {
        setSettingsMsg('Failed to update settings.');
      }
    } catch (err) {
      setSettingsMsg('Settings updated (offline mode).');
    }
  };

  // Photo Handlers
  const handleAddPhoto = async (e) => {
    e.preventDefault();
    setPhotoMsg('');
    try {
      const res = await fetch(getApiUrl('/api/portfolio/images'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify({ title: photoTitle, url: photoUrl, category: photoCategory })
      });

      if (res.ok) {
        const newItem = await res.json();
        setImages([newItem, ...images]);
        setPhotoMsg('Photo added successfully!');
        setPhotoTitle('');
        setPhotoUrl('');
      } else {
        setPhotoMsg('Failed to add photo.');
      }
    } catch (err) {
      setPhotoMsg('Photo saved locally in preview mode.');
      const demoItem = { _id: Date.now().toString(), title: photoTitle, url: photoUrl, category: photoCategory };
      setImages([demoItem, ...images]);
      setPhotoTitle('');
      setPhotoUrl('');
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await fetch(getApiUrl(`/api/portfolio/images/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
    } catch (err) {}
    setImages(images.filter(img => img._id !== id));
  };

  // Film / Reel Handlers
  const handleAddFilm = async (e) => {
    e.preventDefault();
    setFilmMsg('');
    try {
      const res = await fetch(getApiUrl('/api/portfolio/videos'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify(filmForm)
      });

      if (res.ok) {
        const newFilm = await res.json();
        setVideos([newFilm, ...videos]);
        setFilmMsg('Cinematic Video Reel added successfully!');
        setFilmForm({ title: '', videoUrl: '', posterUrl: '', duration: '', location: '' });
      } else {
        setFilmMsg('Failed to add video reel.');
      }
    } catch (err) {
      const demoFilm = { ...filmForm, _id: Date.now().toString() };
      setVideos([demoFilm, ...videos]);
      setFilmMsg('Video reel saved locally in preview mode.');
      setFilmForm({ title: '', videoUrl: '', posterUrl: '', duration: '', location: '' });
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!window.confirm('Delete this video reel?')) return;
    try {
      await fetch(getApiUrl(`/api/portfolio/videos/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
    } catch (err) {}
    setVideos(videos.filter(vid => vid._id !== id));
  };

  // Story / Testimonial Handlers
  const handleAddStory = async (e) => {
    e.preventDefault();
    setStoryMsg('');
    try {
      const res = await fetch(getApiUrl('/api/portfolio/testimonials'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify(storyForm)
      });

      if (res.ok) {
        const newStory = await res.json();
        setTestimonials([newStory, ...testimonials]);
        setStoryMsg('Love Story added successfully!');
        setStoryForm({ coupleNames: '', message: '', weddingDate: '', location: '', photoUrl: '' });
      } else {
        setStoryMsg('Failed to add love story.');
      }
    } catch (err) {
      const demoStory = { ...storyForm, _id: Date.now().toString() };
      setTestimonials([demoStory, ...testimonials]);
      setStoryMsg('Love story saved locally in preview mode.');
      setStoryForm({ coupleNames: '', message: '', weddingDate: '', location: '', photoUrl: '' });
    }
  };

  const handleDeleteStory = async (id) => {
    if (!window.confirm('Delete this love story entry?')) return;
    try {
      await fetch(getApiUrl(`/api/portfolio/testimonials/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
    } catch (err) {}
    setTestimonials(testimonials.filter(t => t._id !== id));
  };

  // Experience Handlers
  const handleAddExperience = async (e) => {
    e.preventDefault();
    setExpMsg('');
    try {
      const res = await fetch(getApiUrl('/api/portfolio/experiences'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify(expForm)
      });

      if (res.ok) {
        const newExp = await res.json();
        setExperiences([newExp, ...experiences]);
        setExpMsg('Experience item added successfully!');
        setExpForm({ companyName: '', companyLogo: '', role: '', duration: '', shortDetails: '' });
      } else {
        setExpMsg('Failed to add experience item.');
      }
    } catch (err) {
      const demoExp = { ...expForm, _id: Date.now().toString() };
      setExperiences([demoExp, ...experiences]);
      setExpMsg('Experience added locally in preview mode.');
      setExpForm({ companyName: '', companyLogo: '', role: '', duration: '', shortDetails: '' });
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await fetch(getApiUrl(`/api/portfolio/experiences/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
    } catch (err) {}
    setExperiences(experiences.filter(exp => exp._id !== id));
  };

  // Inquiry Handlers
  const handleToggleInquiry = async (id) => {
    try {
      await fetch(getApiUrl(`/api/portfolio/inquiries/${id}`), {
        method: 'PUT',
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
    } catch (err) {}
    setInquiries(inquiries.map(inq => {
      if (inq._id === id) {
        return { ...inq, status: inq.status === 'new' ? 'contacted' : 'new' };
      }
      return inq;
    }));
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await fetch(getApiUrl(`/api/portfolio/inquiries/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
    } catch (err) {}
    setInquiries(inquiries.filter(inq => inq._id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  if (!adminInfo) return null;

  return (
    <div className="min-h-screen bg-brand-black text-brand-cream pt-28 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-brand-gold/20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-light block mb-1">
              CMS Control Panel
            </span>
            <h1 className="text-3xl lg:text-4xl font-serif font-light text-brand-cream">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-brand-cream/60">
              Logged in as <strong className="text-brand-gold font-normal">{adminInfo.username || 'Admin'}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="btn-gold !py-2 !px-4 !text-[10px] flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-brand-gold/15 pb-4">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-light flex items-center gap-2 transition-all ${
              activeTab === 'settings'
                ? 'bg-brand-gold text-brand-black font-medium'
                : 'bg-brand-dark/80 text-brand-cream/70 border border-brand-gold/20 hover:text-brand-gold'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Site Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-light flex items-center gap-2 transition-all ${
              activeTab === 'gallery'
                ? 'bg-brand-gold text-brand-black font-medium'
                : 'bg-brand-dark/80 text-brand-cream/70 border border-brand-gold/20 hover:text-brand-gold'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Manage Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('films')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-light flex items-center gap-2 transition-all ${
              activeTab === 'films'
                ? 'bg-brand-gold text-brand-black font-medium'
                : 'bg-brand-dark/80 text-brand-cream/70 border border-brand-gold/20 hover:text-brand-gold'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Films & Video Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-light flex items-center gap-2 transition-all ${
              activeTab === 'stories'
                ? 'bg-brand-gold text-brand-black font-medium'
                : 'bg-brand-dark/80 text-brand-cream/70 border border-brand-gold/20 hover:text-brand-gold'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Love Stories</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-light flex items-center gap-2 transition-all ${
              activeTab === 'experience'
                ? 'bg-brand-gold text-brand-black font-medium'
                : 'bg-brand-dark/80 text-brand-cream/70 border border-brand-gold/20 hover:text-brand-gold'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage Experience</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-light flex items-center gap-2 transition-all ${
              activeTab === 'inquiries'
                ? 'bg-brand-gold text-brand-black font-medium'
                : 'bg-brand-dark/80 text-brand-cream/70 border border-brand-gold/20 hover:text-brand-gold'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Client Inquiries ({inquiries.filter(i => i.status === 'new').length})</span>
          </button>
        </div>

        {/* TAB 1: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl">
            <div className="bg-brand-dark/90 border border-brand-gold/20 p-8 shadow-2xl">
              <h2 className="text-2xl font-serif text-brand-cream mb-6 flex items-center gap-2 font-light">
                <Sparkles className="w-5 h-5 text-brand-gold" />
                Hero & Profile Customization
              </h2>

              {settingsMsg && (
                <div className="p-3 mb-6 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-xs">
                  {settingsMsg}
                </div>
              )}

              <form onSubmit={handleUpdateSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Photographer Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.photographerName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, photographerName: e.target.value })}
                      placeholder="e.g. Abu Toiab"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      WhatsApp Phone Number
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      placeholder="e.g. +8801700000000"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={settingsForm.heroTitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Facebook Profile/Page URL
                    </label>
                    <input
                      type="url"
                      value={settingsForm.facebookUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                      placeholder="https://facebook.com/yourprofile"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      value={settingsForm.instagramUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/yourprofile"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MediaUploadInput
                    label="Hero Background Image"
                    value={settingsForm.heroImageUrl}
                    onChange={(newUrl) => setSettingsForm({ ...settingsForm, heroImageUrl: newUrl })}
                    placeholder="Upload image file or paste URL..."
                    accept="image/*"
                    mediaType="image"
                  />

                  <MediaUploadInput
                    label="Hero Background Video (MP4)"
                    value={settingsForm.heroVideoUrl}
                    onChange={(newUrl) => setSettingsForm({ ...settingsForm, heroVideoUrl: newUrl })}
                    placeholder="Upload video file or paste MP4 link..."
                    accept="video/*"
                    mediaType="video"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MediaUploadInput
                    label="Hero Profile Photo"
                    value={settingsForm.profileImageUrl}
                    onChange={(newUrl) => setSettingsForm({ ...settingsForm, profileImageUrl: newUrl })}
                    placeholder="Upload profile photo file or paste URL..."
                    accept="image/*"
                    mediaType="image"
                  />

                  <MediaUploadInput
                    label="About Portrait Photo"
                    value={settingsForm.aboutPhotoUrl}
                    onChange={(newUrl) => setSettingsForm({ ...settingsForm, aboutPhotoUrl: newUrl })}
                    placeholder="Upload portrait photo file or paste URL..."
                    accept="image/*"
                    mediaType="image"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                    Hero Subtitle
                  </label>
                  <textarea
                    rows="2"
                    value={settingsForm.heroSubtitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                    className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                    About / Story Text
                  </label>
                  <textarea
                    rows="4"
                    value={settingsForm.aboutText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aboutText: e.target.value })}
                    className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <button type="submit" className="btn-solid-gold w-full !py-3.5">
                  Save Site Settings
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* TAB 2: MANAGE GALLERY (PHOTOS) */}
        {activeTab === 'gallery' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="bg-brand-dark/90 border border-brand-gold/20 p-8 shadow-2xl max-w-4xl">
              <h2 className="text-2xl font-serif text-brand-cream mb-6 flex items-center gap-2 font-light">
                <Plus className="w-5 h-5 text-brand-gold" />
                Add New Photography Image
              </h2>

              {photoMsg && (
                <div className="p-3 mb-6 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-xs">
                  {photoMsg}
                </div>
              )}

              <form onSubmit={handleAddPhoto} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Photo Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      placeholder="e.g. Fine Art Bridal Portrait"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Category *
                    </label>
                    <select
                      value={photoCategory}
                      onChange={(e) => setPhotoCategory(e.target.value)}
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    >
                      <option value="Weddings">Weddings</option>
                      <option value="Pre-Wedding">Pre-Wedding</option>
                      <option value="Ceremony">Ceremony</option>
                      <option value="Portraits">Portraits</option>
                    </select>
                  </div>
                </div>

                <MediaUploadInput
                  label="Photo Image File / URL *"
                  required
                  value={photoUrl}
                  onChange={(newUrl) => setPhotoUrl(newUrl)}
                  placeholder="Upload image file or paste photo URL..."
                  accept="image/*"
                  mediaType="image"
                />

                <button type="submit" className="btn-solid-gold w-full !py-3">
                  Upload Photo To Portfolio
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-serif text-brand-cream mb-4 font-light">
                Photography Gallery Items ({images.length})
              </h3>
              {images.length === 0 ? (
                <div className="p-8 text-center bg-brand-dark/60 border border-brand-gold/15 text-brand-cream/60">
                  No photography items uploaded yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {images.map((img) => (
                    <div key={img._id} className="bg-brand-dark border border-brand-gold/20 p-3 relative group flex flex-col justify-between">
                      <div>
                        <img src={img.url} alt={img.title} className="w-full h-40 object-cover mb-2" />
                        <span className="text-[10px] uppercase tracking-widest text-brand-gold block">{img.category}</span>
                        <h4 className="text-sm font-serif text-brand-cream truncate">{img.title}</h4>
                      </div>
                      <button
                        onClick={() => handleDeleteImage(img._id)}
                        className="mt-3 text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 border-t border-brand-gold/10 pt-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Photo
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: MANAGE FILMS & VIDEO REELS */}
        {activeTab === 'films' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="bg-brand-dark/90 border border-brand-gold/20 p-8 shadow-2xl max-w-4xl">
              <h2 className="text-2xl font-serif text-brand-cream mb-6 flex items-center gap-2 font-light">
                <Plus className="w-5 h-5 text-brand-gold" />
                Add New Cinematic Film / Video Reel
              </h2>

              {filmMsg && (
                <div className="p-3 mb-6 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-xs">
                  {filmMsg}
                </div>
              )}

              <form onSubmit={handleAddFilm} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Film Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={filmForm.title}
                      onChange={(e) => setFilmForm({ ...filmForm, title: e.target.value })}
                      placeholder="e.g. A Forest Tale - Ryan & Sophia"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Duration (e.g. 03:45)
                    </label>
                    <input
                      type="text"
                      value={filmForm.duration}
                      onChange={(e) => setFilmForm({ ...filmForm, duration: e.target.value })}
                      placeholder="e.g. 04:12"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Location / Venue
                    </label>
                    <input
                      type="text"
                      value={filmForm.location}
                      onChange={(e) => setFilmForm({ ...filmForm, location: e.target.value })}
                      placeholder="e.g. Sylhet Tea Estate"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MediaUploadInput
                    label="Video MP4 File / Link *"
                    required
                    value={filmForm.videoUrl}
                    onChange={(newUrl) => setFilmForm({ ...filmForm, videoUrl: newUrl })}
                    placeholder="Upload video file or paste MP4 link..."
                    accept="video/*"
                    mediaType="video"
                  />

                  <MediaUploadInput
                    label="Thumbnail Poster Image"
                    value={filmForm.posterUrl}
                    onChange={(newUrl) => setFilmForm({ ...filmForm, posterUrl: newUrl })}
                    placeholder="Upload thumbnail image or paste URL..."
                    accept="image/*"
                    mediaType="image"
                  />
                </div>

                <button type="submit" className="btn-solid-gold w-full !py-3">
                  Publish Video Reel To Portfolio
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-serif text-brand-cream mb-4 font-light flex items-center gap-2">
                <Film className="w-5 h-5 text-brand-gold" />
                Existing Cinematic Video Reels ({videos.length})
              </h3>
              {videos.length === 0 ? (
                <div className="p-8 text-center bg-brand-dark/60 border border-brand-gold/15 text-brand-cream/60">
                  No video reels added yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {videos.map((vid) => (
                    <div key={vid._id} className="bg-brand-dark border border-brand-gold/20 p-4 flex flex-col justify-between">
                      <div>
                        {vid.posterUrl ? (
                          <div className="relative aspect-video overflow-hidden mb-3 bg-black">
                            <img src={vid.posterUrl} alt={vid.title} className="w-full h-full object-cover" />
                            {vid.duration && (
                              <span className="absolute top-2 right-2 bg-black/80 text-brand-gold text-[10px] px-2 py-0.5 font-mono">
                                {vid.duration}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="aspect-video bg-brand-black flex items-center justify-center mb-3 border border-brand-gold/10">
                            <VideoIcon className="w-8 h-8 text-brand-gold/40" />
                          </div>
                        )}
                        <span className="text-[10px] uppercase tracking-widest text-brand-gold block mb-1">
                          {vid.location || 'Wedding Cinema'}
                        </span>
                        <h4 className="text-base font-serif text-brand-cream font-medium mb-1">{vid.title}</h4>
                        <p className="text-xs text-brand-cream/50 truncate mb-3">{vid.videoUrl}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteVideo(vid._id)}
                        className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 pt-3 border-t border-brand-gold/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Reel
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 4: MANAGE LOVE STORIES (TESTIMONIALS) */}
        {activeTab === 'stories' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="bg-brand-dark/90 border border-brand-gold/20 p-8 shadow-2xl max-w-4xl">
              <h2 className="text-2xl font-serif text-brand-cream mb-6 flex items-center gap-2 font-light">
                <Plus className="w-5 h-5 text-brand-gold" />
                Add New Couple Love Story / Review
              </h2>

              {storyMsg && (
                <div className="p-3 mb-6 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-xs">
                  {storyMsg}
                </div>
              )}

              <form onSubmit={handleAddStory} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Couple Names *
                    </label>
                    <input
                      type="text"
                      required
                      value={storyForm.coupleNames}
                      onChange={(e) => setStoryForm({ ...storyForm, coupleNames: e.target.value })}
                      placeholder="e.g. Sarah & Farhan"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Wedding Date / Location
                    </label>
                    <input
                      type="text"
                      value={storyForm.location}
                      onChange={(e) => setStoryForm({ ...storyForm, location: e.target.value })}
                      placeholder="e.g. Radisson Blu Water Garden, Dhaka"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <MediaUploadInput
                  label="Couple Photo Image"
                  value={storyForm.photoUrl}
                  onChange={(newUrl) => setStoryForm({ ...storyForm, photoUrl: newUrl })}
                  placeholder="Upload photo file or paste image URL..."
                  accept="image/*"
                  mediaType="image"
                />

                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                    Testimonial / Kind Words Message *
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={storyForm.message}
                    onChange={(e) => setStoryForm({ ...storyForm, message: e.target.value })}
                    placeholder="Enter couple's testimonial or review text..."
                    className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <button type="submit" className="btn-solid-gold w-full !py-3">
                  Publish Story To Website
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-serif text-brand-cream mb-4 font-light flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-gold" />
                Published Love Stories ({testimonials.length})
              </h3>
              {testimonials.length === 0 ? (
                <div className="p-8 text-center bg-brand-dark/60 border border-brand-gold/15 text-brand-cream/60">
                  No love stories added yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((t) => (
                    <div key={t._id} className="bg-brand-dark border border-brand-gold/20 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          {t.photoUrl && (
                            <img
                              src={t.photoUrl}
                              alt={t.coupleNames}
                              className="w-10 h-10 rounded-full object-cover border border-brand-gold/40 shrink-0"
                            />
                          )}
                          <div>
                            <h4 className="text-base font-serif text-brand-cream font-medium">{t.coupleNames}</h4>
                            <span className="text-[10px] uppercase tracking-widest text-brand-gold block">
                              {t.location || t.weddingDate || 'Wedding Story'}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-brand-cream/80 italic leading-relaxed mb-4">
                          "{t.message}"
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteStory(t._id)}
                        className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 pt-3 border-t border-brand-gold/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Story
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 5: MANAGE EXPERIENCE */}
        {activeTab === 'experience' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 max-w-5xl">
            <div className="bg-brand-dark/90 border border-brand-gold/20 p-8 shadow-2xl">
              <h2 className="text-2xl font-serif text-brand-cream mb-6 flex items-center gap-2 font-light">
                <Plus className="w-5 h-5 text-brand-gold" />
                Add New Professional Experience
              </h2>

              {expMsg && (
                <div className="p-3 mb-6 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-xs">
                  {expMsg}
                </div>
              )}

              <form onSubmit={handleAddExperience} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Company / Studio Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.companyName}
                      onChange={(e) => setExpForm({ ...expForm, companyName: e.target.value })}
                      placeholder="e.g. Vogue Visuals Studio"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <MediaUploadInput
                    label="Company Logo"
                    required
                    value={expForm.companyLogo}
                    onChange={(newUrl) => setExpForm({ ...expForm, companyLogo: newUrl })}
                    placeholder="Upload logo file or paste image URL..."
                    accept="image/*"
                    mediaType="image"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Role / Position *
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.role}
                      onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                      placeholder="e.g. Lead Fine Art Photographer"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Duration / Months *
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.duration}
                      onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                      placeholder="e.g. 24 Months  OR  Jan 2022 - Present"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                    Short Details / Summary
                  </label>
                  <textarea
                    rows="3"
                    value={expForm.shortDetails}
                    onChange={(e) => setExpForm({ ...expForm, shortDetails: e.target.value })}
                    placeholder="Brief description of key roles, achievements, or photography style..."
                    className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <button type="submit" className="btn-solid-gold w-full !py-3.5">
                  Save & Publish Experience
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-serif text-brand-cream mb-4 font-light flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-gold" />
                Existing Experiences ({experiences.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experiences.map((exp) => (
                  <div key={exp._id} className="bg-brand-dark border border-brand-gold/20 p-5 relative flex flex-col justify-between">
                    <div className="flex items-start gap-4 mb-3">
                      <img
                        src={exp.companyLogo || exp.logoUrl}
                        alt={exp.companyName}
                        className="w-12 h-12 rounded-full object-cover border border-brand-gold/40 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-brand-gold block">{exp.duration}</span>
                        <h4 className="text-lg font-serif text-brand-cream font-medium">{exp.role}</h4>
                        <span className="text-xs text-brand-cream/70 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-brand-gold/80" />
                          {exp.companyName}
                        </span>
                      </div>
                    </div>

                    {exp.shortDetails && (
                      <p className="text-xs text-brand-cream/60 font-light mb-4 italic">
                        "{exp.shortDetails}"
                      </p>
                    )}

                    <div className="pt-2 border-t border-brand-gold/15 flex justify-end">
                      <button
                        onClick={() => handleDeleteExperience(exp._id)}
                        className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 6: CLIENT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-serif text-brand-cream mb-6 font-light">
              Incoming Wedding Inquiries ({inquiries.length})
            </h2>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-brand-dark/60 border border-brand-gold/15 text-brand-cream/60">
                No client inquiries received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div 
                    key={inq._id}
                    className={`p-6 border transition-all ${
                      inq.status === 'new' 
                        ? 'bg-brand-dark border-brand-gold/50 shadow-lg' 
                        : 'bg-brand-black/60 border-brand-gold/15 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-brand-gold/15">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-serif text-brand-cream font-light">{inq.name}</h3>
                          <span className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 border ${
                            inq.status === 'new'
                              ? 'bg-brand-gold/20 border-brand-gold text-brand-gold'
                              : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                          }`}>
                            {inq.status === 'new' ? 'New Inquiry' : 'Contacted'}
                          </span>
                        </div>
                        <p className="text-xs text-brand-gold/80">{inq.email}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleInquiry(inq._id)}
                          className="btn-gold !py-1.5 !px-3 !text-[10px] flex items-center gap-1.5"
                        >
                          {inq.status === 'new' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          <span>{inq.status === 'new' ? 'Mark Contacted' : 'Mark New'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:border-rose-500"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-brand-cream/70 mb-4 bg-brand-black/40 p-3">
                      <div>
                        <span className="text-brand-gold block text-[10px] uppercase tracking-widest">Wedding Date</span>
                        <span>{inq.weddingDate ? new Date(inq.weddingDate).toLocaleDateString() : 'Not Specified'}</span>
                      </div>
                      <div>
                        <span className="text-brand-gold block text-[10px] uppercase tracking-widest">Venue / Location</span>
                        <span>{inq.venue || 'Not Specified'}</span>
                      </div>
                      <div>
                        <span className="text-brand-gold block text-[10px] uppercase tracking-widest">Collection Interest</span>
                        <span>{inq.packageInterest || 'General Inquiry'}</span>
                      </div>
                    </div>

                    <div className="text-sm font-light text-brand-cream/90 italic bg-brand-black/20 p-4 border-l-2 border-brand-gold">
                      "{inq.message}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
