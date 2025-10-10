import axios, {type AxiosInstance } from 'axios';
import { getAuthToken, clearAuthData } from '../Features/user/auth/Utils/authUtils';
import { getAdminToken, clearAdminData } from '../Features/Admin/Utils/adminUtils';

const apiClient: AxiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/v1',
 baseURL: 'https://viral.logisticcargoexpres.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token (user or admin)
apiClient.interceptors.request.use(
  (config) => {
    // Check if this is an admin endpoint (both /admin/ and /new-admin/)
    const isAdminEndpoint = config.url?.includes('/admin/') || config.url?.includes('/new-admin/');
    
    if (isAdminEndpoint) {
      // Use admin token for admin endpoints
      const adminToken = getAdminToken();
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else {
      // Use regular user token for other endpoints
      const userToken = getAuthToken();
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const isAdminEndpoint = typeof error?.config?.url === 'string' && (error.config.url.includes('/admin/') || error.config.url.includes('/new-admin/'));
      const isAuthEndpoint = typeof error?.config?.url === 'string' && error.config.url.includes('/auth/');
      
      if (isAdminEndpoint) {
        // Handle admin auth errors
        const hadAdminAuthHeader = Boolean(error?.config?.headers?.Authorization) || Boolean(getAdminToken());
        if (hadAdminAuthHeader && !isAuthEndpoint) {
          clearAdminData();
          window.location.href = '/admin';
          return; // stop further processing
        }
      } else {
        // Handle user auth errors
        const hadUserAuthHeader = Boolean(error?.config?.headers?.Authorization) || Boolean(getAuthToken());
        if (hadUserAuthHeader && !isAuthEndpoint) {
          clearAuthData();
          window.location.href = '/';
          return; // stop further processing
        }
      }
      // For auth endpoints (e.g., login with bad credentials), don't redirect
    }
    return Promise.reject(error);
  }
);

export { apiClient };
