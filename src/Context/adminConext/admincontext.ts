import { createContext } from 'react';
import type { AdminLoginCredentials, AdminUser } from '../../Features/Admin/Types';



interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AdminLoginCredentials, options?: { onSuccess?: () => void; onError?: (error: Error) => void }) => void;
  isLoginPending: boolean;
  loginError: Error | null;
  logout: () => void;
  isLogoutPending: boolean;
  logoutError: Error | null;
  refreshToken: () => void;
  isRefreshPending: boolean;
  refreshError: Error | null;
}

export const AdminAuthContext = createContext<AdminAuthContextType | null>(null);
