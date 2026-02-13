import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import useVellumStore from '../../store/vellumStore';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme, isAuthenticated, user, logout } = useVellumStore();

  return (
    <nav className="navbar glass-surface">
      <div className="navbar__content">
        <div className="navbar__brand">
          <span className="navbar__logo">✦</span>
          <span className="navbar__title cinematic-text">VELLUM</span>
        </div>

        <div className="navbar__actions">
          {isAuthenticated && user && (
            <div className="navbar__user">
              <span className="navbar__username">{user.name}</span>
              <button onClick={logout} className="navbar__logout">
                Logout
              </button>
            </div>
          )}
          
          <motion.button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
