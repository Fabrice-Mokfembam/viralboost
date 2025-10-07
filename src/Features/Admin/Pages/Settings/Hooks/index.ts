import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPaymentDetails,
  getPaymentDetailsById,
  getAdminPaymentDetails,
  createPaymentDetails,
  getAdminPaymentDetailsById,
  updatePaymentDetails,
  deletePaymentDetails
} from "../API";
import type {
  CreatePaymentDetailsPayload,
  UpdatePaymentDetailsPayload
} from "../Types";

// Query Keys
export const paymentDetailsKeys = {
  all: ['payment-details'] as const,
  lists: () => [...paymentDetailsKeys.all, 'list'] as const,
  list: () => [...paymentDetailsKeys.lists()] as const,
  details: () => [...paymentDetailsKeys.all, 'detail'] as const,
  detail: (id: number) => [...paymentDetailsKeys.details(), id] as const,
};

// User Hooks
// GET /api/v1/payment-details - Get all payment details
export const usePaymentDetails = () => {
  return useQuery({
    queryKey: paymentDetailsKeys.list(),
    queryFn: () => getPaymentDetails(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// GET /api/v1/payment-details/{id} - Get specific payment details
export const usePaymentDetailsById = (id: number) => {
  return useQuery({
    queryKey: paymentDetailsKeys.detail(id),
    queryFn: () => getPaymentDetailsById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Admin Hooks
// GET /api/v1/admin/payment-details - List all payment details
export const useAdminPaymentDetails = () => {
  return useQuery({
    queryKey: paymentDetailsKeys.list(),
    queryFn: () => getAdminPaymentDetails(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

// POST /api/v1/admin/payment-details - Create new payment details
export const useCreatePaymentDetails = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: CreatePaymentDetailsPayload) => createPaymentDetails(payload),
    onSuccess: () => {
      // Invalidate payment details list to refetch
      queryClient.invalidateQueries({ queryKey: paymentDetailsKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to create payment details:", error);
    },
  });
};

// GET /api/v1/admin/payment-details/{id} - Get specific payment details
export const useAdminPaymentDetailsById = (id: number) => {
  return useQuery({
    queryKey: paymentDetailsKeys.detail(id),
    queryFn: () => getAdminPaymentDetailsById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// PUT /api/v1/admin/payment-details/{id} - Update payment details
export const useUpdatePaymentDetails = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePaymentDetailsPayload }) => 
      updatePaymentDetails(id, payload),
    onSuccess: (_, { id }) => {
      // Invalidate payment details list and specific payment details
      queryClient.invalidateQueries({ queryKey: paymentDetailsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: paymentDetailsKeys.detail(id) });
    },
    onError: (error) => {
      console.error("Failed to update payment details:", error);
    },
  });
};

// DELETE /api/v1/admin/payment-details/{id} - Delete payment details
export const useDeletePaymentDetails = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deletePaymentDetails(id),
    onSuccess: (_, id) => {
      // Invalidate payment details list and remove specific payment details
      queryClient.invalidateQueries({ queryKey: paymentDetailsKeys.lists() });
      queryClient.removeQueries({ queryKey: paymentDetailsKeys.detail(id) });
    },
    onError: (error) => {
      console.error("Failed to delete payment details:", error);
    },
  });
};
