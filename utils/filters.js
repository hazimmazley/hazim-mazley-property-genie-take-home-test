/**
 * Filter properties by price range
 * @param {Array} properties - Array of properties
 * @param {number|null} minPrice - Minimum price
 * @param {number|null} maxPrice - Maximum price
 * @returns {Array} Filtered properties
 */
export const filterByPrice = (properties, minPrice, maxPrice) => {
  return properties.filter((property) => {
    const price = property.price;
    if (minPrice !== null && price < minPrice) return false;
    if (maxPrice !== null && price > maxPrice) return false;
    return true;
  });
};

/**
 * Filter properties by property types
 * @param {Array} properties - Array of properties
 * @param {Array} types - Array of property types to include
 * @returns {Array} Filtered properties
 */
export const filterByType = (properties, types) => {
  if (!types || types.length === 0) return properties;
  return properties.filter((property) => types.includes(property.type));
};

/**
 * Filter properties by category
 * @param {Array} properties - Array of properties
 * @param {Array} categories - Array of categories to include
 * @returns {Array} Filtered properties
 */
export const filterByCategory = (properties, categories) => {
  if (!categories || categories.length === 0) return properties;
  return properties.filter((property) => categories.includes(property.category));
};

/**
 * Filter properties by location (state and/or city)
 * @param {Array} properties - Array of properties
 * @param {string|null} state - State to filter by
 * @param {string|null} city - City to filter by
 * @returns {Array} Filtered properties
 */
export const filterByLocation = (properties, state, city) => {
  return properties.filter((property) => {
    if (state && property.state !== state) return false;
    if (city && property.city !== city) return false;
    return true;
  });
};

/**
 * Filter properties by search query (name/address)
 * @param {Array} properties - Array of properties
 * @param {string} query - Search query
 * @returns {Array} Filtered properties
 */
export const filterBySearch = (properties, query) => {
  if (!query || query.trim() === '') return properties;
  const searchTerm = query.toLowerCase().trim();
  return properties.filter((property) => {
    const name = (property.name || '').toLowerCase();
    const address = (property.address || '').toLowerCase();
    return name.includes(searchTerm) || address.includes(searchTerm);
  });
};

/**
 * Apply all filters to properties
 * @param {Array} properties - Array of properties
 * @param {Object} filters - Filter options
 * @returns {Array} Filtered properties
 */
export const applyFilters = (properties, filters) => {
  let result = [...properties];

  if (filters.search) {
    result = filterBySearch(result, filters.search);
  }

  if (filters.minPrice !== null || filters.maxPrice !== null) {
    result = filterByPrice(result, filters.minPrice, filters.maxPrice);
  }

  if (filters.types && filters.types.length > 0) {
    result = filterByType(result, filters.types);
  }

  if (filters.categories && filters.categories.length > 0) {
    result = filterByCategory(result, filters.categories);
  }

  if (filters.state || filters.city) {
    result = filterByLocation(result, filters.state, filters.city);
  }

  return result;
};

/**
 * Get unique values for a property field
 * @param {Array} properties - Array of properties
 * @param {string} field - Field name to extract unique values from
 * @returns {Array} Sorted unique values
 */
export const getUniqueValues = (properties, field) => {
  const values = [...new Set(properties.map((p) => p[field]).filter(Boolean))];
  return values.sort();
};

/**
 * Get cities for a specific state
 * @param {Array} properties - Array of properties
 * @param {string} state - State to filter cities by
 * @returns {Array} Sorted unique cities
 */
export const getCitiesForState = (properties, state) => {
  if (!state) return getUniqueValues(properties, 'city');
  const stateProperties = properties.filter((p) => p.state === state);
  return getUniqueValues(stateProperties, 'city');
};

/**
 * Paginate array of items
 * @param {Array} items - Array of items
 * @param {number} page - Current page (1-indexed)
 * @param {number} perPage - Items per page
 * @returns {Object} Paginated result with items and meta
 */
export const paginate = (items, page, perPage = 20) => {
  const totalCount = items.length;
  const pageCount = Math.ceil(totalCount / perPage);
  const currentPage = Math.min(Math.max(1, page), pageCount || 1);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    items: items.slice(startIndex, endIndex),
    _meta: {
      totalCount,
      pageCount,
      currentPage,
      perPage,
    },
  };
};
