// Admin types based on the Admin model fields
export interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

// Admin role enum
export type AdminRole = 'super_admin' | 'admin';

// Request/Response types
export interface CreateAdminRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: AdminRole;
  is_active?: boolean;
}

export interface UpdateAdminRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: AdminRole;
  is_active?: boolean;
}

export interface AdminsResponse {
  success: boolean;
  message: string;
  data: {
    admins: Admin[];
    pagination?: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
}

export interface AdminResponse {
  success: boolean;
  message: string;
  data: {
    admin: Admin;
  };
}

// Form types for admin management
export interface AdminFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: AdminRole;
  is_active: boolean;
}

// Filter and search types
export interface AdminFilters {
  role?: AdminRole;
  is_active?: boolean;
  search?: string;
}

// Admin statistics
export interface AdminStats {
  total_admins: number;
  active_admins: number;
  inactive_admins: number;
  super_admins: number;
  regular_admins: number;
}
