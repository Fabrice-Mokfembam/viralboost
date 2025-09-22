import { createContext } from 'react';
import type { AdminUser } from '../../Features/Admin/Types';



interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => void;
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
