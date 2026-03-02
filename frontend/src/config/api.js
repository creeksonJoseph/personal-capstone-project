/**
 * API Configuration
 * Centralized configuration for all API calls
 */

import axios from 'axios';

// Base URL for all API requests
export const BASE_URL = import.meta.env.VITE_API_URL || 'https://birch-hills-school.onrender.com/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include credentials (cookies) in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - could redirect to login
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
