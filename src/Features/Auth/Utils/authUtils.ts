import type { AuthResponse, User } from '../../../data';

const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

export interface StoredAuthData {
  token: string;
  user: User;
  timestamp: number;
}

/**
 * Store authentication data in localStorage
 */
export const storeAuthData = (authResponse: AuthResponse): void => {
  if (authResponse.token && authResponse.user) {
    const authData: StoredAuthData = {
      token: authResponse.token,
      user: authResponse.user,
      timestamp: Date.now()
    };
    
    localStorage.setItem(AUTH_TOKEN_KEY, authResponse.token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(authData));
  }
};

/**
 * Retrieve authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Retrieve stored user data from localStorage
 */
export const getStoredUserData = (): StoredAuthData | null => {
  try {
    const storedData = localStorage.getItem(USER_DATA_KEY);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    return null;
  }
};

/**
 * Retrieve user data from localStorage
 */
export const getUserData = (): User | null => {
  const authData = getStoredUserData();
  return authData?.user || null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const userData = getUserData();
  return !!(token && userData);
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

/**
 * Check if token is expired (optional - you can implement token expiration logic)
 */
export const isTokenExpired = (): boolean => {
  const authData = getStoredUserData();
  if (!authData) return true;
  
  // Token expires after 24 hours (you can adjust this)
  const TOKEN_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const isExpired = Date.now() - authData.timestamp > TOKEN_EXPIRY_TIME;
  
  if (isExpired) {
    clearAuthData();
  }
  
  return isExpired;
};

/**
 * Get authorization header for API requests
 */
export const getAuthHeader = (): { Authorization: string } => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : { Authorization: '' };
};
