import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch properties from the API
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (1-indexed)
 * @param {string} params.sort - Sort option: 'price' (asc), '-price' (desc), or empty for default
 * @returns {Promise<{items: Array, _meta: Object}>}
 */
export const fetchProperties = async ({ page = 1, sort = '' } = {}) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (sort) {
    params.append('sort', sort);
  }

  const response = await apiClient.get(`/properties?${params.toString()}`);
  return response.data;
};

/**
 * Fetch all properties by iterating through all pages
 * @param {string} sort - Sort option
 * @returns {Promise<Array>} All properties
 */
export const fetchAllProperties = async (sort = '') => {
  const firstPage = await fetchProperties({ page: 1, sort });
  const { _meta } = firstPage;
  let allItems = [...firstPage.items];

  if (_meta.pageCount > 1) {
    const remainingPages = Array.from(
      { length: _meta.pageCount - 1 },
      (_, i) => i + 2
    );

    const pagePromises = remainingPages.map((page) =>
      fetchProperties({ page, sort })
    );

    const results = await Promise.all(pagePromises);
    results.forEach((result) => {
      allItems = [...allItems, ...result.items];
    });
  }

  return allItems;
};

export default apiClient;
