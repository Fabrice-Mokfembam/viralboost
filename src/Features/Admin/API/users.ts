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
