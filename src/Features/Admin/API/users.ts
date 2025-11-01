import { apiClient } from "../../../Services";

// Get all users with pagination and search
export const getUsers = async (page = 1, limit = 20, search = '') => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });
  const { data } = await apiClient.get(`/admin/users?${params}`);
  return data;
};

// Get user statistics
export const getUserStats = async () => {
  const { data } = await apiClient.get("/admin/users/stats");
  return data;
};

// Get user by UUID
export const getUserById = async (uuid: string) => {
  const { data } = await apiClient.get(`/admin/users/${uuid}`);
  return data;
};

// Deactivate user
export const deactivateUser = async (uuid: string) => {
  const { data } = await apiClient.post(`/admin/users/${uuid}/deactivate`, {
    reason: 'Spam activity'
  });
  return data;
};

// Activate user
export const activateUser = async (uuid: string) => {
  const { data } = await apiClient.post(`/admin/users/${uuid}/activate`);
  return data;
};

// Delete user
export const deleteUser = async (uuid: string) => {
  const { data } = await apiClient.delete(`/admin/users/${uuid}`, {
    data: {
      confirmation: "DELETE",
      reason: "Admin deleting user account"
    }
  });
  return data;
};

// Create user (Admin only)
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const payload = {
    ...userData,
    password_confirmation: userData.password
  };
  const { data } = await apiClient.post('/admin/users', payload);
  return data;
};

// Login as user (Admin only)
export const loginAsUser = async (email: string) => {
  const { data } = await apiClient.post('/admin/users/login-as', { email });
  return data;
};