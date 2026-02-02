/**
 * Format price with currency symbol and commas
 * @param {number} price - Price value
 * @returns {string} Formatted price
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined) return 'Price on Request';
  return `RM ${price.toLocaleString('en-MY')}`;
};

/**
 * Format floor/land size with unit
 * @param {number} size - Size in sq ft
 * @returns {string} Formatted size
 */
export const formatSize = (size) => {
  if (!size) return '-';
  return `${size.toLocaleString()} sq ft`;
};

/**
 * Format property type for display
 * @param {string} type - Property type
 * @returns {string} Formatted type
 */
export const formatPropertyType = (type) => {
  if (!type) return '';
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
