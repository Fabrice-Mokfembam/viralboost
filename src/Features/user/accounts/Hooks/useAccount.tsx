import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccount, updateAccount } from "../API";
import type { UpdateAccountPayload } from "../Types";

// Hook to get user account details
export const useAccount = () => {
  return useQuery({
    queryKey: ["user-account"],
    queryFn: getAccount,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
      queryClient.invalidateQueries({ queryKey: ["user-account"] });
    },
    onError: (error) => {
      console.error("Failed to update account:", error);
    },
  });
};
