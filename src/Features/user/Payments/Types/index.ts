// Payment model types based on the PHP model structure
export interface Payment {
  id: number;
  uuid: string;
  user_uuid: string;
  picture_path: string;
  amount: string;
  description: string;
  is_approved: boolean;
  conversion_amount: string | null;
  conversion_currency: string | null;
  created_at: string;
  updated_at: string;
  time_since_created: string;
  formatted_created_date: string;
  status_text: string;
  status_color: string;
}

// User info for payment details
export interface PaymentUser {
  uuid: string;
  name: string;
  email: string;
}

// Payment creation payload
export interface CreatePaymentPayload {
  picture_path: string;
  amount: string;
  description: string;
  conversion_amount?: string;
  conversion_currency?: string;
}

// Payment update payload
export interface UpdatePaymentPayload {
  picture_path?: string;
  amount?: string;
  description?: string;
  conversion_amount?: string;
  conversion_currency?: string;
  is_approved?: boolean;
}

// API Response types
export interface CreatePaymentResponse {
  success: boolean;
  message: string;
  data: {
    payment: Payment;
  };
}

export interface GetPaymentsResponse {
  success: boolean;
  message: string;
  data: {
    payments: Payment[];
    pagination: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
      from: number;
      to: number;
    };
  };
}

export interface GetPaymentResponse {
  success: boolean;
  message: string;
  data: {
    payment: Payment;
    user: PaymentUser;
  };
}

export interface UpdatePaymentResponse {
  success: boolean;
  message: string;
  data: {
    payment: Payment;
  };
}

export interface DeletePaymentResponse {
  success: boolean;
  message: string;
}

// Payment status types
export type PaymentStatus = 'pending' | 'approved' | 'rejected';
export type PaymentMethod = 'USDT' | 'Ethereum' | 'Bigcoin';

// Payment form data
export interface PaymentFormData {
  method: PaymentMethod;
  amount: string;
  description: string;
  picture_path: string;
  conversion_amount?: string;
  conversion_currency?: string;
}
