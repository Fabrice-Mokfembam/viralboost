import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getComplaints, 
  getComplaintStats, 
  getComplaintById, 
  updateComplaintStatus, 
  deleteComplaint,
  bulkUpdateComplaints
} from "../API/complaints";
import type { UpdateComplaintStatusRequest, BulkUpdateComplaintsRequest } from "../Types";

export const useGetComplaints = (page = 1, limit = 20, status?: string, priority?: string, search?: string) => {
  return useQuery({
    queryKey: ["admin-complaints", page, limit, status, priority, search],
    queryFn: () => getComplaints(page, limit, status, priority, search),
  });
};

export const useGetComplaintStats = () => {
  return useQuery({
    queryKey: ["admin-complaint-stats"],
    queryFn: () => getComplaintStats(),
  });
};

export const useGetComplaintById = (id: string) => {
  return useQuery({
    queryKey: ["admin-complaint", id],
    queryFn: () => getComplaintById(id),
    enabled: !!id,
  });
};

export const useUpdateComplaintStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdateComplaintStatusRequest }) => 
      updateComplaintStatus(id, request),
    onSuccess: () => {
      // Invalidate and refetch complaints list and stats
      queryClient.invalidateQueries({ queryKey: ["admin-complaints"] });
      queryClient.invalidateQueries({ queryKey: ["admin-complaint-stats"] });
    },
    onError: (error) => {
      console.error("Failed to update complaint status:", error);
    },
  });
};

export const useDeleteComplaint = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteComplaint(id),
    onSuccess: (data, id) => {
      console.log('Complaint deleted successfully:', id, data);
      // Remove the specific complaint from cache instead of invalidating all
      queryClient.setQueriesData(
        { queryKey: ["admin-complaints"] },
        (oldData: unknown) => {
          const data = oldData as { data?: { complaints?: Array<{ id: string }> } };
          if (!data?.data?.complaints) return oldData;
          return {
            ...data,
            data: {
              ...data.data,
              complaints: data.data.complaints.filter((complaint) => complaint.id !== id)
            }
          };
        }
      );
      // Invalidate stats to refetch
      queryClient.invalidateQueries({ queryKey: ["admin-complaint-stats"] });
    },
    onError: (error) => {
      console.error("Failed to delete complaint:", error);
    },
  });
};

export const useBulkUpdateComplaints = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: BulkUpdateComplaintsRequest) => bulkUpdateComplaints(request),
    onSuccess: () => {
      // Invalidate and refetch complaints list and stats
      queryClient.invalidateQueries({ queryKey: ["admin-complaints"] });
      queryClient.invalidateQueries({ queryKey: ["admin-complaint-stats"] });
    },
    onError: (error) => {
      console.error("Failed to bulk update complaints:", error);
    },
  });
};
