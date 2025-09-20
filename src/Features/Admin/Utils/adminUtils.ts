import type { AdminUser, AdminAuthResponse } from '../Types';

const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_USER_KEY = 'admin_user';

/**
 * Store admin authentication data in localStorage
 */
export const storeAdminData = (authResponse: AdminAuthResponse): void => {
  if (authResponse.data.token && authResponse.data.user) {
    localStorage.setItem(ADMIN_TOKEN_KEY, authResponse.data.token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(authResponse.data.user));
  }
};

/**
 * Retrieve admin token from localStorage
 */
export const getAdminToken = (): string | null => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

/**
 * Retrieve admin user data from localStorage
 */
export const getAdminUser = (): AdminUser | null => {
  try {
    const storedData = localStorage.getItem(ADMIN_USER_KEY);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error parsing stored admin data:', error);
    return null;
  }
};

/**
 * Check if admin is authenticated
 */
export const isAdminAuthenticated = (): boolean => {
  const token = getAdminToken();
  const adminData = getAdminUser();
  return !!(token && adminData);
};

/**
 * Clear all admin authentication data from localStorage
 */
export const clearAdminData = (): void => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
};

/**
 * Get admin authorization header for API requests
 */
export const getAdminAuthHeader = (): { Authorization: string } => {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : { Authorization: '' };
};
