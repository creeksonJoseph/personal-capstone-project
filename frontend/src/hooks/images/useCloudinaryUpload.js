/**
 * useCloudinaryUpload Hook
 * Handles Cloudinary image upload with signature
 */

import { useState } from 'react';
import { getUploadSignature } from '../../api/cloudinary';

export const useCloudinaryUpload = (onUploadComplete, showToast) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file) => {
    if (!file) return;

    try {
      setUploading(true);
      setProgress(0);

      // Step 1: Get signature from backend
      const signatureData = await getUploadSignature();

      // Step 2: Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Step 3: Upload to Cloudinary with signature
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signatureData.api_key);
      formData.append('timestamp', signatureData.timestamp);
      formData.append('signature', signatureData.signature);
      formData.append('folder', signatureData.folder);
      formData.append('upload_preset', signatureData.upload_preset);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      clearInterval(progressInterval);

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const uploadResult = await uploadResponse.json();
      setProgress(100);

      console.log('[useCloudinaryUpload] Upload successful:', uploadResult);
      console.log('[useCloudinaryUpload] Calling onUploadComplete with:', {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        fileName: file.name,
      });

      // Call the completion callback
      if (onUploadComplete) {
        try {
          onUploadComplete({
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            fileName: file.name,
          });
          console.log('[useCloudinaryUpload] onUploadComplete called successfully');
        } catch (callbackError) {
          console.error('[useCloudinaryUpload] Error in onUploadComplete callback:', callbackError);
          throw callbackError;
        }
      }

      if (showToast) {
        showToast('Image uploaded successfully', 'success');
      }

      return uploadResult;
    } catch (error) {
      console.error('Upload error:', error);
      if (showToast) {
        showToast('Failed to upload image', 'error');
      }
      throw error;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return {
    uploadFile,
    uploading,
    progress,
  };
};
