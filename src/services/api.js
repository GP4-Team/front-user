// src/services/api.js
import axios from 'axios';
import { getToken, removeToken } from '../utils/tokenHelpers';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // For cookies
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - will be implemented when connecting to backend
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // For now, just handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // When you integrate with backend, add token refresh logic here
      removeToken();
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;