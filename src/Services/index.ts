import axios, {type AxiosInstance } from 'axios';
import { getAuthToken } from '../Features/Auth/Utils/authUtils';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://viral-boast-smm.pocket-gems.com/api/v1',
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
    if (error.response?.status === 401) {
      // Token expired or invalid, clear auth data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      // Optionally redirect to login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export { apiClient };
