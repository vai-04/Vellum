import React from 'react';
import './VellumInput.css';

const VellumInput = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className={`vellum-input-wrapper ${className}`}>
      {label && <label className="vellum-input-label">{label}</label>}
      <input
        type={type}
        className={`vellum-input ${error ? 'vellum-input--error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span className="vellum-input-error">{error}</span>}
    </div>
  );
};

export default VellumInput;
