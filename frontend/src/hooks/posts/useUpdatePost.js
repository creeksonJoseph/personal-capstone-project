/**
 * useUpdatePost Hook
 * Manages form state and handles post update logic
 */

import { useState, useEffect } from 'react';
import { updatePost } from '../../api/posts';
import { usePost } from './usePost';

export const useUpdatePost = (id, showToast, navigate) => {
  const { post, loading: loadingPost } = usePost(id);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    contentHtml: '',
    status: 'draft',
    featuredImage: null,
    categories: [],
    galleryImages: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  // Load post data into form when post is fetched
  useEffect(() => {
    if (post) {
      console.log('[useUpdatePost] Loading post into form:', post);
      console.log('[useUpdatePost] Post content:', post.content);
      
      setFormData({
        title: post.title,
        content: post.content,
        contentHtml: post.content_html || '',
        status: post.status,
        featuredImage: post.featuredImage,
        categories: post.categories.map((cat) => cat.id),
        galleryImages: post.galleryImages || [],
      });
      
      console.log('[useUpdatePost] FormData content set to:', post.content);
    }
  }, [post]);

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
    console.log('[useUpdatePost] handleFeaturedImageChange called with:', uploadData);
    
    const imageData = {
      url: uploadData.url,
      public_id: uploadData.public_id,
      alt: uploadData.fileName.replace(/\.[^/.]+$/, ''),
      preview: uploadData.url,
    };

    console.log('[useUpdatePost] Setting featured image:', imageData);

    setFormData((prev) => ({
      ...prev,
      featuredImage: imageData,
    }));
    
    console.log('[useUpdatePost] Featured image set successfully');
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

  // Submit post update (publish)
  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      setIsSubmitting(true);
      await updatePost(id, formDataToSend);
      showToast('Post updated successfully!', 'success');
      navigate('/admin/all-posts');
    } catch (error) {
      console.error('Error updating post:', error);
      showToast('Failed to update post', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save as draft
  const handleSaveDraft = async () => {
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

    try {
      setIsSavingDraft(true);
      await updatePost(id, formDataToSend);
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
  };
};
