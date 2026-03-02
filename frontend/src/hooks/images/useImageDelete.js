/**
 * useImageDelete Hook
 * Handles deletion of images from Cloudinary
 */

import { useState } from 'react';
import { deleteCloudinaryImage } from '../../api/cloudinary';

export const useImageDelete = (showToast) => {
  const [deleting, setDeleting] = useState(false);

  const deleteImage = async (publicId) => {
    if (!publicId) return;

    try {
      setDeleting(true);
      await deleteCloudinaryImage(publicId);
      
      if (showToast) {
        showToast('Image removed successfully', 'success');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      if (showToast) {
        showToast('Failed to delete image from cloud storage', 'error');
      }
      throw error;
    } finally {
      setDeleting(false);
    }
  };

  return {
    deleteImage,
    deleting,
  };
};
