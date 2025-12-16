// src/lib/axiosInstance.js
import axios from "axios";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "https://chatnova-backend-d18a.onrender.com/api",
  withCredentials: true, // required if backend uses cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // JWT stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "Axios error:",
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);
