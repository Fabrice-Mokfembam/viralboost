
import { apiClient } from '../../../../../Services';
import type {
  CreatePaymentDetailsPayload,
  UpdatePaymentDetailsPayload,
  GetPaymentDetailsResponse,
  GetPaymentDetailsListResponse,
  CreatePaymentDetailsResponse,
  UpdatePaymentDetailsResponse,
  DeletePaymentDetailsResponse
} from '../Types';

// User Routes (Authentication required)
export const getPaymentDetails = async (): Promise<GetPaymentDetailsResponse> => {
  const response = await apiClient.get('/payment-details');
  return response.data;
};

export const getPaymentDetailsById = async (id: number): Promise<GetPaymentDetailsResponse> => {
  const response = await apiClient.get(`/payment-details/${id}`);
  return response.data;
};

// Admin Routes (Authentication required)
export const getAdminPaymentDetails = async (): Promise<GetPaymentDetailsListResponse> => {
  const response = await apiClient.get('/admin/payment-details');
  return response.data;
};

export const createPaymentDetails = async (payload: CreatePaymentDetailsPayload): Promise<CreatePaymentDetailsResponse> => {
  const response = await apiClient.post('/admin/payment-details', payload);
  return response.data;
};

export const getAdminPaymentDetailsById = async (id: number): Promise<GetPaymentDetailsResponse> => {
  const response = await apiClient.get(`/admin/payment-details/${id}`);
  return response.data;
};

export const updatePaymentDetails = async (id: number, payload: UpdatePaymentDetailsPayload): Promise<UpdatePaymentDetailsResponse> => {
  const response = await apiClient.put(`/admin/payment-details/${id}`, payload);
  return response.data;
};

export const deletePaymentDetails = async (id: number): Promise<DeletePaymentDetailsResponse> => {
  const response = await apiClient.delete(`/admin/payment-details/${id}`);
  return response.data;
};
