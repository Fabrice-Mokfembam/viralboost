// PaymentDetails model types
export interface PaymentDetails {
  id: number;
  bitcoin_address: string;
  ethereum_address: string;
  usdt_address: string;
  created_at: string;
  updated_at: string;
}

// Request payload types
export interface CreatePaymentDetailsPayload {
  bitcoin_address: string;
  ethereum_address: string;
  usdt_address: string;
}

export interface UpdatePaymentDetailsPayload {
  bitcoin_address?: string;
  ethereum_address?: string;
  usdt_address?: string;
}

// API Response types
export interface GetPaymentDetailsResponse {
  success: boolean;
  data: PaymentDetails;
  message: string;
}

export interface GetPaymentDetailsListResponse {
  success: boolean;
  data: PaymentDetails[];
  message: string;
}

export interface CreatePaymentDetailsResponse {
  success: boolean;
  data: PaymentDetails;
  message: string;
}

export interface UpdatePaymentDetailsResponse {
  success: boolean;
  data: PaymentDetails;
  message: string;
}

export interface DeletePaymentDetailsResponse {
  success: boolean;
  message: string;
}

// Error response type
export interface PaymentDetailsErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
