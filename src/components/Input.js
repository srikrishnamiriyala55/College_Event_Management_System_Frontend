import React, { useState } from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, error, required }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '500',
          color: '#9096b0',
          marginBottom: '6px',
          letterSpacing: '0.02em',
        }}>
          {label} {required && <span style={{ color: '#6c63ff' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '11px 14px',
          background: '#0f1117',
          border: `1.5px solid ${error ? '#ef4444' : focused ? '#6c63ff' : '#252836'}`,
          borderRadius: '8px',
          color: '#f0f0f5',
          fontSize: '14px',
          transition: 'border-color 0.2s ease',
          boxShadow: focused ? '0 0 0 3px rgba(108,99,255,0.12)' : 'none',
        }}
      />
      {error && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{error}</p>}
    </div>
  );
};

export default Input;
