import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowRight, Loader2, Sun, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [strength, setStrength] = useState(0);

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const calculateStrength = (pass: string) => {
    let s = 0;
    if (pass.length > 6) s++;
    if (/[A-Z]/.test(pass)) s++;
    if (/[0-9]/.test(pass)) s++;
    if (/[^A-Za-z0-9]/.test(pass)) s++;
    setStrength(s);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      calculateStrength(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/users', { name, email, password });
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899']
      });

      login(data);
      toast.success('Welcome to the premium experience!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (strength === 0) return 'transparent';
    if (strength <= 2) return '#ef4444';
    if (strength === 3) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card"
      >
        <h2>Create Account</h2>
        <p className="subtitle">Join our premium platform and start your journey</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <User className="input-icon" />
            <input
              name="name"
              type="text"
              className="form-input"
              placeholder=" "
              required
              value={name}
              onChange={onChange}
            />
            <label className="form-label">Full Name</label>
          </div>

          <div className="form-group">
            <Mail className="input-icon" />
            <input
              name="email"
              type="email"
              className="form-input"
              placeholder=" "
              required
              value={email}
              onChange={onChange}
            />
            <label className="form-label">Email Address</label>
          </div>

          <div className="form-group">
            <Lock className="input-icon" />
            <input
              name="password"
              type="password"
              className="form-input"
              placeholder=" "
              required
              value={password}
              onChange={onChange}
            />
            <label className="form-label">Password</label>
          </div>

          <div className="strength-container">
            <div className="strength-bar-bg">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="strength-segment"
                  style={{ 
                    backgroundColor: i <= strength ? getStrengthColor() : 'var(--card-border)'
                  }}
                />
              ))}
            </div>
            <p className="strength-text">
              {strength === 0 && 'Enter password'}
              {strength <= 2 && strength > 0 && 'Weak password'}
              {strength === 3 && 'Good password'}
              {strength === 4 && 'Excellent security'}
            </p>
          </div>

          <div className="form-group">
            <Lock className="input-icon" />
            <input
              name="confirmPassword"
              type="password"
              className="form-input"
              placeholder=" "
              required
              value={confirmPassword}
              onChange={onChange}
            />
            <label className="form-label">Confirm Password</label>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Get Started <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? 
          <Link to="/login" className="auth-link">Login here</Link>
        </div>
      </motion.div>
    </>
  );
};

export default Register;
