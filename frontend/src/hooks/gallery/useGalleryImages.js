/**
 * useGalleryImages Hook
 * Manages gallery images with backend integration
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchGalleryImages, createGalleryImage, deleteGalleryImage } from '../../api/galleryImages';

export const useGalleryImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGalleryImages();
      setImages(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch images');
      console.error('Error fetching gallery images:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const addImage = async (imageData) => {
    try {
      const newImage = await createGalleryImage(imageData);
      setImages((prev) => [...prev, newImage]);
      return newImage;
    } catch (err) {
      console.error('Error adding image:', err);
      throw err;
    }
  };

  const removeImage = async (id) => {
    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error('Error deleting image:', err);
      throw err;
    }
  };

  return {
    images,
    loading,
    error,
    addImage,
    removeImage,
    refresh: loadImages,
  };
};
