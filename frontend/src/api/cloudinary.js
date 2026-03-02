/**
 * Cloudinary API
 * All API calls related to Cloudinary image management
 */

import apiClient from '../config/api';

/**
 * Get upload signature for Cloudinary
 */
export const getUploadSignature = async () => {
  const response = await apiClient.post('/cloudinary/signature/');
  return response.data;
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Cloudinary public_id of the image
 */
export const deleteCloudinaryImage = async (publicId) => {
  const response = await apiClient.post('/cloudinary/delete/', {
    public_id: publicId,
  });
  return response.data;
};
