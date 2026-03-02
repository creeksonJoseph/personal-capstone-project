/**
 * Posts API
 * All API calls related to blog posts
 */

import apiClient from '../config/api';

/**
 * Fetch all posts
 */
export const fetchPosts = async () => {
  const response = await apiClient.get('/posts/');
  return response.data;
};

/**
 * Fetch published posts only
 */
export const fetchPublishedPosts = async () => {
  const response = await apiClient.get('/posts/published/');
  return response.data;
};

/**
 * Fetch a single post by ID
 */
export const fetchPost = async (id) => {
  const response = await apiClient.get(`/posts/${id}/`);
  return response.data;
};

/**
 * Create a new post
 * @param {FormData} data - Post data including images
 */
export const createPost = async (data) => {
  const response = await apiClient.post('/posts/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Update an existing post
 * @param {number} id - Post ID
 * @param {FormData} data - Updated post data
 */
export const updatePost = async (id, data) => {
  const response = await apiClient.put(`/posts/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Delete a post
 * @param {number} id - Post ID
 */
export const deletePost = async (id) => {
  const response = await apiClient.delete(`/posts/${id}/`);
  return response.data;
};
