import React from 'react';
import { motion } from 'framer-motion';
import './PrismGlyph.css';

const PrismGlyph = ({ onClick, isActive = false }) => {
  return (
    <motion.div
      className={`prism-glyph ${isActive ? 'prism-glyph--active' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="prism-glyph__outer">
        <div className="prism-glyph__inner">
          <div className="prism-glyph__core">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              {/* Geometric Prism Shape */}
              <path
                d="M16 4 L28 12 L28 20 L16 28 L4 20 L4 12 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="prism-glyph__shape"
              />
              <path
                d="M16 4 L16 28 M4 12 L28 12 M4 20 L28 20"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
                className="prism-glyph__lines"
              />
              {/* Center Dot */}
              <circle
                cx="16"
                cy="16"
                r="2"
                fill="currentColor"
                className="prism-glyph__center"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="prism-glyph__glow"></div>
    </motion.div>
  );
};

export default PrismGlyph;
