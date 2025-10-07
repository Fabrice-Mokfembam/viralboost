import { apiClient } from '../../../../Services';
import type {
  CreateWithdrawalPayload,
  CreateWithdrawalResponse,
  GetWithdrawalsResponse,
  GetWithdrawalResponse,
  DeleteWithdrawalResponse,
  GetWithdrawalsQueryParams
} from '../Types';

// POST /api/v1/withdrawals - Create Withdrawal Request
export const createWithdrawal = async (payload: CreateWithdrawalPayload): Promise<CreateWithdrawalResponse> => {
  const { data } = await apiClient.post('/withdrawals', payload);
  return data;
};

// GET /api/v1/withdrawals - Get User's Withdrawals
export const getWithdrawals = async (params?: GetWithdrawalsQueryParams): Promise<GetWithdrawalsResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.is_completed !== undefined) {
    queryParams.append('is_completed', params.is_completed.toString());
  }
  if (params?.platform) {
    queryParams.append('platform', params.platform);
  }
  if (params?.page !== undefined) {
    queryParams.append('page', params.page.toString());
  }

  const url = queryParams.toString() ? `/withdrawals?${queryParams.toString()}` : '/withdrawals';
  const { data } = await apiClient.get(url);
  return data;
};

// GET /api/v1/withdrawals/{uuid} - Get Withdrawal by ID
export const getWithdrawal = async (uuid: string): Promise<GetWithdrawalResponse> => {
  const { data } = await apiClient.get(`/withdrawals/${uuid}`);
  return data;
};

// DELETE /api/v1/withdrawals/{uuid} - Delete Withdrawal Request
export const deleteWithdrawal = async (uuid: string): Promise<DeleteWithdrawalResponse> => {
  const { data } = await apiClient.delete(`/withdrawals/${uuid}`);
  return data;
};
