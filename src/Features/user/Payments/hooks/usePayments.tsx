import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment, getPayments, getPayment, updatePayment, deletePayment, getUserPayments } from "../api";
import type { CreatePaymentPayload, UpdatePaymentPayload } from "../Types";

// Query Keys
export const PAYMENT_QUERY_KEYS = {
  payments: ['payments'] as const,
  paymentById: (id: number) => ['payments', id] as const,
  userPayments: (page: number, perPage: number) => ['user-payments', page, perPage] as const,
};

// Hook to get all payments with pagination
export const usePayments = (page: number = 1, perPage: number = 20) => {
  return useQuery({
    queryKey: PAYMENT_QUERY_KEYS.payments,
    queryFn: () => getPayments(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook to get user's payments
export const useUserPayments = (page: number = 1, perPage: number = 20) => {
  return useQuery({
    queryKey: PAYMENT_QUERY_KEYS.userPayments(page, perPage),
    queryFn: () => getUserPayments(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook to get a specific payment
export const usePayment = (paymentId: number) => {
  return useQuery({
    queryKey: PAYMENT_QUERY_KEYS.paymentById(paymentId),
    queryFn: () => getPayment(paymentId),
    enabled: !!paymentId, // Only run query if paymentId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook to create a new payment
export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentData: CreatePaymentPayload) => createPayment(paymentData),
    onSuccess: () => {
      // Invalidate and refetch payments data
      queryClient.invalidateQueries({ queryKey: PAYMENT_QUERY_KEYS.payments });
      queryClient.invalidateQueries({ queryKey: ['user-payments'] });
    },
    onError: (error) => {
      console.error("Failed to create payment:", error);
    },
  });
};

// Hook to update a payment
export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ paymentId, updateData }: { paymentId: number; updateData: UpdatePaymentPayload }) => 
      updatePayment(paymentId, updateData),
    onSuccess: (_, { paymentId }) => {
      // Invalidate and refetch payments data
      queryClient.invalidateQueries({ queryKey: PAYMENT_QUERY_KEYS.payments });
      queryClient.invalidateQueries({ queryKey: ['user-payments'] });
      // Update specific payment cache
      queryClient.invalidateQueries({ queryKey: PAYMENT_QUERY_KEYS.paymentById(paymentId) });
    },
    onError: (error) => {
      console.error("Failed to update payment:", error);
    },
  });
};

// Hook to delete a payment
export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentId: number) => deletePayment(paymentId),
    onSuccess: () => {
      // Invalidate and refetch payments data
      queryClient.invalidateQueries({ queryKey: PAYMENT_QUERY_KEYS.payments });
      queryClient.invalidateQueries({ queryKey: ['user-payments'] });
    },
    onError: (error) => {
      console.error("Failed to delete payment:", error);
    },
  });
};
