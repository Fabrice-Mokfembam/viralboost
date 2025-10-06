
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  submitTaskProof, 
  getUserSubmissions, 
  getSubmissionById, 
  getSubmissionStats
} from '../API/submissions';
import type {
  TaskSubmissionRequest,
  GetSubmissionsParams,
  TaskSubmissionSuccessResponse,
  TaskSubmissionErrorResponse,
  UserSubmissionsResponse,
  SpecificSubmissionResponse,
  SubmissionStatsResponse
} from '../Types';

// Query Keys
export const SUBMISSION_QUERY_KEYS = {
  submissions: ['submissions'] as const,
  submissionById: (id: number) => ['submissions', id] as const,
  submissionStats: ['submission-stats'] as const,
  userSubmissions: (params: GetSubmissionsParams) => ['user-submissions', params] as const,
};

/**
 * Hook to submit task proof
 */
export const useSubmitTaskProof = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TaskSubmissionSuccessResponse,
    TaskSubmissionErrorResponse,
    TaskSubmissionRequest
  >({
    mutationFn: submitTaskProof,
    onSuccess: () => {
      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['user-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['submission-stats'] });
      queryClient.invalidateQueries({ queryKey: ['user-submissions'] });
    },
  });
};

/**
 * Hook to get user submissions with pagination and filtering
 */
export const useGetUserSubmissions = (params: GetSubmissionsParams = {}) => {
  return useQuery<UserSubmissionsResponse>({
    queryKey: ['user-submissions'],
    queryFn: () => getUserSubmissions(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get specific submission by ID
 */
export const useGetSubmissionById = (submissionId: number, enabled: boolean = true) => {
  return useQuery<SpecificSubmissionResponse>({
    queryKey: SUBMISSION_QUERY_KEYS.submissionById(submissionId),
    queryFn: () => getSubmissionById(submissionId),
    enabled: enabled && !!submissionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get submission statistics
 */
export const useGetSubmissionStats = () => {
  return useQuery<SubmissionStatsResponse>({
    queryKey: SUBMISSION_QUERY_KEYS.submissionStats,
    queryFn: getSubmissionStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

