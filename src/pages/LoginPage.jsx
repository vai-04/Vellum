import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VellumButton from '../components/ui/VellumButton';
import VellumInput from '../components/ui/VellumInput';
import useVellumStore from '../store/vellumStore';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useVellumStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-page">
      <div className="login-page__background">
        <div className="login-page__gradient"></div>
      </div>

      <motion.div 
        className="login-page__container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-page__card glass-surface">
          <div className="login-page__header">
            <div className="login-page__logo">✦</div>
            <h1 className="login-page__title display-text">VELLUM</h1>
            <p className="login-page__subtitle">Decision Intelligence Archive</p>
          </div>

          <form className="login-page__form" onSubmit={handleSubmit}>
            <VellumInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <VellumInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <VellumButton 
              type="submit" 
              size="large"
              className="login-page__submit"
            >
              Sign In
            </VellumButton>
          </form>

          <div className="login-page__footer">
            <p className="login-page__hint">
              This is a demo. Use any email and password to sign in.
            </p>
          </div>
        </div>

        <button 
          className="login-page__back"
          onClick={() => navigate('/')}
        >
          ← Back to Start
        </button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
