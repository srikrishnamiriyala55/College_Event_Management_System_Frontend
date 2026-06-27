import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { eventsAPI } from '../utils/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all | upcoming | past

  useEffect(() => {
    eventsAPI.getAll()
      .then(({ data }) => setEvents(data))
      .catch(() => setError('Could not load events. Make sure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const filtered = events.filter(e => {
    if (filter === 'upcoming') return new Date(e.date) >= now;
    if (filter === 'past') return new Date(e.date) < now;
    return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>
      <Navbar />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '26px', fontWeight: '800',
            color: '#f0f0f5', letterSpacing: '-0.02em', marginBottom: '6px',
          }}>College Events 📅</h1>
          <p style={{ color: '#9096b0', fontSize: '14px' }}>
            Stay up-to-date with everything happening on campus.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: 'flex', gap: '6px',
          marginBottom: '24px',
          background: '#1a1d27',
          border: '1px solid #252836',
          borderRadius: '10px',
          padding: '4px',
          width: 'fit-content',
        }}>
          {['all', 'upcoming', 'past'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '7px 18px',
                borderRadius: '7px',
                border: 'none',
                background: filter === tab ? '#6c63ff' : 'transparent',
                color: filter === tab ? '#fff' : '#9096b0',
                fontWeight: filter === tab ? '600' : '400',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}
            >{tab}</button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div style={{ color: '#9096b0', fontSize: '14px' }}>Loading events...</div>
          </div>
        ) : error ? (
          <div style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '12px', padding: '20px 24px',
            color: '#ef4444', fontSize: '14px',
          }}>{error}</div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            color: '#5a607a', fontSize: '14px',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
            No {filter !== 'all' ? filter : ''} events found.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map(event => (
              <EventCard key={event._id} event={event} isAdmin={false} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Events;
