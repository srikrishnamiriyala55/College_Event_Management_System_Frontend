import React from 'react';

const EventCard = ({ event, onEdit, onDelete, isAdmin }) => {
  const date = new Date(event.date);
  const isPast = date < new Date();

  return (
    <div style={{
      background: '#1a1d27',
      border: '1px solid #252836',
      borderRadius: '12px',
      padding: '20px',
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = '#6c63ff40';
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(108,99,255,0.12)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = '#252836';
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    }}
    >
      {/* Top color stripe */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: isPast
          ? 'linear-gradient(90deg, #5a607a, #3a3f55)'
          : 'linear-gradient(90deg, #6c63ff, #857dff)',
      }} />

      {/* Date badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: isPast ? 'rgba(90,96,122,0.15)' : 'rgba(108,99,255,0.12)',
        color: isPast ? '#5a607a' : '#857dff',
        fontSize: '12px',
        fontWeight: '600',
        padding: '4px 10px',
        borderRadius: '20px',
        marginBottom: '12px',
      }}>
        📅 {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        {isPast && <span style={{ color: '#5a607a' }}> · Past</span>}
      </div>

      <h3 style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: '16px',
        fontWeight: '700',
        color: '#f0f0f5',
        marginBottom: '8px',
        lineHeight: '1.3',
      }}>{event.title}</h3>

      <p style={{
        color: '#9096b0',
        fontSize: '13px',
        lineHeight: '1.6',
        marginBottom: '14px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>{event.description}</p>

      {/* Venue */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#9096b0',
        fontSize: '12px',
        borderTop: '1px solid #252836',
        paddingTop: '12px',
      }}>
        <span>📍</span>
        <span style={{ flex: 1 }}>{event.venue}</span>
      </div>

      {/* Admin actions */}
      {isAdmin && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <button
            onClick={() => onEdit(event)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '7px',
              background: 'rgba(108,99,255,0.1)',
              border: '1px solid rgba(108,99,255,0.3)',
              color: '#6c63ff',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,99,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(108,99,255,0.1)'}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(event._id)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '7px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
