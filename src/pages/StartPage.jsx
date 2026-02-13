import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VellumButton from '../components/ui/VellumButton';
import './StartPage.css';

const StartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Create floating particles effect
    const createParticles = () => {
      const container = document.querySelector('.start-page__particles');
      if (!container) return;

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${10 + Math.random() * 20}s`;
        container.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <div className="start-page">
      <div className="start-page__particles"></div>
      
      <div className="start-page__background">
        <div className="start-page__gradient start-page__gradient--1"></div>
        <div className="start-page__gradient start-page__gradient--2"></div>
        <div className="start-page__gradient start-page__gradient--3"></div>
      </div>

      <motion.div 
        className="start-page__content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="start-page__icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            ease: [0.4, 0, 0.2, 1] 
          }}
        >
          ✦
        </motion.div>

        <motion.h1 
          className="start-page__title display-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          VELLUM
        </motion.h1>

        <motion.p 
          className="start-page__subtitle cinematic-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Decision Intelligence Archive
        </motion.p>

        <motion.p 
          className="start-page__description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Your mind rewrites history. Vellum does not.
          <br />
          Preserve the original reasoning behind every decision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <VellumButton 
            size="large"
            onClick={() => navigate('/login')}
          >
            Get Started
          </VellumButton>
        </motion.div>

        <motion.div
          className="start-page__features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="start-page__feature">
            <span className="start-page__feature-icon">🧠</span>
            <span className="start-page__feature-text">Cognitive Preservation</span>
          </div>
          <div className="start-page__feature">
            <span className="start-page__feature-icon">🔮</span>
            <span className="start-page__feature-text">Agentic AI Analysis</span>
          </div>
          <div className="start-page__feature">
            <span className="start-page__feature-icon">⛓️</span>
            <span className="start-page__feature-text">Immutable Archive</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StartPage;
