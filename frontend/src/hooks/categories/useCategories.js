/**
 * useCategories Hook
 * Fetches categories and handles category creation
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchCategories, createCategory } from '../../api/categories';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const addCategory = async (categoryData) => {
    try {
      setCreating(true);
      const newCategory = await createCategory(categoryData);
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      console.error('Error creating category:', err);
      throw err;
    } finally {
      setCreating(false);
    }
  };

  return {
    categories,
    loading,
    error,
    creating,
    addCategory,
    refresh: loadCategories,
  };
};
