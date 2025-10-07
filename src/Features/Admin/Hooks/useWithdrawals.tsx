import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../Services";
import type {
  GetWithdrawalsResponse,
  GetWithdrawalResponse,
  DeleteWithdrawalResponse,
  CompleteWithdrawalResponse,
  UpdateWithdrawalResponse,
  UpdateWithdrawalPayload,
  GetAdminWithdrawalsQueryParams
} from "../../user/withdrawals/Types";

// Admin API functions for withdrawals
const getAdminWithdrawals = async (params?: GetAdminWithdrawalsQueryParams): Promise<GetWithdrawalsResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.is_completed !== undefined) {
    queryParams.append('is_completed', params.is_completed.toString());
  }
  if (params?.platform) {
    queryParams.append('platform', params.platform);
  }
  if (params?.user_uuid) {
    queryParams.append('user_uuid', params.user_uuid);
  }
  if (params?.min_amount !== undefined) {
    queryParams.append('min_amount', params.min_amount.toString());
  }
  if (params?.page !== undefined) {
    queryParams.append('page', params.page.toString());
  }

  const url = queryParams.toString() ? `/admin/withdrawals?${queryParams.toString()}` : '/admin/withdrawals';
  const { data } = await apiClient.get(url);
  return data;
};

const getAdminWithdrawal = async (uuid: string): Promise<GetWithdrawalResponse> => {
  const { data } = await apiClient.get(`/admin/withdrawals/${uuid}`);
  return data;
};

const deleteAdminWithdrawal = async (uuid: string): Promise<DeleteWithdrawalResponse> => {
  const { data } = await apiClient.delete(`/admin/withdrawals/${uuid}`);
  return data;
};

const completeAdminWithdrawal = async (uuid: string): Promise<CompleteWithdrawalResponse> => {
  const { data } = await apiClient.post(`/admin/withdrawals/${uuid}/complete`);
  return data;
};

const updateAdminWithdrawal = async (uuid: string, payload: UpdateWithdrawalPayload): Promise<UpdateWithdrawalResponse> => {
  const { data } = await apiClient.put(`/admin/withdrawals/${uuid}`, payload);
  return data;
};

// Query keys
const adminWithdrawalKeys = {
  all: ['admin', 'withdrawals'] as const,
  lists: () => [...adminWithdrawalKeys.all, 'list'] as const,
  list: (params?: GetAdminWithdrawalsQueryParams) => [...adminWithdrawalKeys.lists(), params] as const,
  details: () => [...adminWithdrawalKeys.all, 'detail'] as const,
  detail: (uuid: string) => [...adminWithdrawalKeys.details(), uuid] as const,
};

// GET /api/v1/admin/withdrawals - List All Withdrawals (Admin)
export const useAdminWithdrawals = (params?: GetAdminWithdrawalsQueryParams) => {
  return useQuery({
    queryKey: adminWithdrawalKeys.list(params),
    queryFn: () => getAdminWithdrawals(params),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 2,
  });
};

// GET /api/v1/admin/withdrawals/{uuid} - Get Single Withdrawal (Admin)
export const useAdminWithdrawal = (uuid: string) => {
  return useQuery({
    queryKey: adminWithdrawalKeys.detail(uuid),
    queryFn: () => getAdminWithdrawal(uuid),
    enabled: !!uuid,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// DELETE /api/v1/admin/withdrawals/{uuid} - Delete Withdrawal (Admin)
export const useDeleteAdminWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => deleteAdminWithdrawal(uuid),
    onSuccess: (_, uuid) => {
      queryClient.invalidateQueries({ queryKey: adminWithdrawalKeys.lists() });
      queryClient.removeQueries({ queryKey: adminWithdrawalKeys.detail(uuid) });
    },
    onError: (error) => {
      console.error("Failed to delete withdrawal:", error);
    },
  });
};

// POST /api/v1/admin/withdrawals/{uuid}/complete - Complete Withdrawal (Admin)
export const useCompleteAdminWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => completeAdminWithdrawal(uuid),
    onSuccess: (_, uuid) => {
      queryClient.invalidateQueries({ queryKey: adminWithdrawalKeys.lists() });
      queryClient.invalidateQueries({ queryKey: adminWithdrawalKeys.detail(uuid) });
    },
    onError: (error) => {
      console.error("Failed to complete withdrawal:", error);
    },
  });
};

// PUT /api/v1/admin/withdrawals/{uuid} - Update Withdrawal (Admin)
export const useUpdateAdminWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, payload }: { uuid: string; payload: UpdateWithdrawalPayload }) => 
      updateAdminWithdrawal(uuid, payload),
    onSuccess: (_, { uuid }) => {
      queryClient.invalidateQueries({ queryKey: adminWithdrawalKeys.lists() });
      queryClient.invalidateQueries({ queryKey: adminWithdrawalKeys.detail(uuid) });
    },
    onError: (error) => {
      console.error("Failed to update withdrawal:", error);
    },
  });
};
