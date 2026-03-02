/**
 * usePost Hook
 * Fetches a single post by ID and structures image data for display
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchPost } from '../../api/posts';

/**
 * Extract public_id from Cloudinary URL
 */
const extractPublicId = (url) => {
  if (!url) return null;
  const urlParts = url.match(/\/v\d+\/(.+)\.\w+$/);
  return urlParts ? urlParts[1] : null;
};

export const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPost = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchPost(id);

      // Structure featured image data properly for preview
      let featuredImageData = null;
      if (data.featured_image_url) {
        const public_id = extractPublicId(data.featured_image_url);

        featuredImageData = {
          url: data.featured_image_url,
          preview: data.featured_image_url,
          public_id: public_id,
          alt: data.featured_image_alt || data.title || 'Featured image',
        };
      }

      // Structure gallery images data properly for preview
      let galleryImagesData = [];
      if (data.post_images && data.post_images.length > 0) {
        galleryImagesData = data.post_images.map((img) => {
          const public_id = extractPublicId(img.image);

          return {
            id: img.id,
            url: img.image,
            preview: img.image,
            public_id: public_id,
            alt: img.alt_text || 'Gallery image',
            fileName: img.caption || 'image',
          };
        });
      }

      // Parse content - backend returns {json, html} object
      let parsedContent = data.content;
      console.log('[usePost] Raw content from API:', data.content);
      console.log('[usePost] Content type:', typeof data.content);
      
      // Handle different content formats
      if (typeof data.content === 'string') {
        try {
          parsedContent = JSON.parse(data.content);
          console.log('[usePost] Successfully parsed content:', parsedContent);
        } catch (e) {
          console.error('[usePost] Error parsing content JSON:', e);
          parsedContent = data.content;
        }
      } else if (data.content && typeof data.content === 'object') {
        // If content is already an object with json/html properties
        if (data.content.json) {
          console.log('[usePost] Content has json property, extracting it');
          parsedContent = data.content.json;
        } else {
          console.log('[usePost] Content is already an object:', parsedContent);
        }
      }

      // Set structured post data
      const structuredPost = {
        ...data,
        content: parsedContent, // This is now the Lexical JSON
        content_html: data.content?.html || data.content_html, // Keep HTML separate
        featuredImage: featuredImageData,
        galleryImages: galleryImagesData,
      };
      
      console.log('[usePost] Setting post with content:', structuredPost.content);
      setPost(structuredPost);
    } catch (err) {
      setError(err.message || 'Failed to fetch post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  return {
    post,
    loading,
    error,
    refresh: loadPost,
  };
};
