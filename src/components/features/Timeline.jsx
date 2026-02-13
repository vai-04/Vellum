import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Hash, Lock, Unlock } from 'lucide-react';
import useVellumStore from '../../store/vellumStore';
import VellumButton from '../ui/VellumButton';
import './Timeline.css';

const Timeline = () => {
  const { decisions, commitDecision } = useVellumStore();

  if (decisions.length === 0) {
    return (
      <div className="timeline timeline--empty">
        <div className="timeline__empty-state">
          <div className="timeline__empty-icon">📜</div>
          <h3 className="cinematic-text">Your Archive Awaits</h3>
          <p>Create your first decision to begin your intellectual lineage</p>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline">
      <div className="timeline__header">
        <h2 className="timeline__title cinematic-text">Decision Archive</h2>
        <p className="timeline__subtitle">Your intellectual lineage</p>
      </div>

      <div className="timeline__line"></div>

      <div className="timeline__content">
        {decisions.map((decision, index) => (
          <motion.div
            key={decision.id}
            className="timeline__entry"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Timeline Node */}
            <div className="timeline__node">
              <div className={`timeline__node-dot ${decision.committed ? 'committed' : ''}`}>
                {decision.committed ? <Lock size={12} /> : <Unlock size={12} />}
              </div>
            </div>

            {/* Decision Card */}
            <div className="timeline__card glass-surface">
              <div className="timeline__card-header">
                <div>
                  <h3 className="timeline__card-title">{decision.title}</h3>
                  <div className="timeline__card-meta">
                    <span className="timeline__card-date">
                      <Clock size={14} />
                      {new Date(decision.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className="timeline__card-hash">
                      <Hash size={14} />
                      {decision.hash}
                    </span>
                  </div>
                </div>
                {decision.committed && (
                  <div className="timeline__card-badge">
                    <Lock size={14} />
                    Committed
                  </div>
                )}
              </div>

              <div className="timeline__card-content">
                <div className="timeline__card-section">
                  <h4>Options Considered</h4>
                  <ul className="timeline__card-list">
                    {decision.options.map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                </div>

                {decision.constraints && (
                  <div className="timeline__card-section">
                    <h4>Constraints</h4>
                    <p>{decision.constraints}</p>
                  </div>
                )}

                {decision.reasoning && (
                  <div className="timeline__card-section">
                    <h4>Original Reasoning</h4>
                    <p>{decision.reasoning}</p>
                  </div>
                )}
              </div>

              {!decision.committed && (
                <div className="timeline__card-actions">
                  <VellumButton
                    size="small"
                    onClick={() => commitDecision(decision.id)}
                  >
                    Commit to Archive
                  </VellumButton>
                </div>
              )}

              {decision.committed && decision.commitTimestamp && (
                <div className="timeline__card-commit-info">
                  <div className="timeline__card-commit-animation">
                    <div className="timeline__golden-thread"></div>
                  </div>
                  <p className="timeline__card-commit-text">
                    Committed on {new Date(decision.commitTimestamp).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
