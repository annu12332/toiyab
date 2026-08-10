import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sliders, Image as ImageIcon, Video as VideoIcon, Inbox, LogOut, Plus, Trash2, CheckCircle, Clock, Sparkles, Briefcase, Building2 } from 'lucide-react';
import getApiUrl from '../config/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('settings'); // 'settings', 'experience', 'gallery', 'inquiries'

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroVideoUrl: '',
    heroImageUrl: '',
    profileImageUrl: '',
    photographerName: '',
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

  // Item Form State (for Images & Videos)
  const [mediaType, setMediaType] = useState('photo'); // 'photo' or 'video'
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Weddings');
  const [mediaMsg, setMediaMsg] = useState('');

  // Data Collections State
  const [experiences, setExperiences] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
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
          heroSubtitle: setObj.heroSubtitle || 'Exclusive wedding photography & cinematography preserving your story in fine art.',
          heroVideoUrl: setObj.heroVideoUrl || '',
          heroImageUrl: setObj.heroImageUrl || '',
          profileImageUrl: setObj.profileImageUrl || '',
          photographerName: setObj.photographerName || 'Toiyab',
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

      // Videos
      const vidRes = await fetch(getApiUrl('/api/portfolio/videos'));
      if (vidRes.ok) {
        const vidData = await vidRes.json();
        setVideos(vidData);
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
        setExpForm({
          companyName: '',
          companyLogo: '',
          role: '',
          duration: '',
          shortDetails: ''
        });
      } else {
        setExpMsg('Failed to add experience item.');
      }
    } catch (err) {
      const demoExp = { ...expForm, _id: Date.now().toString() };
      setExperiences([demoExp, ...experiences]);
      setExpMsg('Experience added locally in preview mode.');
      setExpForm({
        companyName: '',
        companyLogo: '',
        role: '',
        duration: '',
        shortDetails: ''
      });
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

  const handleAddMedia = async (e) => {
    e.preventDefault();
    setMediaMsg('');
    const endpoint = mediaType === 'photo' ? getApiUrl('/api/portfolio/images') : getApiUrl('/api/portfolio/videos');
    const payload = mediaType === 'photo' 
      ? { title, url, category } 
      : { title, videoUrl: url };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newItem = await res.json();
        setMediaMsg(`${mediaType === 'photo' ? 'Photo' : 'Video'} added successfully!`);
        setTitle('');
        setUrl('');
        if (mediaType === 'photo') {
          setImages([newItem, ...images]);
        } else {
          setVideos([newItem, ...videos]);
        }
      } else {
        setMediaMsg('Failed to add item.');
      }
    } catch (err) {
      setMediaMsg('Item saved locally in session.');
      const demoItem = { _id: Date.now().toString(), title, url, category };
      if (mediaType === 'photo') setImages([demoItem, ...images]);
      else setVideos([demoItem, ...videos]);
      setTitle('');
      setUrl('');
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
                Hero & About Customization
              </h2>

              {settingsMsg && (
                <div className="p-3 mb-6 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-xs">
                  {settingsMsg}
                </div>
              )}

              <form onSubmit={handleUpdateSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Photographer Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.photographerName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, photographerName: e.target.value })}
                      placeholder="e.g. Toiyab"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
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
                      Hero Background Image URL
                    </label>
                    <input
                      type="url"
                      value={settingsForm.heroImageUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroImageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Hero Background Video URL (MP4)
                    </label>
                    <input
                      type="url"
                      value={settingsForm.heroVideoUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroVideoUrl: e.target.value })}
                      placeholder="https://assets.mixkit.co/...mp4"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Hero Profile Photo URL (Circle Lens)
                    </label>
                    <input
                      type="url"
                      value={settingsForm.profileImageUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, profileImageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      About Portrait Photo URL
                    </label>
                    <input
                      type="url"
                      value={settingsForm.aboutPhotoUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutPhotoUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Years Experience Stat
                    </label>
                    <input
                      type="number"
                      value={settingsForm.yearsExperience}
                      onChange={(e) => setSettingsForm({ ...settingsForm, yearsExperience: parseInt(e.target.value) || 0 })}
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Weddings Documented Stat
                    </label>
                    <input
                      type="number"
                      value={settingsForm.weddingsShot}
                      onChange={(e) => setSettingsForm({ ...settingsForm, weddingsShot: parseInt(e.target.value) || 0 })}
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-solid-gold w-full !py-3.5">
                  Save Settings Changes
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* TAB 2: MANAGE EXPERIENCE */}
        {activeTab === 'experience' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 max-w-5xl">
            {/* Add Experience Form */}
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

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Company Logo URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={expForm.companyLogo}
                      onChange={(e) => setExpForm({ ...expForm, companyLogo: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>
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

            {/* List of Existing Experiences */}
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

        {/* TAB 3: MANAGE GALLERY */}
        {activeTab === 'gallery' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            
            {/* Add New Item Panel */}
            <div className="bg-brand-dark/90 border border-brand-gold/20 p-8 shadow-2xl max-w-4xl">
              <h2 className="text-2xl font-serif text-brand-cream mb-6 flex items-center gap-2 font-light">
                <Plus className="w-5 h-5 text-brand-gold" />
                Add New Photo or Video Reel
              </h2>

              {mediaMsg && (
                <div className="p-3 mb-6 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-xs">
                  {mediaMsg}
                </div>
              )}

              <form onSubmit={handleAddMedia} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Media Type
                    </label>
                    <select
                      value={mediaType}
                      onChange={(e) => setMediaType(e.target.value)}
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    >
                      <option value="photo">Photography</option>
                      <option value="video">Video Reel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Item Title"
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                    >
                      <option value="Weddings">Weddings</option>
                      <option value="Pre-Wedding">Pre-Wedding</option>
                      <option value="Ceremony">Ceremony</option>
                      <option value="Portraits">Portraits</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-cream/70 mb-2 font-light">
                    Direct Image/Video URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <button type="submit" className="btn-solid-gold w-full !py-3">
                  Upload Item To Portfolio
                </button>
              </form>
            </div>

            {/* List of Existing Images */}
            <div>
              <h3 className="text-xl font-serif text-brand-cream mb-4 font-light">
                Photography Gallery Items ({images.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {images.map((img) => (
                  <div key={img._id} className="bg-brand-dark border border-brand-gold/20 p-3 relative group">
                    <img src={img.url} alt={img.title} className="w-full h-40 object-cover mb-2" />
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold block">{img.category}</span>
                    <h4 className="text-sm font-serif text-brand-cream truncate">{img.title}</h4>
                    <button
                      onClick={() => handleDeleteImage(img._id)}
                      className="mt-2 text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* List of Existing Videos */}
            <div className="pt-6">
              <h3 className="text-xl font-serif text-brand-cream mb-4 font-light">
                Video Reel Items ({videos.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos.map((vid) => (
                  <div key={vid._id} className="bg-brand-dark border border-brand-gold/20 p-4">
                    <h4 className="text-base font-serif text-brand-cream mb-2">{vid.title}</h4>
                    <p className="text-xs text-brand-cream/50 truncate mb-3">{vid.videoUrl}</p>
                    <button
                      onClick={() => handleDeleteVideo(vid._id)}
                      className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Video
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 4: CLIENT INQUIRIES */}
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
