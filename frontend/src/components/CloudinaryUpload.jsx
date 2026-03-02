import React, { useRef } from 'react';
import { useToast } from '../context/ToastContext';
import { useCloudinaryUpload } from '../hooks/images/useCloudinaryUpload';

const CloudinaryUpload = ({ onUploadComplete, multiple = false, folder = 'default' }) => {
  const fileInputRef = useRef(null);
  const { showToast } = useToast();
  
  // Use custom upload hook
  const { uploadFile, uploading, progress } = useCloudinaryUpload(onUploadComplete, showToast);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    if (multiple) {
      // Upload multiple files
      for (const file of files) {
        await uploadFile(file);
      }
    } else {
      // Upload single file
      await uploadFile(files[0]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        id="cloudinary-upload"
      />
      <label
        htmlFor="cloudinary-upload"
        className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-sky-blue/30 rounded-lg hover:border-primary transition-colors ${
          uploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span className="material-symbols-outlined">cloud_upload</span>
        <span className="text-sm font-medium">
          {uploading ? `Uploading... ${progress}%` : 'Choose Image'}
        </span>
      </label>
    </div>
  );
};

export default CloudinaryUpload;
