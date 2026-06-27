import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';

const EventModal = ({ event, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        venue: event.venue || '',
      });
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      backdropFilter: 'blur(4px)',
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: '#1a1d27',
        border: '1px solid #252836',
        borderRadius: '16px',
        padding: '28px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.2s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '18px',
            fontWeight: '700',
            color: '#f0f0f5',
          }}>
            {event?._id ? '✏️ Edit Event' : '➕ Create Event'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9096b0',
              fontSize: '20px',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '4px 8px',
              borderRadius: '6px',
            }}
          >×</button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#ef4444',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '13px',
            marginBottom: '16px',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Event Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Annual Tech Fest 2025"
            required
          />
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block', fontSize: '13px', fontWeight: '500',
              color: '#9096b0', marginBottom: '6px',
            }}>Description <span style={{ color: '#6c63ff' }}>*</span></label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the event..."
              required
              rows={3}
              style={{
                width: '100%', padding: '11px 14px',
                background: '#0f1117', border: '1.5px solid #252836',
                borderRadius: '8px', color: '#f0f0f5', fontSize: '14px',
                resize: 'vertical', fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#6c63ff'}
              onBlur={e => e.currentTarget.style.borderColor = '#252836'}
            />
          </div>
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            required
          />
          <Input
            label="Venue"
            value={form.venue}
            onChange={e => setForm({ ...form, venue: e.target.value })}
            placeholder="Main Auditorium, Block A"
            required
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} style={{ flex: 1 }}>
              {event?._id ? 'Save Changes' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EventModal;
