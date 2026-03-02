import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDeletePost } from '../useDeletePost';
import * as postsApi from '../../../api/posts';

// Mock the posts API
vi.mock('../../../api/posts');

describe('useDeletePost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete post successfully and call onSuccess', async () => {
    const mockOnSuccess = vi.fn();
    const mockShowToast = vi.fn();
    
    postsApi.deletePost.mockResolvedValue({});

    const { result } = renderHook(() => useDeletePost(mockOnSuccess, mockShowToast));

    expect(result.current.deleting).toBe(false);

    await act(async () => {
      await result.current.deletePost(1);
    });

    expect(postsApi.deletePost).toHaveBeenCalledWith(1);
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith('Post deleted successfully!', 'success');
    expect(result.current.deleting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle delete error and show toast', async () => {
    const mockOnSuccess = vi.fn();
    const mockShowToast = vi.fn();
    const mockError = new Error('Delete failed');
    
    postsApi.deletePost.mockRejectedValue(mockError);

    const { result } = renderHook(() => useDeletePost(mockOnSuccess, mockShowToast));

    await expect(async () => {
      await act(async () => {
        await result.current.deletePost(1);
      });
    }).rejects.toThrow('Delete failed');

    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith('Failed to delete post', 'error');
  });

  it('should work without showToast callback', async () => {
    const mockOnSuccess = vi.fn();
    
    postsApi.deletePost.mockResolvedValue({});

    const { result } = renderHook(() => useDeletePost(mockOnSuccess));

    await act(async () => {
      await result.current.deletePost(1);
    });

    expect(postsApi.deletePost).toHaveBeenCalledWith(1);
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('should manage deleting state correctly', async () => {
    const mockOnSuccess = vi.fn();
    
    postsApi.deletePost.mockResolvedValue({});

    const { result } = renderHook(() => useDeletePost(mockOnSuccess));

    expect(result.current.deleting).toBe(false);

    const deletePromise = act(async () => {
      await result.current.deletePost(1);
    });

    await deletePromise;

    expect(result.current.deleting).toBe(false);
    expect(mockOnSuccess).toHaveBeenCalled();
  });
});
