import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getUsers, 
  getUserStats, 
  getUserById, 
  deactivateUser, 
  activateUser,
  deleteUser
} from "../API/users";

export const useGetUsers = (page = 1, limit = 20, search = '') => {
  return useQuery({
    queryKey: ["admin-users", page, limit, search],
    queryFn: () => getUsers(page, limit, search),
  });
};

export const useGetUserStats = () => {
  return useQuery({
    queryKey: ["admin-user-stats"],
    queryFn: () => getUserStats(),
  });
};

export const useGetUserById = (uuid: string) => {
  return useQuery({
    queryKey: ["admin-user", uuid],
    queryFn: () => getUserById(uuid),
    enabled: !!uuid,
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (uuid: string) => deactivateUser(uuid),
    onSuccess: () => {
      // Invalidate and refetch users list and stats
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-user-stats"] });
    },
    onError: (error) => {
      console.error("Failed to deactivate user:", error);
    },
  });
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (uuid: string) => activateUser(uuid),
    onSuccess: () => {
      // Invalidate and refetch users list and stats
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-user-stats"] });
    },
    onError: (error) => {
      console.error("Failed to activate user:", error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (uuid: string) => deleteUser(uuid),
    onSuccess: (data, uuid) => {
      console.log('User deleted successfully:', uuid, data);
      // Remove the specific user from cache instead of invalidating all
      queryClient.setQueriesData(
        { queryKey: ["admin-users"] },
        (oldData: unknown) => {
          const data = oldData as { data?: { users?: Array<{ uuid: string }> } };
          if (!data?.data?.users) return oldData;
          return {
            ...data,
            data: {
              ...data.data,
              users: data.data.users.filter((user) => user.uuid !== uuid)
            }
          };
        }
      );
      // Invalidate stats to refetch
      queryClient.invalidateQueries({ queryKey: ["admin-user-stats"] });
    },
    onError: (error) => {
      console.error("Failed to delete user:", error);
    },
  });
};
