import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('/api/users/forgot-password', { email });
      setIsSent(true);
      toast.success('Reset link sent to your email!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ width: '500px', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="form-container" style={{ position: 'relative', width: '100%', height: 'auto', padding: '40px' }}>
        <form onSubmit={handleSubmit} style={{ padding: '0' }}>
          <h1 style={{ marginBottom: '10px' }}>Reset Password</h1>
          <p style={{ marginBottom: '30px', color: '#666' }}>
            {isSent 
              ? "Check your inbox! We've sent instructions to reset your password." 
              : "Enter your registered email and we'll send you a reset link."}
          </p>

          {!isSent && (
            <>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', marginBottom: '20px' }}
              />

              <button type="submit" disabled={isLoading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                {isLoading ? 'Sending...' : (
                  <>
                    Send Reset Link <FaPaperPlane size={14} />
                  </>
                )}
              </button>
            </>
          )}

          {isSent && (
            <button 
              type="button" 
              className="ghost" 
              onClick={() => setIsSent(false)} 
              style={{ color: '#ff4b2b', borderColor: '#ff4b2b', width: '100%' }}
            >
              Try another email
            </button>
          )}

          <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '30px', fontWeight: 'bold' }}>
            <FaArrowLeft size={14} /> Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
