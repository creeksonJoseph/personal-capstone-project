import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCategories, createCategory } from '../categories';
import api from '../../config/api';

vi.mock('../../config/api');

describe('Categories API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchCategories', () => {
    it('should fetch all categories successfully', async () => {
      const mockCategories = [
        { id: 1, name: 'Technology' },
        { id: 2, name: 'Education' },
      ];
      
      api.get.mockResolvedValue({ data: mockCategories });

      const result = await fetchCategories();

      expect(api.get).toHaveBeenCalledWith('/categories/');
      expect(result).toEqual(mockCategories);
    });

    it('should handle fetch categories error', async () => {
      const mockError = new Error('Network error');
      api.get.mockRejectedValue(mockError);

      await expect(fetchCategories()).rejects.toThrow('Network error');
    });
  });

  describe('createCategory', () => {
    it('should create a new category successfully', async () => {
      const newCategory = { name: 'Science' };
      const createdCategory = { id: 3, name: 'Science' };
      
      api.post.mockResolvedValue({ data: createdCategory });

      const result = await createCategory(newCategory);

      expect(api.post).toHaveBeenCalledWith('/categories/', newCategory);
      expect(result).toEqual(createdCategory);
    });

    it('should handle validation errors', async () => {
      const invalidCategory = { name: '' };
      const mockError = new Error('Validation error');
      mockError.response = { status: 400, data: { name: ['This field is required'] } };
      
      api.post.mockRejectedValue(mockError);

      await expect(createCategory(invalidCategory)).rejects.toThrow('Validation error');
    });

    it('should handle duplicate category name', async () => {
      const duplicateCategory = { name: 'Technology' };
      const mockError = new Error('Category already exists');
      mockError.response = { status: 400 };
      
      api.post.mockRejectedValue(mockError);

      await expect(createCategory(duplicateCategory)).rejects.toThrow('Category already exists');
    });
  });
});
