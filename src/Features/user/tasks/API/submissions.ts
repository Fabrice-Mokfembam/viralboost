import { apiClient } from '../../../../Services';
import type {
  TaskSubmissionRequest,
  TaskSubmissionSuccessResponse,
  TaskSubmissionErrorResponse,
  UserSubmissionsResponse,
  SpecificSubmissionResponse,
  SubmissionStatsResponse,
  GetSubmissionsParams
} from '../Types';

/**
 * Submit task proof
 * @param submissionData - Task submission data including image URL
 * @returns Promise with submission response
 */
export const submitTaskProof = async (
  submissionData: TaskSubmissionRequest
): Promise<TaskSubmissionSuccessResponse> => {
  try {
    const { data } = await apiClient.post('/task-submissions', submissionData);
    return data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data as TaskSubmissionErrorResponse;
    }
    throw {
      success: false,
      message: 'Network error occurred',
      error: 'NetworkError'
    } as TaskSubmissionErrorResponse;
  }
};

/**
 * Get user submissions with pagination and filtering
 * @param params - Query parameters for pagination and filtering
 * @returns Promise with submissions list and pagination info
 */
export const getUserSubmissions = async (
  params: GetSubmissionsParams = {}
): Promise<UserSubmissionsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);

    const { data } = await apiClient.get(`/task-submissions?${queryParams.toString()}`);
    return data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Failed to fetch submissions',
      error: 'NetworkError'
    };
  }
};

/**
 * Get specific submission by ID
 * @param submissionId - ID of the submission
 * @returns Promise with submission details
 */
export const getSubmissionById = async (
  submissionId: number
): Promise<SpecificSubmissionResponse> => {
  try {
    const { data } = await apiClient.get(`/task-submissions/${submissionId}`);
    return data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Failed to fetch submission',
      error: 'NetworkError'
    };
  }
};

/**
 * Get submission statistics
 * @returns Promise with submission stats
 */
export const getSubmissionStats = async (): Promise<SubmissionStatsResponse> => {
  try {
    const { data } = await apiClient.get('/task-submissions/stats');
    return data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: 'Failed to fetch submission statistics',
      error: 'NetworkError'
    };
  }
};
