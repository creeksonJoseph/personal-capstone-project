import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePosts } from '../usePosts';
import * as postsApi from '../../../api/posts';

// Mock the posts API
vi.mock('../../../api/posts');

describe('usePosts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    postsApi.fetchPosts.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    const { result } = renderHook(() => usePosts());

    expect(result.current.loading).toBe(true);
    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should fetch posts successfully', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', status: 'published' },
      { id: 2, title: 'Post 2', status: 'draft' },
    ];
    
    postsApi.fetchPosts.mockResolvedValue(mockPosts);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Failed to fetch posts');
    postsApi.fetchPosts.mockRejectedValue(mockError);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch posts');
  });

  it('should refresh posts when refresh is called', async () => {
    const initialPosts = [{ id: 1, title: 'Post 1' }];
    const updatedPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];
    
    postsApi.fetchPosts
      .mockResolvedValueOnce(initialPosts)
      .mockResolvedValueOnce(updatedPosts);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.posts).toEqual(initialPosts);
    });

    // Call refresh
    result.current.refresh();

    await waitFor(() => {
      expect(result.current.posts).toEqual(updatedPosts);
    });

    expect(postsApi.fetchPosts).toHaveBeenCalledTimes(2);
  });
});
