import axios from 'axios';

const BASE_URL = 'https://college-event-management-system-backend-1.onrender.com/api';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('cms_user');
  if (stored) {
    try {
      const user = JSON.parse(stored);
      if (user.token) config.headers.Authorization = `Bearer ${user.token}`;
    } catch {}
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const eventsAPI = {
  getAll: () => api.get('/events'),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

export default api;
