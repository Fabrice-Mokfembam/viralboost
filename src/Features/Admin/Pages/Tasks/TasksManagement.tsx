import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { TaskFilters } from '../../Types';
import { useGetAllTasks, useDeleteTask } from '../../Hooks/useTasks';
import { getTaskProperty, getPlatformIcon } from '../../Utils/taskUtils';

interface ApiTask {
  id: number;
  title: string;
  description: string;
  category: string;
  task_type: string;
  platform: string;
  instructions: string;
  target_url: string;
  benefit: string;
  is_active: number;
  task_status: string;
  priority: string;
  threshold_value: number;
  task_completion_count: number;
  task_distribution_count: number;
  created_at: string;
  updated_at: string;
}

type TaskData = ApiTask | {
  id: string;
  title: string;
  description: string;
  platform: string;
  basePoints: number;
  estimatedDurationMinutes: number;
  requiresPhoto: boolean;
  samplePhotoUrl?: string;
  thresholdValue: number;
  instructions: string[];
  targetUrl: string;
  expiresAt: string;
  status: string;
  membershipTiers: string[];
  totalCompletions: number;
  createdAt: string;
  createdBy: string;
};


const TasksManagement: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TaskFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskData | null>(null);

  // Use real API calls
  const { data: taskData, isLoading, error } = useGetAllTasks(filters);
  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  useEffect(() => {
    console.log(taskData);
    if (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [error, taskData]);

  
  
  // Use real API data
  const apiTasks = useMemo(() => taskData?.data?.tasks || [], [taskData]);
  const totalTasks = taskData?.data?.total_tasks || 0;
  
  // Filter and paginate tasks using API data
  const filteredTasks = useMemo(() => {
    let filtered = apiTasks; // Use API data
    
    // Apply search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter((task: TaskData) => 
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
      );
    }
    
    // Apply platform filter
    if (filters.platform) {
      filtered = filtered.filter((task: TaskData) => task.platform === filters.platform);
    }
    
    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter((task: TaskData) => getTaskProperty(task, 'task_status', 'status') === filters.status);
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((task: TaskData) => {
        const category = getTaskProperty(task, 'category', 'category');
        return category === filters.category;
      });
    }
    
    return filtered;
  }, [filters, apiTasks]); // Added apiTasks dependency back
  
  // Use API data with pagination
  const tasks = {
    data: filteredTasks,
    pagination: {
      page: currentPage,
      limit: 20,
      total: totalTasks,
      totalPages: Math.ceil(totalTasks / 20)
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchTerm });
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof TaskFilters, value: string) => {
    setFilters({ ...filters, [key]: value || undefined });
    setCurrentPage(1);
  };

  const handleDeleteClick = (task: TaskData) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!taskToDelete) return;

    deleteTask(taskToDelete.id.toString(), {
      onSuccess: () => {
        toast.success('Task deleted successfully!');
        setDeleteModalOpen(false);
        setTaskToDelete(null);
      },
      onError: (error: unknown) => {
        console.error('Error deleting task:', error);
        const errorMessage = error && typeof error === 'object' && 'response' in error && 
          error.response && typeof error.response === 'object' && 'data' in error.response &&
          error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data
          ? (error.response.data as { message: string }).message
          : 'Failed to delete task. Please try again.';
        toast.error(errorMessage);
      }
    });
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      pause: { color: 'bg-blue-100 text-blue-800', text: 'Paused' },
      paused: { color: 'bg-blue-100 text-blue-800', text: 'Paused' },
      completed: { color: 'bg-purple-100 text-purple-800', text: 'Completed' },
      suspended: { color: 'bg-red-100 text-red-800', text: 'Suspended' },
      expired: { color: 'bg-gray-100 text-gray-800', text: 'Expired' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Task Management</h1>
            <p className="text-text-secondary mt-1">Create and manage tasks for users</p>
          </div>
        </div>
        <div className="bg-bg-secondary rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-cyan mx-auto"></div>
          <p className="text-text-secondary mt-4">Loading tasks...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Task Management</h1>
            <p className="text-text-secondary mt-1">Create and manage tasks for users</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading tasks</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Failed to load tasks. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Task Management</h1>
          <p className="text-text-secondary mt-1">
            Create and manage tasks for users
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/dashboard/create-task')}
          className="px-4 py-2 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors duration-200"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Task
          </div>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-bg-secondary rounded-lg p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="pause">Paused</option>
                <option value="completed">Completed</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Platform
              </label>
              <select
                value={filters.platform || ''}
                onChange={(e) => handleFilterChange('platform', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <option value="">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter</option>
                <option value="tiktok">TikTok</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <option value="">All Categories</option>
                <option value="Social Media">Social Media</option>
                <option value="Website">Website</option>
                <option value="App">App</option>
                <option value="Survey">Survey</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-hover focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tasks Table */}
      <div className="bg-bg-secondary rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-main">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Completions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-bg-secondary divide-y divide-border">
              {tasks?.data.map((task: TaskData) => (
                <tr key={task.id} className="hover:bg-bg-tertiary">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-text-primary">
                      {task.title}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      ID: {task.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getPlatformIcon(task.platform)}</span>
                      <span className="text-sm text-text-primary capitalize">
                        {task.platform}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {getTaskProperty(task, 'category', 'category')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(getTaskProperty(task, 'task_status', 'status') as string)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {getTaskProperty(task, 'priority', 'priority')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {getTaskProperty(task, 'task_completion_count', 'task_completion_count')}
                    </div>
                    <div className="text-xs text-text-secondary">
                      / {getTaskProperty(task, 'threshold_value', 'thresholdValue')} target
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button     onClick={() => navigate(`/admin/dashboard/task/details/${task.id}`)} className="text-accent-cyan cursor-pointer hover:text-accent-cyan-hover">
                        View
                      </button>
                      <button onClick={() => navigate(`/admin/dashboard/task/edit/${task.id}`)} className="text-text-secondary cursor-pointer hover:text-text-primary">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(task)}
                        className="text-red-600 cursor-pointer hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {tasks && tasks.pagination.totalPages > 1 && (
          <div className="bg-bg-main px-4 py-3 flex items-center justify-between border-t border-border">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-text-primary bg-bg-secondary hover:bg-bg-tertiary disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(tasks.pagination.totalPages, currentPage + 1))}
                disabled={currentPage === tasks.pagination.totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-text-primary bg-bg-secondary hover:bg-bg-tertiary disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  Showing{' '}
                  <span className="font-medium">
                    {(currentPage - 1) * 20 + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * 20, tasks.pagination.total)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{tasks.pagination.total}</span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: tasks.pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-accent-cyan border-accent-cyan text-white'
                          : 'bg-bg-secondary border-border text-text-primary hover:bg-bg-tertiary'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-bg-secondary rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-text-primary">
                  Delete Task
                </h3>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-text-secondary">
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
              {taskToDelete && (
                <div className="mt-3 p-3 bg-bg-main rounded-lg border border-border">
                  <p className="text-sm font-medium text-text-primary">{taskToDelete.title}</p>
                  <p className="text-xs text-text-secondary mt-1">
                    {taskToDelete.description.length > 100 
                      ? `${taskToDelete.description.substring(0, 100)}...` 
                      : taskToDelete.description
                    }
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeletingTask}
                className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-bg-tertiary transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeletingTask}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isDeletingTask ? 'Deleting...' : 'Delete Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksManagement;
