import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPosts, fetchPost, createPost, updatePost, deletePost } from '../posts';
import api from '../../config/api';

// Mock the api module
vi.mock('../../config/api');

describe('Posts API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchPosts', () => {
    it('should fetch all posts successfully', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1', status: 'published' },
        { id: 2, title: 'Post 2', status: 'draft' },
      ];
      
      api.get.mockResolvedValue({ data: mockPosts });

      const result = await fetchPosts();

      expect(api.get).toHaveBeenCalledWith('/posts/');
      expect(result).toEqual(mockPosts);
    });

    it('should handle fetch posts error', async () => {
      const mockError = new Error('Network error');
      api.get.mockRejectedValue(mockError);

      await expect(fetchPosts()).rejects.toThrow('Network error');
    });
  });

  describe('fetchPost', () => {
    it('should fetch a single post by ID', async () => {
      const mockPost = { id: 1, title: 'Test Post', content: 'Content' };
      api.get.mockResolvedValue({ data: mockPost });

      const result = await fetchPost(1);

      expect(api.get).toHaveBeenCalledWith('/posts/1/');
      expect(result).toEqual(mockPost);
    });

    it('should handle 404 error for non-existent post', async () => {
      const mockError = new Error('Not found');
      mockError.response = { status: 404 };
      api.get.mockRejectedValue(mockError);

      await expect(fetchPost(999)).rejects.toThrow('Not found');
    });
  });

  describe('createPost', () => {
    it('should create a new post successfully', async () => {
      const newPost = { title: 'New Post', content: 'Content', status: 'draft' };
      const createdPost = { id: 1, ...newPost };
      
      api.post.mockResolvedValue({ data: createdPost });

      const result = await createPost(newPost);

      expect(api.post).toHaveBeenCalledWith('/posts/', newPost, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      expect(result).toEqual(createdPost);
    });

    it('should handle validation errors', async () => {
      const invalidPost = { title: '' }; // Missing required fields
      const mockError = new Error('Validation error');
      mockError.response = { status: 400, data: { title: ['This field is required'] } };
      
      api.post.mockRejectedValue(mockError);

      await expect(createPost(invalidPost)).rejects.toThrow('Validation error');
    });
  });

  describe('updatePost', () => {
    it('should update an existing post', async () => {
      const updatedData = { title: 'Updated Title' };
      const updatedPost = { id: 1, title: 'Updated Title', content: 'Content' };
      
      api.put.mockResolvedValue({ data: updatedPost });

      const result = await updatePost(1, updatedData);

      expect(api.put).toHaveBeenCalledWith('/posts/1/', updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      expect(result).toEqual(updatedPost);
    });

    it('should handle update errors', async () => {
      const mockError = new Error('Update failed');
      api.put.mockRejectedValue(mockError);

      await expect(updatePost(1, {})).rejects.toThrow('Update failed');
    });
  });

  describe('deletePost', () => {
    it('should delete a post successfully', async () => {
      api.delete.mockResolvedValue({ data: null });

      await deletePost(1);

      expect(api.delete).toHaveBeenCalledWith('/posts/1/');
    });

    it('should handle delete errors', async () => {
      const mockError = new Error('Delete failed');
      api.delete.mockRejectedValue(mockError);

      await expect(deletePost(1)).rejects.toThrow('Delete failed');
    });
  });
});
