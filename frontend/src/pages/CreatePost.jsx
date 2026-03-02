import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import PostEditor from '../components/PostEditor';
import PostSettings from '../components/PostSettings';
import { useToast } from '../context/ToastContext';
import { useCreatePost } from '../hooks/posts/useCreatePost';
import { useCategories } from '../hooks/categories/useCategories';

const CreatePost = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Use custom hooks for all logic
  const {
    formData,
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
  } = useCreatePost(showToast, navigate);

  const { categories, addCategory } = useCategories();

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
          />
        </main>
      </div>
    </AdminLayout>
  );
};

export default CreatePost;
