/**
 * Categories API
 * All API calls related to categories
 */

import apiClient from '../config/api';

/**
 * Fetch all categories
 */
export const fetchCategories = async () => {
  const response = await apiClient.get('/categories/');
  return response.data;
};

/**
 * Create a new category
 * @param {Object} data - Category data (name, description)
 */
export const createCategory = async (data) => {
  const response = await apiClient.post('/categories/', data);
  return response.data;
};
