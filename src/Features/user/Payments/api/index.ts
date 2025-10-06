import { apiClient } from "../../../../Services";
import type { 
  CreatePaymentResponse, 
  GetPaymentsResponse, 
  GetPaymentResponse, 
  UpdatePaymentResponse,
  DeletePaymentResponse,
  CreatePaymentPayload,
  UpdatePaymentPayload
} from "../Types";

// Create a new payment
export const createPayment = async (paymentData: CreatePaymentPayload): Promise<CreatePaymentResponse> => {
  const { data } = await apiClient.post('/payments', paymentData);
  return data;
};

// Get all payments with pagination
export const getPayments = async (page: number = 1, perPage: number = 20): Promise<GetPaymentsResponse> => {
  const { data } = await apiClient.get(`/payments?page=${page}&per_page=${perPage}`);
  return data;
};

// Get a specific payment by ID
export const getPayment = async (paymentId: number): Promise<GetPaymentResponse> => {
  const { data } = await apiClient.get(`/payments/${paymentId}`);
  return data;
};

// Update a payment
export const updatePayment = async (paymentId: number, updateData: UpdatePaymentPayload): Promise<UpdatePaymentResponse> => {
  const { data } = await apiClient.put(`/payments/${paymentId}`, updateData);
  return data;
};

// Delete a payment
export const deletePayment = async (paymentId: number): Promise<DeletePaymentResponse> => {
  const { data } = await apiClient.delete(`/payments/${paymentId}`);
  return data;
};

// Get user's payments
export const getUserPayments = async (page: number = 1, perPage: number = 20): Promise<GetPaymentsResponse> => {
  const { data } = await apiClient.get(`/payments/user?page=${page}&per_page=${perPage}`);
  return data;
};
