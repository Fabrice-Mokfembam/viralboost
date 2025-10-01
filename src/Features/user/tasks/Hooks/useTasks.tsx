import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { runTaskDistribution, getUserTaskDetails, updateUserTask } from "../API";



export const useRunTaskDistribution = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => runTaskDistribution(),
  });
};

export const useGetUserTaskDetails = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getUserTaskDetails(taskId),
    enabled: !!taskId,
  });
};

export const useUpdateUserTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ taskId, updateData }: { taskId: string; updateData: any }) =>
      updateUserTask(taskId, updateData),
    onSuccess: (data, variables) => {
      // Update the specific task in cache
      queryClient.setQueryData(["task", variables.taskId], data);
      // Invalidate tasks list to refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Failed to update task:", error);
    },
  });
};
