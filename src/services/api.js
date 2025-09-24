import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Expense API calls
export const expenseAPI = {
  getExpenses: () => api.get('/expenses/'),
  createExpense: (expense) => api.post('/expenses/', expense),
  updateExpense: (id, expense) => api.put(`/expenses/${id}/`, expense),
  deleteExpense: (id) => api.delete(`/expenses/${id}/`),
  getSummary: () => api.get('/expenses/summary/')
};

export default api;