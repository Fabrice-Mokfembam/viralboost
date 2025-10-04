import { useQuery } from "@tanstack/react-query";
import { getMemberships, getMyMembership } from "../api";

// Hook to get all available memberships
export const useMemberships = () => {
  return useQuery({
    queryKey: ["memberships"],
    queryFn: getMemberships,
    staleTime: 10 * 60 * 1000, // 10 minutes (memberships don't change often)
    retry: 2,
  });
};

// Hook to get user's current membership details
export const useMyMembership = () => {
  return useQuery({
    queryKey: ["my-membership"],
    queryFn: getMyMembership,
    staleTime: 5 * 60 * 1000, // 5 minutes (daily progress changes frequently)
    retry: 2,
  });
};
