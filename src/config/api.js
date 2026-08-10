// Base API URL configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://toiyab-back.vercel.app';

/**
 * Returns the full API URL for a given endpoint path.
 * @param {string} path - e.g. '/api/portfolio/settings' or 'api/auth/login'
 * @returns {string} - e.g. 'https://toiyab-back.vercel.app/api/portfolio/settings'
 */
export const getApiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export default getApiUrl;
