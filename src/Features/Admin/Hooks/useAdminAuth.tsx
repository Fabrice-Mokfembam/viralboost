import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { loginAdmin, logoutAdmin, refreshAdminToken } from "../API"; // Commented out for offline mode
import { storeAdminData, clearAdminData } from "../Utils/adminUtils";
import type { AdminUser,  AdminAuthResponse } from "../Types";

// Mock admin user for when backend is down
const mockAdminUser: AdminUser = {
  uuid: "mock-admin-uuid",
  name: "Admin User",
  email: "admin@viralboost.com",
  phone: "+1234567890",
  is_admin: true,
  is_active: true,
  email_verified_at: "2025-01-01T00:00:00.000000Z",
  phone_verified_at: "2025-01-01T00:00:00.000000Z",
  created_at: "2025-01-01T00:00:00.000000Z"
};

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

  // Simple login function - works without backend
  const login = () => {
    // Mock login - just set the admin data
    const mockResponse: AdminAuthResponse = {
      success: true,
      message: "Login successful",
      data: {
        user: mockAdminUser,
        token: "mock-admin-token",
        token_type: "Bearer"
      }
    };
    
    // Store mock data in localStorage
    storeAdminData(mockResponse);
    
    // Update the query cache with the new admin data
    queryClient.setQueryData(['admin'], mockAdminUser);
  };

  // Logout mutation - works without backend
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // For now, just clear local data without backend call
      // You can uncomment the backend code when it's back up
      
      // try {
      //   await logoutAdmin();
      // } catch (error) {
      //   console.error('Logout API call failed:', error);
      //   // Continue with logout even if API call fails
      // }
      
      // Mock logout - just clear local data
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

  // Refresh token mutation - works without backend
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      // For now, just return mock token without backend call
      // You can uncomment the backend code when it's back up
      
      // const response = await refreshAdminToken();
      // return response.token;
      
      // Mock refresh - return new mock token
      return "mock-admin-token-refreshed";
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
    login,
    isLoginPending: false,
    loginError: null,
    
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


