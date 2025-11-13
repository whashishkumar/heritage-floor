import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_CONFIG } from "./config";
import Cookies from "js-cookie";
const token = Cookies.get("__next_hmr_refresh_hash__");

const tokenobj = Cookies.get();
console.log(tokenobj, "Outer Token Log");

// Create axios instance
export const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token");
    if (token) {
      console.log(token, "Inner Token Log");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(" Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(` API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      console.error(
        ` API Error: ${error.response.status} ${error.config?.url}`,
        error.response.data
      );
    } else if (error.request) {
      // Request was made but no response
      console.error(" Network Error: No response received", error.message);
    } else {
      // Something else happened
      console.error(" Error:", error.message);
    }
    return Promise.reject(error);
  }
);
