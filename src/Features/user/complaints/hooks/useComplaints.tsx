import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createComplaint, getComplaints, getComplaint, updateComplaint } from "../api";
import type { CreateComplaintPayload, UpdateComplaintPayload } from "../Types";

// Hook to get all complaints with pagination
export const useComplaints = (page: number = 1, perPage: number = 20) => {
  return useQuery({
    queryKey: ["complaints"],
    queryFn: () => getComplaints(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook to get a specific complaint
export const useComplaint = (complaintId: number) => {
  return useQuery({
    queryKey: ["complaints"],
    queryFn: () => getComplaint(complaintId),
    enabled: !!complaintId, // Only run query if complaintId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook to create a new complaint
export const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (complaintData: CreateComplaintPayload) => createComplaint(complaintData),
    onSuccess: () => {
      // Invalidate and refetch complaints data
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
    onError: (error) => {
      console.error("Failed to create complaint:", error);
    },
  });
};

// Hook to update a complaint
export const useUpdateComplaint = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ complaintId, updateData }: { complaintId: number; updateData: UpdateComplaintPayload }) => 
      updateComplaint(complaintId, updateData),
    onSuccess: () => {
      // Invalidate and refetch complaints data
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      // Update specific complaint cache
      queryClient.invalidateQueries({ queryKey: ["complaint"] });
    },
    onError: (error) => {
      console.error("Failed to update complaint:", error);
    },
  });
};
