import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, TrendingUp, Brain, Eye } from 'lucide-react';
import useVellumStore from '../../store/vellumStore';
import VellumButton from '../ui/VellumButton';
import './AIPanel.css';

const AIPanel = () => {
  const { isAIPanelOpen, closeAIPanel, aiAnalysis, currentDecision } = useVellumStore();

  if (!aiAnalysis) {
    return (
      <AnimatePresence>
        {isAIPanelOpen && (
          <motion.div
            className="ai-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="ai-panel__container glass-surface">
              <div className="ai-panel__header">
                <h2 className="ai-panel__title cinematic-text">Analytical Intelligence</h2>
                <button className="ai-panel__close" onClick={closeAIPanel}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="ai-panel__empty">
                <Brain size={48} className="ai-panel__empty-icon" />
                <p>Create a decision to receive AI analysis</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isAIPanelOpen && (
        <motion.div
          className="ai-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          <div className="ai-panel__container glass-surface">
            {/* Header */}
            <div className="ai-panel__header">
              <div>
                <h2 className="ai-panel__title cinematic-text">Analytical Intelligence</h2>
                <p className="ai-panel__subtitle">Structured Reflection</p>
              </div>
              <button className="ai-panel__close" onClick={closeAIPanel}>
                <X size={24} />
              </button>
            </div>

            {/* Analysis Cards */}
            <div className="ai-panel__content">
              {/* Reasoning Architect */}
              {aiAnalysis.reasoningArchitect && (
                <motion.div
                  className="ai-card glass-surface"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="ai-card__header">
                    <Brain className="ai-card__icon" style={{ color: 'var(--lavender-frost)' }} />
                    <h3 className="ai-card__title">{aiAnalysis.reasoningArchitect.title}</h3>
                  </div>
                  <div className="ai-card__content">
                    {aiAnalysis.reasoningArchitect.insights.map((insight, i) => (
                      <p key={i} className="ai-card__insight">• {insight}</p>
                    ))}
                    <div className="ai-card__metric">
                      <span>Confidence</span>
                      <div className="ai-card__progress">
                        <div 
                          className="ai-card__progress-bar"
                          style={{ width: `${aiAnalysis.reasoningArchitect.confidence * 100}%` }}
                        />
                      </div>
                      <span>{Math.round(aiAnalysis.reasoningArchitect.confidence * 100)}%</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Cognitive Bias Auditor */}
              {aiAnalysis.biasAuditor && (
                <motion.div
                  className="ai-card glass-surface"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="ai-card__header">
                    <AlertTriangle className="ai-card__icon" style={{ color: 'var(--champagne-glass)' }} />
                    <h3 className="ai-card__title">{aiAnalysis.biasAuditor.title}</h3>
                  </div>
                  <div className="ai-card__content">
                    {aiAnalysis.biasAuditor.detectedBiases.map((bias, i) => (
                      <div key={i} className="ai-card__bias">
                        <div className="ai-card__bias-header">
                          <strong>{bias.name}</strong>
                          <span className="ai-card__probability">
                            {Math.round(bias.probability * 100)}%
                          </span>
                        </div>
                        <p className="ai-card__bias-desc">{bias.description}</p>
                      </div>
                    ))}
                    <div className="ai-card__risk">
                      Overall Risk: <strong>{aiAnalysis.biasAuditor.overallRisk}</strong>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Regret Forecaster */}
              {aiAnalysis.regretForecaster && (
                <motion.div
                  className="ai-card glass-surface"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="ai-card__header">
                    <TrendingUp className="ai-card__icon" style={{ color: 'var(--rose-quartz)' }} />
                    <h3 className="ai-card__title">{aiAnalysis.regretForecaster.title}</h3>
                  </div>
                  <div className="ai-card__content">
                    <div className="ai-card__regret-timeline">
                      <div className="ai-card__regret-item">
                        <div className="ai-card__regret-label">Short Term</div>
                        <div className="ai-card__probability">
                          {Math.round(aiAnalysis.regretForecaster.shortTerm.probability * 100)}%
                        </div>
                        <div className="ai-card__factors">
                          {aiAnalysis.regretForecaster.shortTerm.factors.map((f, i) => (
                            <span key={i}>• {f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="ai-card__regret-item">
                        <div className="ai-card__regret-label">Long Term</div>
                        <div className="ai-card__probability">
                          {Math.round(aiAnalysis.regretForecaster.longTerm.probability * 100)}%
                        </div>
                        <div className="ai-card__factors">
                          {aiAnalysis.regretForecaster.longTerm.factors.map((f, i) => (
                            <span key={i}>• {f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ai-card__recommendation">
                      <strong>Recommendation:</strong> {aiAnalysis.regretForecaster.recommendation}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Missed Variables */}
              {aiAnalysis.missedVariables && (
                <motion.div
                  className="ai-card glass-surface"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="ai-card__header">
                    <Eye className="ai-card__icon" style={{ color: 'var(--mint-cognition)' }} />
                    <h3 className="ai-card__title">{aiAnalysis.missedVariables.title}</h3>
                  </div>
                  <div className="ai-card__content">
                    {aiAnalysis.missedVariables.variables.map((variable, i) => (
                      <p key={i} className="ai-card__variable">• {variable}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIPanel;
