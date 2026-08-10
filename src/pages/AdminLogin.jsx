import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, KeyRound, ShieldAlert } from 'lucide-react';
import getApiUrl from '../config/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminInfo', JSON.stringify(data));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid admin credentials');
      }
    } catch (err) {
      setError('Connection error. Operating in offline preview mode.');
      // Allow demo login for preview testing if server not reachable
      setTimeout(() => {
        localStorage.setItem('adminInfo', JSON.stringify({ name: 'Admin Demo', token: 'demo-jwt-token' }));
        navigate('/admin/dashboard');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        className="w-full max-w-md bg-brand-dark/90 border border-brand-gold/30 p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-brand-black border border-brand-gold/40 flex items-center justify-center text-brand-gold mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif text-brand-cream font-light">Admin Management</h2>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/80 font-light block mt-1">
            TOIYAB Fine Art CMS
          </span>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-brand-cream/70 font-light mb-2">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-brand-gold/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username" 
                className="w-full bg-brand-black/70 border border-brand-gold/20 focus:border-brand-gold text-brand-cream py-3 pl-11 pr-4 text-sm focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-brand-cream/70 font-light mb-2">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-brand-gold/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" 
                className="w-full bg-brand-black/70 border border-brand-gold/20 focus:border-brand-gold text-brand-cream py-3 pl-11 pr-4 text-sm focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-solid-gold w-full !py-3.5 mt-2" 
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
