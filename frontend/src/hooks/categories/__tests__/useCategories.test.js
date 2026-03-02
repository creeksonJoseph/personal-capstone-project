import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useCategories } from '../useCategories';
import * as categoriesApi from '../../../api/categories';
import { useToast } from '../../../context/ToastContext';

// Mock the API and context
vi.mock('../../../api/categories');
vi.mock('../../../context/ToastContext');

describe('useCategories', () => {
  const mockShowToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useToast.mockReturnValue({ showToast: mockShowToast });
  });

  it('should fetch categories successfully', async () => {
    const mockCategories = [
      { id: 1, name: 'Technology' },
      { id: 2, name: 'Education' },
    ];
    
    categoriesApi.fetchCategories.mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Failed to fetch');
    categoriesApi.fetchCategories.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch');
  });

  it('should create a new category successfully', async () => {
    const existingCategories = [{ id: 1, name: 'Tech' }];
    const newCategory = { id: 2, name: 'Science' };
    
    categoriesApi.fetchCategories.mockResolvedValue(existingCategories);
    categoriesApi.createCategory.mockResolvedValue(newCategory);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.categories).toEqual(existingCategories);
    });

    // Create new category using addCategory
    await act(async () => {
      await result.current.addCategory({ name: 'Science' });
    });

    expect(categoriesApi.createCategory).toHaveBeenCalledWith({ name: 'Science' });
    expect(result.current.categories).toHaveLength(2);
  });

  it('should handle create category error', async () => {
    categoriesApi.fetchCategories.mockResolvedValue([]);
    categoriesApi.createCategory.mockRejectedValue(new Error('Create failed'));

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await expect(async () => {
      await act(async () => {
        await result.current.addCategory({ name: 'Test' });
      });
    }).rejects.toThrow('Create failed');
  });

  it('should refresh categories', async () => {
    const initialCategories = [{ id: 1, name: 'Tech' }];
    const updatedCategories = [
      { id: 1, name: 'Tech' },
      { id: 2, name: 'Science' },
    ];
    
    categoriesApi.fetchCategories
      .mockResolvedValueOnce(initialCategories)
      .mockResolvedValueOnce(updatedCategories);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.categories).toEqual(initialCategories);
    });

    result.current.refresh();

    await waitFor(() => {
      expect(result.current.categories).toEqual(updatedCategories);
    });
  });
});
