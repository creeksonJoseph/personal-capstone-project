/**
 * useCreatePost Hook
 * Manages form state and handles post creation logic
 */

import { useState } from 'react';
import { createPost } from '../../api/posts';

export const useCreatePost = (showToast, navigate) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    contentHtml: '',
    featuredImage: null,
    categories: [],
    galleryImages: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  // Handle general form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for category checkboxes
    if (name === 'categories') {
      const categoryId = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...(prev.categories || []), categoryId]
          : (prev.categories || []).filter((id) => id !== categoryId),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  // Handle editor content change
  const handleEditorContentChange = (editorData) => {
    setFormData((prev) => ({
      ...prev,
      content: editorData.json,
      contentHtml: editorData.html,
    }));
  };

  // Handle featured image upload
  const handleFeaturedImageChange = (uploadData) => {
    console.log('[useCreatePost] handleFeaturedImageChange called with:', uploadData);
    
    const imageData = {
      url: uploadData.url,
      public_id: uploadData.public_id,
      alt: uploadData.fileName.replace(/\.[^/.]+$/, ''),
      preview: uploadData.url,
    };

    console.log('[useCreatePost] Setting featured image:', imageData);

    setFormData((prev) => ({
      ...prev,
      featuredImage: imageData,
    }));
    
    console.log('[useCreatePost] Featured image set successfully');
  };

  // Handle featured image removal
  const handleRemoveFeaturedImage = () => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: null,
    }));
  };

  // Handle gallery images upload
  const handleGalleryImagesChange = (uploadData) => {
    // Convert to array if single object
    const uploadDataArray = Array.isArray(uploadData) ? uploadData : [uploadData];
    
    const newImages = uploadDataArray.map((data) => ({
      url: data.url,
      public_id: data.public_id,
      alt: data.fileName.replace(/\.[^/.]+$/, ''),
      preview: data.url,
    }));

    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...newImages],
    }));
  };

  // Handle gallery image removal
  const handleRemoveGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  // Check if content has meaningful text
  const hasMeaningfulContent = (content) => {
    if (!content || !content.root || !content.root.children) {
      return false;
    }

    const checkChildren = (children) => {
      return children.some((child) => {
        if (child.type === 'text' && child.text && child.text.trim().length > 0) {
          return true;
        }
        if (child.children) {
          return checkChildren(child.children);
        }
        return false;
      });
    };

    return checkChildren(content.root.children);
  };

  // Submit post (publish)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      showToast('Please enter a title for your post', 'error');
      return;
    }

    const hasContent = hasMeaningfulContent(formData.content);
    if (!hasContent) {
      showToast('Please enter content for your post', 'error');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', JSON.stringify(formData.content));
    formDataToSend.append('content_html', formData.contentHtml);

    if (formData.featuredImage) {
      formDataToSend.append('featured_image', formData.featuredImage.url);
      formDataToSend.append('featured_image_alt', formData.featuredImage.alt);
    }

    formData.categories.forEach((category) => {
      formDataToSend.append('category_ids', category);
    });

    formData.galleryImages.forEach((image) => {
      formDataToSend.append('post_image_urls', image.url);
    });

    formDataToSend.append('status', 'published');
    formDataToSend.append('author', 'Admin');

    try {
      setIsSubmitting(true);
      await createPost(formDataToSend);
      showToast('Post published successfully!', 'success');
      navigate('/admin/all-posts');
    } catch (error) {
      console.error('Error creating post:', error);
      showToast('Failed to publish post', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save as draft
  const handleSaveDraft = async () => {
    if (!formData.title.trim()) {
      showToast('Please enter a title for your post', 'error');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', JSON.stringify(formData.content));
    formDataToSend.append('content_html', formData.contentHtml);

    if (formData.featuredImage) {
      formDataToSend.append('featured_image', formData.featuredImage.url);
      formDataToSend.append('featured_image_alt', formData.featuredImage.alt);
    }

    formData.categories.forEach((category) => {
      formDataToSend.append('category_ids', category);
    });

    formData.galleryImages.forEach((image) => {
      formDataToSend.append('post_image_urls', image.url);
    });

    formDataToSend.append('status', 'draft');
    formDataToSend.append('author', 'Admin');

    try {
      setIsSavingDraft(true);
      await createPost(formDataToSend);
      showToast('Draft saved successfully!', 'success');
      navigate('/admin/all-posts');
    } catch (error) {
      console.error('Error saving draft:', error);
      showToast('Failed to save draft', 'error');
    } finally {
      setIsSavingDraft(false);
    }
  };

  return {
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
  };
};
