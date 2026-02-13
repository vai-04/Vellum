import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useVellumStore from '../../store/vellumStore';
import VellumButton from '../ui/VellumButton';
import VellumInput from '../ui/VellumInput';
import './DecisionModal.css';

const DecisionModal = () => {
  const {
    isDecisionModalOpen,
    closeDecisionModal,
    addDecision,
    generateAIAnalysis,
    openAIPanel
  } = useVellumStore();

  const [formData, setFormData] = useState({
    title: '',
    options: ['', ''],
    constraints: '',
    reasoning: ''
  });

  const handleChange = (field, value, index = null) => {
    if (field === 'options' && index !== null) {
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, '']
    });
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData({ ...formData, options: newOptions });
    }
  };

  const handleSubmit = () => {
    const decision = {
      ...formData,
      options: formData.options.filter(opt => opt.trim() !== '')
    };

    addDecision(decision);
    generateAIAnalysis(decision);
    closeDecisionModal();
    
    // Automatically open AI panel after creating decision
    setTimeout(() => {
      openAIPanel();
    }, 500);

    // Reset form
    setFormData({
      title: '',
      options: ['', ''],
      constraints: '',
      reasoning: ''
    });
  };

  return (
    <AnimatePresence>
      {isDecisionModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="decision-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDecisionModal}
          />

          {/* Modal */}
          <motion.div
            className="decision-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="decision-modal__container glass-surface">
              {/* Header */}
              <div className="decision-modal__header">
                <div>
                  <h2 className="decision-modal__title cinematic-text">Decision Ritual</h2>
                  <p className="decision-modal__subtitle">Structure your thinking</p>
                </div>
                <button
                  className="decision-modal__close"
                  onClick={closeDecisionModal}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <div className="decision-modal__form">
                <VellumInput
                  label="Decision Title"
                  placeholder="What decision are you making?"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />

                <div className="decision-modal__section">
                  <label className="decision-modal__label">Options</label>
                  {formData.options.map((option, index) => (
                    <div key={index} className="decision-modal__option">
                      <VellumInput
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleChange('options', e.target.value, index)}
                      />
                      {formData.options.length > 2 && (
                        <button
                          className="decision-modal__option-remove"
                          onClick={() => removeOption(index)}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    className="decision-modal__add-option"
                    onClick={addOption}
                  >
                    + Add Option
                  </button>
                </div>

                <div className="decision-modal__section">
                  <label className="decision-modal__label">Constraints</label>
                  <textarea
                    className="decision-modal__textarea glass-surface"
                    placeholder="What are your constraints or limitations?"
                    value={formData.constraints}
                    onChange={(e) => handleChange('constraints', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="decision-modal__section">
                  <label className="decision-modal__label">Reasoning</label>
                  <textarea
                    className="decision-modal__textarea glass-surface"
                    placeholder="What is your current reasoning?"
                    value={formData.reasoning}
                    onChange={(e) => handleChange('reasoning', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="decision-modal__actions">
                <VellumButton
                  variant="secondary"
                  onClick={closeDecisionModal}
                >
                  Cancel
                </VellumButton>
                <VellumButton
                  onClick={handleSubmit}
                  disabled={!formData.title.trim() || formData.options.filter(o => o.trim()).length < 2}
                >
                  Analyze Decision
                </VellumButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DecisionModal;
