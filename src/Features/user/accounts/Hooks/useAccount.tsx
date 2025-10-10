import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccount, updateAccount } from "../API";
import type { UpdateAccountPayload } from "../Types";

// Hook to get user account details
export const useAccount = () => {
  return useQuery({
    queryKey: ["account"],
    queryFn: getAccount,
    enabled: !!localStorage.getItem('authToken'),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

// Hook to update user account
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accountData: UpdateAccountPayload) => updateAccount(accountData),
    onSuccess: () => {
      // Invalidate and refetch account data
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
    onError: (error) => {
      console.error("Failed to update account:", error);
    },
  });
};
