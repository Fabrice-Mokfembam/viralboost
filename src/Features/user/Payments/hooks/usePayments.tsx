import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getPayments, 
  createPayment, 
  getPayment, 
  deletePayment, 
  approvePayment 
} from "../api";
import type { 
  CreatePaymentPayload, 
  GetPaymentsQueryParams 
} from "../Types";

// Query Keys
export const paymentKeys = {
  all: ['payments'] as const,
  lists: () => [...paymentKeys.all, 'list'] as const,
  list: (params?: GetPaymentsQueryParams) => [...paymentKeys.lists(), params] as const,
  details: () => [...paymentKeys.all, 'detail'] as const,
  detail: (uuid: string) => [...paymentKeys.details(), uuid] as const,
};

// GET /api/v1/payments - List Payments
export const usePayments = (params?: GetPaymentsQueryParams) => {
  return useQuery({
    queryKey: paymentKeys.list(params),
    queryFn: () => getPayments(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

// GET /api/v1/payments/{uuid} - Get Single Payment
export const usePayment = (uuid: string) => {
  return useQuery({
    queryKey: paymentKeys.detail(uuid),
    queryFn: () => getPayment(uuid),
    enabled: !!uuid,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// POST /api/v1/payments - Create Payment
export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentData: CreatePaymentPayload) => createPayment(paymentData),
    onSuccess: () => {
      // Invalidate payments list to refetch
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to create payment:", error);
    },
  });
};

// DELETE /api/v1/payments/{uuid} - Delete Payment
export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (uuid: string) => deletePayment(uuid),
    onSuccess: (_, uuid) => {
      // Invalidate payments list and specific payment detail
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
      queryClient.removeQueries({ queryKey: paymentKeys.detail(uuid) });
    },
    onError: (error) => {
      console.error("Failed to delete payment:", error);
    },
  });
};

// POST /api/v1/payments/{uuid}/approve - Approve Payment
export const useApprovePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (uuid: string) => approvePayment(uuid),
    onSuccess: (_, uuid) => {
      // Invalidate payments list, specific payment detail, and account data
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.detail(uuid) });
      queryClient.invalidateQueries({ queryKey: ["user-account"] });
    },
    onError: (error) => {
      console.error("Failed to approve payment:", error);
    },
  });
};