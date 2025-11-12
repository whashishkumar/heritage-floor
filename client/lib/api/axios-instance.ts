import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_CONFIG } from "./config";
import Cookies from "js-cookie";

const token = Cookies.get("__next_hmr_refresh_hash__");

// Create axios instance
export const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
    // Token: `${token}`,
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  // You can add custom logic here (e.g., add tokens)
  (config) => {
    // const token = Cookies.get("__next_hmr_refresh_hash__");
    // if (token) {
    //   config.headers.Authorization = `Bearer${token}`;
    // }
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
