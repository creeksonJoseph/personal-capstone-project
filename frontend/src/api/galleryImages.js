/**
 * Gallery Images API
 * All API calls related to gallery images
 */

import apiClient from '../config/api';

/**
 * Fetch all gallery images
 */
export const fetchGalleryImages = async () => {
  const response = await apiClient.get('/gallery-images/');
  return response.data;
};

/**
 * Create a new gallery image
 * @param {FormData} data - Image data
 */
export const createGalleryImage = async (data) => {
  const response = await apiClient.post('/gallery-images/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Delete a gallery image
 * @param {number} id - Gallery image ID
 */
export const deleteGalleryImage = async (id) => {
  const response = await apiClient.delete(`/gallery-images/${id}/`);
  return response.data;
};
