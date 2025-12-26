import axios, { AxiosError } from 'axios';
import { API_CONFIG } from './config';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('customer_token');
    // Only add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Ensure Authorization header is removed
      if (config.headers) {
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    // If token expired / invalid → logout logic
    if (status === 401 || status === 403) {
      console.warn('🔐 Auth error. Token expired or invalid.');
      Cookies.remove('customer_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
