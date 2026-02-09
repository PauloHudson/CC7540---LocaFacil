import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://cc-7540-loca-facil-api-main.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Adicionar token automaticamente a requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (name, email, password, phone, cpf) =>
    api.post('/auth/register', { name, email, password, phone, cpf }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getProfile: () =>
    api.get('/auth/profile'),
};

export const vehicleService = {
  getAll: () => api.get('/vehicles'),
  getAvailable: () => api.get('/vehicles/available'),
  getById: (id) => api.get(`/vehicles/${id}`),
  create: (data) => api.post('/vehicles', data),
  update: (id, data) => api.put(`/vehicles/${id}`, data),
  delete: (id) => api.delete(`/vehicles/${id}`),
};

export const electronicsService = {
  getAll: () => api.get('/electronics'),
  getAvailable: () => api.get('/electronics/available'),
  getById: (id) => api.get(`/electronics/${id}`),
  create: (data) => api.post('/electronics', data),
  update: (id, data) => api.put(`/electronics/${id}`, data),
  delete: (id) => api.delete(`/electronics/${id}`),
};

export const rentalService = {
  create: (data) => api.post('/rentals', data),
  getById: (id) => api.get(`/rentals/${id}`),
  getUserRentals: () => api.get('/rentals/user/my-rentals'),
  getAll: () => api.get('/rentals'),
  processPayment: (id, payment_method) =>
    api.post(`/rentals/${id}/payment`, { payment_method }),
  cancelRental: (id) => api.post(`/rentals/${id}/cancel`),
};

export const insuranceService = {
  getAll: () => api.get('/insurance'),
  getById: (id) => api.get(`/insurance/${id}`),
};

export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (data) => api.put('/users/profile', data),
  makeAdmin: (userId) => api.post(`/users/${userId}/make-admin`),
  deactivate: (userId) => api.delete(`/users/${userId}/deactivate`),
};

export default api;
