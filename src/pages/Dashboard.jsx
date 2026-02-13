import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useVellumStore from '../store/vellumStore';
import PrismGlyph from '../components/ui/PrismGlyph';
import VellumButton from '../components/ui/VellumButton';
import ScribbleCanvas from '../components/features/ScribbleCanvas';
import DecisionModal from '../components/features/DecisionModal';
import AIPanel from '../components/features/AIPanel';
import Timeline from '../components/features/Timeline';
import './Dashboard.css';

const Dashboard = () => {
  const {
    isDecisionModalOpen,
    openDecisionModal,
    isAIPanelOpen,
    openAIPanel,
    closeAIPanel
  } = useVellumStore();

  const [activeView, setActiveView] = useState('scribble'); // 'scribble' or 'timeline'

  return (
    <div className="dashboard">
      {/* Background Atmosphere */}
      <div className="dashboard__atmosphere">
        <div className="dashboard__atmosphere-gradient dashboard__atmosphere-gradient--1"></div>
        <div className="dashboard__atmosphere-gradient dashboard__atmosphere-gradient--2"></div>
      </div>

      {/* Main Content */}
      <div className="dashboard__content">
        {/* View Toggle */}
        <motion.div 
          className="dashboard__view-toggle glass-surface"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className={`dashboard__view-button ${activeView === 'scribble' ? 'active' : ''}`}
            onClick={() => setActiveView('scribble')}
          >
            Scribble Layer
          </button>
          <button
            className={`dashboard__view-button ${activeView === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveView('timeline')}
          >
            Archive Timeline
          </button>
        </motion.div>

        {/* Active View */}
        <AnimatePresence mode="wait">
          {activeView === 'scribble' ? (
            <motion.div
              key="scribble"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="dashboard__view"
            >
              <ScribbleCanvas />
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="dashboard__view"
            >
              <Timeline />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Decision Button */}
        <motion.div
          className="dashboard__create-decision"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <VellumButton
            size="large"
            onClick={openDecisionModal}
          >
            Create Decision
          </VellumButton>
        </motion.div>
      </div>

      {/* AI Prism Glyph */}
      <PrismGlyph 
        onClick={openAIPanel}
        isActive={isAIPanelOpen}
      />

      {/* Decision Modal */}
      <DecisionModal />

      {/* AI Panel */}
      <AIPanel />

      {/* Overlay when AI Panel is open */}
      <AnimatePresence>
        {isAIPanelOpen && (
          <motion.div
            className="dashboard__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAIPanel}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
