import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = user?.role === 'admin'
    ? [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Events', path: '/events' },
        { label: 'Manage Events', path: '/admin/events' },
      ]
    : [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Events', path: '/events' },
      ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(15,17,23,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #252836',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <div style={{
          width: '32px', height: '32px',
          background: 'linear-gradient(135deg, #6c63ff, #857dff)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px',
        }}>🎓</div>
        <span style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: '700',
          fontSize: '15px',
          color: '#f0f0f5',
          letterSpacing: '-0.01em',
        }}>CMS</span>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {navLinks.map(link => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              background: location.pathname === link.path ? 'rgba(108,99,255,0.15)' : 'transparent',
              color: location.pathname === link.path ? '#6c63ff' : '#9096b0',
              fontWeight: location.pathname === link.path ? '600' : '400',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { if (location.pathname !== link.path) e.currentTarget.style.color = '#f0f0f5'; }}
            onMouseLeave={e => { if (location.pathname !== link.path) e.currentTarget.style.color = '#9096b0'; }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* User + Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#f0f0f5' }}>{user?.name}</div>
          <div style={{
            fontSize: '11px',
            color: user?.role === 'admin' ? '#6c63ff' : '#22c55e',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>{user?.role}</div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '7px 14px',
            borderRadius: '7px',
            background: 'transparent',
            border: '1px solid #252836',
            color: '#9096b0',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#252836'; e.currentTarget.style.color = '#9096b0'; }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
