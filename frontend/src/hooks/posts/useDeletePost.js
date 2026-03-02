/**
 * useDeletePost Hook
 * Handles post deletion with confirmation
 */

import { useState } from 'react';
import { deletePost } from '../../api/posts';

export const useDeletePost = (onSuccess, showToast) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      setError(null);
      await deletePost(id);
      
      if (showToast) {
        showToast('Post deleted successfully!', 'success');
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Failed to delete post');
      console.error('Error deleting post:', err);
      
      if (showToast) {
        showToast('Failed to delete post', 'error');
      }
      
      throw err;
    } finally {
      setDeleting(false);
    }
  };

  return {
    deletePost: handleDelete,
    deleting,
    error,
  };
};
