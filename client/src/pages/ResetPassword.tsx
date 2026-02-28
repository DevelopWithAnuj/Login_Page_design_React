import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setIsLoading(true);
    try {
      await axios.put(`/api/users/reset-password/${token}`, { password });
      setIsSuccess(true);
      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Link invalid or expired');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      {isSuccess ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <ShieldCheck size={32} />
          </div>
          <h2>Password Reset!</h2>
          <p className="subtitle">Your security is our priority. Redirecting to login...</p>
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>
            Login Now <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <>
          <h2>Set New Password</h2>
          <p className="subtitle">Please choose a strong password to secure your account.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Lock className="input-icon" />
              <input
                type="password"
                className="form-input"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label">New Password</label>
            </div>

            <div className="form-group">
              <Lock className="input-icon" />
              <input
                type="password"
                className="form-input"
                placeholder=" "
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label className="form-label">Confirm New Password</label>
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
                  Reset Password <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default ResetPassword;
