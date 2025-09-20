import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  createTask, 
  deleteTask, 
  getAllTasks, 
  getTaskById, 
  updateTask,
  getAvailableTasks,
  getTaskStats,
  assignDailyTasks,
  resetDailyTasks,
  startTaskScheduler
} from "../API/tasks";
import type {  TaskCreationForm, TaskFilters } from "../Types";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (task: TaskCreationForm) => createTask(task),
    onSuccess: () => {
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Failed to create task:", error);
    },
  });
};

export const useGetAllTasks = (filters: TaskFilters = {}, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks(filters, page, limit),
  });
};

export const useGetTaskById = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId),
    enabled: !!taskId,
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: Partial<TaskCreationForm> }) =>
      updateTask(taskId, updates),
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

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      // Invalidate tasks list to refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Failed to delete task:", error);
    },
  });
};

export const useGetAvailableTasks = () => {
  return useQuery({
    queryKey: ["availableTasks"],
    queryFn: () => getAvailableTasks(),
  });
};

export const useGetTaskStats = () => {
  return useQuery({
    queryKey: ["taskStats"],
    queryFn: () => getTaskStats(),
  });
};

export const useAssignDailyTasks = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => assignDailyTasks(),
    onSuccess: () => {
      // Invalidate tasks list to refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Failed to assign daily tasks:", error);
    },
  });
};

export const useResetDailyTasks = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => resetDailyTasks(),
    onSuccess: () => {
      // Invalidate tasks list to refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Failed to reset daily tasks:", error);
    },
  });
};

export const useStartTaskScheduler = () => {
  return useMutation({
    mutationFn: () => startTaskScheduler(),
    onError: (error) => {
      console.error("Failed to start task scheduler:", error);
    },
  });
};
