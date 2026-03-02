/**
 * Authentication API
 * All API calls related to user authentication
 */

import apiClient from '../config/api';

/**
 * Login user
 * @param {Object} credentials - { username, password }
 */
export const login = async (credentials) => {
  const response = await apiClient.post('/login/', credentials);
  return response.data;
};

/**
 * Logout user
 */
export const logout = async () => {
  const response = await apiClient.post('/logout/');
  return response.data;
};

/**
 * Check authentication status
 */
export const checkAuth = async () => {
  const response = await apiClient.get('/check-auth/');
  return response.data;
};
