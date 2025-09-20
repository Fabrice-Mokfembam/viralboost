import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { 
  getUsers, 
  getTasks, 
  getComplaints, 
  getTransactions 
} from '../API';
import type { 
  DashboardStats, 
  RecentActivity, 
  UserFilters,
  TaskFilters,
  ComplaintFilters
} from '../Types';


// Dashboard Stats Hook
export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for now
      const mockStats: DashboardStats = {
        totalUsers: 1250,
        totalUsersGrowth: 12.5,
        totalTasksCreated: 89,
        totalTasksCompleted: 2340,
        totalRevenue: 45600,
        totalRevenueGrowth: 8.3,
        activeUsers: 890,
        pendingSubmissions: 23,
        openComplaints: 7,
        systemHealth: 'healthy'
      };
      
      setStats(mockStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
};

// Recent Activity Hook
export const useRecentActivity = (limit = 10) => {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for now
      const mockActivities: RecentActivity[] = [
        {
          id: '1',
          type: 'user_registration',
          description: 'New user registered: john_doe',
          userId: 'user_123',
          userName: 'john_doe',
          createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
        },
        {
          id: '2',
          type: 'task_completed',
          description: 'Task "Follow us on Instagram" completed by user_456',
          userId: 'user_456',
          userName: 'jane_smith',
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
        },
        {
          id: '3',
          type: 'task_created',
          description: 'New task "Share our latest post" created',
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        },
        {
          id: '4',
          type: 'complaint_created',
          description: 'New complaint submitted by user_789',
          userId: 'user_789',
          userName: 'bob_wilson',
          createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
        },
        {
          id: '5',
          type: 'transaction_completed',
          description: 'Membership purchase completed by user_101',
          userId: 'user_101',
          userName: 'alice_brown',
          createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
        }
      ];
      
      setActivities(mockActivities.slice(0, limit));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, loading, error, refetch: fetchActivities };
};

// Users Hook
export const useUsers = (filters: UserFilters = {}, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-users', filters, page, limit],
    queryFn: () => getUsers(page, limit, filters.search || ''),
  });
};

// Tasks Hook
export const useTasks = (filters: TaskFilters = {}, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-tasks', filters, page, limit],
    queryFn: () => getTasks(filters, page, limit),
  });
};

// Complaints Hook
export const useComplaints = (filters: ComplaintFilters = {}, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-complaints', filters, page, limit],
    queryFn: () => getComplaints(page, limit, filters.status),
  });
};

// Task Submissions Hook - Note: This endpoint doesn't exist in the API yet
export const useTaskSubmissions = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-task-submissions', page, limit],
    queryFn: async () => {
      // This would need to be implemented in the API
      throw new Error('Task submissions endpoint not implemented yet');
    },
    enabled: false, // Disable until API is implemented
  });
};

// Transactions Hook
export const useTransactions = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['admin-transactions', page, limit],
    queryFn: () => getTransactions(page, limit),
  });
};
