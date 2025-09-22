import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAdmin, logoutAdmin, refreshAdminToken } from "../API";
import { storeAdminData, clearAdminData } from "../Utils/adminUtils";
import type { AdminUser, AdminAuthResponse, AdminLoginCredentials } from "../Types";


// Helper function to get admin data from localStorage
const getStoredAdminData = (): AdminUser | null => {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return null;
    }
    
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
    queryFn: () => {
      console.log('Fetching admin data from localStorage...');
      const adminData = getStoredAdminData();
      console.log('Admin data found:', adminData);
      return adminData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: AdminLoginCredentials) => loginAdmin(credentials),
    onSuccess: (data: AdminAuthResponse) => {
      console.log('Admin login successful:', data);
      // Store authentication data
      storeAdminData(data);
      // Update query cache
      queryClient.setQueryData(['admin'], data.data.user);
      // Invalidate queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
    onError: (error) => {
      console.error('Admin login failed:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await logoutAdmin();
      } catch (error) {
        console.error('Logout API call failed:', error);
        // Continue with logout even if API call fails
      }
      
      // Clear local data
      clearAdminData();
    },
    onSuccess: () => {
      // Clear query cache
      queryClient.setQueryData(['admin'], null);
      queryClient.clear(); // Clear all queries
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Still clear local data even if something fails
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


