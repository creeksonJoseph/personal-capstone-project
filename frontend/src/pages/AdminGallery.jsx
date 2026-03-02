import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import { useGalleryImages } from "../hooks/gallery/useGalleryImages";
import { useToast } from "../context/ToastContext";

const AdminGallery = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { images, loading, error, removeImage } = useGalleryImages();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const requestDeleteImage = (id) => {
    setSelectedImageId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteImage = async () => {
    try {
      setDeleting(true);
      await removeImage(selectedImageId);
      showToast('Image deleted successfully!', 'success');
      setIsDeleteModalOpen(false);
      setSelectedImageId(null);
    } catch (err) {
      showToast('Failed to delete image', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedImageId(null);
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-charcoal">Photo Gallery</h1>
            <p className="text-charcoal/60 mt-1">
              Manage and organize photos in the school gallery
            </p>
          </div>
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => navigate("/admin/add-images")}
          >
            <span className="material-symbols-outlined mr-2">
              add_photo_alternate
            </span>
            Add Images
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-4xl text-red-500 mb-2 block">
              error
            </span>
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white border border-sky-blue/20 rounded-xl shadow-sm p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-charcoal/60">Loading gallery images...</p>
          </div>
        )}

        {/* Image Gallery Grid */}
        {!loading && !error && images.length > 0 && (
          <div className="bg-white border border-sky-blue/20 rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-video rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={image.image}
                      alt={image.alt_text || "Gallery image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-red-100 transition-colors"
                      onClick={() => requestDeleteImage(image.id)}
                      title="Delete image"
                      aria-label={`Delete image ${image.alt_text}`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-charcoal/60">{image.alt_text || "No description"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && images.length === 0 && (
          <div className="bg-white border border-sky-blue/20 rounded-xl shadow-sm p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-charcoal/30 mb-4 block">
              photo_library
            </span>
            <p className="text-charcoal/60 mb-4">No images in the gallery yet.</p>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              onClick={() => navigate("/admin/add-images")}
            >
              <span className="material-symbols-outlined mr-2">
                add_photo_alternate
              </span>
              Add Your First Images
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText={deleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={confirmDeleteImage}
        onCancel={cancelDelete}
        disabled={deleting}
      />
    </AdminLayout>
  );
};

export default AdminGallery;
