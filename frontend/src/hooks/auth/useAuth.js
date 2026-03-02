/**
 * useAuth Hook
 * Handles authentication (login, logout, auth check)
 */

import { useState, useCallback } from 'react';
import { login as apiLogin, logout as apiLogout, checkAuth as apiCheckAuth } from '../../api/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiLogin(credentials);
      setIsAuthenticated(true);
      return data;
    } catch (err) {
      setError(err.message || 'Login failed');
      setIsAuthenticated(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await apiLogout();
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      await apiCheckAuth();
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    checkAuth,
  };
};
