import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createWithdrawal, getWithdrawals, getWithdrawal, deleteWithdrawal } from '../api';
import type {
  CreateWithdrawalPayload,
  GetWithdrawalsQueryParams
} from '../Types';

// Query keys
const withdrawalKeys = {
  all: ['withdrawals'] as const,
  lists: () => [...withdrawalKeys.all, 'list'] as const,
  list: (params?: GetWithdrawalsQueryParams) => [...withdrawalKeys.lists(), params] as const,
  details: () => [...withdrawalKeys.all, 'detail'] as const,
  detail: (uuid: string) => [...withdrawalKeys.details(), uuid] as const,
};

// POST /api/v1/withdrawals - Create Withdrawal Request
export const useCreateWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWithdrawalPayload) => createWithdrawal(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: withdrawalKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to create withdrawal:", error);
    },
  });
};

// GET /api/v1/withdrawals - Get User's Withdrawals
export const useWithdrawals = (params?: GetWithdrawalsQueryParams) => {
  return useQuery({
    queryKey: withdrawalKeys.list(params),
    queryFn: () => getWithdrawals(params),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 2,
  });
};

// GET /api/v1/withdrawals/{uuid} - Get Withdrawal by ID
export const useWithdrawal = (uuid: string) => {
  return useQuery({
    queryKey: withdrawalKeys.detail(uuid),
    queryFn: () => getWithdrawal(uuid),
    enabled: !!uuid,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// DELETE /api/v1/withdrawals/{uuid} - Delete Withdrawal Request
export const useDeleteWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => deleteWithdrawal(uuid),
    onSuccess: (_, uuid) => {
      queryClient.invalidateQueries({ queryKey: withdrawalKeys.lists() });
      queryClient.removeQueries({ queryKey: withdrawalKeys.detail(uuid) });
    },
    onError: (error) => {
      console.error("Failed to delete withdrawal:", error);
    },
  });
};
