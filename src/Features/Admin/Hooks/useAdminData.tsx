import { useState, useEffect } from 'react';
import type { 
  DashboardStats, 
  RecentActivity, 
  User, 
  Task, 
  Complaint, 
  Transaction, 
  TaskSubmission,
  UserFilters,
  TaskFilters,
  ComplaintFilters,
  PaginatedResponse
} from '../Types';
import { adminAPI } from '../API';

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

  const fetchActivities = async () => {
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
  };

  useEffect(() => {
    fetchActivities();
  }, [limit]);

  return { activities, loading, error, refetch: fetchActivities };
};

// Users Hook
export const useUsers = (filters: UserFilters = {}, page = 1, limit = 20) => {
  const [users, setUsers] = useState<PaginatedResponse<User> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminAPI.getUsers(filters, page, limit);
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters, page, limit]);

  return { users, loading, error, refetch: fetchUsers };
};

// Tasks Hook
export const useTasks = (filters: TaskFilters = {}, page = 1, limit = 20) => {
  const [tasks, setTasks] = useState<PaginatedResponse<Task> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminAPI.getTasks(filters, page, limit);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters, page, limit]);

  return { tasks, loading, error, refetch: fetchTasks };
};

// Complaints Hook
export const useComplaints = (filters: ComplaintFilters = {}, page = 1, limit = 20) => {
  const [complaints, setComplaints] = useState<PaginatedResponse<Complaint> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminAPI.getComplaints(filters, page, limit);
      setComplaints(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [filters, page, limit]);

  return { complaints, loading, error, refetch: fetchComplaints };
};

// Task Submissions Hook
export const useTaskSubmissions = (page = 1, limit = 20) => {
  const [submissions, setSubmissions] = useState<PaginatedResponse<TaskSubmission> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminAPI.getTaskSubmissions(page, limit);
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [page, limit]);

  return { submissions, loading, error, refetch: fetchSubmissions };
};

// Transactions Hook
export const useTransactions = (page = 1, limit = 20) => {
  const [transactions, setTransactions] = useState<PaginatedResponse<Transaction> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminAPI.getTransactions(page, limit);
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, limit]);

  return { transactions, loading, error, refetch: fetchTransactions };
};
