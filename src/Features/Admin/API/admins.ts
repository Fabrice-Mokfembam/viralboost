import { apiClient } from '../../../Services';

// Admin types based on the fields shown
export interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'admin';
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAdminRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'super_admin' | 'admin';
  is_active?: boolean;
}

export interface UpdateAdminRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: 'super_admin' | 'admin';
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

// API functions
export const getAdmins = async (): Promise<AdminsResponse> => {
  const response = await apiClient.get('/new-admin/admins');
  return response.data;
};

export const createAdmin = async (adminData: CreateAdminRequest): Promise<AdminResponse> => {
  const response = await apiClient.post('/new-admin/admins', adminData);
  return response.data;
};

export const getAdminById = async (id: number): Promise<AdminResponse> => {
  const response = await apiClient.get(`/new-admin/admins/${id}`);
  return response.data;
};

export const updateAdmin = async (id: number, adminData: UpdateAdminRequest): Promise<AdminResponse> => {
  const response = await apiClient.put(`/new-admin/admins/${id}`, adminData);
  return response.data;
};

export const deleteAdmin = async (id: number): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete(`/new-admin/admins/${id}`);
  return response.data;
};
