import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../API/users';
import { toast } from 'react-toastify';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserData) => createUser(userData),
    onSuccess: (data) => {
      // Invalidate users query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-user-stats'] });
      
      toast.success('User created successfully!');
      
      return data;
    },
    onError: (error: any) => {
      console.error('Error creating user:', error);
      
      // Handle different error types
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error?.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0];
        if (Array.isArray(firstError)) {
          toast.error(firstError[0]);
        } else {
          toast.error(String(firstError));
        }
      } else {
        toast.error('Failed to create user. Please try again.');
      }
    },
  });
};
