import { apiClient } from "../../../../Services";
import type { 
  GetPaymentsResponse, 
  CreatePaymentResponse, 
  GetPaymentResponse, 
  DeletePaymentResponse, 
  ApprovePaymentResponse,
  CreatePaymentPayload,
  GetPaymentsQueryParams
} from "../Types";

// GET /api/v1/payments - List Payments
export const getPayments = async (params?: GetPaymentsQueryParams): Promise<GetPaymentsResponse> => {
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

  const url = queryParams.toString() ? `/payments?${queryParams.toString()}` : '/payments';
  const { data } = await apiClient.get(url);
  return data;
};

// POST /api/v1/payments - Create Payment
export const createPayment = async (paymentData: CreatePaymentPayload): Promise<CreatePaymentResponse> => {
  const { data } = await apiClient.post('/payments', paymentData);
  return data;
};

// GET /api/v1/payments/{uuid} - Get Single Payment
export const getPayment = async (uuid: string): Promise<GetPaymentResponse> => {
  const { data } = await apiClient.get(`/payments/${uuid}`);
  return data;
};

// DELETE /api/v1/payments/{uuid} - Delete Payment
export const deletePayment = async (uuid: string): Promise<DeletePaymentResponse> => {
  const { data } = await apiClient.delete(`/payments/${uuid}`);
  return data;
};

// POST /api/v1/payments/{uuid}/approve - Approve Payment
export const approvePayment = async (uuid: string): Promise<ApprovePaymentResponse> => {
  const { data } = await apiClient.post(`/admin/payments/${uuid}/approve`);
  return data;
};