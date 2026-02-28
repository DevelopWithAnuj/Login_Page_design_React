import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, User, Layout, Settings, Sun, Moon } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Simulate data loading for skeleton effect
    const timer = setTimeout(() => setIsDataLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
        style={{ maxWidth: '800px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem' }}>Premium Dashboard</h2>
            <p className="subtitle">Welcome back, {user?.name}</p>
          </div>
          <button onClick={logout} className="btn-primary" style={{ width: 'auto', padding: '12px 24px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        {isDataLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton" style={{ height: '140px', borderRadius: '20px' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card" 
              style={{ padding: '24px', margin: 0, background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}
            >
              <Layout style={{ color: 'var(--primary)', marginBottom: '12px' }} />
              <h3>Your Stats</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '4px' }}>Analyze your recent activity and growth.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card" 
              style={{ padding: '24px', margin: 0, background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}
            >
              <User style={{ color: '#ec4899', marginBottom: '12px' }} />
              <h3>Profile Management</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '4px' }}>Update your personal details and role.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card" 
              style={{ padding: '24px', margin: 0, background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}
            >
              <Settings style={{ color: '#10b981', marginBottom: '12px' }} />
              <h3>Security Settings</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '4px' }}>Control your privacy and active sessions.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card" 
              style={{ padding: '24px', margin: 0, background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}
            >
              <div style={{ background: 'var(--primary)', height: '40px', width: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>+</span>
              </div>
              <h3>Explore Features</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '4px' }}>Discover what's new in our platform.</p>
            </motion.div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Dashboard;
