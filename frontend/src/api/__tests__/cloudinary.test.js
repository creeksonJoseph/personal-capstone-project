import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUploadSignature, deleteCloudinaryImage } from '../cloudinary';
import api from '../../config/api';

vi.mock('../../config/api');

describe('Cloudinary API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUploadSignature', () => {
    it('should get upload signature successfully', async () => {
      const mockSignature = {
        signature: 'abc123',
        timestamp: 1234567890,
        api_key: 'test_key',
        cloud_name: 'test_cloud',
      };
      
      api.post.mockResolvedValue({ data: mockSignature });

      const result = await getUploadSignature();

      expect(api.post).toHaveBeenCalledWith('/cloudinary/signature/');
      expect(result).toEqual(mockSignature);
    });

    it('should handle signature generation error', async () => {
      const mockError = new Error('Failed to generate signature');
      api.post.mockRejectedValue(mockError);

      await expect(getUploadSignature()).rejects.toThrow('Failed to generate signature');
    });
  });

  describe('deleteCloudinaryImage', () => {
    it('should delete image successfully', async () => {
      const publicId = 'test/image123';
      const mockResponse = { result: 'ok' };
      
      api.post.mockResolvedValue({ data: mockResponse });

      const result = await deleteCloudinaryImage(publicId);

      expect(api.post).toHaveBeenCalledWith('/cloudinary/delete/', { public_id: publicId });
      expect(result).toEqual(mockResponse);
    });

    it('should handle delete errors', async () => {
      const publicId = 'test/image123';
      const mockError = new Error('Delete failed');
      api.post.mockRejectedValue(mockError);

      await expect(deleteCloudinaryImage(publicId)).rejects.toThrow('Delete failed');
    });

    it('should handle non-existent image', async () => {
      const publicId = 'nonexistent/image';
      const mockError = new Error('Image not found');
      mockError.response = { status: 404 };
      api.post.mockRejectedValue(mockError);

      await expect(deleteCloudinaryImage(publicId)).rejects.toThrow('Image not found');
    });
  });
});
