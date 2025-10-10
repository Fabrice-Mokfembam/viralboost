import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAdmins, 
  createAdmin, 
  getAdminById, 
  updateAdmin, 
  deleteAdmin,
  type CreateAdminRequest,
  type UpdateAdminRequest,
} from '../API/admins';

// Query Keys
export const ADMIN_QUERY_KEYS = {
  admins: ['admins'] as const,
  adminById: (id: number) => ['admins', id] as const,
};

/**
 * Hook to get all admins
 */
export const useAdmins = () => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.admins,
    queryFn: getAdmins,
    staleTime: 5 * 60 * 1000, 
    retry: 2,
  });
};

/**
 * Hook to get a specific admin by ID
 */
export const useAdminById = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.adminById(id),
    queryFn: () => getAdminById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to create a new admin
 */
export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminData: CreateAdminRequest) => createAdmin(adminData),
    onSuccess: () => {
      // Invalidate and refetch admins list
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.admins });
    },
    onError: (error) => {
      console.error('Failed to create admin:', error);
    },
  });
};

/**
 * Hook to update an admin
 */
export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, adminData }: { id: number; adminData: UpdateAdminRequest }) => 
      updateAdmin(id, adminData),
    onSuccess: (data, variables) => {
      // Update the specific admin in cache
      queryClient.setQueryData(ADMIN_QUERY_KEYS.adminById(variables.id), data);
      // Invalidate admins list to refetch
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.admins });
    },
    onError: (error) => {
      console.error('Failed to update admin:', error);
    },
  });
};

/**
 * Hook to delete an admin
 */
export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAdmin(id),
    onSuccess: (_, deletedId) => {
      // Remove the admin from cache
      queryClient.removeQueries({ queryKey: ADMIN_QUERY_KEYS.adminById(deletedId) });
      // Invalidate admins list to refetch
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.admins });
    },
    onError: (error) => {
      console.error('Failed to delete admin:', error);
    },
  });
};

/**
 * Hook to toggle admin active status
 */
export const useToggleAdminStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) => 
      updateAdmin(id, { is_active: isActive }),
    onSuccess: (data, variables) => {
      // Update the specific admin in cache
      queryClient.setQueryData(ADMIN_QUERY_KEYS.adminById(variables.id), data);
      // Invalidate admins list to refetch
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.admins });
    },
    onError: (error) => {
      console.error('Failed to toggle admin status:', error);
    },
  });
};
