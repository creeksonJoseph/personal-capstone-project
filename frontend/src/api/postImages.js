/**
 * API functions for PostImage (blog post images)
 * Separate from GalleryImage (standalone gallery)
 */

import api from '../config/api';

export const fetchPostImages = async (postId) => {
  const response = await api.get(`/posts/${postId}/images/`);
  return response.data;
};

export const createPostImage = async (imageData) => {
  const response = await api.post('/post-images/', imageData);
  return response.data;
};

export const updatePostImage = async (id, imageData) => {
  const response = await api.put(`/post-images/${id}/`, imageData);
  return response.data;
};

export const deletePostImage = async (id) => {
  const response = await api.delete(`/post-images/${id}/`);
  return response.data;
};
