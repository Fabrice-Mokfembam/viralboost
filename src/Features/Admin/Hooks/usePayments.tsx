import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../Services";
import type { 
  GetPaymentsResponse, 
  GetPaymentResponse, 
  DeletePaymentResponse, 
  ApprovePaymentResponse,
  GetPaymentsQueryParams 
} from "../../user/Payments/Types";

// Admin API functions for payments
const getAdminPayments = async (params?: GetPaymentsQueryParams): Promise<GetPaymentsResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.is_approved !== undefined) {
    queryParams.append('is_approved', params.is_approved.toString());
  }
  if (params?.min_amount !== undefined) {
    queryParams.append('min_amount', params.min_amount.toString());
  }

  if (params?.page !== undefined) {
    queryParams.append('page', params.page.toString());
  }

  const url = queryParams.toString() ? `/admin/payments?${queryParams.toString()}` : '/admin/payments';
  const { data } = await apiClient.get(url);
  return data;
};

const getAdminPayment = async (uuid: string): Promise<GetPaymentResponse> => {
  const { data } = await apiClient.get(`/admin/payments/${uuid}`);
  return data;
};

const deleteAdminPayment = async (uuid: string): Promise<DeletePaymentResponse> => {
  const { data } = await apiClient.delete(`/admin/payments/${uuid}`);
  return data;
};

const approveAdminPayment = async (uuid: string): Promise<ApprovePaymentResponse> => {
  const { data } = await apiClient.post(`/admin/payments/${uuid}/approve`);
  return data;
};

// Query Keys
export const adminPaymentKeys = {
  all: ['admin', 'payments'] as const,
  lists: () => [...adminPaymentKeys.all, 'list'] as const,
  list: (params?: GetPaymentsQueryParams) => [...adminPaymentKeys.lists(), params] as const,
  details: () => [...adminPaymentKeys.all, 'detail'] as const,
  detail: (uuid: string) => [...adminPaymentKeys.details(), uuid] as const,
};

// GET /api/v1/admin/payments - List All Payments (Admin)
export const useAdminPayments = (params?: GetPaymentsQueryParams) => {
  return useQuery({
    queryKey: adminPaymentKeys.list(params),
    queryFn: () => getAdminPayments(params),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 2,
  });
};

// GET /api/v1/admin/payments/{uuid} - Get Single Payment (Admin)
export const useAdminPayment = (uuid: string) => {
  return useQuery({
    queryKey: adminPaymentKeys.detail(uuid),
    queryFn: () => getAdminPayment(uuid),
    enabled: !!uuid,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// DELETE /api/v1/admin/payments/{uuid} - Delete Payment (Admin)
export const useDeleteAdminPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (uuid: string) => deleteAdminPayment(uuid),
    onSuccess: (_, uuid) => {
      // Invalidate payments list and specific payment detail
      queryClient.invalidateQueries({ queryKey: adminPaymentKeys.lists() });
      queryClient.removeQueries({ queryKey: adminPaymentKeys.detail(uuid) });
    },
    onError: (error) => {
      console.error("Failed to delete payment:", error);
    },
  });
};

// POST /api/v1/admin/payments/{uuid}/approve - Approve Payment (Admin)
export const useApproveAdminPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (uuid: string) => approveAdminPayment(uuid),
    onSuccess: (_, uuid) => {
      // Invalidate payments list and specific payment detail
      queryClient.invalidateQueries({ queryKey: adminPaymentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: adminPaymentKeys.detail(uuid) });
    },
    onError: (error) => {
      console.error("Failed to approve payment:", error);
    },
  });
};
