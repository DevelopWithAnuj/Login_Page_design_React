import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSocialLogin = (platform: string) => {
    toast.info(`${platform} login integration is coming soon!`);
  };

  const handleToggle = () => setIsSignUp(!isSignUp);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/users/login', { 
        email: formData.email, 
        password: formData.password 
      });
      login(data);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/users', formData);
      toast.success('Registration successful! Please verify your email.');
      setIsSignUp(false); // Switch to login after registration
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <div className="social-container">
            <button type="button" onClick={() => handleSocialLogin('Facebook')} className="social"><FaFacebookF /></button>
            <button type="button" onClick={() => handleSocialLogin('Google')} className="social"><FaGoogle /></button>
            <button type="button" onClick={() => handleSocialLogin('GitHub')} className="social"><FaGithub /></button>
          </div>
          <span>or use your email for registration</span>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Sign Up'}
          </button>

          <div className="mobile-toggle">
            Already have an account? <span onClick={handleToggle}>Sign In</span>
          </div>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Sign in</h1>
          <div className="social-container">
            <button type="button" onClick={() => handleSocialLogin('Facebook')} className="social"><FaFacebookF /></button>
            <button type="button" onClick={() => handleSocialLogin('Google')} className="social"><FaGoogle /></button>
            <button type="button" onClick={() => handleSocialLogin('GitHub')} className="social"><FaGithub /></button>
          </div>
          <span>or use your account</span>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
          />
          <Link to="/forgot-password">Forgot your password?</Link>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Sign In'}
          </button>

          <div className="mobile-toggle">
            Don't have an account? <span onClick={handleToggle}>Sign Up</span>
          </div>
        </form>
      </div>

      {/* Sliding Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleToggle}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={handleToggle}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
