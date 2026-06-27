import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await authAPI.login(form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f1117',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-200px', right: '-200px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-200px', left: '-200px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg, #6c63ff, #857dff)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px',
            margin: '0 auto 14px',
            boxShadow: '0 8px 32px rgba(108,99,255,0.3)',
          }}>🎓</div>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '24px',
            fontWeight: '800',
            color: '#f0f0f5',
            letterSpacing: '-0.02em',
          }}>Welcome back</h1>
          <p style={{ color: '#9096b0', fontSize: '14px', marginTop: '6px' }}>
            Sign in to your college account
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#1a1d27',
          border: '1px solid #252836',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
        }}>
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#ef4444',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '13px',
              marginBottom: '20px',
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@college.edu"
              required
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
            />
            <Button
              type="submit"
              loading={loading}
              style={{ width: '100%', marginTop: '8px', padding: '13px' }}
            >
              Sign in
            </Button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#9096b0', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#6c63ff', fontWeight: '600' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
