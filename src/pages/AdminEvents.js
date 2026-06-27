import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import Button from '../components/Button';
import { eventsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AdminEvents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  // Redirect non-admins
  useEffect(() => {
    if (user && user.role !== 'admin') navigate('/dashboard');
  }, [user, navigate]);

  const fetchEvents = () => {
    setLoading(true);
    eventsAPI.getAll()
      .then(({ data }) => setEvents(data))
      .catch(() => showToast('Failed to load events', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEvents(); }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (form) => {
    await eventsAPI.create(form);
    fetchEvents();
    showToast('Event created successfully!');
  };

  const handleEdit = async (form) => {
    await eventsAPI.update(editingEvent._id, form);
    fetchEvents();
    showToast('Event updated!');
  };

  const handleDelete = async (id) => {
    try {
      await eventsAPI.delete(id);
      setEvents(prev => prev.filter(e => e._id !== id));
      showToast('Event deleted.');
    } catch {
      showToast('Failed to delete event.', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const openCreate = () => { setEditingEvent(null); setModalOpen(true); };
  const openEdit = (event) => { setEditingEvent(event); setModalOpen(true); };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>
      <Navbar />

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 300,
          background: toast.type === 'error' ? '#ef4444' : '#22c55e',
          color: '#fff', borderRadius: '8px',
          padding: '12px 20px', fontSize: '13px', fontWeight: '600',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          animation: 'slideIn 0.2s ease',
        }}>
          {toast.type === 'error' ? '❌' : '✅'} {toast.msg}
        </div>
      )}

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px',
        }}>
          <div>
            <div style={{
              fontSize: '12px', color: '#6c63ff', fontWeight: '600',
              letterSpacing: '0.08em', marginBottom: '4px',
            }}>🛡️ ADMIN PANEL</div>
            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '26px', fontWeight: '800',
              color: '#f0f0f5', letterSpacing: '-0.02em',
            }}>Manage Events</h1>
            <p style={{ color: '#9096b0', fontSize: '14px', marginTop: '4px' }}>
              {events.length} total event{events.length !== 1 ? 's' : ''} in the system
            </p>
          </div>
          <Button onClick={openCreate} style={{ padding: '11px 20px' }}>
            + Create Event
          </Button>
        </div>

        {/* Events grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9096b0' }}>
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#1a1d27', border: '1px solid #252836',
            borderRadius: '16px',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <p style={{ color: '#9096b0', marginBottom: '20px' }}>No events yet. Create the first one!</p>
            <Button onClick={openCreate}>+ Create Event</Button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}>
            {[...events].sort((a, b) => new Date(b.date) - new Date(a.date)).map(event => (
              <EventCard
                key={event._id}
                event={event}
                isAdmin
                onEdit={openEdit}
                onDelete={(id) => setDeleteConfirm(id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <EventModal
          event={editingEvent}
          onClose={() => setModalOpen(false)}
          onSave={editingEvent?._id ? handleEdit : handleCreate}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: '#1a1d27', border: '1px solid #252836',
            borderRadius: '16px', padding: '28px',
            maxWidth: '360px', width: '100%', margin: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗑️</div>
            <h3 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '18px', fontWeight: '700', color: '#f0f0f5', marginBottom: '8px',
            }}>Delete Event?</h3>
            <p style={{ color: '#9096b0', fontSize: '14px', marginBottom: '24px' }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="ghost" onClick={() => setDeleteConfirm(null)} style={{ flex: 1 }}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1 }}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminEvents;
