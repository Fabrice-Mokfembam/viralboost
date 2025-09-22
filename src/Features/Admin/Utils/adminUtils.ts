import type { AdminUser, AdminAuthResponse } from '../Types';

const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_USER_KEY = 'admin_user';

export interface StoredAdminData {
  token: string;
  user: AdminUser;
  timestamp: number;
}

/**
 * Store admin authentication data in localStorage
 */
export const storeAdminData = (authResponse: AdminAuthResponse): void => {
  try {
    if (typeof window !== 'undefined' && authResponse.data.token && authResponse.data.user) {
      const adminData: StoredAdminData = {
        token: authResponse.data.token,
        user: authResponse.data.user,
        timestamp: Date.now()
      };
      
      localStorage.setItem(ADMIN_TOKEN_KEY, authResponse.data.token);
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(adminData));
    }
  } catch (error) {
    console.error('Error storing admin data:', error);
  }
};

/**
 * Retrieve admin token from localStorage
 */
export const getAdminToken = (): string | null => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ADMIN_TOKEN_KEY);
    }
    return null;
  } catch (error) {
    console.error('Error getting admin token:', error);
    return null;
  }
};

/**
 * Retrieve stored admin data from localStorage
 */
export const getStoredAdminData = (): StoredAdminData | null => {
  try {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(ADMIN_USER_KEY);
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  } catch (error) {
    console.error('Error parsing stored admin data:', error);
    return null;
  }
};

/**
 * Retrieve admin user data from localStorage
 */
export const getAdminUser = (): AdminUser | null => {
  const adminData = getStoredAdminData();
  return adminData?.user || null;
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
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);
    }
  } catch (error) {
    console.error('Error clearing admin data:', error);
  }
};

/**
 * Check if admin token is expired (optional - you can implement token expiration logic)
 */
export const isAdminTokenExpired = (): boolean => {
  const adminData = getStoredAdminData();
  if (!adminData) return true;
  
  // Token expires after 24 hours (you can adjust this)
  const TOKEN_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const isExpired = Date.now() - adminData.timestamp > TOKEN_EXPIRY_TIME;
  
  if (isExpired) {
    clearAdminData();
  }
  
  return isExpired;
};

/**
 * Get admin authorization header for API requests
 */
export const getAdminAuthHeader = (): { Authorization: string } => {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : { Authorization: '' };
};
