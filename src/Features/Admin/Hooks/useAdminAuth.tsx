import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAdmin, logoutAdmin, refreshAdminToken } from "../API";
import { storeAdminData, clearAdminData } from "../Utils/adminUtils";
import type { AdminUser, AdminLoginCredentials, AdminAuthResponse } from "../Types";

// Helper function to get admin data from localStorage
const getStoredAdminData = (): AdminUser | null => {
  try {
    const adminData = localStorage.getItem('admin_user');
    const adminToken = localStorage.getItem('admin_token');
    if (adminData && adminToken) {
      return JSON.parse(adminData);
    }
    return null;
  } catch (error) {
    console.error('Error parsing stored admin data:', error);
    return null;
  }
};

export const useAdminAuth = () => {
  const queryClient = useQueryClient();

  // Query to get admin data from localStorage
  const { data: admin, isLoading } = useQuery({
    queryKey: ['admin'],
    queryFn: getStoredAdminData,
    staleTime: Infinity, // Admin data doesn't change often
    gcTime: Infinity, // Keep in cache indefinitely
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: AdminLoginCredentials): Promise<AdminUser> => {
      const response: AdminAuthResponse = await loginAdmin(credentials);
      
      if (response.success && response.data.user) {
        // Store in localStorage
        storeAdminData(response);
        
        return response.data.user;
      }
      throw new Error(response.message || 'Login failed');
    },
    onSuccess: (adminData) => {
      // Update the query cache with the new admin data
      queryClient.setQueryData(['admin'], adminData);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Call logout API if needed
      try {
        await logoutAdmin();
      } catch (error) {
        console.error('Logout API call failed:', error);
        // Continue with logout even if API call fails
      }
    },
    onSuccess: () => {
      // Clear localStorage
      clearAdminData();
      // Clear query cache
      queryClient.setQueryData(['admin'], null);
      queryClient.clear(); // Clear all queries
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Still clear local data even if API call fails
      clearAdminData();
      queryClient.setQueryData(['admin'], null);
      queryClient.clear();
    },
  });

  // Refresh token mutation
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const response = await refreshAdminToken();
      return response.token;
    },
    onSuccess: (newToken) => {
      // Update token in localStorage
      localStorage.setItem('admin_token', newToken);
    },
    onError: (error) => {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout the user
      logoutMutation.mutate();
    },
  });

  return {
    // Admin data
    admin,
    isAuthenticated: !!admin,
    isLoading,
    
    // Login
    login: loginMutation.mutate,
    isLoginPending: loginMutation.isPending,
    loginError: loginMutation.error,
    
    // Logout
    logout: logoutMutation.mutate,
    isLogoutPending: logoutMutation.isPending,
    logoutError: logoutMutation.error,
    
    // Refresh token
    refreshToken: refreshTokenMutation.mutate,
    isRefreshPending: refreshTokenMutation.isPending,
    refreshError: refreshTokenMutation.error,
  };
};


