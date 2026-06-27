import React from 'react';

const styles = {
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: 'none',
  },
};

const variants = {
  primary: {
    background: '#6c63ff',
    color: '#fff',
  },
  danger: {
    background: '#ef4444',
    color: '#fff',
  },
  ghost: {
    background: 'transparent',
    color: '#9096b0',
    border: '1px solid #252836',
  },
  outline: {
    background: 'transparent',
    color: '#6c63ff',
    border: '1px solid #6c63ff',
  },
};

const Button = ({ children, variant = 'primary', disabled, loading, style, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...styles.btn,
        ...variants[variant],
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        ...style,
      }}
      onMouseEnter={e => {
        if (!disabled && !loading) {
          e.currentTarget.style.filter = 'brightness(1.1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.filter = '';
        e.currentTarget.style.transform = '';
      }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
