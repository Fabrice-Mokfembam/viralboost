import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  createMembership, 
  deleteMembership, 
  getAllMemberships, 
  getMembershipById, 
  updateMembership
} from "../API/memberships";
import type { MembershipTier, MembershipCreationForm } from "../Types";

export const useCreateMembership = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (membership: MembershipCreationForm) => createMembership(membership),
    onSuccess: () => {
      // Invalidate and refetch memberships list
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: (error) => {
      console.error("Failed to create membership:", error);
    },
  });
};

export const useGetAllMemberships = () => {
  return useQuery({
    queryKey: ["memberships"],
    queryFn: () => getAllMemberships(),
  });
};

export const useGetMembershipById = (membershipId: string) => {
  return useQuery({
    queryKey: ["membership"],
    queryFn: () => getMembershipById(membershipId),
    enabled: !!membershipId,
  });
};

export const useUpdateMembership = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ membershipId, updates }: { membershipId: string; updates: Partial<MembershipTier> }) =>
      updateMembership(membershipId, updates),
    onSuccess: () => {
    
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
      queryClient.invalidateQueries({ queryKey: ["membership"] });
    },
    onError: (error) => {
      console.error("Failed to update membership:", error);
    },
  });
};

export const useDeleteMembership = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (membershipId: string) => deleteMembership(membershipId),
    onSuccess: () => {
      // Invalidate memberships list to refetch
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
    },
    onError: (error) => {
      console.error("Failed to delete membership:", error);
    },
  });
};
