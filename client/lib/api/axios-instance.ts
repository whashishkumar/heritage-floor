// import axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import { API_CONFIG } from './config';
// import Cookies from 'js-cookie';

// // Create axios instance
// export const api = axios.create({
//   baseURL: API_CONFIG.baseURL,
//   timeout: API_CONFIG.timeout,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('customer_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error(' Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     if (error.response) {
//       // Server responded with error status
//       console.error(
//         ` API Error: ${error.response.status} ${error.config?.url}`,
//         error.response.data
//       );
//     } else if (error.request) {
//       // Request was made but no response
//       console.error(' Network Error: No response received', error.message);
//     } else {
//       // Something else happened
//       console.error(' Error:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

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
      // Optionally redirect:
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
