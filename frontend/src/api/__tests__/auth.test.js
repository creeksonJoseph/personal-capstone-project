import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login, logout, checkAuth } from '../auth';
import api from '../../config/api';

vi.mock('../../config/api');

describe('Auth API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  describe('login', () => {
    it('should login successfully and store token', async () => {
      const credentials = { username: 'admin', password: 'password123' };
      const mockResponse = {
        access: 'access_token_123',
        refresh: 'refresh_token_456',
        user: { id: 1, username: 'admin' },
      };
      
      api.post.mockResolvedValue({ data: mockResponse });

      const result = await login(credentials);

      expect(api.post).toHaveBeenCalledWith('/login/', credentials);
      expect(result).toEqual(mockResponse);
    });

    it('should handle invalid credentials', async () => {
      const credentials = { username: 'wrong', password: 'wrong' };
      const mockError = new Error('Invalid credentials');
      mockError.response = { status: 401, data: { detail: 'Invalid credentials' } };
      
      api.post.mockRejectedValue(mockError);

      await expect(login(credentials)).rejects.toThrow('Invalid credentials');
    });

    it('should handle network errors', async () => {
      const credentials = { username: 'admin', password: 'password' };
      const mockError = new Error('Network error');
      
      api.post.mockRejectedValue(mockError);

      await expect(login(credentials)).rejects.toThrow('Network error');
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      api.post.mockResolvedValue({ data: { message: 'Logged out' } });

      await logout();

      expect(api.post).toHaveBeenCalledWith('/logout/');
    });

    it('should handle logout errors', async () => {
      const mockError = new Error('Logout failed');
      api.post.mockRejectedValue(mockError);

      await expect(logout()).rejects.toThrow('Logout failed');
    });
  });

  describe('checkAuth', () => {
    it('should verify valid authentication', async () => {
      const mockUser = { id: 1, username: 'admin', email: 'admin@example.com' };
      api.get.mockResolvedValue({ data: mockUser });

      const result = await checkAuth();

      expect(api.get).toHaveBeenCalledWith('/check-auth/');
      expect(result).toEqual(mockUser);
    });

    it('should handle unauthenticated state', async () => {
      const mockError = new Error('Unauthorized');
      mockError.response = { status: 401 };
      api.get.mockRejectedValue(mockError);

      await expect(checkAuth()).rejects.toThrow('Unauthorized');
    });
  });
});
