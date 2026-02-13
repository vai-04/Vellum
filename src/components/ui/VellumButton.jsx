import React from 'react';
import { motion } from 'framer-motion';
import './VellumButton.css';

const VellumButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <motion.button
      className={`vellum-button vellum-button--${variant} vellum-button--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      <span className="vellum-button__shine"></span>
      <span className="vellum-button__content">{children}</span>
    </motion.button>
  );
};

export default VellumButton;
