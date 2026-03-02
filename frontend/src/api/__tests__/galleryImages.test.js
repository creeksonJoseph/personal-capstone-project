import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGalleryImages, createGalleryImage, deleteGalleryImage } from '../galleryImages';
import api from '../../config/api';

vi.mock('../../config/api');

describe('Gallery Images API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchGalleryImages', () => {
    it('should fetch all gallery images successfully', async () => {
      const mockImages = [
        { id: 1, image: 'https://example.com/image1.jpg', caption: 'Image 1' },
        { id: 2, image: 'https://example.com/image2.jpg', caption: 'Image 2' },
      ];
      
      api.get.mockResolvedValue({ data: mockImages });

      const result = await fetchGalleryImages();

      expect(api.get).toHaveBeenCalledWith('/gallery-images/');
      expect(result).toEqual(mockImages);
    });

    it('should handle fetch error', async () => {
      const mockError = new Error('Network error');
      api.get.mockRejectedValue(mockError);

      await expect(fetchGalleryImages()).rejects.toThrow('Network error');
    });
  });

  describe('createGalleryImage', () => {
    it('should create a new gallery image successfully', async () => {
      const newImage = { image: 'https://example.com/new.jpg', caption: 'New Image' };
      const createdImage = { id: 3, ...newImage };
      
      api.post.mockResolvedValue({ data: createdImage });

      const result = await createGalleryImage(newImage);

      expect(api.post).toHaveBeenCalledWith('/gallery-images/', newImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      expect(result).toEqual(createdImage);
    });

    it('should handle validation errors', async () => {
      const invalidImage = { image: '' };
      const mockError = new Error('Validation error');
      mockError.response = { status: 400 };
      
      api.post.mockRejectedValue(mockError);

      await expect(createGalleryImage(invalidImage)).rejects.toThrow('Validation error');
    });
  });

  describe('deleteGalleryImage', () => {
    it('should delete a gallery image successfully', async () => {
      api.delete.mockResolvedValue({ data: null });

      await deleteGalleryImage(1);

      expect(api.delete).toHaveBeenCalledWith('/gallery-images/1/');
    });

    it('should handle delete errors', async () => {
      const mockError = new Error('Delete failed');
      api.delete.mockRejectedValue(mockError);

      await expect(deleteGalleryImage(1)).rejects.toThrow('Delete failed');
    });
  });
});
