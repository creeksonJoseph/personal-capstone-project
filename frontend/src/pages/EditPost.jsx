import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import PostEditor from '../components/PostEditor';
import PostSettings from '../components/PostSettings';
import { useToast } from '../context/ToastContext';
import { useUpdatePost } from '../hooks/posts/useUpdatePost';
import { useCategories } from '../hooks/categories/useCategories';

const EditPost = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Use custom hooks for all logic
  const {
    formData,
    loadingPost,
    isSubmitting,
    isSavingDraft,
    handleChange,
    handleEditorContentChange,
    handleFeaturedImageChange,
    handleRemoveFeaturedImage,
    handleGalleryImagesChange,
    handleRemoveGalleryImage,
    handleSubmit,
    handleSaveDraft,
  } = useUpdatePost(id, showToast, navigate);

  const { categories, addCategory } = useCategories();

  if (loadingPost) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading post...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-65px)]">
        <main className="max-w-[1400px] mx-auto flex flex-col lg:flex-row h-full">
          {/* Main Editor Area */}
          <PostEditor
            formData={formData}
            handleChange={handleChange}
            handleEditorContentChange={handleEditorContentChange}
          />

          {/* Right Settings Sidebar */}
          <PostSettings
            formData={formData}
            handleChange={handleChange}
            handleFeaturedImageChange={handleFeaturedImageChange}
            handleRemoveFeaturedImage={handleRemoveFeaturedImage}
            handleGalleryImagesChange={handleGalleryImagesChange}
            handleRemoveGalleryImage={handleRemoveGalleryImage}
            handleSaveDraft={handleSaveDraft}
            handleSubmit={handleSubmit}
            categories={categories}
            onAddCategory={addCategory}
            isSubmitting={isSubmitting}
            isSavingDraft={isSavingDraft}
            postStatus={formData.status}
          />
        </main>
      </div>
    </AdminLayout>
  );
};

export default EditPost;
