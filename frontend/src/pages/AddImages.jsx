import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useGalleryImages } from "../hooks/gallery/useGalleryImages";
import { useCloudinaryUpload } from "../hooks/images/useCloudinaryUpload";
import { BASE_URL } from "../config/api";

const MAX_IMAGES = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const AddImages = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { addImage } = useGalleryImages();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      selectedFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [selectedFiles]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Check total count
    if (selectedFiles.length + files.length > MAX_IMAGES) {
      showToast(`Maximum ${MAX_IMAGES} images per upload`, 'warning');
      return;
    }

    // Validate each file
    const validFiles = [];
    for (const file of files) {
      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        showToast(`${file.name}: Unsupported file type`, 'error');
        continue;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        showToast(`${file.name}: File too large (max 5MB)`, 'error');
        continue;
      }

      validFiles.push({
        file,
        preview: URL.createObjectURL(file),
        alt: file.name.replace(/\.[^/.]+$/, ''),
        caption: '',
      });
    }

    setSelectedFiles([...selectedFiles, ...validFiles]);
    
    // Reset file input
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...selectedFiles];
    const removed = newFiles.splice(index, 1)[0];
    
    // Cleanup blob URL
    if (removed.preview) {
      URL.revokeObjectURL(removed.preview);
    }
    
    setSelectedFiles(newFiles);
  };

  const handleImageChange = (index, field, value) => {
    const newFiles = [...selectedFiles];
    newFiles[index][field] = value;
    setSelectedFiles(newFiles);
  };

  const uploadToCloudinary = async (file) => {
    // Get upload signature from backend
    const signatureResponse = await fetch(`${BASE_URL}/cloudinary/signature/`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!signatureResponse.ok) {
      throw new Error('Failed to get upload signature');
    }

    const signatureData = await signatureResponse.json();

    // Upload to Cloudinary
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

    if (!uploadResponse.ok) {
      throw new Error('Cloudinary upload failed');
    }

    const uploadData = await uploadResponse.json();
    return uploadData.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      showToast('Please select at least one image', 'warning');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      // Upload all to Cloudinary in parallel
      const uploadPromises = selectedFiles.map(async (fileData, index) => {
        const cloudinaryUrl = await uploadToCloudinary(fileData.file);
        
        // Update progress
        setUploadProgress(((index + 1) / selectedFiles.length) * 50);
        
        return {
          image: cloudinaryUrl,
          alt_text: fileData.alt,
          caption: fileData.caption,
          is_active: true,
        };
      });

      const uploadedData = await Promise.all(uploadPromises);

      // Save all to backend sequentially
      for (let i = 0; i < uploadedData.length; i++) {
        await addImage(uploadedData[i]);
        setUploadProgress(50 + ((i + 1) / uploadedData.length) * 50);
      }

      showToast(`Successfully added ${selectedFiles.length} image(s)`, 'success');
      navigate('/admin/gallery');
    } catch (error) {
      console.error('Error uploading images:', error);
      showToast('Failed to upload images. Please try again.', 'error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-charcoal">Add Images</h1>
            <p className="text-charcoal/60 mt-1">
              Add up to {MAX_IMAGES} images to the school gallery
            </p>
          </div>
          <button
            className="px-4 py-2 border border-sky-blue/20 text-charcoal rounded-lg hover:bg-off-white transition-colors"
            onClick={() => navigate("/admin/gallery")}
          >
            <span className="material-symbols-outlined mr-2">arrow_back</span>
            Back to Gallery
          </button>
        </div>

        {/* Add Images Form */}
        <div className="bg-white border border-sky-blue/20 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-charcoal">
                Select Images ({selectedFiles.length}/{MAX_IMAGES})
              </h2>
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed border-sky-blue/30 rounded-lg p-8">
              <div className="text-center space-y-4">
                <span className="material-symbols-outlined text-6xl text-sky-blue/50 mb-4 block">
                  cloud_upload
                </span>
                <p className="text-lg font-medium text-charcoal mb-2">
                  Select images to upload
                </p>
                <p className="text-sm text-charcoal/60 mb-4">
                  Choose up to {MAX_IMAGES} images (JPG, PNG, GIF, WEBP - max 5MB each)
                </p>
                <label className="inline-block">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={selectedFiles.length >= MAX_IMAGES || uploading}
                    className="hidden"
                  />
                  <span className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer inline-flex items-center ${
                    selectedFiles.length >= MAX_IMAGES || uploading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}>
                    <span className="material-symbols-outlined mr-2">
                      add_photo_alternate
                    </span>
                    {selectedFiles.length >= MAX_IMAGES ? 'Maximum Reached' : 'Select Images'}
                  </span>
                </label>
              </div>
            </div>

            {/* Image Previews with Details */}
            {selectedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-charcoal">
                  Selected Images ({selectedFiles.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedFiles.map((fileData, index) => (
                    <div
                      key={index}
                      className="border border-sky-blue/20 rounded-lg p-4 space-y-3"
                    >
                      <div className="relative">
                        <img
                          src={fileData.preview}
                          alt="Preview"
                          className="w-full aspect-video object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          onClick={() => handleRemoveImage(index)}
                          disabled={uploading}
                        >
                          <span className="material-symbols-outlined text-sm">
                            close
                          </span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={fileData.alt}
                          onChange={(e) =>
                            handleImageChange(index, "alt", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-sky-blue/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Alt text (optional)"
                          disabled={uploading}
                        />
                        <p className="text-xs text-charcoal/60">
                          Helps users with screen readers
                        </p>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={fileData.caption}
                          onChange={(e) =>
                            handleImageChange(index, "caption", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-sky-blue/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Caption (optional)"
                          disabled={uploading}
                        />
                      </div>

                      <div className="text-xs text-charcoal/60">
                        {formatFileSize(fileData.file.size)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-sky-blue/20">
              <button
                type="button"
                className="px-4 py-2 border border-sky-blue/20 text-charcoal rounded-lg hover:bg-off-white transition-colors"
                onClick={() => navigate("/admin/gallery")}
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={selectedFiles.length === 0 || uploading}
              >
                <span className="material-symbols-outlined mr-2">
                  {uploading ? 'hourglass_empty' : 'save'}
                </span>
                {uploading ? `Uploading... ${Math.round(uploadProgress)}%` : 'Upload Images'}
              </button>
            </div>
          </form>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            <span className="material-symbols-outlined mr-2">info</span>
            Tips for Adding Images
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-1">
                check_circle
              </span>
              <span>Supported formats: JPG, PNG, GIF, WEBP</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-1">
                check_circle
              </span>
              <span>Maximum file size: 5MB per image</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-1">
                check_circle
              </span>
              <span>Maximum {MAX_IMAGES} images per upload</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-1">
                check_circle
              </span>
              <span>Add descriptive alt text for accessibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-1">
                check_circle
              </span>
              <span>Images upload together when you click "Upload Images"</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Upload Progress Modal */}
      {uploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="text-center space-y-4">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
              <h3 className="text-xl font-semibold text-charcoal">
                Uploading Images...
              </h3>
              <p className="text-charcoal/60">
                {Math.round(uploadProgress)}% complete
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-charcoal/60">
                Please don't close this page
              </p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AddImages;
