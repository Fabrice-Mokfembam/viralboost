import axios, {type AxiosInstance } from 'axios';
import { getAuthToken, clearAuthData } from '../Features/Auth/Utils/authUtils';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://viral.logisticcargoexpres.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      const hadAuthHeader = Boolean(error?.config?.headers?.Authorization) || Boolean(getAuthToken());
      const isAuthEndpoint = typeof error?.config?.url === 'string' && error.config.url.includes('/auth/');

      // Only force logout/redirect for authenticated requests to non-auth endpoints
      if (hadAuthHeader && !isAuthEndpoint) {
        clearAuthData();
        window.location.href = '/';
        return; // stop further processing
      }
      // For auth endpoints (e.g., login with bad credentials), don't redirect
    }
    return Promise.reject(error);
  }
);

export { apiClient };
