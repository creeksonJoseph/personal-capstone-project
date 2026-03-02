import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPosts, fetchPost, createPost, updatePost, deletePost } from '../posts';
import api from '../../config/api';

vi.mock('../../config/api');

describe('Posts API - Edge Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchPosts edge cases', () => {
    it('should handle empty array response', async () => {
      api.get.mockResolvedValue({ data: [] });

      const result = await fetchPosts();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle null response data', async () => {
      api.get.mockResolvedValue({ data: null });

      const result = await fetchPosts();

      expect(result).toBeNull();
    });

    it('should handle timeout error', async () => {
      const timeoutError = new Error('timeout of 5000ms exceeded');
      timeoutError.code = 'ECONNABORTED';
      api.get.mockRejectedValue(timeoutError);

      await expect(fetchPosts()).rejects.toThrow('timeout');
    });

    it('should handle server error (500)', async () => {
      const serverError = new Error('Internal Server Error');
      serverError.response = { status: 500, data: { detail: 'Server error' } };
      api.get.mockRejectedValue(serverError);

      await expect(fetchPosts()).rejects.toThrow('Internal Server Error');
    });
  });

  describe('fetchPost edge cases', () => {
    it('should handle null id', async () => {
      api.get.mockResolvedValue({ data: null });

      const result = await fetchPost(null);

      expect(api.get).toHaveBeenCalledWith('/posts/null/');
    });

    it('should handle undefined id', async () => {
      api.get.mockResolvedValue({ data: null });

      const result = await fetchPost(undefined);

      expect(api.get).toHaveBeenCalledWith('/posts/undefined/');
    });

    it('should handle negative id', async () => {
      const mockPost = { id: -1, title: 'Test' };
      api.get.mockResolvedValue({ data: mockPost });

      const result = await fetchPost(-1);

      expect(api.get).toHaveBeenCalledWith('/posts/-1/');
    });

    it('should handle very large id', async () => {
      const largeId = Number.MAX_SAFE_INTEGER;
      api.get.mockResolvedValue({ data: { id: largeId } });

      const result = await fetchPost(largeId);

      expect(api.get).toHaveBeenCalledWith(`/posts/${largeId}/`);
    });

    it('should handle 401 unauthorized error', async () => {
      const authError = new Error('Unauthorized');
      authError.response = { status: 401, data: { detail: 'Authentication required' } };
      api.get.mockRejectedValue(authError);

      await expect(fetchPost(1)).rejects.toThrow('Unauthorized');
    });

    it('should handle 403 forbidden error', async () => {
      const forbiddenError = new Error('Forbidden');
      forbiddenError.response = { status: 403, data: { detail: 'Permission denied' } };
      api.get.mockRejectedValue(forbiddenError);

      await expect(fetchPost(1)).rejects.toThrow('Forbidden');
    });
  });

  describe('createPost edge cases', () => {
    it('should handle empty object', async () => {
      const emptyPost = {};
      const mockError = new Error('Validation error');
      mockError.response = { status: 400 };
      api.post.mockRejectedValue(mockError);

      await expect(createPost(emptyPost)).rejects.toThrow('Validation error');
    });

    it('should handle null data', async () => {
      api.post.mockResolvedValue({ data: null });

      const result = await createPost(null);

      expect(result).toBeNull();
    });

    it('should handle very long title', async () => {
      const longTitle = 'a'.repeat(10000);
      const post = { title: longTitle, content: 'test' };
      const createdPost = { id: 1, ...post };
      api.post.mockResolvedValue({ data: createdPost });

      const result = await createPost(post);

      expect(result.title).toHaveLength(10000);
    });

    it('should handle special characters in title', async () => {
      const specialTitle = '<script>alert("xss")</script>';
      const post = { title: specialTitle, content: 'test' };
      const createdPost = { id: 1, ...post };
      api.post.mockResolvedValue({ data: createdPost });

      const result = await createPost(post);

      expect(result.title).toBe(specialTitle);
    });

    it('should handle unicode characters', async () => {
      const unicodeTitle = '你好世界 🌍 مرحبا';
      const post = { title: unicodeTitle, content: 'test' };
      const createdPost = { id: 1, ...post };
      api.post.mockResolvedValue({ data: createdPost });

      const result = await createPost(post);

      expect(result.title).toBe(unicodeTitle);
    });

    it('should handle rate limit error (429)', async () => {
      const rateLimitError = new Error('Too Many Requests');
      rateLimitError.response = { 
        status: 429, 
        data: { detail: 'Rate limit exceeded' },
        headers: { 'retry-after': '60' }
      };
      api.post.mockRejectedValue(rateLimitError);

      await expect(createPost({ title: 'Test' })).rejects.toThrow('Too Many Requests');
    });

    it('should handle multiple validation errors', async () => {
      const invalidPost = { title: '', content: '', author: '' };
      const mockError = new Error('Validation error');
      mockError.response = { 
        status: 400, 
        data: { 
          title: ['This field is required'],
          content: ['This field is required'],
          author: ['This field is required']
        } 
      };
      api.post.mockRejectedValue(mockError);

      await expect(createPost(invalidPost)).rejects.toThrow('Validation error');
    });
  });

  describe('updatePost edge cases', () => {
    it('should handle partial update with single field', async () => {
      const partialUpdate = { title: 'New Title' };
      const updatedPost = { id: 1, title: 'New Title', content: 'Original' };
      api.put.mockResolvedValue({ data: updatedPost });

      const result = await updatePost(1, partialUpdate);

      expect(result).toEqual(updatedPost);
    });

    it('should handle empty update object', async () => {
      const emptyUpdate = {};
      api.put.mockResolvedValue({ data: { id: 1, title: 'Unchanged' } });

      const result = await updatePost(1, emptyUpdate);

      expect(result.title).toBe('Unchanged');
    });

    it('should handle concurrent update conflict (409)', async () => {
      const conflictError = new Error('Conflict');
      conflictError.response = { 
        status: 409, 
        data: { detail: 'Resource was modified by another user' } 
      };
      api.put.mockRejectedValue(conflictError);

      await expect(updatePost(1, { title: 'Test' })).rejects.toThrow('Conflict');
    });

    it('should handle updating non-existent post', async () => {
      const notFoundError = new Error('Not found');
      notFoundError.response = { status: 404 };
      api.put.mockRejectedValue(notFoundError);

      await expect(updatePost(999, { title: 'Test' })).rejects.toThrow('Not found');
    });
  });

  describe('deletePost edge cases', () => {
    it('should handle deleting already deleted post', async () => {
      const notFoundError = new Error('Not found');
      notFoundError.response = { status: 404 };
      api.delete.mockRejectedValue(notFoundError);

      await expect(deletePost(1)).rejects.toThrow('Not found');
    });

    it('should handle deleting with invalid id type', async () => {
      api.delete.mockResolvedValue({ data: null });

      await deletePost('invalid');

      expect(api.delete).toHaveBeenCalledWith('/posts/invalid/');
    });

    it('should handle cascade delete restrictions', async () => {
      const constraintError = new Error('Cannot delete');
      constraintError.response = { 
        status: 409, 
        data: { detail: 'Post has related comments' } 
      };
      api.delete.mockRejectedValue(constraintError);

      await expect(deletePost(1)).rejects.toThrow('Cannot delete');
    });

    it('should handle permission denied on delete', async () => {
      const permissionError = new Error('Forbidden');
      permissionError.response = { status: 403 };
      api.delete.mockRejectedValue(permissionError);

      await expect(deletePost(1)).rejects.toThrow('Forbidden');
    });
  });

  describe('Network edge cases', () => {
    it('should handle network disconnection', async () => {
      const networkError = new Error('Network Error');
      networkError.code = 'ERR_NETWORK';
      api.get.mockRejectedValue(networkError);

      await expect(fetchPosts()).rejects.toThrow('Network Error');
    });

    it('should handle DNS resolution failure', async () => {
      const dnsError = new Error('getaddrinfo ENOTFOUND');
      dnsError.code = 'ENOTFOUND';
      api.get.mockRejectedValue(dnsError);

      await expect(fetchPosts()).rejects.toThrow('ENOTFOUND');
    });

    it('should handle connection refused', async () => {
      const connError = new Error('connect ECONNREFUSED');
      connError.code = 'ECONNREFUSED';
      api.get.mockRejectedValue(connError);

      await expect(fetchPosts()).rejects.toThrow('ECONNREFUSED');
    });
  });
});
