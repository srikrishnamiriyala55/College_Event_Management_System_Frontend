import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { eventsAPI } from '../utils/api';

const StatCard = ({ emoji, label, value, color = '#6c63ff', sub }) => (
  <div style={{
    background: '#1a1d27',
    border: '1px solid #252836',
    borderRadius: '12px',
    padding: '20px 24px',
    flex: 1,
    minWidth: '140px',
  }}>
    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{emoji}</div>
    <div style={{ fontSize: '28px', fontWeight: '700', color, fontFamily: "'Sora', sans-serif" }}>{value}</div>
    <div style={{ fontSize: '13px', color: '#9096b0', marginTop: '2px' }}>{label}</div>
    {sub && <div style={{ fontSize: '11px', color: '#5a607a', marginTop: '4px' }}>{sub}</div>}
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventsAPI.getAll()
      .then(({ data }) => setEvents(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const upcoming = events.filter(e => new Date(e.date) >= now);
  const past = events.filter(e => new Date(e.date) < now);
  const nextEvent = upcoming.sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>
      <Navbar />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Hero greeting */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.12) 0%, rgba(108,99,255,0.04) 100%)',
          border: '1px solid rgba(108,99,255,0.2)',
          borderRadius: '16px',
          padding: '28px 32px',
          marginBottom: '28px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: '-20px', top: '-20px',
            fontSize: '100px', opacity: 0.07, pointerEvents: 'none',
          }}>🎓</div>
          <div style={{
            fontSize: '13px', color: '#6c63ff',
            fontWeight: '600', textTransform: 'uppercase',
            letterSpacing: '0.08em', marginBottom: '6px',
          }}>
            {user?.role === 'admin' ? '🛡️ Administrator' : '🎓 Student Portal'}
          </div>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '26px', fontWeight: '800',
            color: '#f0f0f5', letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}>
            {greeting}, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p style={{ color: '#9096b0', fontSize: '14px' }}>
            {user?.role === 'admin'
              ? 'Manage college events and keep students informed.'
              : 'Check out upcoming events and stay connected with campus life.'}
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <StatCard emoji="📅" label="Total Events" value={loading ? '—' : events.length} color="#6c63ff" />
          <StatCard emoji="🚀" label="Upcoming" value={loading ? '—' : upcoming.length} color="#22c55e" />
          <StatCard emoji="📖" label="Past Events" value={loading ? '—' : past.length} color="#9096b0" />
          {user?.role === 'admin' && (
            <StatCard emoji="🛡️" label="Your Role" value="Admin" color="#f59e0b" />
          )}
        </div>

        {/* Next event highlight */}
        {nextEvent && (
          <div style={{
            background: '#1a1d27',
            border: '1px solid #252836',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '28px',
          }}>
            <div style={{ fontSize: '12px', color: '#6c63ff', fontWeight: '600', letterSpacing: '0.06em', marginBottom: '10px' }}>
              NEXT UPCOMING EVENT
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '18px', fontWeight: '700', color: '#f0f0f5', marginBottom: '6px',
                }}>{nextEvent.title}</h3>
                <p style={{ color: '#9096b0', fontSize: '13px', marginBottom: '8px', maxWidth: '500px' }}>
                  {nextEvent.description}
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', color: '#9096b0' }}>
                    📅 {new Date(nextEvent.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span style={{ fontSize: '13px', color: '#9096b0' }}>📍 {nextEvent.venue}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/events')}
                style={{
                  padding: '10px 18px',
                  background: 'rgba(108,99,255,0.12)',
                  border: '1px solid rgba(108,99,255,0.3)',
                  borderRadius: '8px', color: '#6c63ff',
                  fontWeight: '600', fontSize: '13px', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                View All →
              </button>
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
        }}>
          <QuickAction
            emoji="📋"
            title="Browse Events"
            desc="See all college events"
            onClick={() => navigate('/events')}
          />
          {user?.role === 'admin' && (
            <QuickAction
              emoji="⚙️"
              title="Manage Events"
              desc="Create, edit, delete events"
              onClick={() => navigate('/admin/events')}
              accent
            />
          )}
        </div>
      </main>
    </div>
  );
};

const QuickAction = ({ emoji, title, desc, onClick, accent }) => (
  <div
    onClick={onClick}
    style={{
      background: accent ? 'rgba(108,99,255,0.08)' : '#1a1d27',
      border: `1px solid ${accent ? 'rgba(108,99,255,0.25)' : '#252836'}`,
      borderRadius: '12px', padding: '18px 20px',
      cursor: 'pointer', transition: 'all 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
  >
    <div style={{ fontSize: '22px', marginBottom: '8px' }}>{emoji}</div>
    <div style={{ fontWeight: '600', color: '#f0f0f5', fontSize: '14px', marginBottom: '3px' }}>{title}</div>
    <div style={{ fontSize: '12px', color: '#9096b0' }}>{desc}</div>
  </div>
);

export default Dashboard;
