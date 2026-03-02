import React, { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import CloudinaryUpload from "./CloudinaryUpload";

export const PostSettings = ({
  formData,
  handleChange,
  handleFeaturedImageChange,
  handleRemoveFeaturedImage,
  handleGalleryImagesChange,
  handleRemoveGalleryImage,
  handleSaveDraft,
  handleSubmit,
  categories,
  onAddCategory,
  isSubmitting = false,
  isSavingDraft = false,
  postStatus = "draft",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCategory = (category) => {
    onAddCategory(category);
  };

  return (
    <aside className="w-full lg:w-[360px] border-l border-sky-blue/20 bg-off-white p-6 space-y-8 overflow-y-auto lg:sticky lg:top-0 lg:h-[calc(100vh-65px)]">
      <h3 className="text-lg font-bold font-display text-primary uppercase tracking-wider mb-4 border-b border-primary/20 pb-2">
        Post Settings
      </h3>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddCategory={handleAddCategory}
      />

      {/* Featured Image */}
      <div>
        <label className="block text-sm font-bold text-charcoal mb-3 uppercase tracking-wide">
          Featured Image
        </label>
        {formData.featuredImage ? (
          <div className="space-y-3">
            <div className="relative w-full max-h-64 rounded-xl overflow-hidden border-2 border-sky-blue/20">
              <img
                src={formData.featuredImage.url || formData.featuredImage.preview}
                alt={formData.featuredImage.alt || "Featured image"}
                className="w-full h-auto object-contain"
              />
            </div>
            <button
              type="button"
              onClick={handleRemoveFeaturedImage || (() =>
                handleChange({
                  target: {
                    name: "featuredImage",
                    value: null,
                    type: "text",
                  },
                })
              )}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              <span className="text-sm font-medium">Remove Featured Image</span>
            </button>
          </div>
        ) : (
          <div className="relative w-full  aspect-video rounded-xl border-2 border-dashed border-primary/40 bg-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary/60 mb-2">
                add_photo_alternate
              </span>
              <span className="text-sm font-medium text-charcoal/60  mb-3">
                Click to upload featured image
              </span>
              <CloudinaryUpload
                folder="blog-posts/featured"
                multiple={false}
                onUploadComplete={handleFeaturedImageChange}
                buttonText="Select Image"
                buttonIcon="add_photo_alternate"
              />
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-bold text-charcoal mb-3 uppercase tracking-wide">
          Categories
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                name="categories"
                value={category.id}
                checked={Array.isArray(formData.categories) && formData.categories.includes(category.id)}
                onChange={handleChange}
                className="rounded border-sky-blue/20 text-primary focus:ring-primary h-5 w-5"
              />
              <span className="text-base text-charcoal group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </label>
          ))}
        </div>
        <button
          onClick={handleOpenModal}
          className="mt-3 text-sm font-bold text-primary flex items-center gap-1 hover:underline transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span> Add New
          Category
        </button>
      </div>

      {/* Add Post Images */}
      <div>
        <label className="block text-sm font-bold text-charcoal mb-3 uppercase tracking-wide">
          Post Images
        </label>
        <CloudinaryUpload
          folder="blog-posts/gallery"
          multiple={true}
          onUploadComplete={handleGalleryImagesChange}
          buttonText="Add Post Images"
          buttonIcon="add_photo_alternate"
        />
      </div>

      {/* Gallery Images */}
      {formData.galleryImages.length > 0 && (
        <div>
          <label className="block text-sm font-bold text-charcoal mb-3 uppercase tracking-wide">
            Uploaded Images ({formData.galleryImages.length})
          </label>
          <div className="grid grid-cols-2 gap-3">
            {formData.galleryImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url || image.preview}
                  alt={image.alt || image.fileName}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-6 border-t border-sky-blue/20 flex gap-3">
        {/* Only show Save Draft for draft posts */}
        {postStatus === "draft" && (
          <button
            onClick={handleSaveDraft}
            disabled={isSavingDraft || isSubmitting}
            className="flex-1 flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-lg h-10 px-5 bg-blue-300 text-charcoal text-sm font-bold leading-normal transition-all hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSavingDraft ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-charcoal border-t-transparent"></div>
                Saving...
              </>
            ) : (
              'Save Draft'
            )}
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || isSavingDraft}
          className={`flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed ${
            postStatus === "published" || postStatus === "archived" ? "flex-1 w-full" : "flex-1"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              {postStatus === "published" ? "Updating..." : "Publishing..."}
            </>
          ) : (
            postStatus === "published" ? "Update Post" : "Publish Post"
          )}
        </button>
      </div>
    </aside>
  );
};

export default PostSettings;
